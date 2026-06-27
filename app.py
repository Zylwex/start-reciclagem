from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file
from flask.json.provider import DefaultJSONProvider
import psycopg2, psycopg2.extras, hashlib, os, json, csv, io
from datetime import datetime, timedelta, date
from decimal import Decimal
from functools import wraps


class CustomJSONProvider(DefaultJSONProvider):
    """Serializa datetime, date e Decimal que o Flask padrão não suporta."""
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)


app = Flask(__name__)
app.json_provider_class = CustomJSONProvider
app.json = CustomJSONProvider(app)
app.secret_key = 'start_reciclagem_secret_2024'
TERMS_VERSION = '1.0'

# ─── SUPABASE / POSTGRESQL CONNECTION ────────────────────────────────────────
DB_CONFIG = {
    'host':     'aws-1-us-east-2.pooler.supabase.com',
    'port':     5432,
    'dbname':   'postgres',
    'user':     'postgres.jbgcfkhwamtxkwvktgyc',
    'password': 'FQWETG13GY1TG3TR13T13R12424___@!#_!@d>ç;;SD',
    'sslmode':  'require',   # Supabase requer SSL
}

def get_db():
    """Retorna uma conexão PostgreSQL com cursor em modo dicionário (RealDictCursor)."""
    conn = psycopg2.connect(**DB_CONFIG)
    conn.autocommit = False          # controle explícito de transação
    return conn

def hash_pw(pw): return hashlib.sha256(pw.encode()).hexdigest()

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Não autenticado'}), 401
        return f(*args, **kwargs)
    return decorated

# ─── INIT DB ─────────────────────────────────────────────────────────────────
def init_db():
    conn = get_db()
    c = conn.cursor()

    # ── Criação das tabelas (sintaxe PostgreSQL) ──────────────────────────────
    c.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        username      TEXT UNIQUE NOT NULL,
        email         TEXT UNIQUE NOT NULL,
        password      TEXT NOT NULL,
        full_name     TEXT,
        age           INTEGER,
        role          TEXT DEFAULT 'Funcionário',
        sector        TEXT,
        avatar        TEXT,
        accepted_terms BOOLEAN DEFAULT FALSE,
        created_at    TIMESTAMP DEFAULT NOW()
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id            SERIAL PRIMARY KEY,
        name          TEXT NOT NULL,
        sku           TEXT UNIQUE NOT NULL,
        category      TEXT,
        quantity      REAL DEFAULT 0,
        min_quantity  REAL DEFAULT 0,
        location      TEXT,
        observations  TEXT,
        created_at    TIMESTAMP DEFAULT NOW(),
        created_by    INTEGER
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        id         SERIAL PRIMARY KEY,
        name       TEXT UNIQUE NOT NULL,
        created_by INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS movements (
        id         SERIAL PRIMARY KEY,
        product_id INTEGER,
        type       TEXT,
        quantity   REAL,
        reason     TEXT,
        user_id    INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(product_id) REFERENCES products(id),
        FOREIGN KEY(user_id)    REFERENCES users(id)
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS posts (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER,
        content    TEXT,
        image      TEXT,
        post_type  TEXT DEFAULT 'post',
        likes      INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS comments (
        id         SERIAL PRIMARY KEY,
        post_id    INTEGER,
        user_id    INTEGER,
        content    TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY(post_id)  REFERENCES posts(id),
        FOREIGN KEY(user_id)  REFERENCES users(id)
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS post_likes (
        id      SERIAL PRIMARY KEY,
        post_id INTEGER,
        user_id INTEGER,
        UNIQUE(post_id, user_id)
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id         SERIAL PRIMARY KEY,
        user_id    INTEGER,
        title      TEXT,
        message    TEXT,
        type       TEXT DEFAULT 'info',
        read       INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS terms_acceptance (
        id          SERIAL PRIMARY KEY,
        user_id     INTEGER,
        version     TEXT DEFAULT '1.0',
        accepted_at TIMESTAMP DEFAULT NOW()
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS chart_edits (
        id           SERIAL PRIMARY KEY,
        chart        TEXT,
        product_id   INTEGER,
        product_name TEXT,
        old_value    REAL,
        new_value    REAL,
        user_id      INTEGER,
        created_at   TIMESTAMP DEFAULT NOW()
    )
    """)

    c.execute("""
    CREATE TABLE IF NOT EXISTS kanban_tasks (
        id          SERIAL PRIMARY KEY,
        title       TEXT NOT NULL,
        description TEXT,
        status      TEXT DEFAULT 'todo',
        priority    TEXT DEFAULT 'media',
        assignee    TEXT,
        due_date    TEXT,
        labels      TEXT DEFAULT '',
        position    INTEGER DEFAULT 0,
        created_by  INTEGER,
        created_at  TIMESTAMP DEFAULT NOW(),
        updated_at  TIMESTAMP DEFAULT NOW()
    )
    """)

    # ── Backward-compat: adicionar colunas ausentes com segurança ─────────────
    # No PostgreSQL usamos DO $$ BEGIN ... EXCEPTION ... END $$
    for alter_sql in [
        "ALTER TABLE terms_acceptance ADD COLUMN IF NOT EXISTS version TEXT DEFAULT '1.0'",
        "ALTER TABLE posts ADD COLUMN IF NOT EXISTS post_type TEXT DEFAULT 'post'",
        "ALTER TABLE kanban_tasks ADD COLUMN IF NOT EXISTS due_date TEXT",
        "ALTER TABLE kanban_tasks ADD COLUMN IF NOT EXISTS labels TEXT DEFAULT ''",
        # Migração: se accepted_terms ainda for INTEGER, converter para BOOLEAN
        """DO $$ BEGIN
             IF EXISTS (
               SELECT 1 FROM information_schema.columns
               WHERE table_name='users' AND column_name='accepted_terms'
               AND data_type='integer'
             ) THEN
               ALTER TABLE users ALTER COLUMN accepted_terms TYPE BOOLEAN USING (accepted_terms::boolean);
               ALTER TABLE users ALTER COLUMN accepted_terms SET DEFAULT FALSE;
             END IF;
           END $$""",
    ]:
        try:
            c.execute(alter_sql)
        except Exception:
            conn.rollback()

    # ── Seed: admin ───────────────────────────────────────────────────────────
    c.execute("SELECT id FROM users WHERE username=%s", ('admin',))
    if not c.fetchone():
        c.execute("""INSERT INTO users (username,email,password,full_name,role,sector,accepted_terms)
                     VALUES (%s,%s,%s,%s,%s,%s,%s)""",
                  ('admin', 'admin@startreciclagem.com', hash_pw('admin123'),
                   'Administrador', 'Administrador', 'TI', True))

        # Seed: produtos de exemplo
        samples = [
            ('Papelão',    'PAP-001', 'Papel',    120.5, 50,  'Galpão A', ''),
            ('Plástico PET','PET-001','Plástico',  80.0, 30,  'Galpão B', ''),
            ('Alumínio',   'ALU-001', 'Metal',     45.2, 20,  'Galpão C', ''),
            ('Vidro',      'VID-001', 'Vidro',    200.0, 100, 'Galpão A', ''),
            ('Madeira',    'MAD-001', 'Madeira',  300.0, 80,  'Galpão D', ''),
            ('Borracha',   'BOR-001', 'Borracha',  15.0, 25,  'Galpão B', 'ESTOQUE BAIXO'),
        ]
        for s in samples:
            c.execute("""INSERT INTO products
                         (name,sku,category,quantity,min_quantity,location,observations,created_by)
                         VALUES (%s,%s,%s,%s,%s,%s,%s,%s)""",
                      (*s, 1))

    conn.commit()

    # ── Seed: categorias padrão (idempotente) ─────────────────────────────────
    default_categories = ['Papel', 'Plástico', 'Metal', 'Vidro', 'Madeira', 'Borracha', 'Eletrônico']
    for cat in default_categories:
        try:
            c.execute("INSERT INTO categories (name) VALUES (%s) ON CONFLICT (name) DO NOTHING", (cat,))
        except Exception:
            conn.rollback()

    conn.commit()
    c.close()
    conn.close()


# ─── HELPER: row -> dict ──────────────────────────────────────────────────────
def row_to_dict(row):
    """Converte RealDictRow ou tupla nomeada em dict puro."""
    if row is None:
        return None
    return dict(row)


def rows_to_list(rows):
    """Converte lista de rows para lista de dicts."""
    return [dict(r) for r in rows]


def fetch_one(cursor):
    row = cursor.fetchone()
    return dict(row) if row else None


def fetch_all(cursor):
    return [dict(r) for r in cursor.fetchall()]


# ─── AUTH ROUTES ─────────────────────────────────────────────────────────────
@app.route('/')
def index():
    if 'user_id' in session:
        return redirect('/dashboard')
    return redirect('/login')

@app.route('/login')
def login_page(): return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session: return redirect('/login')
    return render_template('app.html')

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    d = request.json
    if not d or not d.get('username') or not d.get('password'):
        return jsonify({'error': 'Usuário e senha são obrigatórios'}), 400
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT * FROM users WHERE (username=%s OR email=%s) AND password=%s",
              (d['username'], d['username'], hash_pw(d['password'])))
    user = fetch_one(c)
    c.close()
    conn.close()
    if not user:
        return jsonify({'error': 'Usuário ou senha incorretos'}), 401
    if not user['accepted_terms']:
        return jsonify({'needs_terms': True, 'user_id': user['id']})
    session['user_id'] = user['id']
    session['username'] = user['username']
    session['role'] = user['role']
    session.permanent = True
    app.permanent_session_lifetime = timedelta(days=30)
    return jsonify({'success': True, 'user': user})

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    d = request.json
    if not d:
        return jsonify({'error': 'Dados inválidos'}), 400
    if not d.get('accept_terms'):
        return jsonify({'error': 'É necessário aceitar os Termos de Uso e a Política de Privacidade'}), 400
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        c.execute(
            """INSERT INTO users (username,email,password,full_name,role,sector,accepted_terms)
               VALUES (%s,%s,%s,%s,%s,%s,TRUE) RETURNING id""",
            (d['username'], d['email'], hash_pw(d['password']),
             d.get('full_name', ''), d.get('role', 'Funcionário'), d.get('sector', '')))
        user_id = c.fetchone()['id']
        c.execute("INSERT INTO terms_acceptance (user_id, version) VALUES (%s,%s)",
                  (user_id, TERMS_VERSION))
        conn.commit()
        c.close()
        conn.close()
        return jsonify({'success': True})
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': 'Usuário ou email já cadastrado'}), 400
    except Exception as e:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/accept-terms', methods=['POST'])
def accept_terms():
    d = request.json or {}
    user_id = d.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id é obrigatório'}), 400
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        c.execute("UPDATE users SET accepted_terms=true WHERE id=%s", (user_id,))
        c.execute("INSERT INTO terms_acceptance (user_id, version) VALUES (%s,%s)",
                  (user_id, TERMS_VERSION))
        conn.commit()
        c.execute("SELECT * FROM users WHERE id=%s", (user_id,))
        user = fetch_one(c)
        if not user:
            c.close()
            conn.close()
            return jsonify({'error': 'Usuário não encontrado'}), 404
        c.close()
        conn.close()
        session['user_id'] = user['id']
        session['username'] = user['username']
        session['role'] = user['role']
        return jsonify({'success': True})
    except Exception as e:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
def api_logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/auth/me')
@login_required
def api_me():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT * FROM users WHERE id=%s", (session['user_id'],))
    user = fetch_one(c)
    c.close()
    conn.close()
    return jsonify(user)

@app.route('/api/auth/update-profile', methods=['POST'])
@login_required
def update_profile():
    d = request.json
    conn = get_db()
    c = conn.cursor()
    c.execute("""UPDATE users SET full_name=%s,age=%s,role=%s,sector=%s,avatar=%s WHERE id=%s""",
              (d.get('full_name'), d.get('age'), d.get('role'),
               d.get('sector'), d.get('avatar'), session['user_id']))
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})

# ─── PRODUCTS ────────────────────────────────────────────────────────────────
@app.route('/api/products', methods=['GET'])
@login_required
def get_products():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    q = request.args.get('q', '')
    cat = request.args.get('category', '')
    status = request.args.get('status', '')
    sql = "SELECT * FROM products WHERE 1=1"
    params = []
    if q:
        sql += " AND (name ILIKE %s OR sku ILIKE %s)"   # ILIKE = case-insensitive no PostgreSQL
        params += [f'%{q}%', f'%{q}%']
    if cat:
        sql += " AND category=%s"
        params.append(cat)
    if status == 'low':
        sql += " AND quantity <= min_quantity"
    sql += " ORDER BY name"
    c.execute(sql, params)
    rows = fetch_all(c)
    c.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/products', methods=['POST'])
@login_required
def create_product():
    d = request.json
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        c.execute("""INSERT INTO products (name,sku,category,quantity,min_quantity,location,observations,created_by)
                     VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id""",
                  (d['name'], d['sku'], d.get('category', ''), float(d.get('quantity', 0)),
                   float(d.get('min_quantity', 0)), d.get('location', ''), d.get('observations', ''),
                   session['user_id']))
        new_id = c.fetchone()['id']

        # Registrar movimentação automática de entrada se quantidade inicial > 0
        initial_qty = float(d.get('quantity', 0))
        if initial_qty > 0:
            c.execute("""INSERT INTO movements (product_id,type,quantity,reason,user_id)
                         VALUES (%s,'entrada',%s,'Cadastro inicial do produto',%s)""",
                      (new_id, initial_qty, session['user_id']))

        conn.commit()
        _check_low_stock(conn, d['name'], initial_qty, float(d.get('min_quantity', 0)))
        c.close()
        conn.close()
        return jsonify({'success': True})
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': 'SKU já cadastrado'}), 400
    except Exception as e:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:pid>', methods=['PUT'])
@login_required
def update_product(pid):
    d = request.json
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        # Buscar quantidade antiga para calcular ajuste
        c.execute("SELECT quantity FROM products WHERE id=%s", (pid,))
        old_row = fetch_one(c)
        if not old_row:
            c.close()
            conn.close()
            return jsonify({'error': 'Produto não encontrado'}), 404
        old_qty = float(old_row['quantity'])
        new_qty = float(d.get('quantity', 0))

        c.execute("""UPDATE products SET name=%s,sku=%s,category=%s,quantity=%s,min_quantity=%s,
                     location=%s,observations=%s WHERE id=%s""",
                  (d['name'], d['sku'], d.get('category', ''), new_qty,
                   float(d.get('min_quantity', 0)), d.get('location', ''), d.get('observations', ''), pid))

        # Registrar movimentação automática de ajuste se a quantidade mudou
        diff = round(new_qty - old_qty, 4)
        if diff != 0:
            mov_type = 'entrada' if diff > 0 else 'saida'
            c.execute("""INSERT INTO movements (product_id,type,quantity,reason,user_id)
                         VALUES (%s,%s,%s,'Ajuste manual via edição de produto',%s)""",
                      (pid, mov_type, abs(diff), session['user_id']))

        conn.commit()
        _check_low_stock(conn, d['name'], new_qty, float(d.get('min_quantity', 0)))
        c.close()
        conn.close()
        return jsonify({'success': True})
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': 'SKU já cadastrado para outro produto'}), 400
    except Exception as e:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:pid>', methods=['DELETE'])
@login_required
def delete_product(pid):
    conn = get_db()
    c = conn.cursor()
    # Remover dependências antes de excluir o produto (FK constraints)
    c.execute("DELETE FROM movements WHERE product_id=%s", (pid,))
    c.execute("DELETE FROM chart_edits WHERE product_id=%s", (pid,))
    c.execute("DELETE FROM products WHERE id=%s", (pid,))
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/categories', methods=['GET'])
@login_required
def list_categories():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT name FROM categories ORDER BY name")
    rows = fetch_all(c)
    # Também inclui categorias em uso nos produtos mas ainda não na tabela categories
    c.execute("SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != ''")
    used = fetch_all(c)
    c.close()
    conn.close()
    names = {r['name'] for r in rows}
    for r in used:
        if r['category'] and r['category'] not in names:
            names.add(r['category'])
    return jsonify(sorted(names, key=lambda s: s.lower()))

@app.route('/api/categories', methods=['POST'])
@login_required
def create_category():
    d = request.json
    name = (d.get('name') or '').strip()
    if not name:
        return jsonify({'error': 'Informe um nome para a categoria'}), 400
    if len(name) > 40:
        return jsonify({'error': 'Nome muito longo (máx. 40 caracteres)'}), 400
    conn = get_db()
    c = conn.cursor()
    try:
        # ON CONFLICT DO NOTHING é idempotente, equivalente ao tratamento de IntegrityError do SQLite
        c.execute("INSERT INTO categories (name, created_by) VALUES (%s,%s) ON CONFLICT (name) DO NOTHING",
                  (name, session['user_id']))
        conn.commit()
    except Exception:
        conn.rollback()
    c.close()
    conn.close()
    return jsonify({'success': True, 'name': name})

@app.route('/api/products/generate-sku', methods=['POST'])
@login_required
def gen_sku():
    d = request.json or {}
    cat = (d.get('category') or 'PRD')[:3].upper()
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT COUNT(*) AS n FROM products WHERE category=%s", (d.get('category', ''),))
    count = c.fetchone()['n']
    c.close()
    conn.close()
    sku = f"{cat}-{str(count + 1).zfill(3)}"
    return jsonify({'sku': sku})

# ─── MOVEMENTS ───────────────────────────────────────────────────────────────
@app.route('/api/movements', methods=['POST'])
@login_required
def add_movement():
    d = request.json or {}
    if not d.get('product_id') or not d.get('type') or not d.get('quantity'):
        return jsonify({'error': 'product_id, type e quantity são obrigatórios'}), 400
    try:
        qty = float(d['quantity'])
    except (ValueError, TypeError):
        return jsonify({'error': 'Quantidade inválida'}), 400
    if qty <= 0:
        return jsonify({'error': 'A quantidade deve ser maior que zero'}), 400
    if d['type'] not in ('entrada', 'saida'):
        return jsonify({'error': 'Tipo deve ser "entrada" ou "saida"'}), 400
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT * FROM products WHERE id=%s", (d['product_id'],))
    prod = fetch_one(c)
    if not prod:
        c.close()
        conn.close()
        return jsonify({'error': 'Produto não encontrado'}), 404
    if d['type'] == 'saida' and prod['quantity'] < qty:
        c.close()
        conn.close()
        return jsonify({'error': 'Quantidade insuficiente em estoque'}), 400
    new_qty = prod['quantity'] + qty if d['type'] == 'entrada' else prod['quantity'] - qty
    c.execute("UPDATE products SET quantity=%s WHERE id=%s", (new_qty, d['product_id']))
    c.execute("INSERT INTO movements (product_id,type,quantity,reason,user_id) VALUES (%s,%s,%s,%s,%s)",
              (d['product_id'], d['type'], qty, d.get('reason', ''), session['user_id']))
    conn.commit()
    _check_low_stock(conn, prod['name'], new_qty, prod['min_quantity'])
    c.close()
    conn.close()
    return jsonify({'success': True, 'new_quantity': new_qty})

@app.route('/api/movements', methods=['GET'])
@login_required
def get_movements():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    pid = request.args.get('product_id')
    sql = """SELECT m.*,p.name as product_name,p.sku,u.full_name as user_name
             FROM movements m
             JOIN products p ON m.product_id=p.id
             JOIN users u ON m.user_id=u.id
             WHERE 1=1"""
    params = []
    if pid:
        sql += " AND m.product_id=%s"
        params.append(pid)
    sql += " ORDER BY m.created_at DESC LIMIT 100"
    c.execute(sql, params)
    rows = fetch_all(c)
    c.close()
    conn.close()
    return jsonify(rows)

# ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
def _check_low_stock(conn, name, qty, min_qty):
    """Gera notificação de estoque baixo para usuários com perfil de gestão."""
    if qty <= min_qty:
        c = conn.cursor()
        c.execute("""INSERT INTO notifications (user_id,title,message,type)
                     SELECT id,
                            '⚠️ Estoque Baixo',
                            'O produto ' || %s || ' está abaixo do mínimo (' || %s || ' kg restantes)',
                            'warning'
                     FROM users WHERE role IN ('Administrador','Gerente','Supervisor','Estoquista')""",
                  (name, qty))
        conn.commit()
        c.close()

@app.route('/api/notifications', methods=['GET'])
@login_required
def get_notifications():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT * FROM notifications WHERE user_id=%s ORDER BY created_at DESC LIMIT 20",
              (session['user_id'],))
    rows = fetch_all(c)
    c.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/notifications/read-all', methods=['POST'])
@login_required
def read_all_notifs():
    conn = get_db()
    c = conn.cursor()
    c.execute("UPDATE notifications SET read=1 WHERE user_id=%s", (session['user_id'],))
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})

# ─── POSTS / FEED ─────────────────────────────────────────────────────────────
@app.route('/api/posts', methods=['GET'])
@login_required
def get_posts():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("""SELECT p.*,u.full_name,u.role,u.avatar,
        (SELECT COUNT(*) FROM post_likes WHERE post_id=p.id) as like_count,
        (SELECT COUNT(*) FROM post_likes WHERE post_id=p.id AND user_id=%s) as user_liked,
        (SELECT COUNT(*) FROM comments WHERE post_id=p.id) as comment_count
        FROM posts p JOIN users u ON p.user_id=u.id ORDER BY p.created_at DESC""",
              (session['user_id'],))
    rows = fetch_all(c)
    c.close()
    conn.close()
    return jsonify(rows)

@app.route('/api/posts', methods=['POST'])
@login_required
def create_post():
    d = request.json or {}
    content = (d.get('content') or '').strip()
    image = (d.get('image') or '').strip()
    if not content and not image:
        return jsonify({'error': 'Publicação não pode estar vazia'}), 400
    conn = get_db()
    c = conn.cursor()
    c.execute("INSERT INTO posts (user_id,content,image,post_type) VALUES (%s,%s,%s,%s)",
              (session['user_id'], content, image, d.get('post_type', 'post')))
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/posts/<int:pid>/like', methods=['POST'])
@login_required
def toggle_like(pid):
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT id FROM post_likes WHERE post_id=%s AND user_id=%s",
              (pid, session['user_id']))
    existing = c.fetchone()
    if existing:
        c.execute("DELETE FROM post_likes WHERE post_id=%s AND user_id=%s",
                  (pid, session['user_id']))
        liked = False
    else:
        c.execute("INSERT INTO post_likes (post_id,user_id) VALUES (%s,%s)",
                  (pid, session['user_id']))
        liked = True
    conn.commit()
    c.execute("SELECT COUNT(*) AS n FROM post_likes WHERE post_id=%s", (pid,))
    count = c.fetchone()['n']
    c.close()
    conn.close()
    return jsonify({'liked': liked, 'count': count})

@app.route('/api/posts/<int:pid>/comments', methods=['GET', 'POST'])
@login_required
def post_comments(pid):
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    if request.method == 'GET':
        c.execute("""SELECT c.*,u.full_name,u.avatar FROM comments c
                     JOIN users u ON c.user_id=u.id WHERE c.post_id=%s ORDER BY c.created_at""",
                  (pid,))
        rows = fetch_all(c)
        c.close()
        conn.close()
        return jsonify(rows)
    d = request.json
    c.execute("INSERT INTO comments (post_id,user_id,content) VALUES (%s,%s,%s)",
              (pid, session['user_id'], d['content']))
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})


@app.route('/api/comments/<int:cid>', methods=['DELETE'])
@login_required
def delete_comment(cid):
    """Exclui um comentário. O autor pode excluir o próprio; admin/gerente podem excluir qualquer um."""
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT * FROM comments WHERE id=%s", (cid,))
    comment = fetch_one(c)
    if not comment:
        c.close()
        conn.close()
        return jsonify({'error': 'Comentário não encontrado'}), 404

    is_owner = comment['user_id'] == session['user_id']
    is_moderator = session.get('role') in ('Administrador', 'Gerente', 'Supervisor')
    if not is_owner and not is_moderator:
        c.close()
        conn.close()
        return jsonify({'error': 'Sem permissão para excluir este comentário'}), 403

    c.execute("DELETE FROM comments WHERE id=%s", (cid,))
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})

# ─── STATS / REPORTS ─────────────────────────────────────────────────────────
@app.route('/api/stats/dashboard')
@login_required
def dashboard_stats():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    c.execute("SELECT COUNT(*) AS n FROM products")
    total = c.fetchone()['n']

    c.execute("SELECT COUNT(*) AS n FROM products WHERE quantity<=min_quantity")
    low = c.fetchone()['n']

    c.execute("SELECT COALESCE(SUM(quantity),0) AS s FROM products")
    total_kg = c.fetchone()['s']

    # No PostgreSQL usamos CURRENT_DATE em vez de date('now')
    c.execute("SELECT COUNT(*) AS n FROM movements WHERE created_at::date = CURRENT_DATE")
    movements_today = c.fetchone()['n']

    c.execute("SELECT COUNT(*) AS n FROM notifications WHERE user_id=%s AND read=0",
              (session['user_id'],))
    notifs_unread = c.fetchone()['n']

    c.execute("""SELECT COUNT(*) AS n FROM products p
                 WHERE NOT EXISTS (SELECT 1 FROM movements m WHERE m.product_id=p.id)""")
    no_movement = c.fetchone()['n']

    c.execute("SELECT COUNT(*) AS n FROM products WHERE quantity<=0")
    critical = c.fetchone()['n']

    c.execute("""SELECT category, SUM(quantity) as total
                 FROM products GROUP BY category ORDER BY total DESC""")
    cats = fetch_all(c)

    c.execute("""SELECT m.type,m.quantity,m.created_at,p.name
                 FROM movements m JOIN products p ON m.product_id=p.id
                 ORDER BY m.created_at DESC LIMIT 10""")
    recent = fetch_all(c)

    c.close()
    conn.close()
    return jsonify({
        'total_products': total,
        'low_stock': low,
        'total_kg': round(float(total_kg), 2),
        'movements_today': movements_today,
        'no_movement_products': no_movement,
        'critical_alerts': critical,
        'unread_notifications': notifs_unread,
        'categories': cats,
        'recent_movements': recent
    })


def _period_range(period, dfrom=None, dto=None):
    """Retorna (start, end, prev_start, prev_end) como objetos date para o período informado."""
    today = datetime.now().date()
    if period == 'hoje':
        start = end = today
    elif period == 'semana':
        start = today - timedelta(days=today.weekday())
        end = today
    elif period == '7dias':
        start = today - timedelta(days=6)
        end = today
    elif period == 'mes':
        start = today.replace(day=1)
        end = today
    elif period == '30dias':
        start = today - timedelta(days=29)
        end = today
    elif period == 'trimestre':
        q = (today.month - 1) // 3
        start = today.replace(month=q * 3 + 1, day=1)
        end = today
    elif period == 'semestre':
        start_month = 1 if today.month <= 6 else 7
        start = today.replace(month=start_month, day=1)
        end = today
    elif period == 'ano':
        start = today.replace(month=1, day=1)
        end = today
    elif period == 'personalizado' and dfrom and dto:
        start = datetime.strptime(dfrom, '%Y-%m-%d').date()
        end = datetime.strptime(dto, '%Y-%m-%d').date()
    else:
        start = today - timedelta(days=6)
        end = today

    span = (end - start).days + 1
    prev_end = start - timedelta(days=1)
    prev_start = prev_end - timedelta(days=span - 1)
    return start, end, prev_start, prev_end


def _movement_totals(conn, start, end):
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("""
        SELECT
          COALESCE(SUM(CASE WHEN type='entrada' THEN quantity ELSE 0 END),0) AS entradas,
          COALESCE(SUM(CASE WHEN type='saida'   THEN quantity ELSE 0 END),0) AS saidas,
          COUNT(*) AS total
        FROM movements
        WHERE created_at::date BETWEEN %s AND %s
    """, (start.isoformat(), end.isoformat()))
    row = fetch_one(c)
    c.close()
    return row


def _pct_change(curr, prev):
    if prev == 0:
        return 100.0 if curr > 0 else 0.0
    return round((curr - prev) / prev * 100, 1)


@app.route('/api/stats/timeseries')
@login_required
def stats_timeseries():
    period = request.args.get('period', '7dias')
    dfrom = request.args.get('from')
    dto = request.args.get('to')
    compare = request.args.get('compare') == '1'

    start, end, prev_start, prev_end = _period_range(period, dfrom, dto)
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    span_days = (end - start).days + 1
    bucket = 'day' if span_days <= 92 else 'month'

    if bucket == 'day':
        # PostgreSQL: created_at::date para extrair a data
        c.execute("""
            SELECT created_at::date AS bucket,
              COALESCE(SUM(CASE WHEN type='entrada' THEN quantity ELSE 0 END),0) AS entradas,
              COALESCE(SUM(CASE WHEN type='saida'   THEN quantity ELSE 0 END),0) AS saidas,
              COUNT(*) AS total
            FROM movements WHERE created_at::date BETWEEN %s AND %s
            GROUP BY created_at::date ORDER BY created_at::date
        """, (start.isoformat(), end.isoformat()))
        rows = fetch_all(c)
        # Normaliza a chave bucket para string ISO
        by_bucket = {str(r['bucket']): r for r in rows}
        labels, series_in, series_out = [], [], []
        d = start
        while d <= end:
            key = d.isoformat()
            r = by_bucket.get(key, {'entradas': 0, 'saidas': 0, 'total': 0})
            labels.append(d.strftime('%d/%m'))
            series_in.append(float(r['entradas']))
            series_out.append(float(r['saidas']))
            d += timedelta(days=1)
    else:
        # PostgreSQL: TO_CHAR para formatar como 'YYYY-MM'
        c.execute("""
            SELECT TO_CHAR(created_at, 'YYYY-MM') AS bucket,
              COALESCE(SUM(CASE WHEN type='entrada' THEN quantity ELSE 0 END),0) AS entradas,
              COALESCE(SUM(CASE WHEN type='saida'   THEN quantity ELSE 0 END),0) AS saidas,
              COUNT(*) AS total
            FROM movements WHERE created_at::date BETWEEN %s AND %s
            GROUP BY TO_CHAR(created_at, 'YYYY-MM') ORDER BY bucket
        """, (start.isoformat(), end.isoformat()))
        rows = fetch_all(c)
        by_bucket = {r['bucket']: r for r in rows}
        labels, series_in, series_out = [], [], []
        months_pt = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        d = start.replace(day=1)
        while d <= end:
            key = d.strftime('%Y-%m')
            r = by_bucket.get(key, {'entradas': 0, 'saidas': 0, 'total': 0})
            labels.append(f"{months_pt[d.month]}/{str(d.year)[2:]}")
            series_in.append(float(r['entradas']))
            series_out.append(float(r['saidas']))
            if d.month == 12:
                d = d.replace(year=d.year + 1, month=1)
            else:
                d = d.replace(month=d.month + 1)

    # Top produtos por volume de movimentação no período
    c.execute("""
        SELECT p.name, SUM(m.quantity) AS total
        FROM movements m JOIN products p ON m.product_id=p.id
        WHERE m.created_at::date BETWEEN %s AND %s
        GROUP BY p.id, p.name ORDER BY total DESC LIMIT 8
    """, (start.isoformat(), end.isoformat()))
    top = fetch_all(c)
    c.close()

    current = _movement_totals(conn, start, end)
    result = {
        'period': period,
        'start': start.isoformat(), 'end': end.isoformat(),
        'bucket': bucket,
        'labels': labels,
        'entradas_series': series_in,
        'saidas_series': series_out,
        'current': current,
        'top_products': top,
    }

    if compare:
        previous = _movement_totals(conn, prev_start, prev_end)
        result['previous'] = previous
        result['prev_start'] = prev_start.isoformat()
        result['prev_end'] = prev_end.isoformat()
        result['change'] = {
            'entradas': _pct_change(float(current['entradas']), float(previous['entradas'])),
            'saidas':   _pct_change(float(current['saidas']),   float(previous['saidas'])),
            'total':    _pct_change(float(current['total']),     float(previous['total'])),
        }

    conn.close()
    return jsonify(result)


@app.route('/api/chart-edits', methods=['POST'])
@login_required
def chart_edit():
    """Aplica uma edição na quantidade de um produto vinda do gráfico do dashboard
    e registra quem/quando fez a alteração para auditoria."""
    d = request.json or {}
    if not d.get('product_id') or d.get('new_value') is None:
        return jsonify({'error': 'product_id e new_value são obrigatórios'}), 400
    try:
        new_value = float(d['new_value'])
    except (ValueError, TypeError):
        return jsonify({'error': 'Valor inválido'}), 400
    if new_value < 0:
        return jsonify({'error': 'Quantidade não pode ser negativa'}), 400
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        c.execute("SELECT * FROM products WHERE id=%s", (d['product_id'],))
        prod = fetch_one(c)
        if not prod:
            c.close()
            conn.close()
            return jsonify({'error': 'Produto não encontrado'}), 404
        c.execute("UPDATE products SET quantity=%s WHERE id=%s", (new_value, d['product_id']))
        c.execute("""INSERT INTO chart_edits (chart,product_id,product_name,old_value,new_value,user_id)
                     VALUES (%s,%s,%s,%s,%s,%s)""",
                  (d.get('chart', ''), d['product_id'], prod['name'], prod['quantity'], new_value, session['user_id']))
        conn.commit()
        _check_low_stock(conn, prod['name'], new_value, prod['min_quantity'])
        c.close()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        conn.rollback()
        c.close()
        conn.close()
        return jsonify({'error': str(e)}), 500


@app.route('/api/chart-edits', methods=['GET'])
@login_required
def chart_edits_log():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("""SELECT ce.*, u.full_name AS user_name
                 FROM chart_edits ce JOIN users u ON ce.user_id=u.id
                 ORDER BY ce.created_at DESC LIMIT 50""")
    rows = fetch_all(c)
    c.close()
    conn.close()
    return jsonify(rows)


# ─── KANBAN ───────────────────────────────────────────────────────────────────
KANBAN_STATUSES = {'todo', 'doing', 'review', 'done'}

@app.route('/api/kanban/tasks', methods=['GET'])
@login_required
def kanban_list():
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT * FROM kanban_tasks ORDER BY status, position, id")
    rows = fetch_all(c)
    c.close()
    conn.close()
    return jsonify(rows)


@app.route('/api/kanban/tasks', methods=['POST'])
@login_required
def kanban_create():
    d = request.json
    status = d.get('status', 'todo')
    if status not in KANBAN_STATUSES:
        status = 'todo'
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT COALESCE(MAX(position),-1) AS mp FROM kanban_tasks WHERE status=%s", (status,))
    max_pos = c.fetchone()['mp']
    c.execute("""INSERT INTO kanban_tasks (title,description,status,priority,assignee,due_date,labels,position,created_by)
                 VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id""",
              (d['title'], d.get('description', ''), status, d.get('priority', 'media'),
               d.get('assignee', ''), d.get('due_date'), d.get('labels', ''), max_pos + 1, session['user_id']))
    task_id = c.fetchone()['id']
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True, 'id': task_id})


@app.route('/api/kanban/tasks/<int:task_id>', methods=['PUT'])
@login_required
def kanban_update(task_id):
    d = request.json
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("SELECT * FROM kanban_tasks WHERE id=%s", (task_id,))
    task = fetch_one(c)
    if not task:
        c.close()
        conn.close()
        return jsonify({'error': 'Tarefa não encontrada'}), 404

    fields = {}
    for key in ('title', 'description', 'priority', 'assignee', 'due_date', 'labels'):
        if key in d:
            fields[key] = d[key]
    if 'status' in d:
        status = d['status']
        if status not in KANBAN_STATUSES:
            c.close()
            conn.close()
            return jsonify({'error': 'Status inválido'}), 400
        fields['status'] = status
        if 'position' not in d:
            c.execute("SELECT COALESCE(MAX(position),-1) AS mp FROM kanban_tasks WHERE status=%s AND id!=%s",
                      (status, task_id))
            max_pos = c.fetchone()['mp']
            fields['position'] = max_pos + 1
    if 'position' in d:
        fields['position'] = d['position']

    if fields:
        fields['updated_at'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # PostgreSQL usa %s em vez de ? nos placeholders
        set_clause = ", ".join(f"{k}=%s" for k in fields)
        c.execute(f"UPDATE kanban_tasks SET {set_clause} WHERE id=%s",
                  (*fields.values(), task_id))
        conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})


@app.route('/api/kanban/tasks/<int:task_id>', methods=['DELETE'])
@login_required
def kanban_delete(task_id):
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM kanban_tasks WHERE id=%s", (task_id,))
    conn.commit()
    c.close()
    conn.close()
    return jsonify({'success': True})


@app.route('/api/stats/category-distribution')
@login_required
def stats_category_distribution():
    period = request.args.get('period', 'mes')
    dfrom = request.args.get('from')
    dto = request.args.get('to')
    start, end, _, _ = _period_range(period, dfrom, dto)
    conn = get_db()
    c = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    c.execute("""SELECT category, SUM(quantity) AS total
                 FROM products GROUP BY category ORDER BY total DESC""")
    stock = fetch_all(c)
    c.execute("""
        SELECT p.category AS category, SUM(m.quantity) AS total
        FROM movements m JOIN products p ON m.product_id=p.id
        WHERE m.created_at::date BETWEEN %s AND %s
        GROUP BY p.category ORDER BY total DESC
    """, (start.isoformat(), end.isoformat()))
    moved = fetch_all(c)
    c.close()
    conn.close()
    return jsonify({
        'start': start.isoformat(), 'end': end.isoformat(),
        'stock': stock,
        'movement': moved
    })


@app.route('/api/reports/export')
@login_required
def export_csv():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT name,sku,category,quantity,min_quantity,location,created_at FROM products")
    rows = c.fetchall()
    c.close()
    conn.close()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['Nome', 'SKU', 'Categoria', 'Quantidade (kg)', 'Mínimo (kg)', 'Localização', 'Cadastrado em'])
    for r in rows:
        writer.writerow(list(r))
    output.seek(0)
    return send_file(io.BytesIO(output.getvalue().encode('utf-8-sig')),
                     mimetype='text/csv',
                     as_attachment=True,
                     download_name='estoque_start.csv')


if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)

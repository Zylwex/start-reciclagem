from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_file
import sqlite3, hashlib, os, json, csv, io
from datetime import datetime, timedelta
from functools import wraps

app = Flask(__name__)
app.secret_key = 'start_reciclagem_secret_2024'
DB_PATH = 'database/start.db'
TERMS_VERSION = '1.0'

# ─── DB HELPERS ──────────────────────────────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
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
    os.makedirs('database', exist_ok=True)
    conn = get_db()
    c = conn.cursor()

    c.executescript('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        full_name TEXT,
        age INTEGER,
        role TEXT DEFAULT 'Funcionário',
        sector TEXT,
        avatar TEXT,
        accepted_terms INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        sku TEXT UNIQUE NOT NULL,
        category TEXT,
        quantity REAL DEFAULT 0,
        min_quantity REAL DEFAULT 0,
        location TEXT,
        observations TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        created_by INTEGER
    );

    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_by INTEGER,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS movements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        type TEXT,
        quantity REAL,
        reason TEXT,
        user_id INTEGER,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY(product_id) REFERENCES products(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content TEXT,
        image TEXT,
        post_type TEXT DEFAULT 'post',
        likes INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        user_id INTEGER,
        content TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY(post_id) REFERENCES posts(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS post_likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        user_id INTEGER,
        UNIQUE(post_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        message TEXT,
        type TEXT DEFAULT 'info',
        read INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS terms_acceptance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        version TEXT DEFAULT '1.0',
        accepted_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS chart_edits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chart TEXT,
        product_id INTEGER,
        product_name TEXT,
        old_value REAL,
        new_value REAL,
        user_id INTEGER,
        created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS kanban_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'todo',
        priority TEXT DEFAULT 'media',
        assignee TEXT,
        due_date TEXT,
        labels TEXT DEFAULT '',
        position INTEGER DEFAULT 0,
        created_by INTEGER,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    );
    ''')

    # Backward-compat: add 'version' column if upgrading an older db
    try:
        c.execute("ALTER TABLE terms_acceptance ADD COLUMN version TEXT DEFAULT '1.0'")
    except sqlite3.OperationalError:
        pass
    try:
        c.execute("ALTER TABLE posts ADD COLUMN post_type TEXT DEFAULT 'post'")
    except sqlite3.OperationalError:
        pass
    try:
        c.execute("ALTER TABLE kanban_tasks ADD COLUMN due_date TEXT")
    except sqlite3.OperationalError:
        pass
    try:
        c.execute("ALTER TABLE kanban_tasks ADD COLUMN labels TEXT DEFAULT ''")
    except sqlite3.OperationalError:
        pass

    # Seed admin
    c.execute("SELECT id FROM users WHERE username='admin'")
    if not c.fetchone():
        c.execute("""INSERT INTO users (username,email,password,full_name,role,sector,accepted_terms)
                     VALUES ('admin','admin@startreciclagem.com',?,
                     'Administrador','Administrador','TI',1)""",
                  (hash_pw('admin123'),))
        # Seed sample products
        samples = [
            ('Papelão', 'PAP-001', 'Papel', 120.5, 50, 'Galpão A', ''),
            ('Plástico PET', 'PET-001', 'Plástico', 80.0, 30, 'Galpão B', ''),
            ('Alumínio', 'ALU-001', 'Metal', 45.2, 20, 'Galpão C', ''),
            ('Vidro', 'VID-001', 'Vidro', 200.0, 100, 'Galpão A', ''),
            ('Madeira', 'MAD-001', 'Madeira', 300.0, 80, 'Galpão D', ''),
            ('Borracha', 'BOR-001', 'Borracha', 15.0, 25, 'Galpão B', 'ESTOQUE BAIXO'),
        ]
        c.executemany("""INSERT INTO products (name,sku,category,quantity,min_quantity,location,observations,created_by)
                         VALUES (?,?,?,?,?,?,?,1)""", samples)

    conn.commit()

    # Seed default categories (idempotent, independent of admin seed)
    default_categories = ['Papel', 'Plástico', 'Metal', 'Vidro', 'Madeira', 'Borracha', 'Eletrônico']
    for cat in default_categories:
        try:
            c.execute("INSERT INTO categories (name) VALUES (?)", (cat,))
        except sqlite3.IntegrityError:
            pass

    conn.commit()
    conn.close()

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
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE (username=? OR email=?) AND password=?",
                        (d['username'], d['username'], hash_pw(d['password']))).fetchone()
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
    return jsonify({'success': True, 'user': dict(user)})

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    d = request.json
    if not d.get('accept_terms'):
        return jsonify({'error': 'É necessário aceitar os Termos de Uso e a Política de Privacidade'}), 400
    try:
        conn = get_db()
        cur = conn.execute(
            "INSERT INTO users (username,email,password,full_name,role,sector,accepted_terms) VALUES (?,?,?,?,?,?,1)",
            (d['username'], d['email'], hash_pw(d['password']),
             d.get('full_name',''), d.get('role','Funcionário'), d.get('sector','')))
        user_id = cur.lastrowid
        conn.execute("INSERT INTO terms_acceptance (user_id, version) VALUES (?,?)", (user_id, TERMS_VERSION))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Usuário ou email já cadastrado'}), 400

@app.route('/api/auth/accept-terms', methods=['POST'])
def accept_terms():
    d = request.json
    conn = get_db()
    conn.execute("UPDATE users SET accepted_terms=1 WHERE id=?", (d['user_id'],))
    conn.execute("INSERT INTO terms_acceptance (user_id, version) VALUES (?,?)", (d['user_id'], TERMS_VERSION))
    conn.commit()
    user = conn.execute("SELECT * FROM users WHERE id=?", (d['user_id'],)).fetchone()
    conn.close()
    session['user_id'] = user['id']
    session['username'] = user['username']
    session['role'] = user['role']
    return jsonify({'success': True})

@app.route('/api/auth/logout', methods=['POST'])
def api_logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/auth/me')
@login_required
def api_me():
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE id=?", (session['user_id'],)).fetchone()
    conn.close()
    return jsonify(dict(user))

@app.route('/api/auth/update-profile', methods=['POST'])
@login_required
def update_profile():
    d = request.json
    conn = get_db()
    conn.execute("""UPDATE users SET full_name=?,age=?,role=?,sector=?,avatar=? WHERE id=?""",
                 (d.get('full_name'), d.get('age'), d.get('role'),
                  d.get('sector'), d.get('avatar'), session['user_id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ─── PRODUCTS ────────────────────────────────────────────────────────────────
@app.route('/api/products', methods=['GET'])
@login_required
def get_products():
    conn = get_db()
    q = request.args.get('q', '')
    cat = request.args.get('category', '')
    status = request.args.get('status', '')
    sql = "SELECT * FROM products WHERE 1=1"
    params = []
    if q:
        sql += " AND (name LIKE ? OR sku LIKE ?)"
        params += [f'%{q}%', f'%{q}%']
    if cat:
        sql += " AND category=?"
        params.append(cat)
    if status == 'low':
        sql += " AND quantity <= min_quantity"
    sql += " ORDER BY name"
    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/products', methods=['POST'])
@login_required
def create_product():
    d = request.json
    conn = get_db()
    try:
        conn.execute("""INSERT INTO products (name,sku,category,quantity,min_quantity,location,observations,created_by)
                        VALUES (?,?,?,?,?,?,?,?)""",
                     (d['name'], d['sku'], d.get('category',''), float(d.get('quantity',0)),
                      float(d.get('min_quantity',0)), d.get('location',''), d.get('observations',''),
                      session['user_id']))
        conn.commit()
        _check_low_stock(conn, d['name'], float(d.get('quantity',0)), float(d.get('min_quantity',0)))
        conn.close()
        return jsonify({'success': True})
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({'error': 'SKU já cadastrado'}), 400

@app.route('/api/products/<int:pid>', methods=['PUT'])
@login_required
def update_product(pid):
    d = request.json
    conn = get_db()
    conn.execute("""UPDATE products SET name=?,sku=?,category=?,quantity=?,min_quantity=?,
                    location=?,observations=? WHERE id=?""",
                 (d['name'],d['sku'],d.get('category',''),float(d.get('quantity',0)),
                  float(d.get('min_quantity',0)),d.get('location',''),d.get('observations',''),pid))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/products/<int:pid>', methods=['DELETE'])
@login_required
def delete_product(pid):
    conn = get_db()
    conn.execute("DELETE FROM products WHERE id=?", (pid,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/categories', methods=['GET'])
@login_required
def list_categories():
    conn = get_db()
    rows = conn.execute("SELECT name FROM categories ORDER BY name").fetchall()
    # Also include any category already in use on a product but not yet in
    # the categories table (defensive, for older/imported data).
    used = conn.execute("""SELECT DISTINCT category FROM products
                            WHERE category IS NOT NULL AND category != ''""").fetchall()
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
    try:
        conn.execute("INSERT INTO categories (name, created_by) VALUES (?,?)", (name, session['user_id']))
        conn.commit()
    except sqlite3.IntegrityError:
        pass  # category already exists — treat as success (idempotent)
    conn.close()
    return jsonify({'success': True, 'name': name})


@app.route('/api/products/generate-sku', methods=['POST'])
@login_required
def gen_sku():
    d = request.json
    cat = (d.get('category') or 'PRD')[:3].upper()
    conn = get_db()
    count = conn.execute("SELECT COUNT(*) FROM products WHERE category=?", (d.get('category',''),)).fetchone()[0]
    conn.close()
    sku = f"{cat}-{str(count+1).zfill(3)}"
    return jsonify({'sku': sku})

# ─── MOVEMENTS ───────────────────────────────────────────────────────────────
@app.route('/api/movements', methods=['POST'])
@login_required
def add_movement():
    d = request.json
    conn = get_db()
    prod = conn.execute("SELECT * FROM products WHERE id=?", (d['product_id'],)).fetchone()
    if not prod:
        return jsonify({'error': 'Produto não encontrado'}), 404
    qty = float(d['quantity'])
    if d['type'] == 'saida' and prod['quantity'] < qty:
        return jsonify({'error': 'Quantidade insuficiente em estoque'}), 400
    new_qty = prod['quantity'] + qty if d['type'] == 'entrada' else prod['quantity'] - qty
    conn.execute("UPDATE products SET quantity=? WHERE id=?", (new_qty, d['product_id']))
    conn.execute("INSERT INTO movements (product_id,type,quantity,reason,user_id) VALUES (?,?,?,?,?)",
                 (d['product_id'], d['type'], qty, d.get('reason',''), session['user_id']))
    conn.commit()
    _check_low_stock(conn, prod['name'], new_qty, prod['min_quantity'])
    conn.close()
    return jsonify({'success': True, 'new_quantity': new_qty})

@app.route('/api/movements', methods=['GET'])
@login_required
def get_movements():
    conn = get_db()
    pid = request.args.get('product_id')
    sql = """SELECT m.*,p.name as product_name,p.sku,u.full_name as user_name
             FROM movements m
             JOIN products p ON m.product_id=p.id
             JOIN users u ON m.user_id=u.id
             WHERE 1=1"""
    params = []
    if pid:
        sql += " AND m.product_id=?"
        params.append(pid)
    sql += " ORDER BY m.created_at DESC LIMIT 100"
    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

# ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
def _check_low_stock(conn, name, qty, min_qty):
    if qty <= min_qty:
        conn.execute("""INSERT INTO notifications (user_id,title,message,type)
                        SELECT id,'⚠️ Estoque Baixo',
                        'O produto ' || ? || ' está abaixo do mínimo (' || ? || ' kg restantes)','warning'
                        FROM users WHERE role IN ('Administrador','Gerente','Supervisor','Estoquista')""",
                     (name, qty))
        conn.commit()

@app.route('/api/notifications', methods=['GET'])
@login_required
def get_notifications():
    conn = get_db()
    rows = conn.execute("SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC LIMIT 20",
                        (session['user_id'],)).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/notifications/read-all', methods=['POST'])
@login_required
def read_all_notifs():
    conn = get_db()
    conn.execute("UPDATE notifications SET read=1 WHERE user_id=?", (session['user_id'],))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ─── POSTS / FEED ─────────────────────────────────────────────────────────────
@app.route('/api/posts', methods=['GET'])
@login_required
def get_posts():
    conn = get_db()
    rows = conn.execute("""SELECT p.*,u.full_name,u.role,u.avatar,
        (SELECT COUNT(*) FROM post_likes WHERE post_id=p.id) as like_count,
        (SELECT COUNT(*) FROM post_likes WHERE post_id=p.id AND user_id=?) as user_liked,
        (SELECT COUNT(*) FROM comments WHERE post_id=p.id) as comment_count
        FROM posts p JOIN users u ON p.user_id=u.id ORDER BY p.created_at DESC""",
                        (session['user_id'],)).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.route('/api/posts', methods=['POST'])
@login_required
def create_post():
    d = request.json
    conn = get_db()
    conn.execute("INSERT INTO posts (user_id,content,image,post_type) VALUES (?,?,?,?)",
                 (session['user_id'], d['content'], d.get('image',''), d.get('post_type','post')))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/posts/<int:pid>/like', methods=['POST'])
@login_required
def toggle_like(pid):
    conn = get_db()
    existing = conn.execute("SELECT id FROM post_likes WHERE post_id=? AND user_id=?",
                             (pid, session['user_id'])).fetchone()
    if existing:
        conn.execute("DELETE FROM post_likes WHERE post_id=? AND user_id=?", (pid, session['user_id']))
        liked = False
    else:
        conn.execute("INSERT INTO post_likes (post_id,user_id) VALUES (?,?)", (pid, session['user_id']))
        liked = True
    conn.commit()
    count = conn.execute("SELECT COUNT(*) FROM post_likes WHERE post_id=?", (pid,)).fetchone()[0]
    conn.close()
    return jsonify({'liked': liked, 'count': count})

@app.route('/api/posts/<int:pid>/comments', methods=['GET','POST'])
@login_required
def post_comments(pid):
    conn = get_db()
    if request.method == 'GET':
        rows = conn.execute("""SELECT c.*,u.full_name,u.avatar FROM comments c
                               JOIN users u ON c.user_id=u.id WHERE c.post_id=? ORDER BY c.created_at""",
                            (pid,)).fetchall()
        conn.close()
        return jsonify([dict(r) for r in rows])
    d = request.json
    conn.execute("INSERT INTO comments (post_id,user_id,content) VALUES (?,?,?)",
                 (pid, session['user_id'], d['content']))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ─── STATS / REPORTS ─────────────────────────────────────────────────────────
@app.route('/api/stats/dashboard')
@login_required
def dashboard_stats():
    conn = get_db()
    total = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    low = conn.execute("SELECT COUNT(*) FROM products WHERE quantity<=min_quantity").fetchone()[0]
    total_kg = conn.execute("SELECT COALESCE(SUM(quantity),0) FROM products").fetchone()[0]
    movements_today = conn.execute(
        "SELECT COUNT(*) FROM movements WHERE date(created_at)=date('now')").fetchone()[0]
    notifs_unread = conn.execute(
        "SELECT COUNT(*) FROM notifications WHERE user_id=? AND read=0",
        (session['user_id'],)).fetchone()[0]
    # Products with zero movements ever registered
    no_movement = conn.execute("""
        SELECT COUNT(*) FROM products p
        WHERE NOT EXISTS (SELECT 1 FROM movements m WHERE m.product_id=p.id)
    """).fetchone()[0]
    # Critical alerts: zeroed-out stock items
    critical = conn.execute("SELECT COUNT(*) FROM products WHERE quantity<=0").fetchone()[0]
    # Category distribution
    cats = conn.execute("""SELECT category, SUM(quantity) as total
                           FROM products GROUP BY category ORDER BY total DESC""").fetchall()
    # Recent movements
    recent = conn.execute("""SELECT m.type,m.quantity,m.created_at,p.name
                             FROM movements m JOIN products p ON m.product_id=p.id
                             ORDER BY m.created_at DESC LIMIT 10""").fetchall()
    conn.close()
    return jsonify({
        'total_products': total,
        'low_stock': low,
        'total_kg': round(total_kg, 2),
        'movements_today': movements_today,
        'no_movement_products': no_movement,
        'critical_alerts': critical,
        'unread_notifications': notifs_unread,
        'categories': [dict(r) for r in cats],
        'recent_movements': [dict(r) for r in recent]
    })

def _period_range(period, dfrom=None, dto=None):
    """Returns (start, end, prev_start, prev_end) as date objects for the given period."""
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
        start = today.replace(month=q*3+1, day=1)
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
    prev_start = prev_end - timedelta(days=span-1)
    return start, end, prev_start, prev_end


def _movement_totals(conn, start, end):
    row = conn.execute("""
        SELECT
          COALESCE(SUM(CASE WHEN type='entrada' THEN quantity ELSE 0 END),0) AS entradas,
          COALESCE(SUM(CASE WHEN type='saida' THEN quantity ELSE 0 END),0) AS saidas,
          COUNT(*) AS total
        FROM movements
        WHERE date(created_at) BETWEEN ? AND ?
    """, (start.isoformat(), end.isoformat())).fetchone()
    return dict(row)


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

    span_days = (end - start).days + 1
    # Bucket by day if short range, by month if long range
    bucket = 'day' if span_days <= 92 else 'month'

    if bucket == 'day':
        fmt = '%Y-%m-%d'
        rows = conn.execute("""
            SELECT date(created_at) AS bucket,
              COALESCE(SUM(CASE WHEN type='entrada' THEN quantity ELSE 0 END),0) AS entradas,
              COALESCE(SUM(CASE WHEN type='saida' THEN quantity ELSE 0 END),0) AS saidas,
              COUNT(*) AS total
            FROM movements WHERE date(created_at) BETWEEN ? AND ?
            GROUP BY bucket ORDER BY bucket
        """, (start.isoformat(), end.isoformat())).fetchall()
        by_bucket = {r['bucket']: dict(r) for r in rows}
        labels, series_in, series_out = [], [], []
        d = start
        while d <= end:
            key = d.isoformat()
            r = by_bucket.get(key, {'entradas':0,'saidas':0,'total':0})
            labels.append(d.strftime('%d/%m'))
            series_in.append(r['entradas'])
            series_out.append(r['saidas'])
            d += timedelta(days=1)
    else:
        rows = conn.execute("""
            SELECT strftime('%Y-%m', created_at) AS bucket,
              COALESCE(SUM(CASE WHEN type='entrada' THEN quantity ELSE 0 END),0) AS entradas,
              COALESCE(SUM(CASE WHEN type='saida' THEN quantity ELSE 0 END),0) AS saidas,
              COUNT(*) AS total
            FROM movements WHERE date(created_at) BETWEEN ? AND ?
            GROUP BY bucket ORDER BY bucket
        """, (start.isoformat(), end.isoformat())).fetchall()
        by_bucket = {r['bucket']: dict(r) for r in rows}
        labels, series_in, series_out = [], [], []
        months_pt = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
        d = start.replace(day=1)
        while d <= end:
            key = d.strftime('%Y-%m')
            r = by_bucket.get(key, {'entradas':0,'saidas':0,'total':0})
            labels.append(f"{months_pt[d.month]}/{str(d.year)[2:]}")
            series_in.append(r['entradas'])
            series_out.append(r['saidas'])
            if d.month == 12:
                d = d.replace(year=d.year+1, month=1)
            else:
                d = d.replace(month=d.month+1)

    # Top products by movement volume in period
    top = conn.execute("""
        SELECT p.name, SUM(m.quantity) AS total
        FROM movements m JOIN products p ON m.product_id=p.id
        WHERE date(m.created_at) BETWEEN ? AND ?
        GROUP BY p.id ORDER BY total DESC LIMIT 8
    """, (start.isoformat(), end.isoformat())).fetchall()

    current = _movement_totals(conn, start, end)
    result = {
        'period': period,
        'start': start.isoformat(), 'end': end.isoformat(),
        'bucket': bucket,
        'labels': labels,
        'entradas_series': series_in,
        'saidas_series': series_out,
        'current': current,
        'top_products': [dict(r) for r in top],
    }

    if compare:
        previous = _movement_totals(conn, prev_start, prev_end)
        result['previous'] = previous
        result['prev_start'] = prev_start.isoformat()
        result['prev_end'] = prev_end.isoformat()
        result['change'] = {
            'entradas': _pct_change(current['entradas'], previous['entradas']),
            'saidas': _pct_change(current['saidas'], previous['saidas']),
            'total': _pct_change(current['total'], previous['total']),
        }

    conn.close()
    return jsonify(result)


@app.route('/api/chart-edits', methods=['POST'])
@login_required
def chart_edit():
    """Apply an edit to a product's quantity coming from a dashboard chart,
    and register who/when made the change for audit purposes."""
    d = request.json
    conn = get_db()
    prod = conn.execute("SELECT * FROM products WHERE id=?", (d['product_id'],)).fetchone()
    if not prod:
        conn.close()
        return jsonify({'error': 'Produto não encontrado'}), 404
    new_value = float(d['new_value'])
    conn.execute("UPDATE products SET quantity=? WHERE id=?", (new_value, d['product_id']))
    conn.execute("""INSERT INTO chart_edits (chart,product_id,product_name,old_value,new_value,user_id)
                    VALUES (?,?,?,?,?,?)""",
                 (d.get('chart',''), d['product_id'], prod['name'], prod['quantity'], new_value, session['user_id']))
    conn.commit()
    _check_low_stock(conn, prod['name'], new_value, prod['min_quantity'])
    conn.close()
    return jsonify({'success': True})


@app.route('/api/chart-edits', methods=['GET'])
@login_required
def chart_edits_log():
    conn = get_db()
    rows = conn.execute("""SELECT ce.*, u.full_name AS user_name
                            FROM chart_edits ce JOIN users u ON ce.user_id=u.id
                            ORDER BY ce.created_at DESC LIMIT 50""").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


# ─────────────────────────────────────────────────────────
#  KANBAN
# ─────────────────────────────────────────────────────────
KANBAN_STATUSES = {'todo', 'doing', 'review', 'done'}

@app.route('/api/kanban/tasks', methods=['GET'])
@login_required
def kanban_list():
    conn = get_db()
    rows = conn.execute("SELECT * FROM kanban_tasks ORDER BY status, position, id").fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


@app.route('/api/kanban/tasks', methods=['POST'])
@login_required
def kanban_create():
    d = request.json
    status = d.get('status', 'todo')
    if status not in KANBAN_STATUSES:
        status = 'todo'
    conn = get_db()
    max_pos = conn.execute("SELECT COALESCE(MAX(position),-1) FROM kanban_tasks WHERE status=?", (status,)).fetchone()[0]
    cur = conn.execute("""INSERT INTO kanban_tasks (title,description,status,priority,assignee,due_date,labels,position,created_by)
                          VALUES (?,?,?,?,?,?,?,?,?)""",
                       (d['title'], d.get('description',''), status, d.get('priority','media'),
                        d.get('assignee',''), d.get('due_date'), d.get('labels',''), max_pos+1, session['user_id']))
    conn.commit()
    task_id = cur.lastrowid
    conn.close()
    return jsonify({'success': True, 'id': task_id})


@app.route('/api/kanban/tasks/<int:task_id>', methods=['PUT'])
@login_required
def kanban_update(task_id):
    d = request.json
    conn = get_db()
    task = conn.execute("SELECT * FROM kanban_tasks WHERE id=?", (task_id,)).fetchone()
    if not task:
        conn.close()
        return jsonify({'error': 'Tarefa não encontrada'}), 404

    fields = {}
    for key in ('title', 'description', 'priority', 'assignee', 'due_date', 'labels'):
        if key in d:
            fields[key] = d[key]
    if 'status' in d:
        status = d['status']
        if status not in KANBAN_STATUSES:
            return jsonify({'error': 'Status inválido'}), 400
        fields['status'] = status
        if 'position' not in d:
            max_pos = conn.execute("SELECT COALESCE(MAX(position),-1) FROM kanban_tasks WHERE status=? AND id!=?",
                                    (status, task_id)).fetchone()[0]
            fields['position'] = max_pos + 1
    if 'position' in d:
        fields['position'] = d['position']

    if fields:
        fields['updated_at'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        set_clause = ", ".join(f"{k}=?" for k in fields)
        conn.execute(f"UPDATE kanban_tasks SET {set_clause} WHERE id=?", (*fields.values(), task_id))
        conn.commit()
    conn.close()
    return jsonify({'success': True})


@app.route('/api/kanban/tasks/<int:task_id>', methods=['DELETE'])
@login_required
def kanban_delete(task_id):
    conn = get_db()
    conn.execute("DELETE FROM kanban_tasks WHERE id=?", (task_id,))
    conn.commit()
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
    stock = conn.execute("""SELECT category, SUM(quantity) AS total
                             FROM products GROUP BY category ORDER BY total DESC""").fetchall()
    moved = conn.execute("""
        SELECT p.category AS category, SUM(m.quantity) AS total
        FROM movements m JOIN products p ON m.product_id=p.id
        WHERE date(m.created_at) BETWEEN ? AND ?
        GROUP BY p.category ORDER BY total DESC
    """, (start.isoformat(), end.isoformat())).fetchall()
    conn.close()
    return jsonify({
        'start': start.isoformat(), 'end': end.isoformat(),
        'stock': [dict(r) for r in stock],
        'movement': [dict(r) for r in moved]
    })


@app.route('/api/reports/export')
@login_required
def export_csv():
    conn = get_db()
    rows = conn.execute("SELECT name,sku,category,quantity,min_quantity,location,created_at FROM products").fetchall()
    conn.close()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['Nome','SKU','Categoria','Quantidade (kg)','Mínimo (kg)','Localização','Cadastrado em'])
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

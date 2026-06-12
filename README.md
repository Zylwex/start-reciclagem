# START Reciclagem – Sistema de Gestão de Estoque

Sistema web completo para gestão de estoque, comunicação interna e relatórios.

## Stack
- **Backend:** Python + Flask
- **Banco de dados:** SQLite (desenvolvimento) / trocar por PostgreSQL em produção
- **Frontend:** HTML + CSS + JavaScript puro (sem framework)
- **Gráficos:** Chart.js (CDN)
- **QR Code:** qrcodejs (CDN)

## Instalação

```bash
# 1. Clone ou extraia o projeto
cd start_reciclagem

# 2. Crie ambiente virtual
python -m venv venv
source venv/bin/activate       # Linux/Mac
venv\Scripts\activate          # Windows

# 3. Instale dependências
pip install -r requirements.txt

# 4. Execute
python app.py
```

Acesse: http://localhost:5000

## Login padrão
- **Usuário:** admin
- **Senha:** admin123

## Módulos implementados

| Módulo | Funcionalidades |
|--------|----------------|
| **Autenticação** | Login, cadastro, sessão persistente, hash SHA-256, termos de uso |
| **Estoque** | Cadastro de produtos, busca/filtro, alertas de estoque baixo |
| **Movimentações** | Entradas e saídas com histórico, validação de saldo |
| **SKU & Etiquetas** | Gerador automático/manual, QR Code, impressão |
| **Feed Interno** | Publicações, curtidas, comentários, rede social corporativa |
| **Relatórios** | Gráficos pizza/barra, exportação CSV, filtros |
| **Notificações** | Alertas automáticos de estoque baixo |
| **Perfil** | Foto/emoji, cargo, setor, edição de dados |

## Estrutura de pastas

```
start_reciclagem/
├── app.py              # Backend Flask + todas as rotas API
├── requirements.txt
├── database/
│   └── start.db        # Gerado automaticamente
└── templates/
    ├── login.html      # Tela de login/cadastro/termos
    └── app.html        # SPA principal (todos os módulos)
```

## Campos de cada produto
- Nome, SKU, Categoria, Quantidade (kg), Quantidade mínima (kg)
- Localização, Observações, Data de cadastro, Criado por

## API REST disponível

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/auth/login` | POST | Login |
| `/api/auth/register` | POST | Cadastro |
| `/api/auth/logout` | POST | Logout |
| `/api/auth/me` | GET | Usuário atual |
| `/api/products` | GET/POST | Listar/criar produtos |
| `/api/products/:id` | PUT/DELETE | Editar/excluir |
| `/api/products/generate-sku` | POST | Gerar SKU |
| `/api/movements` | GET/POST | Histórico/registrar movimentação |
| `/api/posts` | GET/POST | Feed |
| `/api/posts/:id/like` | POST | Curtir/descurtir |
| `/api/posts/:id/comments` | GET/POST | Comentários |
| `/api/notifications` | GET | Notificações |
| `/api/stats/dashboard` | GET | Estatísticas |
| `/api/reports/export` | GET | Exportar CSV |

## Segurança
- Senhas com hash SHA-256
- Sessão persistente (30 dias)
- Middleware de autenticação em todas as rotas protegidas
- Aceite de termos obrigatório

## Para produção
1. Trocar SQLite por PostgreSQL: `pip install psycopg2-binary` e ajustar `DB_PATH`
2. Usar variável de ambiente para `SECRET_KEY`
3. Adicionar HTTPS (nginx + certbot)
4. Usar gunicorn: `pip install gunicorn && gunicorn app:app`

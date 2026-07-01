/* ═══════════════════════════════════════════════
   STATE & GLOBALS
═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   ÍCONES SVG MINIMALISTAS (estilo Heroicons/Feather)
   Usados em ferramentas de gráfico, toolbars e
   controles repetidos pelo sistema.
═══════════════════════════════════════════════ */
const ICON_SVG = {
  edit:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  settings: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>`,
  expand: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,
  print:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  eye:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a13.16 13.16 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M6.61 6.61C3.55 8.6 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,
  grip:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="1.4"/><circle cx="15" cy="5" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="19" r="1.4"/><circle cx="15" cy="19" r="1.4"/></svg>`,
  resize: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
  home:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  box:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  refresh:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
  tag:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.59 2.59 20 10v2a8 8 0 0 1-8 8H6a2 2 0 0 1-2-2v-6a8 8 0 0 1 8-8h2Z"/><path d="m12.59 2.59 7.41 7.41"/><circle cx="7.5" cy="7.5" r="1"/></svg>`,
  barChart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  chat:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>`,
  kanban:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`,
  bell:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  sun:      `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>`,
  moon:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>`,
  user:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  logout:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  fileText: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  lock:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  plus:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  close:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  download: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  upload:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  palette:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2a10 10 0 1 0 0 20 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5h-.5a2.5 2.5 0 0 1 0-5H17a3 3 0 0 0 3-3 9.94 9.94 0 0 0-8-9.5Z"/></svg>`,
  layout:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  image:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  heart:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  zap:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  trash:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`
};

let currentUser = null, products = [], editingProductId = null;
let chartCat = null, chartTop = null, chartHealth = null;
let chartEvo = null, chartExpand = null;
let importRows = [];
let allCategories = [];
let currentPage = 'dashboard';

/* ═══════════════════════════════════════════════
   ATUALIZAÇÃO AUTOMÁTICA (live refresh)
   Chamado após qualquer operação que altere produtos,
   movimentações, SKU/etiquetas etc. Atualiza os
   indicadores e gráficos do Dashboard sem reload.
═══════════════════════════════════════════════ */
let _liveRefreshTimer = null;
function refreshLiveData(){
  products = []; // invalida cache de produtos
  if(_liveRefreshTimer) clearTimeout(_liveRefreshTimer);
  _liveRefreshTimer = setTimeout(()=>{
    if(currentPage === 'dashboard') loadDashboard();
  }, 150);
}
let chartPie = null, chartBar = null;
// In-memory obs storage (localStorage simulation since Supabase not configured)
const OBS_KEY = 'start_obs_';
const OBS_HIST_KEY = 'start_obs_hist_';

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
async function init() {
  const res = await fetch('/api/auth/me');
  if (res.status === 401) { window.location='/login'; return; }
  currentUser = await res.json();
  updateHeaderUser();
  setDashDate();
  initTheme();
  startClock();
  loadDashboard().catch(err=>{
    console.error('Falha ao carregar o dashboard:', err);
    revealDashboardCards(); // garante que os cards não fiquem presos em opacity:0
  });
  loadNotifications();
  loadCategories();
  setInterval(loadNotifications, 30000);
  // Watchdog: garante que nenhum card de dashboard fique invisível por
  // mais de alguns segundos, mesmo em cenários inesperados.
  setTimeout(revealDashboardCards, 4000);
}

function setDashDate() {
  const now = new Date();
  document.getElementById('dash-date').textContent =
    now.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
}

function updateHeaderUser() {
  const u = currentUser;
  const initial = (u.full_name||u.username||'?')[0].toUpperCase();
  const avatar = u.avatar && !u.avatar.startsWith('http') ? u.avatar : initial;
  document.getElementById('avatar-btn').textContent = avatar;
  document.getElementById('dd-avatar').textContent = avatar;
  document.getElementById('dd-name').textContent = u.full_name || u.username;
  document.getElementById('dd-role').textContent = u.role || '';
  document.getElementById('dd-sector').innerHTML = u.sector ? ICON_SVG.tag+' '+u.sector : '';
  const h = new Date().getHours();
  const greet = h<12?'Bom dia':h<18?'Boa tarde':'Boa noite';
  document.getElementById('dash-greeting').textContent =
    greet+', '+(u.full_name||u.username)+'! 👋';
  document.getElementById('my-avatar-feed').textContent = avatar;
}

/* ═══════════════════════════════════════════════
   THEME (claro/escuro)
═══════════════════════════════════════════════ */
function setThemeToggleIcon(isDark){
  document.getElementById('theme-toggle').innerHTML = isDark ? ICON_SVG.sun : ICON_SVG.moon;
}
function initTheme(){
  const saved = localStorage.getItem('start_theme');
  const isDark = saved==='dark';
  document.body.classList.toggle('dark', isDark);
  setThemeToggleIcon(isDark);
  syncChartTheme();
}
function syncChartTheme(){
  if(typeof Chart === 'undefined') return;
  const textColor = themeColor('--gray-700');
  const gridColor = themeColor('--gray-100');
  Chart.defaults.color = textColor;
  Chart.defaults.borderColor = gridColor;
  Chart.defaults.plugins = Chart.defaults.plugins || {};
  Chart.defaults.plugins.legend = Chart.defaults.plugins.legend || {};
  Chart.defaults.plugins.legend.labels = Chart.defaults.plugins.legend.labels || {};
  Chart.defaults.plugins.legend.labels.color = textColor;
}
function toggleTheme(){
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('start_theme', isDark?'dark':'light');
  setThemeToggleIcon(isDark);
  syncChartTheme();
  refreshAllDashboardCharts();
}

/* ═══════════════════════════════════════════════
   RELÓGIO EM TEMPO REAL
═══════════════════════════════════════════════ */
function startClock(){
  function tick(){
    const now = new Date();
    document.getElementById('hc-time').textContent =
      now.toLocaleTimeString('pt-BR');
    document.getElementById('hc-date').textContent =
      now.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit',year:'numeric'});
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════
   TERMOS / PRIVACIDADE
═══════════════════════════════════════════════ */
const LEGAL_TEXT = {
  terms: `<strong>1. TERMOS DE USO – START RECICLAGEM</strong><br><br>
    Ao utilizar este sistema, você concorda com os termos abaixo:<br><br>
    <strong>1.1 Uso do Sistema</strong><br>
    Este sistema é de uso exclusivo dos colaboradores da START Reciclagem. Acesso não autorizado é proibido e sujeito a sanções disciplinares e legais.<br><br>
    <strong>1.2 Responsabilidades</strong><br>
    Cada usuário é responsável por suas ações no sistema, incluindo registros de entrada e saída de estoque, publicações e alterações de dados.`,
  privacy: `<strong>2. POLÍTICA DE PRIVACIDADE</strong><br><br>
    <strong>2.1 Dados Coletados</strong><br>
    Coletamos: nome, e-mail, cargo, setor e atividades realizadas no sistema.<br><br>
    <strong>2.2 Uso dos Dados</strong><br>
    Os dados são usados exclusivamente para gestão interna, rastreabilidade e auditoria. Não compartilhamos informações com terceiros.<br><br>
    <strong>2.3 Segurança</strong><br>
    Senhas são armazenadas com criptografia SHA-256. Sessões expiram automaticamente.<br><br>
    <strong>2.4 Seus Direitos</strong><br>
    Você pode solicitar a exclusão ou exportação dos seus dados a qualquer momento ao administrador.`
};
function openLegalModal(kind){
  const legalIcon = kind==='terms' ? ICON_SVG.fileText : ICON_SVG.lock;
  document.getElementById('legal-title').innerHTML = legalIcon+' '+(kind==='terms'?'Termos de Uso':'Política de Privacidade');
  document.getElementById('legal-body').innerHTML = LEGAL_TEXT[kind];
  document.getElementById('modal-legal').classList.add('show');
}

/* ═══════════════════════════════════════════════
   IMPRESSÃO & EXPORTAÇÃO (genérico)
═══════════════════════════════════════════════ */
let printState = null; // {title, columns:[{key,label}], rows:[...]}

function openPrintPreview(title, columns, rows){
  printState = {title, columns, rows};
  document.getElementById('pp-orientation').value='portrait';
  renderPrintPreview();
  document.getElementById('modal-print').classList.add('show');
}

function buildPrintHTML(){
  const {title, columns, rows} = printState;
  const now = new Date();
  const user = currentUser?.full_name || currentUser?.username || 'Usuário';
  let head = `<div class="pp-header">
    <div class="pp-brand">♻️ START RECICLAGEM</div>
    <div class="pp-meta">
      Emitido em: ${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}<br>
      Usuário: ${user}
    </div>
  </div>
  <div class="pp-title">${title}</div>`;
  let table = `<div class="pp-body"><table><thead><tr>`;
  columns.forEach(c=>table+=`<th>${c.label}</th>`);
  table+=`</tr></thead><tbody>`;
  rows.forEach(r=>{
    table+='<tr>';
    columns.forEach(c=>table+=`<td>${r[c.key]??''}</td>`);
    table+='</tr>';
  });
  table+=`</tbody></table></div>`;
  return head+table;
}

function renderPrintPreview(){
  document.getElementById('print-preview-frame').innerHTML = buildPrintHTML();
}

function doPrintNow(){
  const orientation = document.getElementById('pp-orientation').value;
  const html = buildPrintHTML();
  const w = window.open('','','width=900,height=700');
  w.document.write(`<html><head><title>${printState.title} – START Reciclagem</title>
    <style>
      @page{size:A4 ${orientation};margin:14mm}
      *{font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box}
      body{color:#1B1B1B}
      .pp-header{display:flex;align-items:center;justify-content:space-between;
        padding:0 0 14px;border-bottom:2px solid #1E3A5F;margin-bottom:14px}
      .pp-brand{font-weight:800;color:#1E3A5F;font-size:18px}
      .pp-meta{font-size:11px;color:#666;text-align:right;line-height:1.5}
      .pp-title{font-size:18px;font-weight:800;margin-bottom:10px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th,td{border:1px solid #ddd;padding:6px 8px;text-align:left}
      th{background:#EEF4FC;color:#1E3A5F}
    </style></head><body>${html}
    <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
  w.document.close();
}

function exportPreviewExcel(){
  const {title, columns, rows} = printState;
  const data = rows.map(r=>{
    const o={};
    columns.forEach(c=>o[c.label]=r[c.key]??'');
    return o;
  });
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, title.substring(0,28));
  XLSX.writeFile(wb, slugify(title)+'.xlsx');
}

function exportPreviewCSV(){
  const {title, columns, rows} = printState;
  const data = rows.map(r=>{
    const o={};
    columns.forEach(c=>o[c.label]=r[c.key]??'');
    return o;
  });
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob(["\uFEFF"+csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = slugify(title)+'.csv';
  a.click();
}

function exportPreviewPDF(){
  const {title, columns, rows} = printState;
  const orientation = document.getElementById('pp-orientation').value==='landscape'?'l':'p';
  const doc = new jspdf.jsPDF({orientation, unit:'pt', format:'a4'});
  const now = new Date();
  doc.setFontSize(14); doc.setTextColor(46,125,50);
  doc.text('♻️ START RECICLAGEM', 40, 36);
  doc.setFontSize(10); doc.setTextColor(100);
  doc.text(`Emitido em: ${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`, 40, 52);
  doc.text(`Usuário: ${currentUser?.full_name||currentUser?.username||''}`, 40, 65);
  doc.setFontSize(13); doc.setTextColor(20);
  doc.text(title, 40, 88);
  doc.autoTable({
    startY: 100,
    head: [columns.map(c=>c.label)],
    body: rows.map(r=>columns.map(c=>String(r[c.key]??''))),
    styles:{fontSize:9},
    headStyles:{fillColor:[232,245,233],textColor:[27,94,32]}
  });
  doc.save(slugify(title)+'.pdf');
}

function slugify(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'')||'documento';
}

/* Atalhos por página */
function printInventory(){
  openPrintPreview('Inventário de Estoque', [
    {key:'name',label:'Nome'},{key:'sku',label:'SKU'},{key:'category',label:'Categoria'},
    {key:'quantity',label:'Qtd (kg)'},{key:'min_quantity',label:'Mín (kg)'},
    {key:'location',label:'Localização'}
  ], products);
}
async function printMovements(){
  const data = await (await fetch('/api/movements')).json();
  openPrintPreview('Movimentações de Estoque', [
    {key:'created_at',label:'Data'},{key:'product_name',label:'Produto'},
    {key:'sku',label:'SKU'},{key:'type',label:'Tipo'},{key:'quantity',label:'Qtd (kg)'},
    {key:'user_name',label:'Usuário'},{key:'reason',label:'Motivo'}
  ], data.map(d=>({...d, type: d.type==='entrada'?'Entrada':'Saída', created_at: formatDate(d.created_at)})));
}
function printDashboardSummary(){
  const rows = [
    {label:'Total de Produtos', value: document.getElementById('s-total').textContent},
    {label:'Itens em Estoque Baixo', value: document.getElementById('s-low').textContent},
    {label:'Total em Estoque (kg)', value: document.getElementById('s-kg').textContent}
  ];
  openPrintPreview('Resumo do Dashboard', [
    {key:'label',label:'Indicador'},{key:'value',label:'Valor'}
  ], rows);
}
function printReport(){ printInventory(); }

/* ═══════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════ */
const PAGE_TITLES = {
  dashboard:'Dashboard', estoque:'Estoque', movimentacoes:'Movimentações',
  sku:'SKU & Etiquetas', feed:'Feed Interno', relatorios:'Relatórios', perfil:'Meu Perfil',
  kanban:'Kanban'
};
function goTo(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>{
    if(n.getAttribute('onclick')?.includes("'"+page+"'")) n.classList.add('active');
  });
  document.getElementById('header-title').textContent = PAGE_TITLES[page]||page;
  if(page==='dashboard') loadDashboard();
  if(page==='estoque'){populateCategoryFilters();loadProducts();}
  if(page==='movimentacoes') loadMovements();
  if(page==='feed'){loadFeed();loadStockAlerts();}
  if(page==='relatorios'){populateCategoryFilters();loadReports();}
  if(page==='perfil') loadProfile();
  if(page==='kanban') loadKanban();
  if(window.innerWidth<=768) document.getElementById('topnav-nav').classList.remove('open');
}

/* ═══════════════════════════════════════════════
   DASHBOARD — PREMIUM BI
═══════════════════════════════════════════════ */
async function loadDashboard() {
  const data = await (await fetch('/api/stats/dashboard')).json();

  try {
    // KPIs
    animateCounter('s-total', data.total_products);
    animateCounter('s-low', data.low_stock);
    document.getElementById('s-kg').textContent = Number(data.total_kg||0).toLocaleString('pt-BR');
    animateCounter('s-mov', data.movements_today);
    animateCounter('s-nomov', data.no_movement_products);
    animateCounter('s-critical', data.critical_alerts);

    // Low stock trend chip
    const trendEl = document.getElementById('kpi-trend-low');
    if(data.low_stock===0){
      trendEl.className='kpi-trend good';trendEl.textContent='✓ Tudo normal';
    } else {
      trendEl.className='kpi-trend warn';
      trendEl.textContent=`⚠ ${data.low_stock} atenção necessária`;
    }

    // Update timestamps
    const ts = 'Atualizado '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
    ['bi-upd-cat','bi-upd-top','bi-upd-health'].forEach(id=>{
      document.getElementById(id).textContent = ts;
    });

    // Chart toolbars (configurar/editar/expandir/imprimir) — set up once before rendering
    setupChartTools();

    // Charts (each with its own period/type/unit state).
    // Cada gráfico é isolado em seu próprio try/catch: se um falhar
    // (ex.: dado inesperado vindo da API), os demais continuam
    // renderizando normalmente em vez de travar o dashboard inteiro.
    const chartJobs = [
      ['cat', () => renderCard('cat')],
      ['top', () => renderCard('top')],
      ['health', () => renderCard('health')],
      ['evo', () => renderCard('evo')],
    ];
    for(const [key, job] of chartJobs){
      try{ await job(); }
      catch(err){ console.error('Falha ao renderizar gráfico "'+key+'":', err); }
    }

    // Recent movements
    try{ buildRecentMov(data.recent_movements); }
    catch(err){ console.error('Falha ao montar movimentações recentes:', err); }

    // Alerts
    try{ buildAlerts(await getProducts()); }
    catch(err){ console.error('Falha ao montar alertas:', err); }

    // Load saved observations
    ['cat','top','health','mov','alerts'].forEach(loadObsDisplay);

    // Apply saved dashboard layout (ordem e widgets ocultos)
    applyDashboardLayout();
  } finally {
    // Revela os cards do dashboard SEMPRE, mesmo que algo acima tenha
    // falhado — evita que os gráficos fiquem presos em opacity:0
    // (problema de "gráficos invisíveis até entrar no modo de edição").
    revealDashboardCards();
  }
}

function revealDashboardCards(){
  document.querySelectorAll('.anim-ready').forEach((el,i)=>{
    el.classList.remove('anim-ready');
    el.style.animationDelay = el.style.getPropertyValue('--delay') || (i*0.06)+'s';
    el.classList.add('anim-go');
  });
}

async function refreshDashboard(){
  showToast('Atualizando…','');
  await loadDashboard();
  showToast('Dashboard atualizado!','success');
}

async function getProducts(){
  if(products.length) return products;
  const data = await (await fetch('/api/products')).json();
  products = data; return data;
}

function animateCounter(id, target){
  const el = document.getElementById(id);
  if(!el) return;
  const start = 0, dur = 600;
  const startTime = performance.now();
  const step = (now)=>{
    const pct = Math.min((now-startTime)/dur,1);
    const eased = 1-Math.pow(1-pct,3);
    el.textContent = Math.round(eased*target).toLocaleString('pt-BR');
    if(pct<1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════════
   GENERIC CHART BUILDER
═══════════════════════════════════════════════ */
const UNIT_FACTORS = {kg:1, g:1000, t:0.001, ml:1, l:1, cm:1, m:1, un:1};
const UNIT_LABELS  = {kg:'kg', g:'g', t:'t', ml:'ml', l:'L', cm:'cm', m:'m', un:'un'};

const CARD_META = {
  cat:    {title:'Distribuição por Categoria', types:['doughnut','pie','bar','line'], default:'doughnut'},
  top:    {title:'Estoque por Produto — Top 8', types:['bar','line','area','pie','doughnut','radar'], default:'bar'},
  health: {title:'Saúde do Estoque', types:['doughnut','pie','bar','radar'], default:'doughnut'},
  evo:    {title:'Evolução Temporal — Entradas x Saídas', types:['bar','line','area','pie','doughnut','radar','comparativo'], default:'bar'}
};
const TYPE_LABELS = {doughnut:'Rosca',pie:'Pizza',bar:'Barras',line:'Linha',area:'Área',radar:'Radar',comparativo:'Comparativo'};

let cardState = {};
try{ cardState = JSON.parse(localStorage.getItem('start_card_state')||'{}'); }catch(e){ cardState = {}; }
Object.keys(CARD_META).forEach(k=>{
  cardState[k] = Object.assign({period:'mes', type:CARD_META[k].default, unit:'kg'}, cardState[k]||{});
});
function saveCardState(){ localStorage.setItem('start_card_state', JSON.stringify(cardState)); }

const chartGetters = {cat:()=>chartCat, top:()=>chartTop, health:()=>chartHealth, evo:()=>chartEvo};
let lastCardData = {};

/* ═══════════════════════════════════════════════
   TEMAS DE CORES DOS GRÁFICOS
═══════════════════════════════════════════════ */
const CHART_THEMES = {
  azul:      {label:'Azul Corporativo', colors:['#1E3A5F','#274B77','#325D8A','#5B82A8','#8BA8C4','#B7C9DC'], accent:'#1E3A5F', warn:'#C97A2B', danger:'#B0413E'},
  verde:     {label:'Verde',            colors:['#1B5E3C','#2E7D52','#4C9A6E','#7AB68F','#A6D0B5','#D1E8D9'], accent:'#1B5E3C', warn:'#C97A2B', danger:'#B0413E'},
  roxo:      {label:'Roxo',             colors:['#4A2E7A','#5E3D96','#7C5BB3','#9D81C7','#BFAADB','#E0D6F0'], accent:'#4A2E7A', warn:'#C97A2B', danger:'#B0413E'},
  mono:      {label:'Monocromático',    colors:['#1F2937','#374151','#4B5563','#6B7280','#9CA3AF','#D1D5DB'], accent:'#1F2937', warn:'#4B5563', danger:'#111827'},
  contraste: {label:'Alto Contraste',   colors:['#0F172A','#DC2626','#D97706','#16A34A','#2563EB','#9333EA'], accent:'#0F172A', warn:'#D97706', danger:'#DC2626'},
  custom:    {label:'Personalizado',    colors:['#1E3A5F','#274B77','#325D8A','#5B82A8','#8BA8C4','#B7C9DC'], accent:'#1E3A5F', warn:'#C97A2B', danger:'#B0413E'}
};

let chartThemeId = 'azul';
try{
  const savedTheme = localStorage.getItem('start_chart_theme');
  if(savedTheme && CHART_THEMES[savedTheme]) chartThemeId = savedTheme;
  const savedCustom = JSON.parse(localStorage.getItem('start_chart_theme_custom')||'null');
  if(savedCustom && Array.isArray(savedCustom.colors)) CHART_THEMES.custom = savedCustom;
}catch(e){}

function activeChartTheme(){ return CHART_THEMES[chartThemeId] || CHART_THEMES.azul; }
function chartPalette(n){
  const c = activeChartTheme().colors;
  if(!n) return c;
  const out = [];
  for(let i=0;i<n;i++) out.push(c[i % c.length]);
  return out;
}

function setChartTheme(id){
  chartThemeId = id;
  localStorage.setItem('start_chart_theme', id);
  renderChartThemeUI();
  refreshAllDashboardCharts();
}

function setCustomChartColor(index, color){
  CHART_THEMES.custom.colors[index] = color;
  localStorage.setItem('start_chart_theme_custom', JSON.stringify(CHART_THEMES.custom));
  if(chartThemeId === 'custom') refreshAllDashboardCharts();
}

function refreshAllDashboardCharts(){
  if(currentPage === 'dashboard'){
    renderCard('cat'); renderCard('top'); renderCard('health'); renderCard('evo');
  }
  if(currentPage === 'relatorios' && typeof loadReports==='function') loadReports();
}

function renderChartThemeUI(){
  const list = document.getElementById('chart-theme-list');
  if(!list) return;
  list.innerHTML = Object.keys(CHART_THEMES).map(id=>{
    const t = CHART_THEMES[id];
    const swatches = t.colors.slice(0,5).map(c=>`<span class="theme-swatch" style="background:${c}"></span>`).join('');
    return `<button type="button" class="chart-theme-opt ${id===chartThemeId?'active':''}" onclick="setChartTheme('${id}')">
      <span class="theme-swatches">${swatches}</span>
      <span>${t.label}</span>
    </button>`;
  }).join('');

  const customWrap = document.getElementById('chart-theme-custom-colors');
  if(customWrap){
    customWrap.style.display = chartThemeId === 'custom' ? 'flex' : 'none';
    customWrap.innerHTML = CHART_THEMES.custom.colors.map((c,i)=>
      `<input type="color" value="${c}" onchange="setCustomChartColor(${i},this.value)">`
    ).join('');
  }
}

function themeColor(varName){
  return getComputedStyle(document.body).getPropertyValue(varName).trim() || '#fff';
}

function buildGenericChart(type, labels, datasets, extraOptions={}){
  const isArea = type==='area';
  const realType = isArea ? 'line' : type;
  const noScale = ['pie','doughnut','radar'].includes(realType);
  datasets = datasets.map(ds=>{
    const d = Object.assign({}, ds);
    if(realType==='line'){ d.fill = isArea; d.tension = .35; }
    if(realType==='bar' && d.borderRadius===undefined) d.borderRadius = 6;
    return d;
  });
  const base = {
    maintainAspectRatio:false,
    animation:{duration:700,easing:'easeOutQuart'},
    plugins:{legend:{position:'bottom'}},
    scales: noScale ? {} : {y:{beginAtZero:true}}
  };
  // shallow-merge extraOptions over base (one level of plugins/scales)
  const opts = Object.assign({}, base, extraOptions);
  if(extraOptions.plugins) opts.plugins = Object.assign({}, base.plugins, extraOptions.plugins);
  if(extraOptions.scales !== undefined) opts.scales = extraOptions.scales;
  return {type:realType, data:{labels, datasets}, options:opts};
}

/* ═══════════════════════════════════════════════
   RESUMO EXECUTIVO (Total / Média / Maior / Menor)
═══════════════════════════════════════════════ */
function renderSummary(key, vals, labels, unit, extraRow){
  const el = document.getElementById('summary-'+key);
  if(!el) return;
  if(!vals || !vals.length){ el.innerHTML=''; return; }
  const total = vals.reduce((a,b)=>a+b,0);
  const media = total/vals.length;
  let maxI=0, minI=0;
  vals.forEach((v,i)=>{ if(v>vals[maxI]) maxI=i; if(v<vals[minI]) minI=i; });
  const u = UNIT_LABELS[unit]||unit;
  const fmt = v=>v.toLocaleString('pt-BR',{maximumFractionDigits:2});
  el.innerHTML = `
    <div class="bi-summary-item"><div class="bi-summary-label">Total</div><div class="bi-summary-value">${fmt(total)} ${u}</div></div>
    <div class="bi-summary-item"><div class="bi-summary-label">Média</div><div class="bi-summary-value">${fmt(media)} ${u}</div></div>
    <div class="bi-summary-item"><div class="bi-summary-label">Maior</div><div class="bi-summary-value muted">${labels[maxI]} · ${fmt(vals[maxI])} ${u}</div></div>
    <div class="bi-summary-item"><div class="bi-summary-label">Menor</div><div class="bi-summary-value muted">${labels[minI]} · ${fmt(vals[minI])} ${u}</div></div>
    ${extraRow||''}`;
  el.style.gridTemplateColumns = extraRow ? 'repeat(5,1fr)' : '';
}

/* CHART: Distribuição por Categoria */
function renderCatChart(data){
  const ctx = document.getElementById('chart-cat');
  if(!ctx) return;
  if(chartCat) chartCat.destroy();
  const COLORS=chartPalette(7);
  const stock = data.stock || [];
  const unit = cardState.cat.unit, factor = UNIT_FACTORS[unit];
  const labels = stock.map(c=>c.category||'Outros');
  const vals = stock.map(c=>+(c.total*factor).toFixed(2));
  const type = cardState.cat.type;
  const isPieLike = type==='doughnut' || type==='pie';
  const cfg = buildGenericChart(type, labels, [{
    data:vals,
    backgroundColor: isPieLike ? COLORS : activeChartTheme().colors[0],
    borderWidth: isPieLike ? 3 : 0, borderColor:themeColor('--white'), hoverOffset:6
  }], {
    cutout: type==='doughnut' ? '68%' : undefined,
    plugins:{legend:{display:true, position:'bottom', labels:{padding:14,font:{size:12},usePointStyle:true,pointStyle:'circle'}},
      tooltip:{callbacks:{label:c=>' '+c.label+': '+(c.parsed.y??c.parsed).toLocaleString('pt-BR')+' '+UNIT_LABELS[unit]}}}
  });
  chartCat = new Chart(ctx, cfg);

  const chip = document.getElementById('bi-trend-cat');
  chip.className='bi-trend-chip bi-trend-stable';
  chip.textContent=labels.length+' categorias';

  let extraRow='';
  if(data.movement && data.movement.length){
    const movTotal = data.movement.reduce((a,r)=>a+(r.total||0),0)*factor;
    extraRow = `<div class="bi-summary-item"><div class="bi-summary-label">Movimentado no Período</div>
      <div class="bi-summary-value muted">${movTotal.toLocaleString('pt-BR',{maximumFractionDigits:2})} ${UNIT_LABELS[unit]}</div></div>`;
  }
  renderSummary('cat', vals, labels, unit, extraRow);
}

/* CHART: Top Produtos */
async function renderTopChart(data){
  const ctx = document.getElementById('chart-top');
  if(!ctx) return;
  if(chartTop) chartTop.destroy();
  const unit = cardState.top.unit, factor = UNIT_FACTORS[unit];
  let labels, vals, leaderName, periodChip;
  if(data.top_products && data.top_products.length){
    labels = data.top_products.map(p=>p.name);
    vals = data.top_products.map(p=>+(p.total*factor).toFixed(2));
    leaderName = labels[0]; periodChip = ' lidera no período';
  } else {
    const prods = await getProducts();
    const top = [...prods].sort((a,b)=>b.quantity-a.quantity).slice(0,8);
    labels = top.map(p=>p.name);
    vals = top.map(p=>+(p.quantity*factor).toFixed(2));
    leaderName = labels[0]; periodChip = ' lidera o estoque';
  }
  const type = cardState.top.type;
  const isPieLike = type==='pie' || type==='doughnut';
  const PALETTE=chartPalette(8);
  const cfg = buildGenericChart(type, labels, [{
    data:vals,
    backgroundColor: isPieLike ? PALETTE : activeChartTheme().colors[0],
    borderWidth: isPieLike ? 3 : 0, borderColor:themeColor('--white'), hoverOffset:5,
    maxBarThickness:48, borderRadius: type==='bar'?6:0
  }], {
    cutout: type==='doughnut' ? '60%' : undefined,
    plugins:{legend:{display: isPieLike || type==='radar', position:'bottom'},
      tooltip:{callbacks:{label:c=>(c.label||'')+': '+(c.parsed.y??c.parsed).toLocaleString('pt-BR')+' '+UNIT_LABELS[unit]}}},
    scales: (isPieLike || type==='radar') ? {} :
      {x:{grid:{display:false},ticks:{font:{size:11},maxRotation:30}},
       y:{grid:{color:'var(--gray-100)'},ticks:{callback:v=>v+' '+UNIT_LABELS[unit],font:{size:11}},beginAtZero:true}}
  });
  chartTop = new Chart(ctx, cfg);

  const chip = document.getElementById('bi-trend-top');
  if(leaderName){
    chip.className='bi-trend-chip bi-trend-up';
    chip.textContent='↑ '+leaderName+periodChip;
  }
  renderSummary('top', vals, labels, unit);
}

/* CHART: Saúde do Estoque */
function buildHealthChart(prods){
  const ctx = document.getElementById('chart-health');
  if(!ctx) return;
  if(chartHealth) chartHealth.destroy();
  const normal = prods.filter(p=>p.quantity>p.min_quantity).length;
  const low    = prods.filter(p=>p.quantity>0&&p.quantity<=p.min_quantity).length;
  const empty  = prods.filter(p=>p.quantity<=0).length;
  const type = cardState.health.type;
  const theme = activeChartTheme();
  const healthColors = [theme.accent, theme.warn, theme.danger];
  const cfg = buildGenericChart(type, ['Normal','Baixo','Zerado'], [{
    data:[normal,low,empty],
    backgroundColor:healthColors,
    borderWidth:3, borderColor:themeColor('--white'), hoverOffset:5
  }], {
    cutout: type==='doughnut' ? '65%' : undefined,
    plugins:{legend:{display: type!=='bar'},
      tooltip:{callbacks:{label:c=>c.label+': '+c.parsed+' produto(s)'}}}
  });
  chartHealth = new Chart(ctx, cfg);

  const leg = document.getElementById('health-legend');
  const items=[
    {label:'Normal',val:normal,color:healthColors[0],pct:prods.length?Math.round(normal/prods.length*100):0},
    {label:'Estoque baixo',val:low,color:healthColors[1],pct:prods.length?Math.round(low/prods.length*100):0},
    {label:'Zerado',val:empty,color:healthColors[2],pct:prods.length?Math.round(empty/prods.length*100):0},
  ];
  leg.innerHTML = items.map(i=>`
    <div class="health-leg-item">
      <div class="health-leg-dot" style="background:${i.color}"></div>
      <div class="health-leg-label">${i.label}</div>
      <div class="health-leg-val">${i.val}</div>
      <div class="health-leg-pct">(${i.pct}%)</div>
    </div>`).join('');

  renderSummary('health', [normal,low,empty], ['Normal','Baixo','Zerado'], 'un');
}

/* CHART: Evolução Temporal */
function renderEvoChart(data){
  const ctx = document.getElementById('chart-evo');
  if(!ctx) return;
  if(chartEvo) chartEvo.destroy();
  const unit = cardState.evo.unit, factor = UNIT_FACTORS[unit];
  const type = cardState.evo.type;

  const periodLabels = {semana:'Semana atual',mes:'Mês atual',trimestre:'Trimestre atual',
    semestre:'Semestre atual',ano:'Ano atual',personalizado:'Período personalizado'};
  document.getElementById('evo-sub').textContent =
    `${periodLabels[cardState.evo.period]||cardState.evo.period} · ${formatDate(data.start)} – ${formatDate(data.end)}`;

  let cfg;
  if(type === 'comparativo'){
    const cur = data.current, prev = data.previous || {entradas:0,saidas:0,total:0};
    const theme = activeChartTheme();
    cfg = {
      type:'bar',
      data:{
        labels:['Entradas','Saídas','Movimentações'],
        datasets:[
          {label:'Período atual', data:[cur.entradas*factor,cur.saidas*factor,cur.total].map(v=>+v.toFixed(2)), backgroundColor:theme.colors[0], borderRadius:6},
          {label:'Período anterior', data:[prev.entradas*factor,prev.saidas*factor,prev.total].map(v=>+v.toFixed(2)), backgroundColor:theme.colors[4]||'#B0BEC5', borderRadius:6}
        ]
      },
      options:{maintainAspectRatio:false, animation:{duration:700,easing:'easeOutQuart'},
        plugins:{legend:{position:'bottom'}}, scales:{y:{beginAtZero:true}}}
    };
  } else {
    const entradas = data.entradas_series.map(v=>+(v*factor).toFixed(2));
    const saidas = data.saidas_series.map(v=>+(v*factor).toFixed(2));
    const theme = activeChartTheme();
    cfg = buildGenericChart(type, data.labels, [
      {label:'Entradas ('+UNIT_LABELS[unit]+')', data:entradas, backgroundColor:theme.colors[0], borderColor:theme.colors[0]},
      {label:'Saídas ('+UNIT_LABELS[unit]+')', data:saidas, backgroundColor:theme.danger, borderColor:theme.danger}
    ], {plugins:{legend:{position:'bottom'},
      tooltip:{callbacks:{label:c=>(c.dataset.label||'')+': '+(c.parsed.y??c.parsed).toLocaleString('pt-BR')+' '+UNIT_LABELS[unit]}}}});
  }
  chartEvo = new Chart(ctx, cfg);

  // trend chips (comparação com período anterior)
  const trIn = document.getElementById('evo-trend-in');
  const trOut = document.getElementById('evo-trend-out');
  if(data.change){
    const ce = data.change.entradas, cs = data.change.saidas;
    trIn.style.display='inline-block';
    trIn.className = ce>=0 ? 'kpi-trend-up' : 'kpi-trend-down';
    trIn.textContent = `Entradas ${ce>=0?'↑':'↓'} ${Math.abs(ce)}%`;
    trOut.style.display='inline-block';
    trOut.className = cs>=0 ? 'kpi-trend-down' : 'kpi-trend-up';
    trOut.textContent = `Saídas ${cs>=0?'↑':'↓'} ${Math.abs(cs)}%`;
  } else {
    trIn.style.display='none';
    trOut.style.display='none';
  }

  // Resumo executivo (entradas+saídas combinadas por período)
  const combined = data.entradas_series.map((v,i)=>+((v+data.saidas_series[i])*factor).toFixed(2));
  renderSummary('evo', combined, data.labels, unit);
}

/* ═══════════════════════════════════════════════
   PERÍODO POR CARTÃO (filtros independentes)
═══════════════════════════════════════════════ */
async function setCardPeriod(key, period){
  cardState[key].period = period;
  saveCardState();
  const customWrap = document.getElementById('custom-range-'+key);
  if(period === 'personalizado'){
    ensureCustomDateInputs(key);
    document.getElementById('custom-range-'+key).style.display='flex';
    return; // espera o usuário escolher as datas
  } else if(customWrap){
    customWrap.style.display='none';
  }
  await renderCard(key);
}

function ensureCustomDateInputs(key){
  if(document.getElementById('custom-range-'+key)) return;
  const select = document.getElementById('period-'+key);
  if(!select) return;
  const wrap = document.createElement('div');
  wrap.id = 'custom-range-'+key;
  wrap.style.display='flex';
  wrap.style.gap='4px';
  wrap.innerHTML = `<input type="date" class="bi-period-select" id="from-${key}" style="width:108px">
    <input type="date" class="bi-period-select" id="to-${key}" style="width:108px">`;
  select.insertAdjacentElement('afterend', wrap);
  const onchange = async ()=>{
    const f=document.getElementById('from-'+key).value, t=document.getElementById('to-'+key).value;
    if(f && t) await renderCard(key);
  };
  wrap.querySelector('#from-'+key).onchange = onchange;
  wrap.querySelector('#to-'+key).onchange = onchange;
}

async function loadCardData(key){
  const st = cardState[key];
  let url;
  if(key === 'top' || key === 'evo'){
    url = `/api/stats/timeseries?period=${st.period}&compare=1`;
  } else if(key === 'cat'){
    url = `/api/stats/category-distribution?period=${st.period}`;
  } else {
    return null; // saúde usa a lista de produtos diretamente
  }
  if(st.period === 'personalizado'){
    const f = document.getElementById('from-'+key)?.value, t = document.getElementById('to-'+key)?.value;
    if(!f || !t) return null;
    url += `&from=${f}&to=${t}`;
  }
  const data = await (await fetch(url)).json();
  lastCardData[key] = data;
  return data;
}

async function renderCard(key){
  if(key === 'health'){
    buildHealthChart(await getProducts());
    return;
  }
  const data = await loadCardData(key);
  if(!data) return;
  if(key === 'cat') renderCatChart(data);
  if(key === 'top') await renderTopChart(data);
  if(key === 'evo') renderEvoChart(data);
}

/* (Filtro global de período removido — cada card tem seu próprio filtro de período) */

/* ═══════════════════════════════════════════════
   FERRAMENTAS DE GRÁFICO (configurar/editar/expandir/imprimir)
═══════════════════════════════════════════════ */
function setupChartTools(){
  Object.keys(CARD_META).forEach(key=>{
    const card = document.getElementById('bc-'+key);
    if(!card) return;

    // Initialize period select to saved state
    const sel = document.getElementById('period-'+key);
    if(sel){
      sel.value = cardState[key].period;
      if(cardState[key].period === 'personalizado') ensureCustomDateInputs(key);
    }

    if(card.querySelector('.bi-tools')) return;
    const wrap = card.querySelector('.bi-tools-wrap');
    if(!wrap) return;
    const typeButtons = CARD_META[key].types.map(t=>
      `<button class="${cardState[key].type===t?'active':''}" data-type="${t}" onclick="setChartType('${key}','${t}')">${TYPE_LABELS[t]}</button>`
    ).join('');
    const tools = document.createElement('div');
    tools.className = 'bi-tools';
    tools.innerHTML = `
      <button class="bi-tool-btn" title="Editar dados" onclick="openEditData('${key}')">${ICON_SVG.edit}</button>
      <div style="position:relative">
        <button class="bi-tool-btn" title="Configurar gráfico" onclick="toggleConfigPopover('${key}')">${ICON_SVG.settings}</button>
        <div class="config-popover" id="config-${key}">${typeButtons}</div>
      </div>
      <button class="bi-tool-btn" title="Expandir" onclick="expandChart('${key}')">${ICON_SVG.expand}</button>
      <button class="bi-tool-btn" title="Imprimir" onclick="printChart('${key}')">${ICON_SVG.print}</button>`;
    wrap.appendChild(tools);
  });

  if(!window._chartToolsOutsideClick){
    window._chartToolsOutsideClick = true;
    document.addEventListener('click', (e)=>{
      if(!e.target.closest('.bi-tools')){
        document.querySelectorAll('.config-popover').forEach(p=>p.classList.remove('show'));
      }
    });
  }
}

function toggleConfigPopover(key){
  document.querySelectorAll('.config-popover').forEach(p=>{
    if(p.id !== 'config-'+key) p.classList.remove('show');
  });
  document.getElementById('config-'+key).classList.toggle('show');
}

function setChartType(key, type){
  cardState[key].type = type;
  saveCardState();
  document.querySelectorAll('#config-'+key+' button').forEach(b=>b.classList.toggle('active', b.dataset.type===type));
  document.getElementById('config-'+key).classList.remove('show');
  renderCard(key);
}

function expandChart(key){
  const chart = chartGetters[key]();
  if(!chart) return;
  document.getElementById('expand-title').textContent = CARD_META[key].title;
  document.getElementById('modal-chart-expand').classList.add('show');
  if(chartExpand) chartExpand.destroy();
  const cfg = JSON.parse(JSON.stringify(chart.config, (k,v)=> typeof v==='function'?undefined:v));
  cfg.options.maintainAspectRatio = false;
  chartExpand = new Chart(document.getElementById('chart-expand-canvas'), cfg);
}

function printChart(key){
  const chart = chartGetters[key]();
  if(!chart) return;
  const img = chart.toBase64Image();
  const now = new Date();
  const user = currentUser?.full_name || currentUser?.username || 'Usuário';
  const w = window.open('','','width=900,height=700');
  w.document.write(`<html><head><title>${CARD_META[key].title} – START Reciclagem</title>
    <style>
      @page{size:A4 landscape;margin:14mm}
      *{font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box}
      .pp-header{display:flex;justify-content:space-between;border-bottom:2px solid #1E3A5F;
        padding-bottom:14px;margin-bottom:14px}
      .pp-brand{font-weight:800;color:#1E3A5F;font-size:18px}
      .pp-meta{font-size:11px;color:#666;text-align:right;line-height:1.5}
      h2{margin:0 0 14px}
      img{width:100%}
    </style></head><body>
    <div class="pp-header">
      <div class="pp-brand">♻️ START RECICLAGEM</div>
      <div class="pp-meta">Emitido em: ${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}<br>Usuário: ${user}</div>
    </div>
    <h2>${CARD_META[key].title}</h2>
    <img src="${img}">
    <script>window.onload=()=>window.print()<\/script>
    </body></html>`);
  w.document.close();
}

let currentEditKey = null;
async function openEditData(key){
  currentEditKey = key;
  document.getElementById('edit-data-title').innerHTML = ICON_SVG.edit+' Editar dados — '+CARD_META[key].title;
  const body = document.getElementById('edit-data-body');
  const unit = cardState[key].unit;
  const unitRow = `<div class="edit-unit-row"><label style="font-size:12px;font-weight:700;color:var(--gray-700)">Unidade de exibição</label>
    <select onchange="changeUnit('${key}',this.value)">
      ${Object.keys(UNIT_LABELS).map(u=>`<option value="${u}" ${u===unit?'selected':''}>${UNIT_LABELS[u]}</option>`).join('')}
    </select></div>`;
  let tableHtml = '';
  if(key === 'top'){
    const prods = await getProducts();
    const top = [...prods].sort((a,b)=>b.quantity-a.quantity).slice(0,8);
    tableHtml = `<table class="edit-data-table"><thead><tr><th>Produto</th><th>SKU</th>
      <th>Quantidade (kg)</th></tr></thead><tbody>${top.map(p=>`
      <tr><td>${p.name}</td><td>${p.sku}</td>
      <td><input type="number" step="0.01" data-id="${p.id}" data-old="${p.quantity}" value="${p.quantity}"></td></tr>`).join('')}
      </tbody></table>
      <p style="font-size:12px;color:var(--gray-500);margin-top:10px">
      Alterações são registradas com seu nome e o horário da edição.</p>`;
  } else if(key === 'cat'){
    const stock = (lastCardData.cat && lastCardData.cat.stock) || [];
    const factor = UNIT_FACTORS[unit];
    tableHtml = `<table class="edit-data-table"><thead><tr><th>Categoria</th><th>Total</th></tr></thead>
      <tbody>${stock.map(c=>`<tr><td>${c.category||'Outros'}</td><td>${(c.total*factor).toLocaleString('pt-BR',{maximumFractionDigits:2})} ${UNIT_LABELS[unit]}</td></tr>`).join('')}</tbody></table>
      <p style="font-size:12px;color:var(--gray-500);margin-top:10px">
      Para alterar os totais por categoria, edite a quantidade dos produtos correspondentes na página Estoque.</p>`;
  } else if(key === 'evo'){
    const d = lastCardData.evo;
    const factor = UNIT_FACTORS[unit];
    if(d){
      tableHtml = `<table class="edit-data-table"><thead><tr><th>Período</th><th>Entradas</th><th>Saídas</th></tr></thead>
        <tbody>${d.labels.map((l,i)=>`<tr><td>${l}</td><td>${(d.entradas_series[i]*factor).toLocaleString('pt-BR',{maximumFractionDigits:2})} ${UNIT_LABELS[unit]}</td><td>${(d.saidas_series[i]*factor).toLocaleString('pt-BR',{maximumFractionDigits:2})} ${UNIT_LABELS[unit]}</td></tr>`).join('')}</tbody></table>`;
    }
  } else if(key === 'health'){
    const prods = await getProducts();
    tableHtml = `<table class="edit-data-table"><thead><tr><th>Produto</th><th>Situação</th></tr></thead>
      <tbody>${prods.map(p=>{
        const s = p.quantity<=0?'Zerado':p.quantity<=p.min_quantity?'Baixo':'Normal';
        return `<tr><td>${p.name}</td><td>${s}</td></tr>`;
      }).join('')}</tbody></table>`;
  }
  body.innerHTML = unitRow + tableHtml;
  document.getElementById('modal-edit-data').classList.add('show');
}

function changeUnit(key, unit){
  cardState[key].unit = unit;
  saveCardState();
  renderCard(key);
}

async function saveChartEdits(){
  if(currentEditKey !== 'top'){ closeModal('modal-edit-data'); return; }
  const inputs = document.querySelectorAll('#edit-data-body input[data-id]');
  let changed = 0;
  for(const inp of inputs){
    const oldV = parseFloat(inp.dataset.old);
    const newV = parseFloat(inp.value);
    if(newV !== oldV && !isNaN(newV)){
      await fetch('/api/chart-edits', {method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({chart:'top', product_id:inp.dataset.id, new_value:newV})});
      changed++;
    }
  }
  closeModal('modal-edit-data');
  if(changed){
    showToast(changed+' item(ns) atualizado(s) por '+(currentUser?.full_name||currentUser?.username), 'success');
    products = [];
    await loadDashboard();
  }
}

/* (Central de Ajuda removida temporariamente — poderá ser adicionada futuramente) */

/* ═══════════════════════════════════════════════
   IMPORTAÇÃO DE PRODUTOS (.xlsx / .csv / .json)
═══════════════════════════════════════════════ */
function openImportModal(){
  importRows = [];
  document.getElementById('import-file').value = '';
  document.getElementById('import-preview').innerHTML = '';
  document.getElementById('import-confirm-btn').disabled = true;
  document.getElementById('modal-import').classList.add('show');
}

function handleImportFile(ev){
  const file = ev.target.files[0];
  if(!file) return;
  const ext = file.name.split('.').pop().toLowerCase();
  const reader = new FileReader();
  reader.onload = (e)=>{
    let rows = [];
    try{
      if(ext === 'json'){
        rows = JSON.parse(e.target.result);
      } else if(ext === 'csv'){
        const parsed = XLSX.read(e.target.result, {type:'string'});
        const sheet = parsed.Sheets[parsed.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet);
      } else {
        const wb = XLSX.read(e.target.result, {type:'array'});
        const sheet = wb.Sheets[wb.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(sheet);
      }
    } catch(err){
      showToast('Erro ao ler arquivo: '+err.message, 'error');
      return;
    }
    importRows = rows.map(r=>({
      name: r.name||r.nome||r.Nome||'',
      sku: r.sku||r.SKU||'',
      category: r.category||r.categoria||r.Categoria||'',
      quantity: parseFloat(r.quantity||r.quantidade||r.Quantidade||0),
      min_quantity: parseFloat(r.min_quantity||r.quantidade_minima||r['Quantidade Mínima']||0),
      location: r.location||r.localizacao||r.Localização||''
    })).filter(r=>r.name);
    renderImportPreview();
  };
  if(ext === 'csv' || ext === 'json') reader.readAsText(file);
  else reader.readAsArrayBuffer(file);
}

function renderImportPreview(){
  const el = document.getElementById('import-preview');
  if(!importRows.length){
    el.innerHTML = '<p style="color:var(--gray-500);font-size:13px">Nenhum registro válido encontrado.</p>';
    document.getElementById('import-confirm-btn').disabled = true;
    return;
  }
  el.innerHTML = `<p style="font-size:12px;color:var(--gray-500);margin-bottom:8px">
    ${importRows.length} registro(s) encontrados — confira antes de confirmar:</p>
    <table class="import-table"><thead><tr><th>Nome</th><th>SKU</th><th>Categoria</th>
    <th>Qtd</th><th>Qtd Mín.</th><th>Local</th></tr></thead><tbody>
    ${importRows.map(r=>`<tr><td>${r.name}</td><td>${r.sku||'<em>auto</em>'}</td><td>${r.category}</td>
    <td>${r.quantity}</td><td>${r.min_quantity}</td><td>${r.location}</td></tr>`).join('')}
    </tbody></table>`;
  document.getElementById('import-confirm-btn').disabled = false;
}

async function confirmImport(){
  let ok=0, fail=0;
  for(const r of importRows){
    let sku = r.sku;
    if(!sku){
      const g = await (await fetch('/api/products/generate-sku',{method:'POST',
        headers:{'Content-Type':'application/json'}, body:JSON.stringify({category:r.category})})).json();
      sku = g.sku;
    }
    const res = await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({...r, sku})});
    if(res.ok) ok++; else fail++;
  }
  closeModal('modal-import');
  products = [];
  showToast(`${ok} produto(s) importado(s)`+(fail?`, ${fail} falharam`:''), fail?'':'success');
  if(currentPage==='estoque') loadProducts();
  refreshLiveData();
}

/* Recent movements list */
function buildRecentMov(movs){
  const el = document.getElementById('recent-movements');
  if(!el) return;
  if(!movs.length){
    el.innerHTML='<div class="empty-state" style="padding:28px"><span class="es-icon" style="font-size:32px">'+ICON_SVG.refresh+'</span><p>Sem movimentações ainda</p></div>';
    return;
  }
  el.innerHTML = movs.map(m=>`
    <div class="mov-row">
      <div class="mov-dot ${m.type}"></div>
      <div class="mov-name">${m.name}</div>
      <span class="mov-${m.type}" style="font-size:10px">${m.type==='entrada'?'↑':'↓'}</span>
      <div class="mov-qty">${m.quantity} kg</div>
      <div class="mov-time">${formatTime(m.created_at)}</div>
    </div>`).join('');
}

/* Alerts */
function buildAlerts(prods){
  const el = document.getElementById('dash-alerts');
  if(!el) return;
  const low = prods.filter(p=>p.quantity>0&&p.quantity<=p.min_quantity);
  const empty = prods.filter(p=>p.quantity<=0);
  const all = [...empty,...low];
  if(!all.length){
    el.innerHTML='<div style="text-align:center;padding:28px;color:var(--green);font-size:13px;font-weight:600">✅ Todos os itens em estoque normal</div>';
    return;
  }
  el.innerHTML = all.slice(0,6).map(p=>`
    <div class="alert-row ${p.quantity<=0?'empty':'low'}">
      <span class="alert-icon">${p.quantity<=0?'🔴':'🟡'}</span>
      <div class="alert-name">${p.name}</div>
      <div class="alert-qty">${p.quantity} kg</div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════════
   OBSERVATIONS (stored in localStorage — ready to swap for Supabase)
═══════════════════════════════════════════════ */
function toggleObs(key){
  const body = document.getElementById('obs-'+key);
  const arrow = document.getElementById('arr-'+key);
  body.classList.toggle('show');
  arrow.classList.toggle('open');
}

function saveObs(key){
  const txt = document.getElementById('obs-'+key+'-txt').value.trim();
  if(!txt){showToast('Escreva uma observação primeiro','error');return;}
  const entry = {
    text: txt,
    user: currentUser?.full_name||currentUser?.username||'Usuário',
    userId: currentUser?.id,
    role: currentUser?.role||'',
    at: new Date().toISOString()
  };
  // Save current
  localStorage.setItem(OBS_KEY+key, JSON.stringify(entry));
  // Append to history
  const hist = JSON.parse(localStorage.getItem(OBS_HIST_KEY+key)||'[]');
  hist.unshift(entry);
  if(hist.length>50) hist.pop();
  localStorage.setItem(OBS_HIST_KEY+key, JSON.stringify(hist));
  loadObsDisplay(key);
  showToast('Observação salva!','success');
}

function loadObsDisplay(key){
  const raw = localStorage.getItem(OBS_KEY+key);
  if(!raw) return;
  try{
    const entry = JSON.parse(raw);
    const txtEl = document.getElementById('obs-'+key+'-txt');
    const metaEl = document.getElementById('obs-'+key+'-meta');
    if(txtEl) txtEl.value = entry.text;
    if(metaEl) metaEl.innerHTML =
      `<span class="bi-obs-saved">✓ Salvo</span> por <strong>${entry.user}</strong>
       · ${entry.role} · ${formatDate(entry.at)}
       <span class="bi-obs-history" onclick="showObsHistory('${key}')"> Ver histórico</span>`;
  }catch(e){}
}

function showObsHistory(key){
  const hist = JSON.parse(localStorage.getItem(OBS_HIST_KEY+key)||'[]');
  const el = document.getElementById('obs-history-list');
  if(!hist.length){
    el.innerHTML='<p style="color:var(--gray-500);font-size:13px">Nenhum histórico ainda.</p>';
  } else {
    el.innerHTML = hist.map(h=>`
      <div style="padding:14px;border-radius:10px;background:var(--gray-50);border:1px solid var(--gray-200)">
        <div style="font-size:12px;color:var(--gray-500);margin-bottom:6px">
          <strong>${h.user}</strong> · ${h.role} · ${formatDate(h.at)}
        </div>
        <div style="font-size:13px;color:var(--gray-800);line-height:1.5">${h.text}</div>
      </div>`).join('');
  }
  document.getElementById('modal-obs-history').classList.add('show');
}

/* ═══════════════════════════════════════════════
   PRODUCTS
═══════════════════════════════════════════════ */
async function loadProducts(){
  const q   = document.getElementById('prod-search')?.value||'';
  const cat = document.getElementById('prod-cat')?.value||'';
  const sts = document.getElementById('prod-status')?.value||'';
  const params = new URLSearchParams({q,category:cat,status:sts});
  const data = await (await fetch('/api/products?'+params)).json();
  products = data;
  renderProducts(data);
  renderReportTable(data);
}

function renderProducts(data){
  const tbody = document.getElementById('products-tbody');
  if(!tbody) return;
  document.getElementById('prod-count').textContent = data.length+' produto(s)';
  if(!data.length){
    tbody.innerHTML=`<tr><td colspan="8"><div class="empty-state" style="padding:40px">
      <span class="es-icon">${ICON_SVG.box}</span><h3>Nenhum produto encontrado</h3>
      <p>Cadastre produtos ou ajuste os filtros</p></div></td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(p=>{
    const pct = p.min_quantity>0?Math.min(100,Math.round(p.quantity/p.min_quantity*100)):100;
    const barCls = p.quantity<=0?'empty':p.quantity<=p.min_quantity?'low':'';
    const stsCls = p.quantity<=0?'status-empty':p.quantity<=p.min_quantity?'status-low':'status-ok';
    const stsTxt = p.quantity<=0?'Sem estoque':p.quantity<=p.min_quantity?'Estoque baixo':'Normal';
    return `<tr>
      <td style="font-weight:600">${p.name}</td>
      <td><span class="sku-badge">${p.sku}</span></td>
      <td><span class="cat-badge">${p.category||'–'}</span></td>
      <td><div style="display:flex;align-items:center;gap:8px">
        <strong>${p.quantity} kg</strong>
        <div class="progress-wrap"><div class="progress-bar ${barCls}" style="width:${pct}%"></div></div>
      </div></td>
      <td>${p.min_quantity} kg</td>
      <td><span class="status-badge ${stsCls}">${stsTxt}</span></td>
      <td style="color:var(--gray-500)">${p.location||'–'}</td>
      <td><div style="display:flex;gap:6px">
        <button class="btn btn-sm btn-secondary" onclick="openMovModalFor(${p.id})">${ICON_SVG.refresh}</button>
        <button class="btn btn-sm btn-secondary" onclick="editProduct(${p.id})">${ICON_SVG.edit}</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id},'${p.name.replace(/'/g,"\\'")}')">${ICON_SVG.trash}</button>
      </div></td>
    </tr>`;
  }).join('');
}

function openProductModal(id=null){
  editingProductId=id;
  document.getElementById('prod-modal-title').textContent=id?'Editar Produto':'Cadastrar Produto';
  if(!id) ['p-name','p-sku','p-cat','p-qty','p-min','p-loc','p-obs'].forEach(i=>document.getElementById(i).value='');
  document.getElementById('modal-product').classList.add('show');
}
function editProduct(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  editingProductId=id;
  document.getElementById('prod-modal-title').textContent='Editar Produto';
  document.getElementById('p-name').value=p.name;
  document.getElementById('p-sku').value=p.sku;
  document.getElementById('p-cat').value=p.category;
  document.getElementById('p-qty').value=p.quantity;
  document.getElementById('p-min').value=p.min_quantity;
  document.getElementById('p-loc').value=p.location;
  document.getElementById('p-obs').value=p.observations;
  document.getElementById('modal-product').classList.add('show');
}
async function saveProduct(){
  const d={
    name:document.getElementById('p-name').value.trim(),
    sku:document.getElementById('p-sku').value.trim().toUpperCase(),
    category:document.getElementById('p-cat').value,
    quantity:document.getElementById('p-qty').value||0,
    min_quantity:document.getElementById('p-min').value||0,
    location:document.getElementById('p-loc').value.trim(),
    observations:document.getElementById('p-obs').value.trim()
  };
  if(!d.name||!d.sku){showToast('Preencha nome e SKU','error');return;}
  const url=editingProductId?'/api/products/'+editingProductId:'/api/products';
  const method=editingProductId?'PUT':'POST';
  const res=await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
  const r=await res.json();
  if(r.error){showToast(r.error,'error');return;}
  closeModal('modal-product');
  showToast(editingProductId?'Produto atualizado!':'Produto cadastrado!','success');
  products=[];
  loadProducts();
  refreshLiveData();
}
async function deleteProduct(id,name){
  if(!confirm(`Excluir "${name}"?`)) return;
  await fetch('/api/products/'+id,{method:'DELETE'});
  showToast('Produto excluído','success');
  products=[];loadProducts();
  refreshLiveData();
}
async function autoSKU(){
  const cat=document.getElementById('p-cat').value;
  const res=await fetch('/api/products/generate-sku',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify({category:cat})});
  document.getElementById('p-sku').value=(await res.json()).sku;
}

/* ═══════════════════════════════════════════════
   MOVEMENTS
═══════════════════════════════════════════════ */
async function openMovModal(){
  const prods=await (await fetch('/api/products')).json();
  document.getElementById('m-prod').innerHTML=
    prods.map(p=>`<option value="${p.id}">${p.name} (${p.quantity} kg)</option>`).join('');
  document.getElementById('m-qty').value='';
  document.getElementById('m-reason').value='';
  document.getElementById('modal-movement').classList.add('show');
}
async function openMovModalFor(id){
  await openMovModal();
  document.getElementById('m-prod').value=id;
}
async function saveMovement(){
  const d={
    product_id:document.getElementById('m-prod').value,
    type:document.getElementById('m-type').value,
    quantity:document.getElementById('m-qty').value,
    reason:document.getElementById('m-reason').value
  };
  if(!d.quantity||d.quantity<=0){showToast('Informe a quantidade','error');return;}
  const res=await fetch('/api/movements',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
  const r=await res.json();
  if(r.error){showToast(r.error,'error');return;}
  closeModal('modal-movement');
  showToast(`Registrado! Novo saldo: ${r.new_quantity} kg`,'success');
  products=[];loadProducts();loadMovements();
  refreshLiveData();
}
async function loadMovements(){
  const data=await (await fetch('/api/movements')).json();
  const tbody=document.getElementById('movements-tbody');
  if(!tbody) return;
  if(!data.length){
    tbody.innerHTML=`<tr><td colspan="7"><div class="empty-state" style="padding:40px">
      <span class="es-icon">${ICON_SVG.refresh}</span><h3>Sem movimentações</h3></div></td></tr>`;
    return;
  }
  tbody.innerHTML=data.map(m=>`<tr>
    <td style="color:var(--gray-500);font-size:12px">${formatDate(m.created_at)}</td>
    <td style="font-weight:600">${m.product_name}</td>
    <td><span class="sku-badge">${m.sku}</span></td>
    <td><span class="mov-${m.type}">${m.type==='entrada'?'↑ Entrada':'↓ Saída'}</span></td>
    <td style="font-weight:700">${m.quantity} kg</td>
    <td style="color:var(--gray-600)">${m.reason||'–'}</td>
    <td style="color:var(--gray-500)">${m.user_name||'–'}</td>
  </tr>`).join('');
}

/* ═══════════════════════════════════════════════
   SKU & LABELS
═══════════════════════════════════════════════ */
async function generateSKU(){
  const manual=document.getElementById('sku-manual').value.trim();
  const cat=document.getElementById('sku-cat').value;
  let sku;
  if(manual){sku=manual.toUpperCase();}
  else{
    const res=await fetch('/api/products/generate-sku',{method:'POST',
      headers:{'Content-Type':'application/json'},body:JSON.stringify({category:cat})});
    sku=(await res.json()).sku;
  }
  const el=document.getElementById('sku-result');
  el.textContent=sku; el.style.display='block';
}
function previewLabel(){
  const skuEl=document.getElementById('sku-result');
  const sku=skuEl.style.display!=='none'?skuEl.textContent:document.getElementById('sku-manual').value||'???';
  const name=document.getElementById('sku-name').value||'Produto';
  const cat=document.getElementById('sku-cat').value;
  const area=document.getElementById('label-preview-area');
  area.innerHTML=`
    <div class="label-preview" id="label-to-print">
      <div style="border-bottom:2px solid var(--gray-300);padding-bottom:8px;margin-bottom:10px">
        <div style="font-size:10px;color:var(--gray-500);letter-spacing:2px">START RECICLAGEM</div>
      </div>
      <div class="lname">${name}</div>
      <div class="lsku">${sku}</div>
      <div class="linfo">Categoria: ${cat}</div>
      <div style="margin-top:12px" id="qrcode-container"></div>
      <div class="linfo" style="margin-top:8px">${new Date().toLocaleDateString('pt-BR')}</div>
    </div>`;
  new QRCode(document.getElementById('qrcode-container'),{
    text:sku,width:80,height:80,colorLight:'#fff',colorDark:'#1E3A5F'});
  document.getElementById('print-btn').style.display='flex';
}
function printLabel(){
  const content=document.getElementById('label-to-print').outerHTML;
  const w=window.open('','','width=400,height=500');
  w.document.write(`<html><head><title>Etiqueta</title>
    <style>body{font-family:monospace;display:flex;justify-content:center;padding:20px}
    .label-preview{border:2px solid #ccc;padding:16px;text-align:center;width:250px}
    .lsku{font-size:20px;font-weight:900;letter-spacing:2px;color:#1E3A5F}
    .lname{font-size:14px;font-weight:700}.linfo{font-size:11px;color:#666}</style>
    </head><body>${content}<script>window.print();window.close()<\/script></body></html>`);
}

/* ═══════════════════════════════════════════════
   FEED
═══════════════════════════════════════════════ */
let pendingPostImage = '';
function handlePostImage(ev){
  const file = ev.target.files[0];
  if(!file) return;
  if(file.size > 1.5*1024*1024){
    showToast('Imagem muito grande (máx. 1,5MB)','error');
    ev.target.value='';
    return;
  }
  const reader = new FileReader();
  reader.onload = (e)=>{
    pendingPostImage = e.target.result;
    const prev = document.getElementById('post-image-preview');
    prev.src = pendingPostImage;
    prev.style.display='block';
  };
  reader.readAsDataURL(file);
}

const POST_TYPE_LABELS = {comunicado:'📢 Comunicado', aviso:'⚠️ Aviso', post:''};
const POST_TYPE_CLASS = {comunicado:'mov-entrada', aviso:'status-low', post:''};

async function loadFeed(){
  const data=await (await fetch('/api/posts')).json();
  const list=document.getElementById('feed-list');
  if(!data.length){
    list.innerHTML=`<div class="empty-state"><span class="es-icon">${ICON_SVG.chat}</span>
      <h3>Sem publicações</h3><p>Seja o primeiro a compartilhar!</p></div>`;
    return;
  }
  list.innerHTML=data.map(p=>{
    const ini=(p.full_name||'?')[0].toUpperCase();
    const typeLabel = POST_TYPE_LABELS[p.post_type] || '';
    const typeBadge = typeLabel ? `<span class="${POST_TYPE_CLASS[p.post_type]}" style="margin-left:8px;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700">${typeLabel}</span>` : '';
    const img = p.image ? `<img src="${p.image}" style="max-width:100%;border-radius:10px;margin-top:8px;display:block">` : '';
    const canDelete = currentUser && (p.user_id===currentUser.id || ['Administrador','Gerente','Supervisor'].includes(currentUser.role));
    const deleteBtn = canDelete
      ? `<button class="icon-btn" style="width:28px;height:28px;color:var(--gray-500);background:none" title="Excluir postagem" onclick="deletePost(${p.id})">${ICON_SVG.trash}</button>`
      : '';
    return `<div class="post-card" id="post-${p.id}">
      <div class="post-header">
        <div class="post-avatar">${p.avatar&&!p.avatar.startsWith('http')?p.avatar:ini}</div>
        <div class="post-meta">
          <strong>${p.full_name||'Usuário'}${typeBadge}</strong>
          <span>${p.role||''} · ${formatDate(p.created_at)}</span>
        </div>
        <div style="margin-left:auto">${deleteBtn}</div>
      </div>
      <div class="post-content">${p.content}</div>
      ${img}
      <div class="post-actions">
        <button class="action-btn ${p.user_liked?'liked':''}" onclick="toggleLike(${p.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${p.user_liked?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> ${p.like_count}
        </button>
        <button class="action-btn" onclick="toggleComments(${p.id})">
          ${ICON_SVG.chat} ${p.comment_count} comentário(s)
        </button>
      </div>
      <div class="comments-section" id="comments-${p.id}">
        <div id="clist-${p.id}"></div>
        <div class="comment-input-row">
          <input type="text" id="cinput-${p.id}" placeholder="Escreva um comentário…">
          <button class="btn btn-primary btn-sm" onclick="sendComment(${p.id})">Enviar</button>
        </div>
      </div>
    </div>`;
  }).join('');
}
async function submitPost(){
  const content=document.getElementById('post-text').value.trim();
  if(!content && !pendingPostImage){showToast('Escreva algo ou adicione uma imagem!','error');return;}
  const post_type = document.getElementById('post-type').value;
  await fetch('/api/posts',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({content, image:pendingPostImage, post_type})});
  document.getElementById('post-text').value='';
  document.getElementById('post-type').value='post';
  pendingPostImage='';
  const prev=document.getElementById('post-image-preview');
  prev.style.display='none'; prev.src='';
  loadFeed();showToast('Publicado!','success');
}
async function toggleLike(id){
  await fetch(`/api/posts/${id}/like`,{method:'POST'});
  loadFeed();
}
async function deletePost(id){
  if(!confirm('Excluir esta postagem? Esta ação não pode ser desfeita.')) return;
  const res = await fetch('/api/posts/'+id, {method:'DELETE'});
  const data = await res.json();
  if(data.error){ showToast(data.error,'error'); return; }
  showToast('Postagem excluída','success');
  loadFeed();
}
async function toggleComments(id){
  const sec=document.getElementById('comments-'+id);
  sec.classList.toggle('show');
  if(sec.classList.contains('show')){
    const data=await (await fetch(`/api/posts/${id}/comments`)).json();
    document.getElementById('clist-'+id).innerHTML=data.map(c=>`
      <div class="comment">
        <div class="post-avatar" style="width:30px;height:30px;font-size:12px">${(c.full_name||'?')[0]}</div>
        <div class="comment-body">
          <div class="comment-author">${c.full_name}</div>${c.content}
        </div>
      </div>`).join('')||'<p style="font-size:13px;color:var(--gray-500)">Nenhum comentário.</p>';
  }
}
async function sendComment(pid){
  const content=document.getElementById('cinput-'+pid).value.trim();
  if(!content) return;
  await fetch(`/api/posts/${pid}/comments`,{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify({content})});
  document.getElementById('cinput-'+pid).value='';
  const sec=document.getElementById('comments-'+pid);
  sec.classList.remove('show');sec.classList.add('show');
  toggleComments(pid);toggleComments(pid);
}
async function loadStockAlerts(){
  const data=await (await fetch('/api/products?status=low')).json();
  const el=document.getElementById('stock-alerts');
  if(!data.length){
    el.innerHTML='<p style="font-size:13px;color:var(--green)">✅ Todos com estoque normal.</p>';
    return;
  }
  el.innerHTML=data.map(p=>`
    <div style="padding:8px 0;border-bottom:1px solid var(--gray-100);font-size:13px">
      <strong>${p.name}</strong><br>
      <span style="color:var(--orange)">${p.quantity} kg (mín: ${p.min_quantity} kg)</span>
    </div>`).join('');
}

/* ═══════════════════════════════════════════════
   REPORTS
═══════════════════════════════════════════════ */
function renderReportTable(data){
  const tbody=document.getElementById('rep-tbody');
  if(!tbody) return;
  const total=data.reduce((s,p)=>s+p.quantity,0);
  const totEl=document.getElementById('rep-totals');
  if(totEl) totEl.textContent=`Total: ${total.toFixed(1)} kg | ${data.length} produto(s)`;
  tbody.innerHTML=data.map(p=>{
    const stsCls=p.quantity<=0?'status-empty':p.quantity<=p.min_quantity?'status-low':'status-ok';
    const stsTxt=p.quantity<=0?'Sem estoque':p.quantity<=p.min_quantity?'Estoque baixo':'Normal';
    return `<tr>
      <td style="font-weight:600">${p.name}</td>
      <td><span class="sku-badge">${p.sku}</span></td>
      <td><span class="cat-badge">${p.category||'–'}</span></td>
      <td style="font-weight:700">${p.quantity} kg</td>
      <td>${p.min_quantity} kg</td>
      <td><span class="status-badge ${stsCls}">${stsTxt}</span></td>
      <td style="color:var(--gray-500)">${p.location||'–'}</td>
    </tr>`;
  }).join('');

  setTimeout(()=>{
    const cats={};
    data.forEach(p=>{cats[p.category||'Outro']=(cats[p.category||'Outro']||0)+p.quantity;});
    const COLORS=chartPalette(7);
    const pieCtx=document.getElementById('chart-pie');
    const barCtx=document.getElementById('chart-bar');
    if(!pieCtx||!barCtx) return;
    if(chartPie) chartPie.destroy();
    if(chartBar) chartBar.destroy();
    chartPie=new Chart(pieCtx.getContext('2d'),{type:'doughnut',
      data:{labels:Object.keys(cats),datasets:[{data:Object.values(cats),
        backgroundColor:COLORS,borderWidth:3,borderColor:themeColor('--white')}]},
      options:{cutout:'60%',animation:{duration:700},
        plugins:{legend:{position:'bottom'}},maintainAspectRatio:false}});
    const top8=[...data].sort((a,b)=>b.quantity-a.quantity).slice(0,8);
    chartBar=new Chart(barCtx.getContext('2d'),{type:'bar',
      data:{labels:top8.map(p=>p.name),datasets:[{data:top8.map(p=>p.quantity),
        backgroundColor:activeChartTheme().colors[0],borderRadius:6}]},
      options:{animation:{duration:700},plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false}},y:{beginAtZero:true}},
        maintainAspectRatio:false}});
  },100);
}
async function loadReports(){ await loadProducts(); }

/* ═══════════════════════════════════════════════
   PROFILE
═══════════════════════════════════════════════ */
function loadProfile(){
  const u=currentUser;
  const ini=(u.full_name||u.username||'?')[0].toUpperCase();
  const avatarEl=document.getElementById('profile-avatar-big');
  avatarEl.innerHTML=u.avatar&&!u.avatar.startsWith('http')
    ?`<span style="font-size:40px">${u.avatar}</span>`:ini;
  document.getElementById('prof-name').textContent=u.full_name||u.username;
  document.getElementById('prof-role').textContent=u.role||'Funcionário';
  document.getElementById('prof-username').textContent='@'+u.username;
  document.getElementById('prof-email').textContent=u.email;
  document.getElementById('prof-age').textContent=u.age?u.age+' anos':'–';
  document.getElementById('prof-sector').textContent=u.sector||'–';
  document.getElementById('prof-since').textContent=u.created_at?formatDate(u.created_at):'–';
}
function openEditProfile(){
  const u=currentUser;
  document.getElementById('ep-name').value=u.full_name||'';
  document.getElementById('ep-age').value=u.age||'';
  document.getElementById('ep-role').value=u.role||'Funcionário';
  document.getElementById('ep-sector').value=u.sector||'';
  document.getElementById('ep-avatar').value=u.avatar||'';
  document.getElementById('modal-profile').classList.add('show');
}
async function saveProfile(){
  const d={
    full_name:document.getElementById('ep-name').value,
    age:document.getElementById('ep-age').value,
    role:document.getElementById('ep-role').value,
    sector:document.getElementById('ep-sector').value,
    avatar:document.getElementById('ep-avatar').value
  };
  await fetch('/api/auth/update-profile',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
  currentUser={...currentUser,...d};
  updateHeaderUser();closeModal('modal-profile');
  loadProfile();showToast('Perfil atualizado!','success');
}

/* ═══════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════ */
async function loadNotifications(){
  const data=await (await fetch('/api/notifications')).json();
  const unread=data.filter(n=>!n.read).length;
  document.getElementById('notif-dot').style.display=unread?'block':'none';
  const list=document.getElementById('notif-list');
  if(!data.length){
    list.innerHTML='<div style="padding:20px;text-align:center;font-size:13px;color:var(--gray-500)">Sem notificações</div>';
    return;
  }
  list.innerHTML=data.map(n=>`
    <div class="notif-item ${n.read?'':'unread'}">
      <div class="notif-title">${n.title}</div>
      <div class="notif-msg">${n.message}</div>
      <div class="notif-time">${formatDate(n.created_at)}</div>
    </div>`).join('');
}
async function markAllRead(){
  await fetch('/api/notifications/read-all',{method:'POST'});
  loadNotifications();
}

/* ═══════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════ */
function closeModal(id){document.getElementById(id).classList.remove('show');}
function openChartThemeModal(){
  renderChartThemeUI();
  document.getElementById('modal-chart-theme').classList.add('show');
}
function toggleNotifs(){
  document.getElementById('notif-panel').classList.toggle('show');
  document.getElementById('profile-dropdown').classList.remove('show');
}
function toggleProfileMenu(){
  document.getElementById('profile-dropdown').classList.toggle('show');
  document.getElementById('notif-panel').classList.remove('show');
}
function closeMenus(){
  document.getElementById('profile-dropdown').classList.remove('show');
  document.getElementById('notif-panel').classList.remove('show');
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.header-actions')) closeMenus();
});
function toggleSidebar(){document.getElementById('topnav-nav').classList.toggle('open');}
async function doLogout(){
  await fetch('/api/auth/logout',{method:'POST'});
  window.location='/login';
}
function handleSearch(q){
  if(document.getElementById('page-estoque').classList.contains('active')){
    document.getElementById('prod-search').value=q;
    loadProducts();
  }
}
function exportCSV(){window.location='/api/reports/export';}

function exportJSON(){
  if(!products.length){ showToast('Carregue o estoque primeiro','error'); return; }
  const data = products.map(p=>({
    nome: p.name, sku: p.sku, categoria: p.category,
    quantidade_kg: p.quantity, minimo_kg: p.min_quantity,
    localizacao: p.location, observacoes: p.observations,
    cadastrado_em: p.created_at
  }));
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'estoque_start.json';
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('JSON exportado!','success');
}

function exportXLSX(){
  if(!products.length){ showToast('Carregue o estoque primeiro','error'); return; }
  if(typeof XLSX === 'undefined'){ showToast('Biblioteca de Excel não carregada','error'); return; }
  const rows = [['Nome','SKU','Categoria','Quantidade (kg)','Mínimo (kg)','Localização','Observações','Cadastrado em']];
  products.forEach(p=> rows.push([p.name,p.sku,p.category,p.quantity,p.min_quantity,p.location,p.observations,p.created_at]));
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Estoque');
  XLSX.writeFile(wb, 'estoque_start.xlsx');
  showToast('Excel exportado!','success');
}

function exportPDF(){
  if(!products.length){ showToast('Carregue o estoque primeiro','error'); return; }
  if(typeof window.jspdf === 'undefined'){ showToast('Biblioteca de PDF não carregada','error'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'landscape'});
  doc.setFontSize(14);
  doc.text('START Reciclagem — Relatório de Estoque', 14, 15);
  doc.setFontSize(9);
  doc.text('Gerado em: '+new Date().toLocaleString('pt-BR'), 14, 22);
  doc.autoTable({
    startY: 28,
    head: [['Nome','SKU','Categoria','Qtd (kg)','Mín (kg)','Localização']],
    body: products.map(p=>[p.name,p.sku,p.category||'–',p.quantity,p.min_quantity,p.location||'–']),
    styles:{fontSize:8},
    headStyles:{fillColor:[30,58,95]}
  });
  doc.save('estoque_start.pdf');
  showToast('PDF exportado!','success');
}

document.addEventListener('click', e=>{
  if(!e.target.closest('#export-dropdown-wrap'))
    document.getElementById('export-menu')?.classList.remove('show');
});

function showToast(msg,type=''){
  const t=document.getElementById('toast');
  t.textContent=msg;t.className='toast show'+(type?' '+type:'');
  setTimeout(()=>t.className='toast',3200);
}
function formatDate(str){
  if(!str) return '–';
  const d=new Date(str);
  return d.toLocaleDateString('pt-BR')+' '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
}
function formatTime(str){
  if(!str) return '–';
  const d=new Date(str);
  const now=new Date();
  const diff=Math.floor((now-d)/60000);
  if(diff<1) return 'agora';
  if(diff<60) return diff+'m';
  if(diff<1440) return Math.floor(diff/60)+'h';
  return d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'});
}

/* ═══════════════════════════════════════════════
   CATEGORIAS (buscar / criar / popular selects)
═══════════════════════════════════════════════ */
async function loadCategories(){
  try{
    const res = await fetch('/api/categories');
    allCategories = await res.json();
  }catch(e){
    allCategories = ['Papel','Plástico','Metal','Vidro','Madeira','Borracha','Eletrônico'];
  }
  populateCategoryFilters();
}

function populateCategoryFilters(){
  // Native <select> filters (Estoque e Relatórios) — mantêm a opção "Todas"
  ['prod-cat','rep-cat'].forEach(id=>{
    const sel = document.getElementById(id);
    if(!sel) return;
    const current = sel.value;
    sel.innerHTML = '<option value="">Todas</option>' +
      allCategories.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    if(current && allCategories.includes(current)) sel.value = current;
  });
}

/* Combobox pesquisável + criação de categoria
   Usado em: cadastro/edição de produto (#p-cat) e gerador de SKU (#sku-cat) */
function catComboOpen(inputId){
  renderCatComboList(inputId, document.getElementById(inputId).value);
}

function catComboFilter(inputId){
  renderCatComboList(inputId, document.getElementById(inputId).value);
}

function renderCatComboList(inputId, query){
  const list = document.getElementById(inputId+'-list');
  if(!list) return;
  const q = (query||'').trim().toLowerCase();
  const matches = allCategories.filter(c=>c.toLowerCase().includes(q));
  const exactMatch = allCategories.some(c=>c.toLowerCase()===q);

  let html = matches.map(c=>
    `<div class="cat-combo-opt" onclick="catComboSelect('${inputId}','${c.replace(/'/g,"\\'")}')">${escapeHtml(c)}</div>`
  ).join('');

  if(!matches.length){
    html += `<div class="cat-combo-empty">Nenhuma categoria encontrada</div>`;
  }
  if(q && !exactMatch){
    html += `<div class="cat-combo-opt create" onclick="catComboCreate('${inputId}')">
      ${ICON_SVG.plus} Criar categoria "${escapeHtml(query)}"</div>`;
  }
  list.innerHTML = html;
  list.classList.add('show');
}

function catComboSelect(inputId, value){
  document.getElementById(inputId).value = value;
  document.getElementById(inputId+'-list').classList.remove('show');
}

async function catComboCreate(inputId){
  const input = document.getElementById(inputId);
  const name = input.value.trim();
  if(!name) return;
  const res = await fetch('/api/categories', {method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name})});
  const data = await res.json();
  if(data.error){ showToast(data.error,'error'); return; }
  if(!allCategories.includes(data.name)){
    allCategories.push(data.name);
    allCategories.sort((a,b)=>a.localeCompare(b,'pt-BR'));
  }
  populateCategoryFilters();
  input.value = data.name;
  document.getElementById(inputId+'-list').classList.remove('show');
  showToast('Categoria "'+data.name+'" criada!','success');
}

if(!window._catComboOutsideClick){
  window._catComboOutsideClick = true;
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.cat-combo')){
      document.querySelectorAll('.cat-combo-list').forEach(l=>l.classList.remove('show'));
    }
  });
}

/* ═══════════════════════════════════════════════
   KANBAN
═══════════════════════════════════════════════ */
let kanbanTasks = [];
let kanbanEditingId = null;
let kanbanDragId = null;

async function loadKanban(){
  const data = await (await fetch('/api/kanban/tasks')).json();
  kanbanTasks = data;
  renderKanban();
}

function renderKanban(){
  const cols = {todo:[], doing:[], review:[], done:[]};
  kanbanTasks.forEach(t=>{ (cols[t.status]||cols.todo).push(t); });
  const total = kanbanTasks.length;
  Object.keys(cols).forEach(status=>{
    const list = cols[status].sort((a,b)=>a.position-b.position);
    document.getElementById('kcount-'+status).textContent = list.length;
    const prog = document.getElementById('kprog-'+status);
    if(prog) prog.style.width = (total ? Math.round(list.length/total*100) : 0)+'%';
    const el = document.getElementById('kcol-'+status);
    if(!list.length){
      el.innerHTML = '<div class="kanban-empty">Sem tarefas nesta etapa</div>';
      return;
    }
    el.innerHTML = list.map(t=>{
      const prioLabel = ({alta:'Alta',media:'Média',baixa:'Baixa'})[t.priority]||t.priority;
      let dueHtml = '';
      if(t.due_date){
        const due = new Date(t.due_date+'T00:00:00');
        const today = new Date(); today.setHours(0,0,0,0);
        const overdue = due < today && t.status !== 'done';
        const label = due.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'});
        dueHtml = `<span class="kanban-due ${overdue?'overdue':''}">${overdue?'⏰ ':''}${label}</span>`;
      }
      const avatar = t.assignee ? `<span class="kanban-assignee-avatar" title="${escapeHtml(t.assignee)}">${escapeHtml(t.assignee).slice(0,2).toUpperCase()}</span>` : '';
      const labelsHtml = (t.labels||'').split(',').filter(Boolean).map(l=>
        `<span class="kanban-label kanban-label-${l}"></span>`).join('');
      return `
      <div class="kanban-card" draggable="true" data-id="${t.id}"
        ondragstart="kanbanDragStart(event,${t.id})" ondragend="kanbanDragEnd(event)"
        onclick="openKanbanTaskModal(null,${t.id})">
        ${labelsHtml?`<div class="kanban-card-labels">${labelsHtml}</div>`:''}
        <div class="kanban-card-title">${escapeHtml(t.title)}</div>
        ${t.description?`<div class="kanban-card-desc">${escapeHtml(t.description)}</div>`:''}
        <div class="kanban-card-foot">
          <div class="kanban-card-tags">
            <span class="kanban-prio ${t.priority}">${prioLabel}</span>
            ${dueHtml}
          </div>
          ${avatar}
        </div>
      </div>`;
    }).join('');
  });
  setupKanbanDropzones();
}

function escapeHtml(s){
  const div = document.createElement('div');
  div.textContent = s||'';
  return div.innerHTML;
}

function setupKanbanDropzones(){
  document.querySelectorAll('.kanban-col').forEach(col=>{
    col.ondragover = (e)=>{ e.preventDefault(); col.classList.add('drag-over'); };
    col.ondragleave = ()=> col.classList.remove('drag-over');
    col.ondrop = async (e)=>{
      e.preventDefault();
      col.classList.remove('drag-over');
      const status = col.dataset.status;
      if(kanbanDragId == null) return;
      const task = kanbanTasks.find(t=>t.id===kanbanDragId);
      if(!task || task.status===status){ return; }
      task.status = status;
      renderKanban();
      await fetch(`/api/kanban/tasks/${kanbanDragId}`, {method:'PUT', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({status})});
      loadKanban();
    };
  });
}

function kanbanDragStart(e, id){
  kanbanDragId = id;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}
function kanbanDragEnd(e){
  e.target.classList.remove('dragging');
  kanbanDragId = null;
}

function openKanbanTaskModal(status, taskId){
  kanbanEditingId = taskId || null;
  const deleteBtn = document.getElementById('kt-delete-btn');
  if(taskId){
    const t = kanbanTasks.find(x=>x.id===taskId);
    if(!t) return;
    document.getElementById('kanban-modal-title').textContent = 'Editar Tarefa';
    document.getElementById('kt-title').value = t.title;
    document.getElementById('kt-desc').value = t.description||'';
    document.getElementById('kt-priority').value = t.priority;
    document.getElementById('kt-assignee').value = t.assignee||'';
    document.getElementById('kt-due').value = t.due_date||'';
    document.getElementById('kt-status').value = t.status;
    setKanbanLabelSelection(t.labels||'');
    deleteBtn.style.display='block';
  } else {
    document.getElementById('kanban-modal-title').textContent = 'Nova Tarefa';
    document.getElementById('kt-title').value = '';
    document.getElementById('kt-desc').value = '';
    document.getElementById('kt-priority').value = 'media';
    document.getElementById('kt-assignee').value = '';
    document.getElementById('kt-due').value = '';
    document.getElementById('kt-status').value = status||'todo';
    setKanbanLabelSelection('');
    deleteBtn.style.display='none';
  }
  document.getElementById('modal-kanban-task').classList.add('show');
}

function setKanbanLabelSelection(labelsCsv){
  const active = (labelsCsv||'').split(',').filter(Boolean);
  document.querySelectorAll('#kt-labels .kanban-label-opt').forEach(btn=>{
    btn.classList.toggle('active', active.includes(btn.dataset.label));
  });
}

function getKanbanLabelSelection(){
  return Array.from(document.querySelectorAll('#kt-labels .kanban-label-opt.active'))
    .map(b=>b.dataset.label).join(',');
}

if(!window._kanbanLabelInit){
  window._kanbanLabelInit = true;
  document.addEventListener('click', (e)=>{
    const opt = e.target.closest('.kanban-label-opt');
    if(opt){ opt.classList.toggle('active'); }
  });
}

async function saveKanbanTask(){
  const title = document.getElementById('kt-title').value.trim();
  if(!title){ showToast('Informe um título para a tarefa','error'); return; }
  const payload = {
    title,
    description: document.getElementById('kt-desc').value.trim(),
    priority: document.getElementById('kt-priority').value,
    assignee: document.getElementById('kt-assignee').value.trim(),
    due_date: document.getElementById('kt-due').value || null,
    labels: getKanbanLabelSelection(),
    status: document.getElementById('kt-status').value
  };
  if(kanbanEditingId){
    await fetch(`/api/kanban/tasks/${kanbanEditingId}`, {method:'PUT', headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)});
  } else {
    await fetch('/api/kanban/tasks', {method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)});
  }
  closeModal('modal-kanban-task');
  loadKanban();
  showToast('Tarefa salva!','success');
}

async function deleteKanbanTask(){
  if(!kanbanEditingId) return;
  await fetch(`/api/kanban/tasks/${kanbanEditingId}`, {method:'DELETE'});
  closeModal('modal-kanban-task');
  loadKanban();
  showToast('Tarefa excluída','success');
}

/* ═══════════════════════════════════════════════
   PERSONALIZAR DASHBOARD
   (arrastar para reordenar, ocultar/exibir widgets,
   preferências salvas no localStorage)
═══════════════════════════════════════════════ */
const WIDGET_META = {
  'bc-evo':    {label:'Evolução Temporal'},
  'bc-cat':    {label:'Distribuição por Categoria'},
  'bc-top':    {label:'Estoque por Produto — Top 8'},
  'bc-health': {label:'Saúde do Estoque'},
  'bc-mov':    {label:'Últimas Movimentações'},
  'bc-alerts': {label:'Alertas Críticos'}
};

let dashboardLayout = {order: [], hidden: [], sizes: {}};
try{
  const saved = JSON.parse(localStorage.getItem('start_dashboard_layout')||'null');
  if(saved && Array.isArray(saved.order)) dashboardLayout = Object.assign({order:[],hidden:[],sizes:{}}, saved);
}catch(e){}

function saveDashboardLayout(){
  localStorage.setItem('start_dashboard_layout', JSON.stringify(dashboardLayout));
}

const WIDGET_SIZE_CYCLE = {
  'bc-evo':    ['bi-span-12','bi-span-8'],
  'bc-cat':    ['bi-span-5','bi-span-7','bi-span-12'],
  'bc-top':    ['bi-span-7','bi-span-5','bi-span-12'],
  'bc-health': ['bi-span-4','bi-span-6','bi-span-12'],
  'bc-mov':    ['bi-span-5','bi-span-7','bi-span-12'],
  'bc-alerts': ['bi-span-3','bi-span-5','bi-span-7']
};
// (resize cycle preserves each widget's natural default size as its starting point)

function cycleWidgetSize(id){
  const el = document.getElementById(id);
  if(!el) return;
  const cycle = WIDGET_SIZE_CYCLE[id];
  if(!cycle) return;
  const current = cycle.find(cls=>el.classList.contains(cls)) || cycle[0];
  const next = cycle[(cycle.indexOf(current)+1) % cycle.length];
  cycle.forEach(cls=>el.classList.remove(cls));
  el.classList.add(next);
  dashboardLayout.sizes[id] = next;
  saveDashboardLayout();
  // Charts need their canvas resized after the card changes width
  const chart = chartGetters[id.replace('bc-','')];
  setTimeout(()=>{ if(chart && chart()) chart().resize(); }, 320);
}

function applyDashboardLayout(){
  // Reorder widgets within each bi-grid based on saved order
  if(dashboardLayout.order.length){
    dashboardLayout.order.forEach(id=>{
      const el = document.getElementById(id);
      if(el && el.parentElement) el.parentElement.appendChild(el);
    });
  }
  // Apply hidden state
  Object.keys(WIDGET_META).forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.toggle('widget-hidden', dashboardLayout.hidden.includes(id));
  });
  // Apply saved sizes
  Object.keys(dashboardLayout.sizes||{}).forEach(id=>{
    const el = document.getElementById(id);
    const cycle = WIDGET_SIZE_CYCLE[id];
    if(!el || !cycle) return;
    cycle.forEach(cls=>el.classList.remove(cls));
    el.classList.add(dashboardLayout.sizes[id]);
  });
  renderHiddenWidgetsTray();
  if(document.body.classList.contains('customize-mode')) setupWidgetControls();
}

function renderHiddenWidgetsTray(){
  const tray = document.getElementById('hidden-widgets-tray');
  const list = document.getElementById('hidden-widgets-list');
  if(!tray || !list) return;
  // Bandeja visível sempre que houver widgets ocultos, não apenas durante a personalização.
  if(!dashboardLayout.hidden.length){
    tray.style.display = 'none';
    return;
  }
  tray.style.display = 'block';
  list.innerHTML = dashboardLayout.hidden.map(id=>
    `<div class="hidden-widget-chip" onclick="showWidget('${id}')">${ICON_SVG.eye} ${WIDGET_META[id]?.label||id}</div>`
  ).join('');
}

function toggleCustomizeMode(){
  const body = document.body;
  const btn = document.getElementById('customize-btn');
  const entering = !body.classList.contains('customize-mode');
  body.classList.toggle('customize-mode', entering);
  btn.classList.toggle('active', entering);
  const checkSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><polyline points="20 6 9 17 4 12"/></svg>';
  const layoutSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:3px"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>';
  btn.innerHTML = entering ? checkSvg+'Concluir Personalização' : layoutSvg+'Personalizar Dashboard';
  if(entering){
    setupWidgetControls();
    showToast('Arraste os cards para reorganizar ou use o ícone de olho para ocultar widgets','');
  } else {
    // Remove os controles injetados (grip/resize/eye) ao sair do modo de personalização
    document.querySelectorAll('.widget-controls').forEach(el=>el.remove());
    document.querySelectorAll('.bi-card[draggable]').forEach(el=>el.removeAttribute('draggable'));
    showToast('Layout do dashboard salvo!','success');
  }
  renderHiddenWidgetsTray();
}

function setupWidgetControls(){
  Object.keys(WIDGET_META).forEach(id=>{
    const card = document.getElementById(id);
    if(!card) return;
    card.setAttribute('draggable','true');
    if(!card.querySelector('.widget-controls')){
      const controls = document.createElement('div');
      controls.className = 'widget-controls';
      controls.innerHTML = `
        <button class="widget-drag-handle" title="Arrastar para reorganizar">${ICON_SVG.grip}</button>
        <button title="Redimensionar widget" onclick="cycleWidgetSize('${id}')">${ICON_SVG.resize}</button>
        <button title="Ocultar widget" onclick="hideWidget('${id}')">${ICON_SVG.eyeOff}</button>`;
      card.insertBefore(controls, card.firstChild);
    }
    card.ondragstart = (e)=>{
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', id);
      card.classList.add('dragging');
    };
    card.ondragend = ()=>{
      card.classList.remove('dragging');
      document.querySelectorAll('.bi-grid').forEach(g=>g.classList.remove('drag-over-grid'));
    };
  });

  document.querySelectorAll('.bi-grid').forEach(grid=>{
    grid.ondragover = (e)=>{
      if(!document.body.classList.contains('customize-mode')) return;
      e.preventDefault();
      grid.classList.add('drag-over-grid');
      const dragging = grid.querySelector('.bi-card.dragging');
      if(!dragging) return;
      const after = getDragAfterElement(grid, e.clientY);
      if(after == null) grid.appendChild(dragging);
      else grid.insertBefore(dragging, after);
    };
    grid.ondragleave = (e)=>{
      if(e.target === grid) grid.classList.remove('drag-over-grid');
    };
    grid.ondrop = (e)=>{
      e.preventDefault();
      grid.classList.remove('drag-over-grid');
      persistDashboardOrder();
    };
  });
}

function getDragAfterElement(grid, y){
  const cards = [...grid.querySelectorAll('.bi-card:not(.dragging)')];
  return cards.reduce((closest, child)=>{
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height/2;
    if(offset < 0 && offset > closest.offset){
      return {offset, element: child};
    }
    return closest;
  }, {offset: -Infinity}).element;
}

function persistDashboardOrder(){
  dashboardLayout.order = Object.keys(WIDGET_META).filter(id=>document.getElementById(id))
    .sort((a,b)=>{
      const all = [...document.querySelectorAll('.bi-card')];
      return all.indexOf(document.getElementById(a)) - all.indexOf(document.getElementById(b));
    });
  saveDashboardLayout();
}

function hideWidget(id){
  if(!dashboardLayout.hidden.includes(id)) dashboardLayout.hidden.push(id);
  document.getElementById(id)?.classList.add('widget-hidden');
  saveDashboardLayout();
  renderHiddenWidgetsTray();
}

function showWidget(id){
  dashboardLayout.hidden = dashboardLayout.hidden.filter(x=>x!==id);
  document.getElementById(id)?.classList.remove('widget-hidden');
  saveDashboardLayout();
  renderHiddenWidgetsTray();
}

// Start
init();
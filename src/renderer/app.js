/* ============================================================
   SkillHub · 本地 Skill 统一管理台（渲染层）
   ============================================================ */

/* ---------- 图标库 ---------- */
const ICONS = {
  search: '<circle cx="9" cy="9" r="5.5"/><path d="M13.2 13.2L17.5 17.5"/>',
  folder: '<path d="M2.75 6A1.75 1.75 0 0 1 4.5 4.25h3.1l1.7 2h6.2A1.75 1.75 0 0 1 17.25 8v6.75A1.75 1.75 0 0 1 15.5 16.5h-11A1.75 1.75 0 0 1 2.75 14.75V6z"/>',
  chevronRight: '<path d="M8 5l5 5-5 5"/>',
  chevronDown: '<path d="M5 8l5 5 5-5"/>',
  plus: '<path d="M10 4.5v11M4.5 10h11"/>',
  minus: '<path d="M4.5 10h11"/>',
  square: '<rect x="4.6" y="4.6" width="10.8" height="10.8" rx="2"/>',
  restore: '<rect x="3.6" y="6.2" width="9.4" height="9.4" rx="1.6"/><path d="M7.2 3.6h7.2a2 2 0 0 1 2 2v6"/>',
  refresh: '<path d="M3.8 10a6.2 6.2 0 0 1 10.5-4.4"/><path d="M14.6 2.6v3.3h-3.3"/><path d="M16.2 10a6.2 6.2 0 0 1-10.5 4.4"/><path d="M5.4 17.4v-3.3h3.3"/>',
  check: '<path d="M4.5 10.5l3.6 3.6 7.4-8.2"/>',
  alert: '<path d="M10 3.2L18 17H2L10 3.2z"/><path d="M10 8.2v4"/><circle cx="10" cy="14.6" r="0.9" fill="currentColor" stroke="none"/>',
  pencil: '<path d="M13.8 3.6l2.6 2.6-9.2 9.2-3.4.8.8-3.4 9.2-9.2z"/><path d="M12.4 5l2.6 2.6"/>',
  copy: '<rect x="7" y="7" width="9.5" height="9.5" rx="1.6"/><path d="M13 7V5.6A1.6 1.6 0 0 0 11.4 4H5.1A1.6 1.6 0 0 0 3.5 5.6v6.3A1.6 1.6 0 0 0 5.1 13.5H7"/>',
  trash: '<path d="M3.8 6h12.4"/><path d="M8 6V4.4h4V6"/><path d="M5.6 6l.7 9.7A1.4 1.4 0 0 0 7.7 17h4.6a1.4 1.4 0 0 0 1.4-1.3L14.4 6"/>',
  eye: '<path d="M1.8 10S4.8 5.2 10 5.2 18.2 10 18.2 10 15.2 14.8 10 14.8 1.8 10 1.8 10z"/><circle cx="10" cy="10" r="2.4"/>',
  fileText: '<path d="M5.6 3.5h4.6L14 7.3v8.2a1.5 1.5 0 0 1-1.5 1.5H5.6a1.5 1.5 0 0 1-1.5-1.5V5a1.5 1.5 0 0 1 1.5-1.5z"/><path d="M10.2 3.5v3.8H14"/><path d="M7.4 11.2h5.2M7.4 14h3.4"/>',
  code: '<path d="M7.4 6.2L3.6 10l3.8 3.8M12.6 6.2L16.4 10l-3.8 3.8"/>',
  package: '<path d="M10 2.8l7 3.4v7.6l-7 3.4-7-3.4V6.2l7-3.4z"/><path d="M3 6.2l7 3.4 7-3.4M10 9.6v7.6"/>',
  layers: '<path d="M10 2.8l7 3.4-7 3.4-7-3.4 7-3.4z"/><path d="M3 10l7 3.4L17 10M3 13.8L10 17.2l7-3.4"/>',
  x: '<path d="M5.2 5.2l9.6 9.6M14.8 5.2l-9.6 9.6"/>',
  more: '<circle cx="4.8" cy="10" r="1.3" fill="currentColor" stroke="none"/><circle cx="10" cy="10" r="1.3" fill="currentColor" stroke="none"/><circle cx="15.2" cy="10" r="1.3" fill="currentColor" stroke="none"/>',
  sliders: '<path d="M3 7h8"/><circle cx="13.6" cy="7" r="2"/><path d="M16.6 7h.4"/><path d="M3 13h2.4"/><circle cx="8" cy="13" r="2"/><path d="M10 13h7"/>',
  terminal: '<rect x="2.8" y="4.4" width="14.4" height="11.2" rx="1.8"/><path d="M6.2 9l2.4 2.4-2.4 2.4M10.8 13.8h3"/>',
  sparkle: '<path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6L10 3z"/>',
  gitBranch: '<circle cx="5.6" cy="5" r="1.8"/><circle cx="5.6" cy="15" r="1.8"/><path d="M5.6 6.8v6.4"/><path d="M5.6 11h4.6a3 3 0 0 0 3-3V6.6"/><circle cx="15" cy="5" r="1.8"/>',
  palette: '<path d="M10 3.2a6.8 6.8 0 1 0 0 13.6c1.1 0 1.7-.7 1.7-1.5 0-.5-.2-.9-.5-1.2-.3-.3-.5-.6-.5-1 0-.8.7-1.4 1.5-1.4h.6a3.7 3.7 0 0 0 3.7-3.7c0-.8-.6-1.4-1.5-1.4H10z"/><circle cx="7.2" cy="8.6" r="0.85" fill="currentColor" stroke="none"/><circle cx="10" cy="6.9" r="0.85" fill="currentColor" stroke="none"/><circle cx="12.8" cy="8.6" r="0.85" fill="currentColor" stroke="none"/>'
};

function svgIcon(name, size) {
  const s = size || 20;
  return `<svg viewBox="0 0 20 20" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}
function hydrateIcons(root) {
  (root || document).querySelectorAll('.ico[data-icon]').forEach(el => { el.innerHTML = svgIcon(el.dataset.icon); });
}
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const host = window.api || null;   // Electron preload 暴露的本地能力

/* ---------- 演示数据（仅在非 Electron 环境下使用） ---------- */
const DEMO = {
  ok: true, scannedAtText: '2026-10-07 23:30', duration: '4.2',
  skills: [
    mkDemo('pdf-extract', 'Claude', '#D97757', '从 PDF 抽取文本与表格，输出结构化 Markdown', true),
    mkDemo('cornell-notes', 'WorkBuddy', '#5E6AD2', '康奈尔笔记版式 A4 高清中文知识信息图', true),
    mkDemo('react-vite-e2e', 'CodeBuddy', '#22D3EE', 'React + Vite 项目构建与端到端验证流程', true),
    mkDemo('seedream-image-gen', 'WorkBuddy', '#5E6AD2', '火山方舟 Seedream 文生图与图生图', false),
    mkDemo('excel-handler', 'CodeBuddy', '#22D3EE', 'Excel 读写、公式构造与数据分析', true, ['frontmatter 缺少 description']),
    mkDemo('git-commit-helper', 'Cursor', '#A78BFA', '按约定式提交规范生成 commit 信息', true),
    mkDemo('obsidian-sync', 'Claude', '#D97757', 'Obsidian 笔记双向同步与全文索引', false)
  ],
  sources: [
    { key: 'Claude', path: '~/.claude/skills', count: 24, color: '#D97757', exists: true },
    { key: 'WorkBuddy', path: '~/.workbuddy/skills', count: 41, color: '#5E6AD2', exists: true },
    { key: 'CodeBuddy', path: '~/.codebuddy/skills', count: 18, color: '#22D3EE', exists: true },
    { key: 'Cursor', path: '~/.cursor/skills', count: 12, color: '#A78BFA', exists: true },
    { key: 'Codex', path: '~/.codex/skills', count: 9, color: '#10B981', exists: true },
    { key: 'Gemini', path: '~/.gemini/skills', count: 7, color: '#4285F4', exists: true },
    { key: '项目级', path: './.skills', count: 17, color: '#71717A', exists: true }
  ],
  conflicts: []
};
function mkDemo(name, source, color, description, enabled, problems) {
  return {
    id: 'demo:' + name, name, source, color, description,
    dir: '~/' + source.toLowerCase() + '/skills/' + name,
    skillFile: '~/' + source.toLowerCase() + '/skills/' + name + '/SKILL.md',
    raw: '---\nname: ' + name + '\ndescription: ' + description + '\n---\n\n# ' + name + '\n\n' + description + '。\n',
    version: 'v1.0.0', size: '4.2 KB', fileCount: 8, time: '2 小时前', updated: '2026-10-07 21:14',
    mtime: Date.now() - 7200000, enabled, problems: problems || [],
    files: [{ name: 'SKILL.md', isDir: false, size: '4.2 KB' }, { name: 'scripts/', isDir: true, size: '3 项' }]
  };
}

/* ---------- 状态 ---------- */
const state = {
  data: null,
  filter: 'all',
  source: null,
  keyword: '',
  selected: null,
  view: 'lib',
  // 编辑器
  file: null,
  original: '',
  dirty: false,
  changes: 0
};

/* ============================================================
   设计系统页
   ============================================================ */
const PLATFORM = { Claude: '#D97757', WorkBuddy: '#5E6AD2', CodeBuddy: '#22D3EE', Cursor: '#A78BFA', Codex: '#10B981', Gemini: '#4285F4', OpenCode: '#F59E0B', '项目级': '#71717A' };
const TOKENS = {
  surface: [
    { n: 'canvas', v: '#08090A', fg: '#F7F8F8', sub: '#8A8A93', border: '#2E2E33' },
    { n: 'surface-card', v: '#101113', fg: '#F7F8F8', sub: '#8A8A93', border: '#1F2023' },
    { n: 'surface-elevated', v: '#16181C', fg: '#F7F8F8', sub: '#8A8A93', border: '#1F2023' },
    { n: 'surface-hover', v: '#1C1C20', fg: '#F7F8F8', sub: '#8A8A93', border: '#1F2023' }
  ],
  border: [
    { n: 'border-subtle', v: '#1F2023', fg: '#F7F8F8', sub: '#B4B4B8', border: '#2E2E33' },
    { n: 'border-strong', v: '#2E2E33', fg: '#F7F8F8', sub: '#B4B4B8', border: '#3A3A42' }
  ],
  text: [
    { n: 'text-primary', v: '#F7F8F8', fg: '#08090A', sub: '#3A3A42', border: 'transparent' },
    { n: 'text-secondary', v: '#B4B4B8', fg: '#08090A', sub: '#3A3A42', border: 'transparent' },
    { n: 'text-tertiary', v: '#8A8A93', fg: '#08090A', sub: '#3A3A42', border: 'transparent' }
  ],
  semantic: [
    { n: 'accent-primary', v: '#5E6AD2', fg: '#FFFFFF', sub: '#E6E8FB', border: 'transparent' },
    { n: 'accent-hover', v: '#6E79E0', fg: '#FFFFFF', sub: '#E6E8FB', border: 'transparent' },
    { n: 'accent-secondary', v: '#22D3EE', fg: '#08090A', sub: '#123A42', border: 'transparent' },
    { n: 'success', v: '#10B981', fg: '#08090A', sub: '#0C4030', border: 'transparent' },
    { n: 'warning', v: '#F59E0B', fg: '#08090A', sub: '#5A3A05', border: 'transparent' },
    { n: 'danger', v: '#F43F5E', fg: '#FFFFFF', sub: '#FFE4E9', border: 'transparent' }
  ]
};
const TYPE_ROWS = [
  { spec: '24 / Bold', size: 24, weight: 700, color: 'var(--text-primary)', text: 'Skill 库总览' },
  { spec: '20 / SemiBold', size: 20, weight: 600, color: 'var(--text-primary)', text: '全部 Skill · 128 个' },
  { spec: '16 / SemiBold', size: 16, weight: 600, color: 'var(--text-primary)', text: 'pdf-extract · PDF 文本抽取' },
  { spec: '14 / Regular', size: 14, weight: 400, color: 'var(--text-secondary)', text: '统一管理本地所有 AI 客户端的 Skill 目录' },
  { spec: '13 / Regular', size: 13, weight: 400, color: 'var(--text-secondary)', text: '最近更新 · 2 小时前 · 4.2 KB' },
  { spec: '13 / Mono', size: 13, weight: 400, color: 'var(--accent-secondary)', mono: true, text: '~/.claude/skills/pdf-extract/SKILL.md' },
  { spec: '11 / Medium', size: 11, weight: 500, color: 'var(--text-tertiary)', text: '已启用 · 来源 Claude · 用户级' }
];
const SPACE_ROWS = [4, 8, 12, 16, 24, 32];
const RADIUS = [{ r: 4, l: '4 · sm' }, { r: 6, l: '6 · md' }, { r: 8, l: '8 · lg' }, { r: 12, l: '12 · xl' }, { r: 999, l: '999 · pill' }];

function renderSwatches(id, list) {
  $(id).innerHTML = list.map(t => `<div class="swatch" style="background:${t.v};border-color:${t.border}">
    <div class="sw-name" style="color:${t.fg}">${esc(t.n)}</div>
    <div class="sw-val" style="color:${t.sub}">${esc(t.v)}</div></div>`).join('');
}
function renderDesignSystem() {
  renderSwatches('dsSurface', TOKENS.surface);
  renderSwatches('dsBorder', TOKENS.border);
  renderSwatches('dsText', TOKENS.text);
  renderSwatches('dsSem', TOKENS.semantic);
  $('dsPlat').innerHTML = Object.entries(PLATFORM).map(([k, v]) => {
    const light = ['#F7F8F8', '#B4B4B8', '#22D3EE', '#10B981', '#F59E0B'].includes(v);
    return `<div class="swatch" style="background:${v};border-color:transparent">
      <div class="sw-name" style="color:${light ? '#08090A' : '#FFFFFF'}">${esc(k)}</div>
      <div class="sw-val" style="color:${light ? 'rgba(8,9,10,.55)' : 'rgba(255,255,255,.72)'}">${v}</div></div>`;
  }).join('');
  $('typeRows').innerHTML = TYPE_ROWS.map(t => `<div class="type-row">
    <span class="type-spec">${esc(t.spec)}</span>
    <span class="type-sample ${t.mono ? 'mono' : ''}" style="font-size:${t.size}px;font-weight:${t.weight};color:${t.color}">${esc(t.text)}</span></div>`).join('');
  $('spaceRows').innerHTML = `<div style="display:flex;flex-direction:column;gap:2px;margin-bottom:12px">${
    SPACE_ROWS.map(n => `<div class="space-row"><span class="space-spec">space · ${n}</span><span class="space-bar" style="width:${n}px"></span></div>`).join('')
  }</div>`;
  $('radiusGrid').innerHTML = RADIUS.map(r => `<div class="radius-box" style="border-radius:${r.r}px">${esc(r.l)}</div>`).join('');
}

/* ============================================================
   Skill 库
   ============================================================ */
function allSkills() { return (state.data && state.data.skills) || []; }

function conflictNames() {
  const set = new Set();
  (state.data.conflicts || []).forEach(c => { if (c.type === 'duplicate') set.add(c.name); });
  allSkills().forEach(s => { if (s.problems && s.problems.length) set.add(s.name); });
  return set;
}

function filtered() {
  const kw = state.keyword.trim().toLowerCase();
  const dup = conflictNames();
  return allSkills().filter(s => {
    if (state.filter === 'on' && !s.enabled) return false;
    if (state.filter === 'off' && s.enabled) return false;
    if (state.filter === 'conflict' && !dup.has(s.name)) return false;
    if (state.source && s.source !== state.source) return false;
    if (kw && !(s.name.toLowerCase().includes(kw) || (s.description || '').toLowerCase().includes(kw) || s.dir.toLowerCase().includes(kw))) return false;
    return true;
  }).sort((a, b) => b.mtime - a.mtime);
}

function renderSources() {
  const src = (state.data && state.data.sources) || [];
  $('sourceNav').innerHTML = src.map(s => `
    <div class="nav-row ${state.source === s.key ? 'active' : ''}" data-source="${esc(s.key)}">
      <span class="dot" style="background:${s.exists ? s.color : 'var(--text-muted)'}"></span>
      <span class="mono" style="font-size:11px">${esc(shortPath(s.path))} · ${s.count}</span>
      ${s.custom ? `<i class="ico" data-icon="x" data-remove="${esc(s.path)}" title="移除该目录" style="margin-left:auto;opacity:.55"></i>` : ''}
    </div>`).join('') +
    `<div class="nav-row" id="addSourceRow"><i class="ico" data-icon="plus"></i><span style="font-size:12px">添加目录</span></div>`;
  hydrateIcons($('sourceNav'));
}
function shortPath(p) {
  const home = (window.__home || '').replace(/\\/g, '/');
  let s = String(p).replace(/\\/g, '/');
  if (home && s.toLowerCase().startsWith(home.toLowerCase())) s = '~' + s.slice(home.length);
  return s;
}

function renderList() {
  const list = filtered();
  const el = $('skillList');
  const dup = conflictNames();
  if (!list.length) {
    el.innerHTML = `<div class="empty"><i class="ico" data-icon="search"></i><div>没有匹配的 Skill</div><div style="font-size:12px">试试更换关键词，或点击「重新扫描」刷新本地目录</div></div>`;
    hydrateIcons(el);
  } else {
    el.innerHTML = list.map(s => {
      const bad = s.problems && s.problems.length;
      const isDup = dup.has(s.name);
      const tag = bad ? s.problems[0] : (isDup ? '重名' : '');
      return `<div class="skill-row ${s.id === state.selected ? 'selected' : ''}" data-id="${esc(s.id)}" title="双击直接编辑 SKILL.md">
        <i class="ico sr-icon" data-icon="package"></i>
        <div class="sr-body">
          <div class="sr-title">
            <span class="sr-name">${esc(s.name)}</span>
            <span class="sr-source" style="color:${s.color}">${esc(s.source)}</span>
            ${tag ? `<span class="badge badge-${bad ? 'danger' : 'warning'}" style="height:16px;padding:0 6px;font-size:10px">${esc(tag)}</span>` : ''}
          </div>
          <div class="sr-desc">${esc(s.description)}</div>
        </div>
        <span class="sr-meta">${esc(s.size)} · ${esc(s.time)}</span>
        <div class="row-del" data-del="${esc(s.id)}" title="删除此 Skill"><i class="ico" data-icon="trash"></i></div>
        <div class="switch ${s.enabled ? 'on' : ''}" data-toggle="${esc(s.id)}" title="${s.enabled ? '点击停用' : '点击启用'}"><div class="knob"></div></div>
      </div>`;
    }).join('');
    hydrateIcons(el);
  }
  updateCounts();
  $('statusCount').textContent = `当前展示 ${list.length} 个 · 共 ${allSkills().length} 个 Skill`;
}

function updateCounts() {
  const all = allSkills();
  const dup = conflictNames();
  $('cntAll').textContent = all.length;
  $('cntOn').textContent = all.filter(s => s.enabled).length;
  $('cntOff').textContent = all.filter(s => !s.enabled).length;
  $('cntConflict').textContent = dup.size;
  document.querySelectorAll('#statusSeg .seg-item').forEach(it => {
    const f = it.dataset.filter;
    const n = f === 'all' ? all.length : f === 'on' ? all.filter(s => s.enabled).length : f === 'off' ? all.filter(s => !s.enabled).length : dup.size;
    const base = { all: '全部', on: '已启用', off: '已停用', conflict: '冲突' }[f];
    it.textContent = `${base} ${n}`;
  });
}

function renderInspector() {
  const s = allSkills().find(x => x.id === state.selected);
  const box = $('inspector');
  if (!s) {
    box.innerHTML = `<div class="empty"><i class="ico" data-icon="package"></i><div>未选择 Skill</div><div style="font-size:12px">在左侧列表点选一个 Skill 查看元数据与文件</div></div>`;
    hydrateIcons(box);
    return;
  }
  const bad = s.problems && s.problems.length;
  box.innerHTML = `
    <div class="insp-head">
      <div class="insp-title-row">
        <i class="ico" data-icon="package"></i>
        <span class="insp-name">${esc(s.name)}</span>
        <div class="switch lg ${s.enabled ? 'on' : ''}" data-toggle="${esc(s.id)}"><div class="knob"></div></div>
      </div>
      <div class="chips">
        <span class="chip"><span class="dot" style="background:${s.color}"></span>${esc(s.source)} · 用户级</span>
        <span class="badge badge-${bad ? 'danger' : 'success'}">${bad ? esc(s.problems[0]) : '已同步'}</span>
        <span class="badge badge-neutral">${esc(s.size)}</span>
      </div>
      <div class="insp-desc">${esc(s.description)}</div>
    </div>
    <div class="h-div"></div>
    <div class="insp-sec">
      <div class="sec-label">元数据</div>
      <div class="meta-row"><span class="meta-key">路径</span><span class="meta-val path">${esc(shortPath(s.dir))}</span></div>
      <div class="meta-row"><span class="meta-key">版本</span><span class="meta-val">${esc(s.version)}</span></div>
      <div class="meta-row"><span class="meta-key">大小</span><span class="meta-val mono">${esc(s.size)} · ${s.fileCount} 个文件</span></div>
      <div class="meta-row"><span class="meta-key">更新</span><span class="meta-val mono">${esc(s.updated)} · ${esc(s.time)}</span></div>
      ${s.allowedTools ? `<div class="meta-row"><span class="meta-key">工具</span><span class="meta-val mono">${esc(s.allowedTools)}</span></div>` : ''}
    </div>
    <div class="h-div"></div>
    <div class="insp-sec">
      <div class="sec-label">关联文件</div>
      ${s.files.map(f => `<div class="file-row" data-open="${esc(s.dir)}" data-file="${esc(f.name)}">
          <i class="ico" data-icon="${f.isDir ? 'folder' : 'fileText'}"></i>
          <span>${esc(f.name)}</span><span class="file-size">${esc(f.size)}</span></div>`).join('')}
    </div>
    <div class="insp-spacer"></div>
    <div class="action-bar">
      <div class="btn btn-primary" id="editSkillBtn"><i class="ico" data-icon="pencil"></i>编辑 SKILL.md</div>
      <div class="btn btn-secondary" id="copyPathBtn"><i class="ico" data-icon="copy"></i>复制路径</div>
      <div class="icon-btn" id="revealSkillBtn"><i class="ico" data-icon="terminal"></i></div>
      <span class="fb-spacer"></span>
      <div class="icon-btn" id="deleteSkillBtn" title="删除此 Skill（移入回收站）" style="color:var(--danger)"><i class="ico" data-icon="trash"></i></div>
      <div class="icon-btn" id="moreSkillBtn"><i class="ico" data-icon="more"></i></div>
    </div>`;
  hydrateIcons(box);
}

/* ============================================================
   编辑器
   ============================================================ */
function lineClass(text, inFm) {
  const t = text.trim();
  if (t === '---') return 'c-punc';
  if (inFm) return 'c-fm';
  if (/^#{1,6}\s/.test(t)) return 'c-head';
  if (/^\s*[-*+]\s|^\s*\d+\.\s/.test(t)) return 'c-body';
  return 'c-body';
}

function buildLines(content) {
  const lines = String(content).replace(/\r\n/g, '\n').split('\n');
  let inFm = false, closed = false;
  return lines.map((t, i) => {
    if (i === 0 && t.trim() === '---') { inFm = true; }
    else if (inFm && !closed && t.trim() === '---') { inFm = false; closed = true; }
    return { text: t, cls: lineClass(t, inFm) };
  });
}

function renumber() {
  let inFm = false, closed = false;
  document.querySelectorAll('#editor .code-line').forEach((line, i) => {
    const code = line.querySelector('.cl-code');
    const t = code.textContent;
    if (i === 0 && t.trim() === '---') inFm = true;
    else if (inFm && !closed && t.trim() === '---') { inFm = false; closed = true; }
    line.querySelector('.cl-no').textContent = i + 1;
    code.className = 'cl-code ' + lineClass(t, inFm);
  });
}

function renderEditor(content) {
  const lines = buildLines(content);
  $('editor').innerHTML = lines.map((l, i) => `
    <div class="code-line" data-line="${i + 1}">
      <span class="cl-no">${i + 1}</span>
      <span class="cl-code ${l.cls}" contenteditable="plaintext-only" spellcheck="false">${esc(l.text)}</span>
    </div>`).join('') ||
    `<div class="code-line"><span class="cl-no">1</span><span class="cl-code c-body" contenteditable="plaintext-only" spellcheck="false"></span></div>`;
}

function editorContent() {
  return [...document.querySelectorAll('#editor .cl-code')].map(e => e.textContent).join('\n');
}

/** 行内 Markdown：`code`、**bold**、*italic*、[text](url) */
function inlineMd(s) {
  let h = esc(s);
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<span class="pv-link">$1</span>');
  return h;
}

/**
 * Markdown 预览：把连续正文行合并成一个段落、连续列表项合并为一组。
 * 原实现「一个源文件行 = 一个 div」，多行段落会一行贴一行，看起来就是上下行挤在一起。
 */
function renderPreview(content) {
  const lines = String(content).replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let inFm = false, closed = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const tr = raw.trim();
    if (!closed && tr === '---') {
      if (!inFm) { inFm = true; continue; }
      inFm = false; closed = true; continue;     // frontmatter 不参与预览
    }
    if (inFm) continue;

    if (/^```/.test(tr)) {                       // 代码块整体收进来
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) { buf.push(lines[i]); i++; }
      blocks.push({ type: 'code', items: buf });
      continue;
    }
    if (!tr) continue;                           // 空行仅作段落分隔

    let m;
    if ((m = tr.match(/^(#{1,6})\s+(.*)$/))) {
      blocks.push({ type: 'h', level: m[1].length, items: [m[2]] });
    } else if ((m = tr.match(/^([-*+]|\d+\.)\s+(.*)$/))) {
      const ordered = /^\d+\.$/.test(m[1]);
      const last = blocks[blocks.length - 1];
      if (last && last.type === (ordered ? 'ol' : 'ul')) last.items.push(m[2]);
      else blocks.push({ type: ordered ? 'ol' : 'ul', items: [m[2]] });
    } else if ((m = tr.match(/^>\s?(.*)$/))) {
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'quote') last.items.push(m[1]);
      else blocks.push({ type: 'quote', items: [m[1]] });
    } else if (/^(-{3,}|\*{3,}|_{3,})$/.test(tr)) {
      blocks.push({ type: 'hr' });
    } else {
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'p') last.items.push(tr);   // 续行并入同一段落
      else blocks.push({ type: 'p', items: [tr] });
    }
  }

  const html = [];
  blocks.forEach(b => {
    if (b.type === 'p') {
      html.push(`<p class="pv-p">${inlineMd(b.items.join(' '))}</p>`);
    } else if (b.type === 'h') {
      html.push(`<div class="${b.level === 1 ? 'pv-h1' : b.level === 2 ? 'pv-h2' : 'pv-h3'}">${inlineMd(b.items[0])}</div>`);
    } else if (b.type === 'ul' || b.type === 'ol') {
      html.push(`<div class="pv-list">`);
      b.items.forEach((it, k) => {
        const marker = b.type === 'ol' ? (k + 1) + '.' : '·';
        html.push(`<div class="pv-li"><span class="li-n mono">${marker}</span><span>${inlineMd(it)}</span></div>`);
      });
      html.push('</div>');
    } else if (b.type === 'code') {
      html.push(`<pre class="pv-code mono">${esc(b.items.join('\n'))}</pre>`);
    } else if (b.type === 'quote') {
      html.push(`<div class="pv-quote">${inlineMd(b.items.join(' '))}</div>`);
    } else if (b.type === 'hr') {
      html.push('<div class="pv-hr"></div>');
    }
  });

  $('pvBody').innerHTML = html.join('') || '<p class="pv-p" style="color:var(--text-tertiary)">暂无正文内容</p>';
}

function validateFrontmatter(content) {
  const lines = String(content).split('\n');
  const errs = [];
  if (!lines.length || lines[0].trim() !== '---') return { ok: false, errs: ['缺少 frontmatter'] };
  let hasName = false, hasDesc = false, closed = false;
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    if (l.trim() === '---') { closed = true; break; }
    const m = l.match(/^\s*([A-Za-z0-9_-]+)\s*:/);
    if (m) {
      const k = m[1].toLowerCase();
      if (k === 'name') hasName = !!l.split(':').slice(1).join(':').trim();
      if (k === 'description') hasDesc = !!l.split(':').slice(1).join(':').trim();
    }
  }
  if (!closed) errs.push('frontmatter 未闭合');
  if (!hasName) errs.push('缺少 name');
  if (!hasDesc) errs.push('缺少 description');
  return { ok: errs.length === 0, errs };
}

function setDirty(dirty) {
  state.dirty = dirty;
  const v = validateFrontmatter(editorContent());
  $('dirtyBadge').style.display = dirty ? 'inline-flex' : 'none';
  $('checkBadge').textContent = v.errs.length;
  $('checkBadge').className = 'mini-badge ' + (v.errs.length ? 'warn' : 'ok');
  $('edValidate').textContent = v.ok ? 'frontmatter 校验通过' : v.errs.join(' · ');
  $('edValidate').className = v.ok ? 'ok-text' : 'warn-text';
  const n = v.errs.length;
  $('changeBadge').textContent = dirty ? (state.changes || 1) : 0;
  $('changeBadge').className = 'mini-badge ' + (dirty ? 'warn' : 'ok');
  $('pvChangeInfo').textContent = dirty ? '有未保存更改' : '无未保存更改';
  $('pvChangeInfo').className = dirty ? 'warn-text' : 'ok-text';
  return n;
}

async function openInEditor(skillId) {
  const s = allSkills().find(x => x.id === skillId);
  if (!s) { toast('请先选择一个 Skill'); return; }
  state.selected = skillId;
  let content = s.raw || '';
  if (host) {
    const r = await host.readFile(s.skillFile);
    if (r && r.ok) content = r.content; else toast('读取失败：' + (r && r.error));
  }
  state.file = s.skillFile;
  state.dir = s.dir;
  state.original = content;
  state.changes = 0;
  $('editCrumb').innerHTML = `/&nbsp; ${esc(s.name)} &nbsp;/&nbsp; SKILL.md`;
  $('editTabName').textContent = 'SKILL.md';
  $('editFileInfo').textContent = `Markdown · UTF-8 · ${esc(shortPath(s.skillFile))}`;
  $('editSkillNav').innerHTML = `
    <div class="nav-row active"><i class="ico" data-icon="package"></i><span>${esc(s.name)}</span></div>
    <div class="nav-row"><i class="ico" data-icon="fileText"></i><span class="mono">SKILL.md</span></div>`;
  $('editFileNav').innerHTML = s.files.map(f => `
    <div class="nav-row ${f.name === 'SKILL.md' ? 'active' : ''}" ${f.isDir ? '' : `data-file="${esc(f.name)}" data-dir="${esc(s.dir)}"`}>
      <i class="ico" data-icon="${f.isDir ? 'folder' : 'fileText'}"></i>
      <span class="mono">${esc(f.name)}</span></div>`).join('') ||
    `<div class="nav-row"><span style="font-size:12px">无附加文件</span></div>`;
  hydrateIcons(document);
  renderEditor(content);
  renderPreview(content);
  setDirty(false);
  switchView('edit');
}

/** 打开 Skill 目录下的任意文件（如 scripts/ 里的 .py 也支持） */
async function openFileByPath(fullPath, label) {
  let content = '';
  if (host) {
    const r = await host.readFile(fullPath);
    if (!r || !r.ok) { toast('读取失败：' + ((r && r.error) || '')); return; }
    content = r.content;
  }
  state.file = fullPath;
  state.original = content;
  state.changes = 0;
  $('editCrumb').innerHTML = `/&nbsp; ${esc(label)}`;
  $('editTabName').textContent = label;
  $('editFileInfo').textContent = `UTF-8 · ${esc(shortPath(fullPath))}`;
  renderEditor(content);
  renderPreview(content);
  setDirty(false);
  switchView('edit');
}

async function saveFile() {
  if (!state.file) { toast('没有打开的文件'); return; }
  const content = editorContent();
  if (host) {
    const r = await host.writeFile(state.file, content);
    if (!r || !r.ok) { toast('保存失败：' + ((r && r.error) || '未知错误')); return; }
  }
  state.original = content;
  state.changes = 0;
  setDirty(false);
  toast('已保存到 ' + shortPath(state.file));
  renderPreview(content);
  await rescan(true);
}

/* ============================================================
   扫描与冲突
   ============================================================ */
function renderScan() {
  const d = state.data;
  const all = allSkills();
  const dup = (d.conflicts || []).filter(c => c.type === 'duplicate');
  const invalid = (d.conflicts || []).filter(c => c.type === 'invalid');
  const fresh = all.filter(s => Date.now() - s.mtime < 86400000).length;

  $('statRow').innerHTML = `
    <div class="stat-card"><div class="stat-label">Skill 总数</div><div class="stat-val">${all.length}</div><div class="stat-sub">来自 ${(d.sources || []).filter(s => s.exists).length} 个目录</div></div>
    <div class="stat-card"><div class="stat-label">新发现</div><div class="stat-val cyan">${fresh}</div><div class="stat-sub">最近 24 小时更新</div></div>
    <div class="stat-card"><div class="stat-label">命名冲突</div><div class="stat-val amber">${dup.length}</div><div class="stat-sub">${dup.length ? '需要处理' : '无冲突'}</div></div>
    <div class="stat-card"><div class="stat-label">校验错误</div><div class="stat-val red">${invalid.length}</div><div class="stat-sub">${invalid.length ? 'frontmatter 不完整' : '全部通过'}</div></div>`;

  const cards = [];
  dup.forEach(c => {
    cards.push(`<div class="conflict-card" data-id="dup:${esc(c.name)}">
      <div class="cc-head">
        <i class="ico" data-icon="alert"></i>
        <span class="cc-name">${esc(c.name)}</span>
        <span class="badge badge-warning">重名 · ${esc(c.sources.join(' 与 '))} 各有一份</span>
        <span class="cc-time mono">${esc(d.scannedAtText || '')}</span>
      </div>
      ${c.items.map((it, i) => `
        <div class="src-row ${i === 0 ? '' : 'plain'}">
          <span class="dot" style="background:${it.color}"></span>
          <span class="path-text">${esc(it.source)} · ${esc(shortPath(it.dir))} · ${esc(it.version)} · ${esc(it.size)}</span>
          <span class="rec-badge ${i === 0 ? 'rec' : 'plain'}">${i === 0 ? '推荐保留（最近更新）' : '旧版本'}</span>
        </div>`).join('')}
      <div class="cc-actions">
        <div class="btn btn-primary" data-act="open" data-skill="${esc(c.items[0].dir)}">在编辑器中打开</div>
        <div class="btn btn-secondary" data-act="reveal" data-skill="${esc(c.items[0].dir)}">显示所在目录</div>
        <div class="btn btn-ghost" data-act="ignore">忽略</div>
      </div>
    </div>`);
  });
  invalid.forEach(c => {
    cards.push(`<div class="conflict-card" data-id="inv:${esc(c.name)}">
      <div class="cc-head">
        <i class="ico" data-icon="alert"></i>
        <span class="cc-name">${esc(c.name)}</span>
        <span class="badge badge-danger">校验错误 · ${esc(c.problems.join('、'))}</span>
        <span class="cc-time mono">${esc(d.scannedAtText || '')}</span>
      </div>
      <div class="src-row"><span class="dot" style="background:${c.color}"></span>
        <span class="path-text">${esc(c.source)} · ${esc(shortPath(c.skillFile))}</span></div>
      <div class="cc-hint">缺少的字段会导致该 Skill 在列表中无法展示摘要，也会影响其他客户端的加载判断。可直接在编辑器里补全 frontmatter。</div>
      <div class="cc-actions">
        <div class="btn btn-primary" data-act="open" data-skill="${esc(c.dir)}"><i class="ico" data-icon="sparkle"></i>在编辑器中修复</div>
        <div class="btn btn-secondary" data-act="reveal" data-skill="${esc(c.dir)}">显示所在目录</div>
        <div class="btn btn-ghost" data-act="ignore">忽略</div>
      </div>
    </div>`);
  });

  $('conflictList').innerHTML = cards.length ? cards.join('') :
    `<div class="conflict-card"><div class="cc-head"><i class="ico" data-icon="check" style="color:#10B981"></i>
      <span class="cc-name">未发现冲突</span><span class="badge badge-success">全部通过</span></div>
      <div class="cc-hint">所有 Skill 的 frontmatter 完整，且没有跨目录重名。</div></div>`;

  const t = (d.scannedAtText || '—').slice(11) || '—';
  const roots = (d.roots || []).map(shortPath).join(' · ') || '—';
  const hitSrc = (d.sources || []).filter(s => s.exists).length;
  $('scanLog').innerHTML = [
    `${t}&nbsp;&nbsp;扫描用户目录 ${esc(roots)} · 命中 ${hitSrc} 个 AI 客户端的 skill 目录`,
    `${t}&nbsp;&nbsp;读取 ${all.length} 个 SKILL.md · 检出命名冲突 ${dup.length} 个 · 校验错误 ${invalid.length} 个`,
    `${t}&nbsp;&nbsp;完成 · 耗时 ${d.duration || '0.0'}s`
  ].map((l, i) => `<div class="log-line mono ${i === 1 && (dup.length || invalid.length) ? 'amber' : i === 2 ? 'ok' : ''}">${l}</div>`).join('');

  $('scanSub').textContent = `上次全量扫描 · ${d.scannedAtText || '—'} · 耗时 ${d.duration || '0.0'}s · ${all.length} 个 Skill · 根目录 ${roots}`;
  $('statusScan').textContent = `上次扫描 ${d.scannedAtText || '—'} · ${(d.sources || []).filter(s => s.exists).length} 个目录`;
  hydrateIcons($('conflictList'));
}

async function rescan(silent) {
  if (host) {
    const r = await host.scan();
    if (r && r.ok !== false) {
      state.data = r;
      if (!silent) toast(`扫描完成 · ${r.skills.length} 个 Skill`);
    } else {
      state.data = { ok: false, skills: [], sources: [], conflicts: [], scannedAtText: '扫描失败', duration: '0' };
      toast('扫描失败：' + ((r && r.error) || '未知错误'));
    }
  } else {
    state.data = DEMO;
  }
  if (!state.selected || !allSkills().some(s => s.id === state.selected)) {
    state.selected = allSkills().length ? allSkills()[0].id : null;
  }
  $('tbMeta').textContent = `${allSkills().length} 个 Skill · ${(state.data.sources || []).filter(s => s.exists).length} 个目录`;
  renderSources(); renderList(); renderInspector(); renderScan();
}

/* ============================================================
   通用 UI
   ============================================================ */
let toastTimer = null;
function toast(msg) {
  const t = $('toast');
  $('toastText').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ============================================================
   外观设置：主题 / 强调色 / 字体大小
   ============================================================ */
const THEMES = [
  {
    id: 'midnight', name: '午夜 Midnight', desc: '默认深色 · 开发者工具语言',
    preview: 'linear-gradient(135deg, #08090A 0%, #16181C 100%)',
    swatches: ['#08090A', '#16181C', '#5E6AD2', '#22D3EE'],
    tokens: {
      '--canvas': '#08090A', '--shell-bg': '#050607',
      '--surface-card': '#101113', '--surface-elevated': '#16181C', '--surface-hover': '#1C1C20', '--surface-active': '#22222A', '--surface-sunken': '#0B0C0E',
      '--border-subtle': '#1F2023', '--border-strong': '#2E2E33',
      '--text-primary': '#F7F8F8', '--text-secondary': '#B4B4B8', '--text-tertiary': '#8A8A93', '--text-muted': '#3A3A42',
      '--accent-primary': '#5E6AD2', '--accent-hover': '#6E79E0', '--accent-secondary': '#22D3EE', '--accent-light': '#8B94E8', '--accent-soft': '#202339',
      '--code-bg': '#0D0E10', '--code-text': '#D6D6DA'
    }
  },
  {
    id: 'forest', name: '森林 Forest', desc: '深林渐变 · 苔绿与松针',
    preview: 'linear-gradient(160deg, #071410 0%, #0E2A20 55%, #174534 100%)',
    swatches: ['#071410', '#0E2A20', '#174534', '#34D399'],
    tokens: {
      '--canvas': 'linear-gradient(160deg, #071410 0%, #0E2A20 55%, #174534 100%)',
      '--shell-bg': 'linear-gradient(160deg, #061210 0%, #0C251C 100%)',
      '--surface-card': 'rgba(198,255,224,.05)', '--surface-elevated': 'rgba(198,255,224,.08)', '--surface-hover': 'rgba(198,255,224,.12)', '--surface-active': 'rgba(198,255,224,.16)', '--surface-sunken': 'rgba(0,0,0,.22)',
      '--border-subtle': 'rgba(198,255,224,.10)', '--border-strong': 'rgba(198,255,224,.18)',
      '--text-primary': '#E9FFF5', '--text-secondary': '#AFD3C2', '--text-tertiary': '#82A893', '--text-muted': '#4E6B5E',
      '--accent-primary': '#34D399', '--accent-hover': '#4FE0A8', '--accent-secondary': '#A7F3D0', '--accent-light': '#6EE7B7', '--accent-soft': 'rgba(52,211,153,.16)',
      '--code-bg': 'rgba(0,0,0,.28)', '--code-text': '#D7F5E6'
    }
  },
  {
    id: 'ocean', name: '海边 Ocean', desc: '海岸渐变 · 深海到浅滩',
    preview: 'linear-gradient(160deg, #06131F 0%, #0A2E47 55%, #12557A 100%)',
    swatches: ['#06131F', '#0A2E47', '#12557A', '#38BDF8'],
    tokens: {
      '--canvas': 'linear-gradient(160deg, #06131F 0%, #0A2E47 55%, #12557A 100%)',
      '--shell-bg': 'linear-gradient(160deg, #05101A 0%, #08263A 100%)',
      '--surface-card': 'rgba(186,230,253,.05)', '--surface-elevated': 'rgba(186,230,253,.08)', '--surface-hover': 'rgba(186,230,253,.12)', '--surface-active': 'rgba(186,230,253,.16)', '--surface-sunken': 'rgba(0,0,0,.24)',
      '--border-subtle': 'rgba(186,230,253,.10)', '--border-strong': 'rgba(186,230,253,.18)',
      '--text-primary': '#E8F7FF', '--text-secondary': '#A9CBDE', '--text-tertiary': '#7C9DB2', '--text-muted': '#4C6A7C',
      '--accent-primary': '#38BDF8', '--accent-hover': '#53C7FA', '--accent-secondary': '#7DD3FC', '--accent-light': '#7DD3FC', '--accent-soft': 'rgba(56,189,248,.16)',
      '--code-bg': 'rgba(0,0,0,.28)', '--code-text': '#D6EEFB'
    }
  },
  {
    id: 'sunset', name: '日落 Sunset', desc: '暮色渐变 · 晚霞与暖沙',
    preview: 'linear-gradient(160deg, #1B0D1A 0%, #3B1631 55%, #6B2438 100%)',
    swatches: ['#1B0D1A', '#3B1631', '#6B2438', '#FB923C'],
    tokens: {
      '--canvas': 'linear-gradient(160deg, #1B0D1A 0%, #3B1631 55%, #6B2438 100%)',
      '--shell-bg': 'linear-gradient(160deg, #170B16 0%, #33132B 100%)',
      '--surface-card': 'rgba(255,214,196,.05)', '--surface-elevated': 'rgba(255,214,196,.08)', '--surface-hover': 'rgba(255,214,196,.12)', '--surface-active': 'rgba(255,214,196,.16)', '--surface-sunken': 'rgba(0,0,0,.24)',
      '--border-subtle': 'rgba(255,214,196,.10)', '--border-strong': 'rgba(255,214,196,.18)',
      '--text-primary': '#FFF2EE', '--text-secondary': '#DCB2B8', '--text-tertiary': '#A9818C', '--text-muted': '#6B4B53',
      '--accent-primary': '#FB923C', '--accent-hover': '#FCA55B', '--accent-secondary': '#F472B6', '--accent-light': '#FDBA74', '--accent-soft': 'rgba(251,146,60,.16)',
      '--code-bg': 'rgba(0,0,0,.28)', '--code-text': '#F6DCD6'
    }
  },
  {
    id: 'aurora', name: '极光 Aurora', desc: '夜空渐变 · 紫与青的极光带',
    preview: 'linear-gradient(160deg, #0A1020 0%, #1B1B4B 50%, #123A45 100%)',
    swatches: ['#0A1020', '#1B1B4B', '#123A45', '#A78BFA'],
    tokens: {
      '--canvas': 'linear-gradient(160deg, #0A1020 0%, #1B1B4B 50%, #123A45 100%)',
      '--shell-bg': 'linear-gradient(160deg, #080D1B 0%, #16163C 100%)',
      '--surface-card': 'rgba(199,210,254,.05)', '--surface-elevated': 'rgba(199,210,254,.08)', '--surface-hover': 'rgba(199,210,254,.12)', '--surface-active': 'rgba(199,210,254,.16)', '--surface-sunken': 'rgba(0,0,0,.26)',
      '--border-subtle': 'rgba(199,210,254,.10)', '--border-strong': 'rgba(199,210,254,.18)',
      '--text-primary': '#EEF1FF', '--text-secondary': '#B0B4D8', '--text-tertiary': '#8489AC', '--text-muted': '#545A78',
      '--accent-primary': '#A78BFA', '--accent-hover': '#B79DFB', '--accent-secondary': '#22D3EE', '--accent-light': '#C4B5FD', '--accent-soft': 'rgba(167,139,250,.16)',
      '--code-bg': 'rgba(0,0,0,.30)', '--code-text': '#DCDDF5'
    }
  },
  {
    id: 'graphite', name: '石墨 Graphite', desc: '中性灰 · 无彩低干扰',
    preview: 'linear-gradient(135deg, #0E0F11 0%, #1B1E22 100%)',
    swatches: ['#0E0F11', '#1B1E22', '#272A2F', '#93C5FD'],
    tokens: {
      '--canvas': '#0E0F11', '--shell-bg': '#0B0C0E',
      '--surface-card': '#15171A', '--surface-elevated': '#1B1E22', '--surface-hover': '#212428', '--surface-active': '#272A2F', '--surface-sunken': '#0B0C0E',
      '--border-subtle': '#23262A', '--border-strong': '#33373C',
      '--text-primary': '#F2F3F4', '--text-secondary': '#B0B3B7', '--text-tertiary': '#86898E', '--text-muted': '#56595E',
      '--accent-primary': '#93C5FD', '--accent-hover': '#A9D2FE', '--accent-secondary': '#67E8F9', '--accent-light': '#BFDBFE', '--accent-soft': 'rgba(147,197,253,.14)',
      '--code-bg': '#0C0D0F', '--code-text': '#D3D5D8'
    }
  }
];

const ACCENTS = [
  { n: '靛蓝', v: '#5E6AD2' }, { n: '青', v: '#22D3EE' }, { n: '翠绿', v: '#34D399' }, { n: '琥珀', v: '#F59E0B' },
  { n: '玫红', v: '#F43F5E' }, { n: '紫', v: '#A78BFA' }, { n: '蓝', v: '#4285F4' }, { n: '橙', v: '#FB923C' }
];

const APPEARANCE_DEFAULT = { id: 'midnight', accent: null, fontScale: 100 };
let appearance = Object.assign({}, APPEARANCE_DEFAULT);

function parseHex(h) {
  const s = String(h).replace('#', '');
  const v = s.length === 3 ? s.split('').map(c => c + c).join('') : s;
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}
function mixWhite(hex, p) {
  const [r, g, b] = parseHex(hex);
  const f = c => Math.min(255, Math.round(c + (255 - c) * p));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}
function rgbaStr(hex, a) {
  const [r, g, b] = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function currentTheme() { return THEMES.find(t => t.id === appearance.id) || THEMES[0]; }
function currentAccent() { return appearance.accent || currentTheme().tokens['--accent-primary']; }

function applyAppearance() {
  const t = currentTheme();
  const root = document.documentElement;
  Object.keys(t.tokens).forEach(k => root.style.setProperty(k, t.tokens[k]));
  if (appearance.accent) {
    root.style.setProperty('--accent-primary', appearance.accent);
    root.style.setProperty('--accent-hover', mixWhite(appearance.accent, .18));
    root.style.setProperty('--accent-light', mixWhite(appearance.accent, .46));
    root.style.setProperty('--accent-soft', rgbaStr(appearance.accent, .16));
  }
  root.style.setProperty('--fs-scale', (appearance.fontScale / 100).toFixed(2));
}

let apSaveTimer = null;
function saveAppearance() {
  if (!host || !host.setTheme) return;
  clearTimeout(apSaveTimer);
  apSaveTimer = setTimeout(() => host.setTheme(Object.assign({}, appearance)), 220);
}

function renderAppearance() {
  const t = currentTheme();
  const accent = currentAccent();
  $('themeGrid').innerHTML = THEMES.map(x => `
    <div class="theme-card ${x.id === appearance.id ? 'active' : ''}" data-theme="${esc(x.id)}">
      <div class="tc-preview" style="background:${x.preview}"></div>
      <div class="tc-meta">
        <div class="tc-name">${x.id === appearance.id ? '<i class="ico" data-icon="check"></i>' : ''}${esc(x.name)}</div>
        <div class="tc-desc">${esc(x.desc)}</div>
        <div class="tc-sw">${x.swatches.map(c => `<i style="background:${c}"></i>`).join('')}</div>
      </div>
    </div>`).join('');
  hydrateIcons($('themeGrid'));

  $('accentRow').innerHTML = ACCENTS.map(a => `
    <div class="accent-dot ${appearance.accent === a.v ? 'active' : ''}" data-accent="${a.v}" title="${esc(a.n)} ${a.v}" style="background:${a.v}"></div>`).join('') +
    `<div class="accent-dot ${appearance.accent ? '' : 'active'}" data-accent="" title="跟随主题" style="background:linear-gradient(135deg, ${t.tokens['--accent-primary']}, ${t.tokens['--accent-secondary']})"></div>`;

  $('fsRange').value = appearance.fontScale;
  $('fsVal').textContent = appearance.fontScale + '%';
  $('themeVal').textContent = t.name;
  $('accentVal').textContent = appearance.accent || '跟随主题';
}

function openAppearance() {
  renderAppearance();
  $('appearanceModal').classList.add('show');
}
function closeAppearance() { $('appearanceModal').classList.remove('show'); }

function bindAppearance() {
  document.querySelectorAll('.js-theme-btn').forEach(btn => {
    btn.addEventListener('click', openAppearance);
  });
  $('apClose').addEventListener('click', closeAppearance);
  $('apDone').addEventListener('click', () => { closeAppearance(); toast('外观已保存'); });
  $('appearanceModal').addEventListener('click', e => { if (e.target === $('appearanceModal')) closeAppearance(); });

  $('themeGrid').addEventListener('click', e => {
    const card = e.target.closest('[data-theme]');
    if (!card) return;
    appearance.id = card.dataset.theme;
    applyAppearance(); renderAppearance(); saveAppearance();
  });
  $('accentRow').addEventListener('click', e => {
    const dot = e.target.closest('[data-accent]');
    if (!dot) return;
    appearance.accent = dot.dataset.accent || null;
    applyAppearance(); renderAppearance(); saveAppearance();
  });
  $('fsRange').addEventListener('input', e => {
    appearance.fontScale = Number(e.target.value);
    applyAppearance();
    $('fsVal').textContent = appearance.fontScale + '%';
    saveAppearance();
  });
  $('apReset').addEventListener('click', () => {
    appearance = Object.assign({}, APPEARANCE_DEFAULT);
    applyAppearance(); renderAppearance(); saveAppearance();
    toast('已恢复默认外观');
  });
}

/* ============================================================
   04 Skill 推荐（在线 Skill 市场）
   ============================================================ */
const REC_SITES = [
  {
    id: 'colaskill',
    name: 'Cola Skill',
    url: 'https://colaskill.com/zh/',
    tagline: '精选真正有用的 Skill，让每个任务都有更好的解法',
    desc: '依托 Cola 生态的 AI 工作流与提示词聚合站，覆盖短视频工业化、长篇小说、海报 / Logo、求职辅导、浏览器自动化、SEO 等高频场景，配多维筛选导航。',
    tags: ['中文', '工作流', '提示词', '综合'],
    cat: '综合聚合',
    color: '#F43F5E',
    badge: '中文首选'
  },
  {
    id: 'qiaomu',
    name: '乔木 Skill 推荐网',
    url: 'https://skills.qiaomu.ai',
    tagline: '按类别精选 Agent Skills · 结合公开热度与 GitHub 原始文档',
    desc: '收录超 200 项技术组件，按前端 / React / Next.js / 设计 UI / 移动端 / Agent 工作流 / 数据库 / 测试 / DevOps 等类目归档，支持安装榜与社区榜切换。',
    tags: ['中文', '分类细', '热度榜', 'GitHub'],
    cat: '综合聚合',
    color: '#10B981',
    badge: '分类最全'
  },
  {
    id: 'skillsmp',
    name: 'SkillsMP',
    url: 'https://skillsmp.com/zh',
    tagline: 'Agent Skills Marketplace · Codex & Claude Skills',
    desc: '整合海量开源 AI 编程辅助工具，多维筛选快速定位能力，提供公开 API 调用（按账户认证划分每日配额），兼容主流代码交互终端。',
    tags: ['中英', 'API', 'Codex', 'Claude'],
    cat: '综合聚合',
    color: '#5E6AD2',
    badge: '有 API'
  },
  {
    id: 'claude-market',
    name: 'Claude Skills Market',
    url: 'https://www.claudeskillsmarket.com/',
    tagline: '社区贡献 + 14 周免费教学 + 自动安全校验',
    desc: '免费社区库与上传通道并存，含自动化安全校验、社区评分、复合指令与隔离执行上下文，并设专属佣金板，兼容多种 AI 编码接口。',
    tags: ['英文', '社区', '安全校验', '教学'],
    cat: 'Claude 生态',
    color: '#D97757'
  },
  {
    id: 'aiskill-market',
    name: 'AI Skill Market',
    url: 'https://aiskill.market/',
    tagline: 'Install production-ready AI capabilities in 60 seconds',
    desc: '面向 Claude Code / MCP / 开源模型的零配置部署中心，覆盖自动化测试、代码重构、视频生成、安全审计等模块，并为开发者提供变现渠道。',
    tags: ['英文', 'MCP', 'Claude Code', '变现'],
    cat: 'Claude 生态',
    color: '#22D3EE'
  },
  {
    id: 'ruanyf-thread',
    name: '阮一峰周刊 · skillsmp 自荐帖',
    url: 'https://github.com/ruanyf/weekly/issues/8210',
    tagline: '中文社区对 Skill 聚合站的讨论与补充清单',
    desc: 'GitHub Issue 形式的社区自荐与评论，能看到中文开发者实际在用的 Skill 站与踩坑经验，适合作为挑选 Skill 市场时的交叉参考。',
    tags: ['中文', '社区讨论', 'GitHub'],
    cat: '社区参考',
    color: '#A78BFA'
  },
  {
    id: 'zhihu-top10',
    name: '十个顶级 Claude Code Skills',
    url: 'https://zhuanlan.zhihu.com/p/2020611868054622964',
    tagline: '知乎专栏 · 中文向的 Claude Code Skill 精选清单',
    desc: '按实战价值整理的 Claude Code Skill 推荐文章，可作为「先装哪几个」的入门参考，配合本地 SkillHub 一键落盘。',
    tags: ['中文', '榜单', '入门'],
    cat: '社区参考',
    color: '#F59E0B'
  },
  {
    id: 'aibase-skills',
    name: 'AIbase · Skills Marketplace 入口',
    url: 'https://top.aibase.com/tool/skills-marketplace',
    tagline: 'AI 工具导航站对 Skills Marketplace 的收录页',
    desc: 'AIbase 工具目录里的 Skills Marketplace 入口，附带同类工具推荐与简介，适合从工具导航视角横向比较各 Skill 市场。',
    tags: ['中文', '工具导航', '对比'],
    cat: '社区参考',
    color: '#71717A'
  }
];

const REC_CATS = ['全部', '综合聚合', 'Claude 生态', '社区参考'];

const recState = { cat: '全部', kw: '' };

function filteredRecs() {
  const kw = recState.kw.trim().toLowerCase();
  return REC_SITES.filter(s => {
    if (recState.cat !== '全部' && s.cat !== recState.cat) return false;
    if (!kw) return true;
    const hay = [s.name, s.tagline, s.desc, s.cat, (s.badge || ''), (s.tags || []).join(' ')].join(' ').toLowerCase();
    return hay.includes(kw);
  });
}

function hostOf(url) {
  try { return new URL(url).host; } catch (e) { return url; }
}

function renderRecCats() {
  const seg = $('recCatSeg');
  if (!seg) return;
  seg.innerHTML = REC_CATS.map(c => {
    const n = c === '全部' ? REC_SITES.length : REC_SITES.filter(s => s.cat === c).length;
    return `<div class="seg-item ${recState.cat === c ? 'active' : ''}" data-cat="${esc(c)}">${esc(c)} ${n}</div>`;
  }).join('');
}

function renderRecs() {
  renderRecCats();
  const list = filteredRecs();
  const grid = $('recGrid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = `<div class="empty rec-empty"><i class="ico" data-icon="search"></i>
      <div>没有匹配的站点</div>
      <div style="font-size:calc(12px * var(--fs-scale))">换个关键词，或把分类切回「全部」</div></div>`;
    hydrateIcons(grid);
  } else {
    grid.innerHTML = list.map(s => `
      <a class="rec-card" data-url="${esc(s.url)}" data-id="${esc(s.id)}" href="${esc(s.url)}" title="${esc(s.url)}">
        <div class="rc-head">
          <span class="rc-fav" style="background:${s.color}">${esc(s.name.slice(0, 1).toUpperCase())}</span>
          <div class="rc-title-g">
            <div class="rc-title">${esc(s.name)}
              ${s.badge ? `<span class="badge badge-accent rc-badge">${esc(s.badge)}</span>` : ''}
            </div>
            <div class="rc-host mono">${esc(hostOf(s.url))}</div>
          </div>
          <i class="ico rc-open" data-icon="chevronRight"></i>
        </div>
        <div class="rc-tagline">${esc(s.tagline)}</div>
        <div class="rc-desc">${esc(s.desc)}</div>
        <div class="rc-tags">
          <span class="chip rc-cat"><span class="dot" style="background:${s.color}"></span>${esc(s.cat)}</span>
          ${(s.tags || []).map(t => `<span class="chip rc-tag">${esc(t)}</span>`).join('')}
        </div>
        <div class="rc-foot">
          <span class="rc-url mono">${esc(s.url)}</span>
          <span class="rc-open-hint">在浏览器打开 <i class="ico" data-icon="chevronRight"></i></span>
        </div>
      </a>`).join('');
    hydrateIcons(grid);
  }
  $('recCount').textContent = `共 ${list.length} / ${REC_SITES.length} 个站点`;
}

async function openRecUrl(url) {
  if (!url) return;
  if (host && host.openExternal) {
    const r = await host.openExternal(url);
    if (!r || !r.ok) toast('打开失败：' + ((r && r.error) || '未知错误'));
    else toast('已在系统浏览器打开');
  } else {
    // 非 Electron 环境兜底：新窗口打开
    window.open(url, '_blank', 'noopener');
  }
}

function bindRecs() {
  const grid = $('recGrid');
  if (!grid) return;
  grid.addEventListener('click', e => {
    const card = e.target.closest('.rec-card');
    if (!card) return;
    e.preventDefault();
    openRecUrl(card.dataset.url);
  });
  const seg = $('recCatSeg');
  if (seg) seg.addEventListener('click', e => {
    const it = e.target.closest('.seg-item');
    if (!it) return;
    recState.cat = it.dataset.cat;
    renderRecs();
  });
  const input = $('recSearchInput');
  if (input) input.addEventListener('input', e => {
    recState.kw = e.target.value;
    renderRecs();
  });
}

/* ============================================================
   可拖拽分栏（左栏 / 右栏，宽度持久化到本地配置）
   ============================================================ */
const LAYOUT_DEFAULT = { sidebar: 260, aside: 440 };
const LAYOUT_RANGE = { sidebar: [180, 520], aside: [300, 820] };

function setPaneWidth(pane, w) {
  const range = LAYOUT_RANGE[pane] || [180, 520];
  const v = Math.round(Math.min(Math.max(w, range[0]), range[1]));
  document.documentElement.style.setProperty(pane === 'sidebar' ? '--sidebar-w' : '--aside-w', v + 'px');
  state.layout = state.layout || Object.assign({}, LAYOUT_DEFAULT);
  state.layout[pane] = v;
}

function applyLayout(l) {
  const s = Object.assign({}, LAYOUT_DEFAULT, l || {});
  setPaneWidth('sidebar', s.sidebar);
  setPaneWidth('aside', s.aside);
}

function saveLayout() {
  if (host && host.setLayout && state.layout) host.setLayout(Object.assign({}, state.layout));
}

function initResizers() {
  document.querySelectorAll('.resizer').forEach(r => {
    const pane = r.dataset.pane;
    if (pane !== 'sidebar' && pane !== 'aside') return;
    const dir = pane === 'sidebar' ? 1 : -1;
    const target = pane === 'sidebar' ? r.previousElementSibling : r.nextElementSibling;
    if (!target) return;

    r.addEventListener('mousedown', e => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = target.getBoundingClientRect().width;
      r.classList.add('dragging');
      document.body.classList.add('resizing');
      const onMove = ev => setPaneWidth(pane, startW + dir * (ev.clientX - startX));
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        r.classList.remove('dragging');
        document.body.classList.remove('resizing');
        saveLayout();
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp, { once: true });
    });

    r.addEventListener('dblclick', () => {
      setPaneWidth(pane, LAYOUT_DEFAULT[pane]);
      saveLayout();
      toast('栏宽已复位');
    });
  });
}

/* ============================================================
   删除 Skill · 二次确认后移入系统回收站
   ============================================================ */
let pendingDelete = null;

function openDeleteDialog(s) {
  if (!s) return;
  pendingDelete = s;
  $('delName').textContent = s.name;
  $('delSource').textContent = `${s.source} · ${s.enabled ? '已启用' : '已停用'}`;
  $('delSize').textContent = `${s.size} · ${s.fileCount} 个文件`;
  $('delPath').textContent = s.dir;
  $('deleteModal').classList.add('show');
}

function closeDeleteDialog() {
  $('deleteModal').classList.remove('show');
  pendingDelete = null;
}

async function confirmDelete() {
  const s = pendingDelete;
  if (!s) return;
  if (!host) { closeDeleteDialog(); toast('删除需运行在 Electron 中'); return; }
  const r = await host.deleteSkill(s.dir);
  closeDeleteDialog();
  if (!r || !r.ok) { toast('删除失败：' + ((r && r.error) || '未知错误')); return; }
  if (state.selected === s.id) state.selected = null;
  if (state.file && String(state.file).replace(/\\/g, '/').startsWith(String(s.dir).replace(/\\/g, '/'))) {
    state.file = null; state.original = ''; setDirty(false);
  }
  toast(`已移入回收站 · ${s.name}`);
  await rescan(true);
}

function switchView(v) {
  state.view = v;
  document.querySelectorAll('.tb-tab').forEach(b => b.classList.toggle('active', b.dataset.view === v));
  document.querySelectorAll('.view').forEach(s => s.classList.toggle('active', s.id === 'view-' + v));
  if (v === 'rec') renderRecs();
}

async function toggleSkill(id) {
  const s = allSkills().find(x => x.id === id);
  if (!s) return;
  const next = !s.enabled;
  if (host) {
    const r = await host.setEnabled(s.dir, next);
    if (!r || r.ok === false) { toast('切换失败：' + ((r && r.error) || '未知错误')); return; }
  }
  s.enabled = next;
  renderList(); renderInspector();
  toast(`${s.name} 已${next ? '启用' : '停用'}`);
}

function bind() {
  // 视图切换
  document.querySelectorAll('.tb-tab').forEach(b => b.addEventListener('click', () => switchView(b.dataset.view)));

  // 窗口控制
  if (host) {
    $('btnMin').addEventListener('click', () => host.minimize());
    $('btnMax').addEventListener('click', () => host.maximize());
    $('btnClose').addEventListener('click', () => host.close());
    host.onMaximizedChange(max => {
      const btn = $('btnMax');
      btn.innerHTML = `<i class="ico" data-icon="${max ? 'restore' : 'square'}"></i>`;
      hydrateIcons(btn);
    });
  } else {
    ['btnMin', 'btnMax', 'btnClose'].forEach(id => $(id).addEventListener('click', () => toast('桌面端窗口控制需运行在 Electron 中')));
  }

  // 筛选
  $('overviewNav').addEventListener('click', e => {
    const row = e.target.closest('.nav-row');
    if (!row) return;
    state.source = null;
    state.filter = row.dataset.filter;
    document.querySelectorAll('#overviewNav .nav-row').forEach(r => r.classList.toggle('active', r === row));
    document.querySelectorAll('#statusSeg .seg-item').forEach(it => it.classList.toggle('active', it.dataset.filter === state.filter));
    renderSources(); renderList();
    $('crumb').innerHTML = '/&nbsp;&nbsp;' + row.querySelector('span').textContent;
  });
  $('statusSeg').addEventListener('click', e => {
    const it = e.target.closest('.seg-item');
    if (!it) return;
    state.filter = it.dataset.filter;
    document.querySelectorAll('#statusSeg .seg-item').forEach(x => x.classList.toggle('active', x === it));
    document.querySelectorAll('#overviewNav .nav-row').forEach(r => r.classList.toggle('active', r.dataset.filter === state.filter));
    renderList();
  });
  $('sourceNav').addEventListener('click', async e => {
    const rm = e.target.closest('[data-remove]');
    if (rm) {
      e.stopPropagation();
      if (host) {
        const r = await host.removeSource(rm.dataset.remove);
        if (r && r.ok) { toast('已移除目录'); await rescan(true); }
      }
      return;
    }
    const row = e.target.closest('.nav-row');
    if (!row) return;
    if (row.id === 'addSourceRow') {
      if (host) {
        const p = await host.pickDirectory();
        if (p) {
          const r = await host.addSource(p);
          if (r && r.ok) { toast('已添加目录：' + shortPath(p)); await rescan(true); }
          else toast('添加失败：' + ((r && r.error) || ''));
        }
      } else toast('目录选择需运行在 Electron 中');
      return;
    }
    state.source = state.source === row.dataset.source ? null : row.dataset.source;
    renderSources(); renderList();
  });

  $('globalSearch').addEventListener('input', e => { state.keyword = e.target.value; renderList(); });

  // 列表交互
  $('skillList').addEventListener('click', e => {
    const del = e.target.closest('[data-del]');
    if (del) {
      e.stopPropagation();
      openDeleteDialog(allSkills().find(x => x.id === del.dataset.del));
      return;
    }
    const sw = e.target.closest('.switch');
    if (sw) { toggleSkill(sw.dataset.toggle); return; }
    const row = e.target.closest('.skill-row');
    if (row) {
      state.selected = row.dataset.id;
      // ★ 只切换选中态、不重建列表：重建会把当前节点从 DOM 摘掉，
      //   浏览器随后判定第二下点击落在「新元素」上，dblclick 永远不会派发（双击进编辑器的根因）
      $('skillList').querySelectorAll('.skill-row').forEach(r => {
        r.classList.toggle('selected', r.dataset.id === state.selected);
      });
      renderInspector();
    }
  });
  // 双击直接进入编辑器（落在开关 / 删除按钮上时不触发，避免误进）
  $('skillList').addEventListener('dblclick', e => {
    if (e.target.closest('.switch') || e.target.closest('[data-del]')) return;
    const row = e.target.closest('.skill-row');
    if (row) { e.preventDefault(); openInEditor(row.dataset.id); }
  });

  // 检查器
  $('inspector').addEventListener('click', async e => {
    const sw = e.target.closest('.switch');
    if (sw) { toggleSkill(sw.dataset.toggle); return; }
    if (e.target.closest('#editSkillBtn')) { openInEditor(state.selected); return; }
    if (e.target.closest('#copyPathBtn')) {
      const s = allSkills().find(x => x.id === state.selected);
      if (s && navigator.clipboard) { navigator.clipboard.writeText(s.dir); toast('已复制路径'); }
      return;
    }
    if (e.target.closest('#revealSkillBtn') || e.target.closest('#moreSkillBtn')) {
      const s = allSkills().find(x => x.id === state.selected);
      if (s && host) host.showInFolder(s.skillFile);
      return;
    }
    if (e.target.closest('#deleteSkillBtn')) {
      openDeleteDialog(allSkills().find(x => x.id === state.selected));
      return;
    }
    const f = e.target.closest('.file-row');
    if (f && host) openInEditor(state.selected);
  });

  // 顶栏动作
  $('rescanBtn').addEventListener('click', () => rescan(false));
  $('rescanBtn2').addEventListener('click', () => rescan(false));
  $('addDirBtn').addEventListener('click', async () => {
    if (!host) return toast('目录选择需运行在 Electron 中');
    const p = await host.pickDirectory();
    if (!p) return;
    const r = await host.addSource(p);
    if (r && r.ok) { toast('已添加目录：' + shortPath(p)); await rescan(true); }
    else toast('添加失败：' + ((r && r.error) || ''));
  });

  $('newSkillBtn').addEventListener('click', async () => {
    if (!host) return toast('新建 Skill 需运行在 Electron 中');
    const name = (window.prompt('新建 Skill 名称（小写字母 / 数字 / 连字符）', 'my-new-skill') || '').trim();
    if (!name) return;
    const src = (state.data.sources || []).filter(s => s.exists);
    if (!src.length) return toast('没有可用的 Skill 目录，请先添加目录');
    const pick = (state.source && src.find(s => s.key === state.source)) || src[0];
    const r = await host.createSkill(pick.path, name);
    if (!r || !r.ok) return toast('创建失败：' + ((r && r.error) || '未知错误'));
    toast('已创建 ' + name + ' · ' + pick.key);
    await rescan(true);
    const created = allSkills().find(s => s.dir === r.dir);
    if (created) openInEditor(created.id);
  });
  $('openFolderBtn').addEventListener('click', () => {
    const s = allSkills().find(x => x.id === state.selected);
    if (s && host) host.showInFolder(s.dir);
  });

  // 编辑器
  $('saveBtn').addEventListener('click', saveFile);
  $('saveBtn2').addEventListener('click', saveFile);
  $('discardBtn').addEventListener('click', () => {
    if (!state.file) return;
    renderEditor(state.original); renderPreview(state.original); setDirty(false);
    toast('已放弃更改');
  });
  $('revealBtn').addEventListener('click', () => { if (state.file && host) host.showInFolder(state.file); });

  // 编辑器侧栏：打开 Skill 目录下的其它文件
  $('editFileNav').addEventListener('click', async e => {
    const row = e.target.closest('[data-file]');
    if (!row) return;
    const full = row.dataset.dir.replace(/[\\/]+$/, '') + '/' + row.dataset.file;
    await openFileByPath(full, row.dataset.file);
    document.querySelectorAll('#editFileNav .nav-row').forEach(r => r.classList.toggle('active', r === row));
  });
  $('editSeg').addEventListener('click', e => {
    const it = e.target.closest('.seg-item');
    if (!it) return;
    document.querySelectorAll('#editSeg .seg-item').forEach(x => x.classList.toggle('active', x === it));
  });

  const ed = $('editor');
  ed.addEventListener('input', () => { renumber(); state.changes++; setDirty(true); updatePos(); renderPreview(editorContent()); });
  ed.addEventListener('click', updatePos);
  ed.addEventListener('keyup', updatePos);
  ed.addEventListener('focusin', e => {
    document.querySelectorAll('#editor .code-line').forEach(l => l.classList.remove('active'));
    const line = e.target.closest('.code-line');
    if (line) line.classList.add('active');
    updatePos();
  });
  ed.addEventListener('keydown', e => {
    const code = e.target.closest('.cl-code');
    if (!code) return;
    const line = code.closest('.code-line');
    if (e.key === 'Enter') {
      e.preventDefault();
      const div = document.createElement('div');
      div.className = 'code-line';
      div.innerHTML = '<span class="cl-no"></span><span class="cl-code c-body" contenteditable="plaintext-only" spellcheck="false"></span>';
      line.after(div);
      renumber(); state.changes++; setDirty(true);
      div.querySelector('.cl-code').focus();
    } else if (e.key === 'Backspace' && code.textContent === '' && line.previousElementSibling) {
      e.preventDefault();
      const prev = line.previousElementSibling;
      line.remove();
      renumber(); state.changes++; setDirty(true);
      const prevCode = prev.querySelector('.cl-code');
      prevCode.focus();
      placeCaretAtEnd(prevCode);
    }
  });

  // 冲突卡
  $('conflictList').addEventListener('click', async e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const card = btn.closest('.conflict-card');
    const act = btn.dataset.act;
    if (act === 'ignore') {
      card.style.opacity = '.45';
      card.querySelector('.cc-actions').innerHTML = '<span class="log-line">已忽略 · 本次会话不再提示</span>';
      return;
    }
    if (act === 'reveal') { if (host) host.showInFolder(btn.dataset.skill); return; }
    if (act === 'open') {
      const dir = btn.dataset.skill;
      const s = allSkills().find(x => x.dir === dir) || allSkills().find(x => x.name === card.dataset.id.split(':')[1]);
      if (s) openInEditor(s.id);
      return;
    }
  });

  // 外观设置
  bindAppearance();

  // Skill 推荐（在线市场）
  bindRecs();

  // 删除确认弹窗
  $('deleteModal').addEventListener('click', e => { if (e.target === $('deleteModal')) closeDeleteDialog(); });
  $('delCancel').addEventListener('click', closeDeleteDialog);
  $('delConfirm').addEventListener('click', confirmDelete);

  // 分栏拖拽
  initResizers();

  // 快捷键
  window.addEventListener('keydown', e => {
    const meta = e.metaKey || e.ctrlKey;
    if (e.key === 'Escape' && $('deleteModal').classList.contains('show')) { closeDeleteDialog(); return; }
    if (meta && e.key.toLowerCase() === 'k') { e.preventDefault(); switchView('lib'); $('globalSearch').focus(); }
    if (meta && e.key.toLowerCase() === 's') { e.preventDefault(); saveFile(); }
    if (e.key === 'Escape' && document.activeElement === $('globalSearch')) { $('globalSearch').value = ''; state.keyword = ''; renderList(); }
    if (e.key === 'Escape' && document.activeElement === $('recSearchInput')) { $('recSearchInput').value = ''; recState.kw = ''; renderRecs(); }
  });
}

/** 把光标放到元素内容末尾（删除整行后回到上一行行尾，符合编辑器直觉） */
function placeCaretAtEnd(el) {
  if (!el) return;
  const r = document.createRange();
  r.selectNodeContents(el);
  r.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(r);
}

function updatePos() {
  const sel = window.getSelection();
  if (!sel || !sel.anchorNode) return;
  const node = sel.anchorNode.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode;
  const code = node.closest ? node.closest('.cl-code') : null;
  const line = node.closest ? node.closest('.code-line') : null;
  if (!code || !line) return;
  const idx = [...document.querySelectorAll('#editor .code-line')].indexOf(line) + 1;
  const col = (sel.anchorOffset || 0) + 1;
  $('edPos').innerHTML = `行 ${idx} · 列 ${col}&nbsp;&nbsp;&nbsp;共 ${document.querySelectorAll('#editor .code-line').length} 行&nbsp;&nbsp;&nbsp;Markdown&nbsp;&nbsp;&nbsp;UTF-8`;
}

/* ---------- 启动 ---------- */
(async function boot() {
  hydrateIcons();
  renderDesignSystem();
  if (host) {
    const v = await host.version();
    document.title = `SkillHub · Electron ${v.electron}`;
    try {
      const l = await host.getLayout();
      if (l) applyLayout(l);
    } catch (err) { applyLayout(null); }
    try {
      const t = await host.getTheme();
      if (t) appearance = Object.assign({}, APPEARANCE_DEFAULT, t);
    } catch (err) { /* 用默认外观 */ }
  }
  applyAppearance();
  await rescan(true);
  window.__home = (state.data && state.data.home) || '';
  bind();
})();

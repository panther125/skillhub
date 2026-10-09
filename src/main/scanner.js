/**
 * 本地 Skill 扫描器
 * 扫描主流 AI 客户端的 skills 目录，解析 SKILL.md 的 frontmatter，
 * 输出统一的 Skill 数据模型给渲染层。
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const DISABLED_FLAG = '.skillhub-disabled';
const CONFIG_NAME = 'skillhub-config.json';

/** 配置文件目录：Electron 下用 userData，纯 Node 调用时退回 ~/.skillhub */
function configDir() {
  try {
    const e = require('electron');
    if (e && e.app && typeof e.app.getPath === 'function') return e.app.getPath('userData');
  } catch (err) { /* 非 Electron 环境 */ }
  return path.join(os.homedir(), '.skillhub');
}

function loadConfig() {
  try { return JSON.parse(fs.readFileSync(path.join(configDir(), CONFIG_NAME), 'utf8')); }
  catch (err) { return { customSources: [] }; }
}

function saveConfig(cfg) {
  try {
    const dir = configDir();
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, CONFIG_NAME), JSON.stringify(cfg, null, 2), 'utf8');
    return true;
  } catch (err) { return false; }
}

function customSources() {
  const cfg = loadConfig();
  return (cfg.customSources || []).map(p => ({ key: path.basename(p) || p, path: p, color: '#71717A', custom: true }));
}

function addCustomSource(p) {
  if (!p || !fs.existsSync(p)) return { ok: false, error: '目录不存在：' + p };
  const cfg = loadConfig();
  cfg.customSources = cfg.customSources || [];
  if (!cfg.customSources.some(x => path.resolve(x) === path.resolve(p))) cfg.customSources.push(p);
  saveConfig(cfg);
  return { ok: true, sources: cfg.customSources };
}

function removeCustomSource(p) {
  const cfg = loadConfig();
  cfg.customSources = (cfg.customSources || []).filter(x => path.resolve(x) !== path.resolve(p));
  saveConfig(cfg);
  return { ok: true, sources: cfg.customSources };
}

/** 界面布局：分栏宽度（左栏 / 右栏）持久化 */
function loadLayout() {
  const cfg = loadConfig();
  return cfg.layout || null;
}

function saveLayout(layout) {
  const cfg = loadConfig();
  cfg.layout = {
    sidebar: Number(layout && layout.sidebar) || 260,
    aside: Number(layout && layout.aside) || 440
  };
  saveConfig(cfg);
  return cfg.layout;
}

/** 外观设置：主题 id / 强调色 / 字体缩放（百分数） */
function loadTheme() {
  const cfg = loadConfig();
  return cfg.theme || null;
}

function saveTheme(t) {
  const cfg = loadConfig();
  const known = ['midnight', 'forest', 'ocean', 'sunset', 'aurora', 'graphite'];
  const scale = Number(t && t.fontScale) || 100;
  cfg.theme = {
    id: known.indexOf(t && t.id) >= 0 ? t.id : 'midnight',
    accent: /^#[0-9a-fA-F]{6}$/.test((t && t.accent) || '') ? t.accent : null,
    fontScale: Math.min(135, Math.max(85, scale))
  };
  saveConfig(cfg);
  return cfg.theme;
}

/* ============================================================
   来源发现：扫描「用户主目录」下名字像 AI 客户端的目录，
   再进入其中寻找 skill 文件夹（skills / .skills / skill …）
   ============================================================ */

/** 市面上主流 AI 编码客户端 / Agent 的目录名关键词（小写包含匹配） */
const AI_PLATFORMS = [
  { kw: 'claude', name: 'Claude', color: '#D97757' },
  { kw: 'workbuddy', name: 'WorkBuddy', color: '#5E6AD2' },
  { kw: 'codebuddy', name: 'CodeBuddy', color: '#22D3EE' },
  { kw: 'cursor', name: 'Cursor', color: '#A78BFA' },
  { kw: 'codex', name: 'Codex', color: '#10B981' },
  { kw: 'gemini', name: 'Gemini', color: '#4285F4' },
  { kw: 'opencode', name: 'OpenCode', color: '#F59E0B' },
  { kw: 'windsurf', name: 'Windsurf', color: '#38BDF8' },
  { kw: 'trae', name: 'Trae', color: '#6366F1' },
  { kw: 'copilot', name: 'Copilot', color: '#94A3B8' },
  { kw: 'kiro', name: 'Kiro', color: '#F472B6' },
  { kw: 'qoder', name: 'Qoder', color: '#22C55E' },
  { kw: 'lingma', name: '通义灵码', color: '#FF7A45' },
  { kw: 'marscode', name: 'MarsCode', color: '#FF9F43' },
  { kw: 'cline', name: 'Cline', color: '#E879F9' },
  { kw: 'aider', name: 'Aider', color: '#FBBF24' },
  { kw: 'continue', name: 'Continue', color: '#2DD4BF' },
  { kw: 'zed', name: 'Zed', color: '#A3A3A3' },
  { kw: 'augment', name: 'Augment', color: '#60A5FA' },
  { kw: 'replit', name: 'Replit', color: '#FB7185' },
  { kw: 'kilo', name: 'Kilo Code', color: '#C084FC' },
  { kw: 'roo', name: 'Roo Code', color: '#4ADE80' },
  { kw: 'antigravity', name: 'Antigravity', color: '#22D3EE' },
  { kw: 'deepseek', name: 'DeepSeek', color: '#4F7CFF' },
  { kw: 'kimi', name: 'Kimi', color: '#FF9F43' },
  { kw: 'agent', name: 'Agent', color: '#8B94E8' }
];

/** 兜底：动态发现失败时仍用这套固定路径，保证界面不空 */
function legacySources() {
  const home = os.homedir();
  return [
    { key: 'Claude', path: path.join(home, '.claude', 'skills'), color: '#D97757' },
    { key: 'WorkBuddy', path: path.join(home, '.workbuddy', 'skills'), color: '#5E6AD2' },
    { key: 'CodeBuddy', path: path.join(home, '.codebuddy', 'skills'), color: '#22D3EE' },
    { key: 'Cursor', path: path.join(home, '.cursor', 'skills'), color: '#A78BFA' },
    { key: 'Codex', path: path.join(home, '.codex', 'skills'), color: '#10B981' },
    { key: 'Gemini', path: path.join(home, '.gemini', 'skills'), color: '#4285F4' },
    { key: 'OpenCode', path: path.join(home, '.opencode', 'skills'), color: '#F59E0B' }
  ];
}

/** 用户主目录候选：当前用户目录 + Windows 下显式补上 C:\Users\<用户名> */
function userRoots() {
  const roots = [];
  const push = p => { if (p && !roots.some(r => r.toLowerCase() === p.toLowerCase())) roots.push(p); };
  try { push(os.homedir()); } catch (e) { /* ignore */ }
  try {
    const u = os.userInfo().username;
    if (u && process.platform === 'win32') push(path.join('C:', 'Users', u));
  } catch (e) { /* ignore */ }
  return roots;
}

/** 名字是否像 skill 目录：skills / .skills / builtin_skills / skills-cursor … */
const SKILL_DIR_BLOCK = ['sync', 'cache', 'template', 'backup', 'tmp', 'log', 'test'];
function isSkillDirName(name) {
  const l = String(name).toLowerCase();
  if (SKILL_DIR_BLOCK.some(k => l.includes(k))) return false;
  return /(^|[._-])skills?([._-]|$)/i.test(name) || /^skills?$/i.test(name);
}

/** 在 AI 目录下找 skill 文件夹：先看一级子目录，没有再往下看一层 */
function findSkillDirs(aiDir, plat) {
  const out = [];
  let subs = [];
  try { subs = fs.readdirSync(aiDir, { withFileTypes: true }).filter(d => d.isDirectory()); }
  catch (e) { return out; }

  subs.forEach(s => {
    if (isSkillDirName(s.name)) out.push({ key: plat.name, path: path.join(aiDir, s.name), color: plat.color, discovered: true });
  });

  if (!out.length) {   // 二级：如 ~/.xxx/plugins/skills、~/.xxx/cache/skills
    subs.forEach(s => {
      if (s.name.startsWith('.')) return;
      let deep = [];
      try { deep = fs.readdirSync(path.join(aiDir, s.name), { withFileTypes: true }).filter(d => d.isDirectory()); }
      catch (e) { return; }
      deep.forEach(d => {
        if (isSkillDirName(d.name)) out.push({ key: plat.name, path: path.join(aiDir, s.name, d.name), color: plat.color, discovered: true });
      });
    });
  }
  return out;
}

/**
 * 动态发现：遍历用户主目录下的一级子目录，命中 AI 关键词后进入找 skill 目录。
 * 用户可在 skillhub-config.json 里加 aiKeywords 追加关键词。
 */
function discoverSources() {
  const extra = (loadConfig().aiKeywords || []).map(k => String(k).toLowerCase());
  const table = AI_PLATFORMS.concat(extra.map(k => ({ kw: k, name: k.charAt(0).toUpperCase() + k.slice(1), color: '#8B94E8' })));
  const out = [];

  userRoots().forEach(root => {
    let entries = [];
    try { entries = fs.readdirSync(root, { withFileTypes: true }); } catch (e) { return; }
    entries.forEach(e => {
      if (!e.isDirectory()) return;
      const lower = e.name.toLowerCase().replace(/^[._]+/, '');
      if (!lower) return;
      const plat = table.find(p => lower.includes(p.kw));
      if (!plat) return;
      findSkillDirs(path.join(root, e.name), plat).forEach(s => out.push(s));
    });
  });

  // 去重（同一目录可能被多个 root 命中）+ 同名来源加序号便于侧栏区分
  const seen = new Set();
  const uniq = out.filter(s => {
    const k = path.resolve(s.path).toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });
  const counter = {};
  uniq.forEach(s => {
    counter[s.key] = (counter[s.key] || 0) + 1;
    if (counter[s.key] > 1) s.key = `${s.key} ${counter[s.key]}`;
  });
  return uniq;
}

/** 数据来源：动态发现的 AI 目录 + 项目级目录（发现不到时兜底到固定路径） */
function defaultSources() {
  let list = discoverSources();
  if (!list.length) list = legacySources();
  list.push({ key: '项目级', path: path.join(process.cwd(), '.skills'), color: '#71717A' });
  return list;
}

/** 简易 frontmatter 解析（只取 key: value 形式，够用且无依赖） */
function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/);
  const meta = {};
  let bodyStart = 0;
  if (lines[0] && lines[0].trim() === '---') {
    for (let i = 1; i < lines.length; i++) {
      const l = lines[i];
      if (l.trim() === '---') { bodyStart = i + 1; break; }
      const m = l.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
      if (m) meta[m[1].trim().toLowerCase()] = m[2].trim().replace(/^["']|["']$/g, '');
      bodyStart = i + 1;
    }
  }
  const body = lines.slice(bodyStart).join('\n');
  return { meta, body, hasFrontmatter: bodyStart > 0 };
}

/** 递归统计目录大小与文件数 */
function statDir(dir, depth, max) {
  let size = 0, files = 0;
  if (depth > max) return { size, files };
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return { size, files }; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    try {
      if (e.isDirectory()) {
        const r = statDir(p, depth + 1, max);
        size += r.size; files += r.files;
      } else {
        const st = fs.statSync(p);
        size += st.size; files += 1;
      }
    } catch (err) { /* 忽略无权限文件 */ }
  }
  return { size, files };
}

function humanSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function humanTime(ts) {
  const diff = Date.now() - ts;
  const min = 60000, hour = 3600000, day = 86400000;
  if (diff < min) return '刚刚';
  if (diff < hour) return Math.floor(diff / min) + ' 分钟前';
  if (diff < day) return Math.floor(diff / hour) + ' 小时前';
  if (diff < day * 2) return '昨天';
  if (diff < day * 7) return Math.floor(diff / day) + ' 天前';
  if (diff < day * 30) return Math.floor(diff / 7 / day) + ' 周前';
  const d = new Date(ts);
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function stamp(ts) {
  const d = new Date(ts);
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/** 顶层文件/目录概览（用于检查器「关联文件」） */
function topEntries(dir) {
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return []; }
  const out = [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      const r = statDir(p, 0, 3);
      out.push({ name: e.name + '/', isDir: true, size: r.files + ' 项', bytes: r.size });
    } else {
      let size = 0;
      try { size = fs.statSync(p).size; } catch (err) {}
      out.push({ name: e.name, isDir: false, size: humanSize(size), bytes: size });
    }
  }
  out.sort((a, b) => (a.name === 'SKILL.md' ? -1 : b.name === 'SKILL.md' ? 1 : 0) || (b.isDir ? 1 : -1));
  return out.slice(0, 12);
}

/** 扫描单个 Skill 目录 */
function readSkill(dir, source) {
  const skillFile = path.join(dir, 'SKILL.md');
  if (!fs.existsSync(skillFile)) return null;
  let raw = '';
  try { raw = fs.readFileSync(skillFile, 'utf8'); } catch (e) { return null; }
  const { meta, body, hasFrontmatter } = parseFrontmatter(raw);
  const st = fs.statSync(skillFile);
  const { size, files } = statDir(dir, 0, 3);
  const name = meta.name || path.basename(dir);
  const disabled = fs.existsSync(path.join(dir, DISABLED_FLAG));

  const problems = [];
  if (!hasFrontmatter) problems.push('缺少 frontmatter');
  else {
    if (!meta.name) problems.push('frontmatter 缺少 name');
    if (!meta.description) problems.push('frontmatter 缺少 description');
  }

  return {
    id: dir,
    name,
    source: source.key,
    color: source.color,
    description: meta.description || (body.trim().split('\n')[0] || '').slice(0, 60) || '（无描述）',
    dir,
    skillFile,
    raw,
    version: meta.version || '—',
    allowedTools: meta['allowed-tools'] || '',
    size: humanSize(size),
    bytes: size,
    fileCount: files,
    time: humanTime(st.mtimeMs),
    updated: stamp(st.mtimeMs),
    mtime: st.mtimeMs,
    enabled: !disabled,
    problems,
    files: topEntries(dir)
  };
}

/** 新建 Skill：在指定来源目录下生成 <name>/SKILL.md 模板 */
function createSkill(sourcePath, name) {
  const safe = String(name || '').trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-_]{1,40}$/.test(safe)) {
    return { ok: false, error: '名称需为小写字母 / 数字 / 连字符，2-41 个字符' };
  }
  if (!sourcePath || !fs.existsSync(sourcePath)) return { ok: false, error: '目标目录不存在' };
  const dir = path.join(sourcePath, safe);
  if (fs.existsSync(dir)) return { ok: false, error: '该目录下已存在同名 Skill' };
  const tpl = [
    '---',
    `name: ${safe}`,
    'description: TODO 用一句话说明这个 Skill 的作用与触发时机',
    '---',
    '',
    `# ${safe}`,
    '',
    '## 使用场景',
    '',
    '- 待补充',
    '',
    '## 步骤',
    '',
    '1. 待补充',
    ''
  ].join('\n');
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'SKILL.md'), tpl, 'utf8');
    return { ok: true, dir, file: path.join(dir, 'SKILL.md') };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

/** 扫描全部来源目录（默认目录 + 用户自定义目录） */
function scanAll() {
  const t0 = Date.now();
  const sources = defaultSources().concat(customSources());
  const skills = [];
  const sourceReport = [];

  for (const s of sources) {
    let children = [];
    let exists = false;
    try {
      exists = fs.existsSync(s.path);
      if (exists) children = fs.readdirSync(s.path, { withFileTypes: true });
    } catch (e) { exists = false; }

    let count = 0;
    for (const c of children) {
      if (!c.isDirectory() || c.name.startsWith('.')) continue;
      const sk = readSkill(path.join(s.path, c.name), s);
      if (sk) { skills.push(sk); count++; }
    }
    // 目录本身就是一个 Skill 的情况
    const self = readSkill(s.path, s);
    if (self && count === 0) { skills.push(self); count = 1; }

    sourceReport.push({ key: s.key, path: s.path, color: s.color, count, exists, custom: !!s.custom, discovered: !!s.discovered });
  }

  // 冲突检测：同名 Skill 出现在不同来源
  const byName = new Map();
  skills.forEach(s => {
    if (!byName.has(s.name)) byName.set(s.name, []);
    byName.get(s.name).push(s);
  });
  const conflicts = [];
  byName.forEach((list, name) => {
    if (list.length > 1) {
      const srcList = [...new Set(list.map(s => s.source))];
      conflicts.push({
        type: 'duplicate',
        name,
        items: list.map(s => ({ source: s.source, color: s.color, dir: s.dir, version: s.version, size: s.size, mtime: s.mtime }))
          .sort((a, b) => b.mtime - a.mtime),
        sources: srcList
      });
    }
  });
  skills.forEach(s => {
    if (s.problems.length) {
      conflicts.push({ type: 'invalid', name: s.name, dir: s.dir, source: s.source, color: s.color, problems: s.problems, skillFile: s.skillFile });
    }
  });

  return {
    ok: true,
    home: os.homedir(),
    roots: userRoots(),   // 实际扫描的用户根目录（C:\Users\<用户名>）
    cwd: process.cwd(),
    scannedAt: Date.now(),
    scannedAtText: stamp(Date.now()),
    duration: ((Date.now() - t0) / 1000).toFixed(1),
    skills,
    sources: sourceReport,
    conflicts
  };
}

/** 启停：在 Skill 目录写入 / 删除标记文件（非破坏性） */
function setEnabled(dir, enabled) {
  const flag = path.join(dir, DISABLED_FLAG);
  if (enabled) {
    if (fs.existsSync(flag)) fs.unlinkSync(flag);
  } else {
    fs.writeFileSync(flag, 'disabled by SkillHub\n', 'utf8');
  }
  return { ok: true, enabled };
}

module.exports = {
  scanAll, setEnabled, defaultSources, humanSize, stamp,
  createSkill, addCustomSource, removeCustomSource, customSources, configDir,
  loadLayout, saveLayout, loadTheme, saveTheme,
  discoverSources, userRoots, AI_PLATFORMS
};

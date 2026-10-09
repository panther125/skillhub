/**
 * SkillHub 主进程
 * 无边框深色窗口（1600×1000）+ 本地文件系统能力（扫描 / 读写 SKILL.md / 启停标记）
 */
const { app, BrowserWindow, ipcMain, shell, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const scanner = require('./scanner');

const isSmoke = process.argv.includes('--smoke');
const isDev = process.argv.includes('--dev');

/* 自检模式在无 GPU 的 CI / 沙箱环境下运行，关闭硬件加速避免 GPU 进程崩溃 */
if (isSmoke) app.disableHardwareAcceleration();

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 1180,
    minHeight: 720,
    show: false,
    frame: false,
    title: 'SkillHub · 本地 Skill 统一管理台',
    backgroundColor: '#08090A',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

  win.once('ready-to-show', () => {
    if (!isSmoke) win.show();
  });

  const notifyMax = () => win && win.webContents.send('app:maximized-change', win.isMaximized());
  win.on('maximize', notifyMax);
  win.on('unmaximize', notifyMax);

  // 兼容新旧两种 console-message 事件签名
  win.webContents.on('console-message', ev => {
    if (!isSmoke && !isDev) return;
    const msg = typeof ev === 'string' ? ev : (ev && ev.message);
    const level = (ev && ev.level) || 'log';
    console.log(`[renderer:${level}] ${msg}`);
  });
  win.webContents.on('did-fail-load', (e, code, desc) => {
    console.log('[did-fail-load]', code, desc);
  });

  if (isDev && !isSmoke) win.webContents.openDevTools({ mode: 'detach' });

  if (isSmoke) {
    win.webContents.once('did-finish-load', () => {
      setTimeout(() => {
        console.log('SMOKE_READY');
        app.quit();
      }, 1200);
    });
  }
}

/* ---------------- IPC ---------------- */
ipcMain.handle('app:minimize', () => { if (win) win.minimize(); });
ipcMain.handle('app:maximize', () => {
  if (!win) return false;
  if (win.isMaximized()) win.unmaximize(); else win.maximize();
  return win.isMaximized();
});
ipcMain.handle('app:close', () => { if (win) win.close(); });
ipcMain.handle('app:isMaximized', () => (win ? win.isMaximized() : false));
ipcMain.handle('app:version', () => ({ app: app.getVersion(), electron: process.versions.electron, node: process.versions.node }));

ipcMain.handle('skills:scan', () => {
  try {
    return scanner.scanAll();
  } catch (e) {
    return { ok: false, error: String(e && e.message || e), skills: [], sources: [], conflicts: [] };
  }
});

ipcMain.handle('skill:read', (e, file) => {
  try { return { ok: true, content: fs.readFileSync(file, 'utf8') }; }
  catch (err) { return { ok: false, error: String(err.message || err) }; }
});

ipcMain.handle('skill:write', (e, file, content) => {
  try { fs.writeFileSync(file, content, 'utf8'); return { ok: true }; }
  catch (err) { return { ok: false, error: String(err.message || err) }; }
});

ipcMain.handle('skill:setEnabled', (e, dir, enabled) => {
  try { return scanner.setEnabled(dir, !!enabled); }
  catch (err) { return { ok: false, error: String(err.message || err) }; }
});

ipcMain.handle('sources:add', (e, p) => scanner.addCustomSource(p));
ipcMain.handle('sources:remove', (e, p) => scanner.removeCustomSource(p));

ipcMain.handle('skill:create', (e, sourcePath, name) => {
  try { return scanner.createSkill(sourcePath, name); }
  catch (err) { return { ok: false, error: String(err.message || err) }; }
});

/**
 * 删除 Skill：只接受「直接位于已管理源目录下」的 Skill 目录，
 * 且一律走系统回收站，不做任何 rm -rf / 永久删除。
 */
function isManagedSkillDir(dir) {
  if (!dir || typeof dir !== 'string') return false;
  const abs = path.resolve(dir);
  const base = path.basename(abs);
  if (!base || base.startsWith('.')) return false;
  const roots = scanner.defaultSources().concat(scanner.customSources())
    .map(s => path.resolve(s.path));
  if (!roots.some(r => r === path.dirname(abs))) return false;
  try { return fs.statSync(abs).isDirectory(); } catch (e) { return false; }
}

ipcMain.handle('skill:delete', async (e, dir) => {
  try {
    if (!isManagedSkillDir(dir)) {
      return { ok: false, error: '拒绝删除：该路径不是 SkillHub 管理的 Skill 目录 · ' + dir };
    }
    const abs = path.resolve(dir);
    await shell.trashItem(abs);
    return { ok: true, dir: abs, trashed: true };
  } catch (err) {
    return { ok: false, error: String((err && err.message) || err) };
  }
});

ipcMain.handle('layout:get', () => scanner.loadLayout());
ipcMain.handle('layout:set', (e, layout) => ({ ok: true, layout: scanner.saveLayout(layout || {}) }));

ipcMain.handle('theme:get', () => scanner.loadTheme());
ipcMain.handle('theme:set', (e, t) => ({ ok: true, theme: scanner.saveTheme(t || {}) }));

ipcMain.handle('dialog:pickDirectory', async () => {
  if (!win) return null;
  const r = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
  return r.canceled ? null : r.filePaths[0];
});

ipcMain.handle('shell:showInFolder', (e, p) => { if (p) shell.showItemInFolder(p); });
ipcMain.handle('shell:openPath', (e, p) => { if (p) shell.openPath(p); });

/**
 * 打开外部链接：只允许 https/http 协议，避免被 file:// 或自定义协议滥用。
 * 用于「Skill 推荐」页跳转到浏览器打开在线 Skill 市场。
 */
ipcMain.handle('shell:openExternal', (e, url) => {
  try {
    if (typeof url !== 'string' || !url) return { ok: false, error: '空链接' };
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') {
      return { ok: false, error: '拒绝打开非 http(s) 链接：' + u.protocol };
    }
    shell.openExternal(u.toString());
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String((err && err.message) || err) };
  }
});

/* ---------------- 生命周期 ---------------- */
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });

/**
 * 预加载脚本：向渲染层暴露受限的本地能力（contextIsolation 下安全通信）
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // 窗口控制
  minimize: () => ipcRenderer.invoke('app:minimize'),
  maximize: () => ipcRenderer.invoke('app:maximize'),
  close: () => ipcRenderer.invoke('app:close'),
  isMaximized: () => ipcRenderer.invoke('app:isMaximized'),
  onMaximizedChange: cb => ipcRenderer.on('app:maximized-change', (e, v) => cb(v)),
  version: () => ipcRenderer.invoke('app:version'),

  // 本地 Skill
  scan: () => ipcRenderer.invoke('skills:scan'),
  readFile: p => ipcRenderer.invoke('skill:read', p),
  writeFile: (p, content) => ipcRenderer.invoke('skill:write', p, content),
  setEnabled: (dir, enabled) => ipcRenderer.invoke('skill:setEnabled', dir, enabled),
  createSkill: (sourcePath, name) => ipcRenderer.invoke('skill:create', sourcePath, name),
  deleteSkill: dir => ipcRenderer.invoke('skill:delete', dir),
  addSource: p => ipcRenderer.invoke('sources:add', p),
  removeSource: p => ipcRenderer.invoke('sources:remove', p),

  // 界面布局（分栏宽度持久化）
  getLayout: () => ipcRenderer.invoke('layout:get'),
  setLayout: layout => ipcRenderer.invoke('layout:set', layout),

  // 外观（主题 / 强调色 / 字体大小持久化）
  getTheme: () => ipcRenderer.invoke('theme:get'),
  setTheme: t => ipcRenderer.invoke('theme:set', t),

  // 系统
  pickDirectory: () => ipcRenderer.invoke('dialog:pickDirectory'),
  showInFolder: p => ipcRenderer.invoke('shell:showInFolder', p),
  openPath: p => ipcRenderer.invoke('shell:openPath', p),
  openExternal: url => ipcRenderer.invoke('shell:openExternal', url)
});

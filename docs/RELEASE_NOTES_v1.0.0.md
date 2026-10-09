# SkillHub v1.0.0

**本地 Skill 统一管理台** —— 把散落在各个 AI 客户端里的 Skill 收拢到一个桌面应用里。

---

## 这个版本能做什么

**🔍 动态发现，不用配路径**
自动遍历用户主目录，识别出所有 AI 客户端的 skill 目录（Claude / Cursor / CodeBuddy / WorkBuddy / Trae / Qoder / Codex 等 26 个平台关键词）。本机实测扫出 **49 个 Skill / 19 个来源目录**。

**⚡ 真读写，不是只读浏览**
启停写 `.skillhub-disabled` 标记（可随时恢复）、编辑真写回磁盘、删除走系统回收站（能还原）。删除带路径白名单校验，源目录本身和 `..` 逃逸路径一律拒绝。

**⚠️ 冲突检测**
同一个 Skill 在 4 个客户端各有一份？直接列出来，标好哪个是「推荐保留（最近更新）」、哪些是「旧版本」，并显示各自的版本和体积。

**✏️ SKILL.md 编辑器**
行号 + 分行着色（frontmatter / 标题 / 正文）、硬换行不软折（超长行横向滚动）、实时 Markdown 预览、frontmatter 校验（缺 `name` / `description` 立刻提示）。**双击列表任意一行直接进入编辑**。

**🎨 外观设置**
6 套主题（午夜 / 森林 / 海边 / 日落 / 极光 / 石墨，含 4 套渐变）、8 色强调色、85%–135% 字号缩放，全部实时生效并持久化。

**📐 可拖拽分栏**
左栏 / 右栏宽度可拖、双击分隔线复位、宽度自动记住。

## 界面

![Skill 库](https://raw.githubusercontent.com/panther125/skillhub/main/docs/screenshots/01-library.png)

![编辑器](https://raw.githubusercontent.com/panther125/skillhub/main/docs/screenshots/02-editor.png)

![扫描与冲突](https://raw.githubusercontent.com/panther125/skillhub/main/docs/screenshots/03-scan-conflict.png)

![外观设置](https://raw.githubusercontent.com/panther125/skillhub/main/docs/screenshots/05-appearance.png)

## 下载与安装

| 文件 | 大小 | 说明 |
|---|---|---|
| `SkillHub Setup 1.0.0.exe` | 106.4 MB | **安装版**（推荐）—— 可选安装目录，自动创建桌面与开始菜单快捷方式，支持正常卸载 |
| `SkillHub 1.0.0.exe` | 106.1 MB | **免安装绿色版** —— 双击即用，不写入系统，适合放 U 盘或临时试用 |

**系统要求**：Windows 10 / 11（x64）

<details>
<summary>SHA256 校验值</summary>

```
588545208550e0d160b9e637b73b78442bc7edd94ac350bb12206065a8d02213  SkillHub 1.0.0.exe
f0bb51677134a7b44a17113b8dd69f3a244c05f159e34e5fcc827710bdf4a937  SkillHub Setup 1.0.0.exe
```

校验命令（PowerShell）：

```powershell
Get-FileHash "SkillHub Setup 1.0.0.exe" -Algorithm SHA256
```

</details>

> ⚠️ 本版本未做代码签名，Windows SmartScreen 可能提示「未知发布者」。
> 点击「更多信息」→「仍要运行」即可。这是未签名应用的正常提示，非病毒告警。

## 从源码运行

```bash
git clone git@github.com:panther125/skillhub.git
cd skillhub
npm install
npm start
```

> 若环境变量里有 `ELECTRON_RUN_AS_NODE=1`，Electron 会以纯 Node 模式启动而不显示窗口。
> 先清掉：Git Bash `unset ELECTRON_RUN_AS_NODE`、PowerShell `Remove-Item Env:ELECTRON_RUN_AS_NODE`。

## 已知限制

- 仅打包了 Windows x64，暂无 macOS / Linux 版本
- 未做代码签名，首次运行有 SmartScreen 提示
- 扫描基于目录名关键词匹配，非常规命名的 skill 目录可能漏扫（可在配置里加 `aiKeywords` 补充）

**完整说明见 [README](https://github.com/panther125/skillhub#readme)**

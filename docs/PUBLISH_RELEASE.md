# 发布 v1.0.0 Release

> 标签 `v1.0.0` 已推送到远程，发布说明与安装包都已备好。
> 只差最后一步：把两个 exe 传上去。下面给两个方案，任选其一。

---

## 方案 A：命令行一键发布（推荐，30 秒）

`gh` CLI 已装好，直接运行：

```bash
cd /e/AI/work/skillhub

GH="C:/Users/panther/.workbuddy/binaries/gh/bin/gh.exe"

# 1. 登录（只需一次，按提示选 GitHub.com → HTTPS → Login with a web browser）
"$GH" auth login

# 2. 创建 Release 并上传两个安装包
"$GH" release create v1.0.0 \
  "dist/SkillHub Setup 1.0.0.exe" \
  "dist/SkillHub 1.0.0.exe" \
  --title "SkillHub v1.0.0" \
  --notes-file docs/RELEASE_NOTES_v1.0.0.md
```

登录时如果不想走浏览器，可以直接用 Personal Access Token：

```bash
echo "ghp_你的Token" | "$GH" auth login --with-token
```

> Token 需要 `repo`（私有仓库）或 `public_repo`（公开仓库）权限。
> 生成地址：https://github.com/settings/tokens

---

## 方案 B：网页手动发布（不用装任何东西）

1. 打开 <https://github.com/panther125/skillhub/releases/new>
2. **Choose a tag** 选 `v1.0.0`（标签已存在于远程）
3. **Release title** 填：`SkillHub v1.0.0`
4. **Describe this release** —— 打开 `docs/RELEASE_NOTES_v1.0.0.md`，全选复制粘贴进去
5. 把下面两个文件拖进底部的附件区（`Attach binaries by dropping them here`）：
   - `E:\AI\work\skillhub\dist\SkillHub Setup 1.0.0.exe`（106.4 MB）
   - `E:\AI\work\skillhub\dist\SkillHub 1.0.0.exe`（106.1 MB）
6. 点 **Publish release**

> 单文件超过 100 MB 也能传（GitHub 附件上限 2 GB），但上传过程受网络影响，
> 每个约需 1–3 分钟，请耐心等进度条走完再关页面。

---

## 发布后可验证

```bash
GH="C:/Users/panther/.workbuddy/binaries/gh/bin/gh.exe"
"$GH" release view v1.0.0
curl -sL -o /dev/null -w "%{http_code}\n" \
  https://github.com/panther125/skillhub/releases/download/v1.0.0/SkillHub%20Setup%201.0.0.exe
```

第二个命令返回 `302` 或 `200` 即为下载链接可用。

---

## 附：安装包校验值

```
588545208550e0d160b9e637b73b78442bc7edd94ac350bb12206065a8d02213  SkillHub 1.0.0.exe
f0bb51677134a7b44a17113b8dd69f3a244c05f159e34e5fcc827710bdf4a937  SkillHub Setup 1.0.0.exe
```

# Git Workflow

## 仓库结构

| Remote       | 仓库                                      | 部署地址                                        | Build 命令               |
| ------------ | ----------------------------------------- | ----------------------------------------------- | ------------------------ |
| `origin`     | `RichSomeday222/PersonalWeb`              | `https://richsomeday222.github.io/PersonalWeb/` | `npm run build:personal` |
| `new-origin` | `RichSomeday222/RichSomeday222.github.io` | `https://richsomeday222.github.io/`             | `npm run build`          |

主力开发分支：`dev`

---

## 日常开发流程

```bash
# 1. 在 dev 分支上改代码、commit
git add .
git commit -m "your message"

# 2. 推送到两个 repo 的 dev 分支
git push origin dev
git push new-origin dev

# 3. 合并到两个 repo 的 main（触发 GitHub Actions 自动 build & deploy）
#    PersonalWeb：在 GitHub 网页上 PR: dev → main，或：
git checkout main && git merge dev && git push origin main && git checkout dev

#    RichSomeday222.github.io：直接强推（两边历史不同，无法正常 PR）
git push new-origin dev:main --force
```

---

## 为什么 `.github.io` 要用 `--force`？

两个 repo 的 `main` 分支有**完全独立的提交历史**（unrelated histories），GitHub 无法对比和 merge。`dev:main --force` 直接把 `dev` 的内容覆盖到 `new-origin/main`，是这种情况下最干净的做法。

> ⚠️ `--force` 会覆盖 `new-origin/main`，所以永远不要直接在 GitHub 网页上编辑 `RichSomeday222.github.io` 的 `main` 分支，一切改动都在本地 `dev` 做。

---

## GitHub Actions 自动部署

merge 到 `main` 后，`.github/workflows/deploy.yml` 自动触发：

- 在 `PersonalWeb` repo → 用 `npm run build:personal` → 部署到 `/PersonalWeb/`
- 在 `RichSomeday222.github.io` repo → 用 `npm run build` → 部署到根路径 `/`

无需手动跑 `npm run deploy:*`。

---

## 快速备忘

```bash
# 查看两个 remote
git remote -v

# 查看所有分支
git branch -a

# 一次推送两个 remote 的 dev
git push origin dev && git push new-origin dev

# 同步 main（两步）
git push origin main                      # PersonalWeb（正常推）
git push new-origin dev:main --force      # .github.io（强推）
```

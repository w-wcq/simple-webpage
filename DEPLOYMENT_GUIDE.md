# 部署指南：将网页部署到 Cloudflare Pages

## 步骤 1: 创建 GitHub 仓库

1. 登录 GitHub
2. 点击 "New repository"
3. 仓库名称设为 "simple-webpage" (或您喜欢的名称)
4. 选择 "Public"
5. 不要初始化 README、.gitignore 或 license (我们已经有了)

## 步骤 2: 将本地仓库连接到 GitHub

在终端中执行以下命令（替换 YOUR_USERNAME 为您的 GitHub 用户名）:

```bash
git remote add origin https://github.com/YOUR_USERNAME/simple-webpage.git
git branch -M main
git push -u origin main
```

## 步骤 3: 在 Cloudflare Pages 上部署

1. 登录 Cloudflare 仪表板
2. 选择您的账户
3. 点击 "Pages"
4. 点击 "Create a project"
5. 选择 "Connect to Git"
6. 选择您的 GitHub 账户
7. 选择您刚刚创建的仓库 (simple-webpage)
8. 点击 "Begin setup"

## 步骤 4: 配置构建设置

对于纯 HTML/CSS/JS 项目，Cloudflare Pages 通常会自动检测。您不需要特殊配置：

- 构建命令: (留空)
- 构建输出目录: (留空)
- 环境变量: (无)

## 步骤 5: 部署

Cloudflare Pages 会在您推送代码到 GitHub 时自动部署。您的网站将在几分钟内上线，地址类似于：

`https://your-project-name.pages.dev`

## 后续更新

每当您向 main 分支推送更新时，Cloudflare Pages 会自动重新构建和部署您的网站。

## 注意事项

- 确保您的 `index.html` 文件在项目的根目录
- 如果您添加了其他资源文件（如图片、CSS 文件等），请确保路径正确
- 您可以在 Cloudflare Pages 仪表板上自定义域名、设置缓存规则等
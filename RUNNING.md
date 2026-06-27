# 🚀 如何运行 DevTools Pro

## 快速启动（3步）

### 1️⃣ 安装依赖

如果你还没有安装依赖，先运行：

```bash
npm install
```

这会下载所有需要的包（Vue、TypeScript、Tailwind CSS 等）。

### 2️⃣ 启动开发服务器

```bash
npm run dev
```

你会看到类似这样的输出：

```
  VITE v8.0.12  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 3️⃣ 在浏览器中打开

访问 **http://localhost:5173** 即可看到应用！

---

## 📱 使用工具

打开浏览器后，你会看到：

1. **首页** - 展示所有可用的工具
2. **点击任意工具卡片** - 进入对应的工具页面
3. **开始使用** - 输入数据，点击处理按钮

### 示例：使用 JSON 工具

1. 点击 "JSON 工具" 卡片
2. 在左侧输入框粘贴 JSON 数据，例如：
   ```json
   {"name":"DevTools","version":"1.0"}
   ```
3. 点击 "格式化" 按钮
4. 右侧会显示美化后的 JSON
5. 点击 "复制结果" 复制到剪贴板

---

## 🔧 常用命令

```bash
# 开发模式（带热更新）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 类型检查
npm run type-check
```

---

## 🌐 访问地址

- **本地访问**: http://localhost:5173
- **局域网访问**: 
  ```bash
  npm run dev -- --host
  ```
  然后使用显示的 IP 地址，例如：http://192.168.x.x:5173

---

## ⚙️ 修改配置

### 修改端口号

如果想使用其他端口（比如 3000），编辑 `vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    port: 3000,  // 改为你想要的端口
  },
  // ... 其他配置
})
```

然后重启开发服务器。

### 自动打开浏览器

编辑 `vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    open: true,  // 启动时自动打开浏览器
  },
  // ... 其他配置
})
```

---

## ❓ 常见问题

### Q: 提示 "command not found: npm"

**解决方案**: 需要先安装 Node.js

**Mac**:
```bash
brew install node
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt update
sudo apt install nodejs npm
```

**Windows**: 从 [nodejs.org](https://nodejs.org/) 下载安装

验证安装：
```bash
node --version
npm --version
```

### Q: 端口 5173 已被占用

**解决方案 1**: 找到并关闭占用端口的进程

**解决方案 2**: 修改端口（见上方"修改端口号"）

**解决方案 3**: 让 Vite 自动选择可用端口
```bash
npm run dev
```
Vite 会自动尝试 5173, 5174, 5175...

### Q: 样式不正常或页面空白

**可能原因**: 依赖未正确安装

**解决方案**:
```bash
# 删除 node_modules 和锁文件
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 重新启动
npm run dev
```

### Q: TypeScript 报错

**解决方案**:
```bash
# 运行类型检查查看具体错误
npm run type-check

# 根据错误信息修复代码
```

### Q: 浏览器缓存问题

**解决方案**: 
- 硬刷新: `Ctrl + Shift + R` (Windows/Linux) 或 `Cmd + Shift + R` (Mac)
- 或者清除浏览器缓存
- 或者使用无痕模式测试

---

## 🎨 开发技巧

### 实时预览

开发服务器支持 **热模块替换 (HMR)**，修改代码后浏览器会自动更新，无需手动刷新！

### Vue DevTools

安装浏览器扩展来调试 Vue 应用：

- **Chrome**: [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue DevTools](https://addons.mozilla.org/firefox/addon/vue-js-devtools/)

安装后，在浏览器开发者工具中会出现 "Vue" 面板。

### 查看网络请求

打开浏览器开发者工具（F12）：
- **Console**: 查看日志和错误
- **Network**: 查看网络请求
- **Elements**: 查看和编辑 DOM
- **Sources**: 设置断点调试

---

## 📦 部署到生产环境

### 构建项目

```bash
npm run build
```

构建完成后，会在 `dist` 目录生成静态文件。

### 本地预览构建结果

```bash
npm run preview
```

访问 http://localhost:4173 预览生产版本。

### 部署到 Vercel（推荐）

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/devtools-pro.git
   git push -u origin main
   ```

2. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 登录
   - 点击 "New Project"
   - 导入你的仓库
   - 点击 "Deploy"

3. **完成！**
   - Vercel 会提供一个免费域名
   - 每次推送代码都会自动重新部署

---

## 🆘 需要帮助？

如果遇到问题：

1. 📖 查看 [README.md](./README.md) - 项目说明
2. 📚 查看 [QUICKSTART.md](./QUICKSTART.md) - 快速开始指南
3. 🐛 检查控制台错误信息
4. 💬 提交 Issue

---

## ✨ 小贴士

- **快捷键**: 
  - `Ctrl/Cmd + S` - 保存文件（触发热更新）
  - `Ctrl/Cmd + Shift + R` - 硬刷新浏览器
  - `F12` - 打开开发者工具

- **性能优化**:
  - 避免在组件中使用大量 console.log
  - 使用 Vue DevTools 检查组件渲染
  - 定期清理未使用的依赖

- **代码质量**:
  - 使用 TypeScript 严格模式
  - 遵循 Vue 3 最佳实践
  - 保持组件小而专注

---

**祝你开发愉快！** 🎉

如有任何问题，随时查看文档或寻求帮助。

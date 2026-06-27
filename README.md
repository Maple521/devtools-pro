# DevTools Pro - 开发者在线工具箱

一个现代化、高性能的开发者工具集合，完全在浏览器本地运行，保护您的数据隐私。

## 🚀 功能特性

### 核心工具（免费）

1. **JSON 工具**
   - JSON 格式化/美化
   - JSON 压缩/最小化
   - JSON 验证
   - 可配置缩进大小

2. **XML 工具**
   - XML 格式化
   - XML 压缩
   - XML 验证
   - 支持属性处理

3. **Base64 工具**
   - Base64 编码
   - Base64 解码
   - URL 安全模式
   - 双向转换

4. **JWT 工具**
   - JWT Token 解码
   - 显示 Header、Payload、Signature
   - 自动检测过期状态
   - 常用字段解析

5. **时间戳工具**
   - 实时显示当前时间戳
   - 时间戳 → 日期转换
   - 日期 → 时间戳转换
   - 多时区支持
   - 相对时间显示

### 特色功能

✨ **隐私保护**
- 所有数据处理均在本地浏览器完成
- 不会上传任何数据到服务器
- 无需网络连接即可使用

🎨 **极致体验**
- 现代化 UI 设计
- 深色/浅色主题切换
- 响应式布局，支持移动端
- 流畅的动画效果

⚡ **高效快速**
- 基于 Vue 3 + TypeScript + Vite 构建
- 即时响应，无延迟
- 优化的性能

💎 **批量处理（专业版）**
- 同时处理多个文件
- 批量转换和导出
- CSV/Excel 导出支持
- 自定义模板

## 🛠️ 技术栈

- **框架**: Vue 3.5+ (Composition API)
- **语言**: TypeScript 6.0+
- **构建工具**: Vite 8.0+
- **状态管理**: Pinia 3.0+
- **路由**: Vue Router 5.1+
- **样式**: Tailwind CSS 4.3+
- **图标**: Heroicons Vue 2.2+
- **UI 组件**: Headless UI Vue 1.7+
- **工具库**:
  - dayjs 1.11+ (日期处理)
  - fast-xml-parser 5.8+ (XML 解析)
  - js-base64 3.7+ (Base64 编解码)
  - jwt-decode 4.0+ (JWT 解码)

## 📦 安装与运行

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

构建产物位于 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 🌐 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成！

Vercel 配置文件 `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 其他平台

- Netlify
- Cloudflare Pages
- GitHub Pages
- 任何静态网站托管服务

## 💰 变现策略

### 第一阶段：用户积累（当前）
- ✅ 免费提供核心功能
- ✅ 优秀的用户体验
- ✅ 口碑传播

### 第二阶段：广告收入
- Google AdSense 集成
- 非侵入式广告位
- 保持用户体验

### 第三阶段：高级功能
- 批量处理功能
- API 访问
- 团队协作功能
- 自定义主题
- 数据导出功能

## 🔒 隐私政策

DevTools Pro 承诺：
- ❌ 不收集任何用户数据
- ❌ 不上传任何输入内容
- ❌ 不使用任何追踪器
- ✅ 所有处理均在本地完成
- ✅ 开源透明

## 📝 开发指南

### 项目结构

```
src/
├── components/          # 可复用组件
├── views/              # 页面视图
│   ├── HomeView.vue    # 首页
│   └── tools/          # 工具页面
│       ├── JsonTool.vue
│       ├── XmlTool.vue
│       ├── Base64Tool.vue
│       ├── JwtTool.vue
│       └── TimestampTool.vue
├── router/             # 路由配置
├── stores/             # Pinia 状态管理
├── App.vue             # 根组件
├── main.ts             # 入口文件
└── style.css           # 全局样式
```

### 添加新工具

1. 在 `src/views/tools/` 创建新的工具组件
2. 在 `src/router/index.ts` 添加路由
3. 在 `src/views/HomeView.vue` 添加工具卡片

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 Vue 3 Composition API 最佳实践
- 使用 `<script setup>` 语法
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🌟 支持项目

如果这个项目对您有帮助，请给个 Star ⭐

---

**DevTools Pro** - 为开发者而建的开源工具箱 🛠️

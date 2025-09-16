# WigglyPaint 多语言网站

一个现代化的多语言响应式网站，以 WigglyPaint GIF 生成工具为核心，提供工具使用和作品展示功能。

## ✨ 特性

- 🎨 **WigglyPaint 工具嵌入** - 完整的 GIF 生成工具体验
- 🌍 **四语言支持** - 英语、中文、日语、韩语
- 📱 **响应式设计** - 移动优先，适配所有设备
- 🖼️ **Gallery 画廊** - 搜索、过滤、下载 GIF 作品
- ⚡ **高性能** - 懒加载图片，优化用户体验
- 🎯 **简洁架构** - 基于现代化技术栈

## 🛠️ 技术栈

### 前端
- **React 18** + **TypeScript**
- **Vite** - 快速构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **react-router-dom** - 客户端路由
- **react-i18next** - 国际化解决方案

### 数据存储
- **Cloudflare R2 CDN** - 图片和工具文件存储
- **JSON 文件** - 本地元数据管理
- **localStorage** - 用户偏好设置

## 📁 项目结构

```
wigglypaintgif.com/
├── src/
│   ├── components/          # React 组件
│   │   ├── common/         # 通用组件
│   │   ├── gallery/        # Gallery 相关组件
│   │   └── layout/         # 布局组件
│   ├── pages/              # 页面组件
│   ├── hooks/              # 自定义 Hooks
│   ├── utils/              # 工具函数
│   ├── data/               # 数据文件
│   └── types/              # TypeScript 类型定义
├── public/
│   └── locales/            # 多语言文件
└── ...配置文件
```

## 🚀 快速开始

1. **安装依赖**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

3. **访问网站**
   ```
   http://localhost:3000
   ```

## 📄 页面结构

- **首页 (/)** - WigglyPaint 工具嵌入页面
- **Gallery (/gallery)** - GIF 作品展示和下载
- **关于 (/about)** - 项目介绍和使用说明

## 🌍 多语言支持

网站支持以下语言：
- 🇺🇸 English (默认)
- 🇨🇳 简体中文
- 🇯🇵 日本語
- 🇰🇷 한국어

## 🖼️ Gallery 功能 (简化版)

- **纯净展示** - 无复杂搜索过滤，专注浏览体验
- **分页加载** - 支持 290+ GIF，每页 20 个，性能优化
- **懒加载** - 图片懒加载，提升加载速度
- **一键下载** - 三级下载策略，确保下载成功
- **下载统计** - 本地统计 + Google Analytics 跟踪
- **响应式网格** - 适配各种屏幕尺寸

## 🔧 构建和部署

1. **构建生产版本**
   ```bash
   npm run build
   ```

2. **预览生产版本**
   ```bash
   npm run preview
   ```

3. **代码检查**
   ```bash
   npm run lint
   ```

## 📝 配置说明

### CDN 地址配置
- **WigglyPaint 工具**: `https://gifs.wigglypaintgif.com/WigglyPaint.html`
- **GIF 图片**: `https://gifs.wigglypaintgif.com/{filename}.gif`

### Google Analytics 配置
1. 复制 `.env.example` 为 `.env`
2. 设置你的 GA Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. 下载事件会自动跟踪到 GA

### 下载功能配置

#### 问题说明
默认情况下，浏览器会将 GIF 图片在新标签页中显示而不是下载。这是因为 CDN 返回 `Content-Type: image/gif` 响应头。

#### R2 CDN 配置方案（推荐）
在 Cloudflare R2 中配置以下响应头来强制下载：

1. **通过 Cloudflare Workers 设置**（最灵活）：
```javascript
export default {
  async fetch(request, env) {
    const response = await env.BUCKET.fetch(request);
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        'Content-Disposition': 'attachment; filename="image.gif"',
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      }
    });
    return newResponse;
  }
}
```

2. **通过 R2 自定义域名设置**：
```
Content-Disposition: attachment
Content-Type: application/octet-stream
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

#### 代码层面的解决方案（当前实现）
如果无法修改 CDN 配置，代码中已实现三层下载策略：

1. **强制 Blob 下载**：获取图片并重新包装为 `application/octet-stream`
2. **直接链接下载**：使用 `download` 属性（某些浏览器支持）
3. **用户友好的 Fallback**：在新页面显示图片和下载说明

#### 测试下载功能
```bash
# 在浏览器控制台中测试
console.log('Testing download functionality...');
```

### 自定义配置
在 `src/types/simple.ts` 中的 `generateSimpleGifData()` 函数中修改：
- GIF 总数量 (默认 290)
- CDN 基础地址
- 默认文件尺寸

## 🎯 架构特点

### 简化设计原则
- **每层目录文件数 ≤ 8个**
- **组件代码 ≤ 200行**
- **避免过度工程化**
- **使用成熟稳定的技术栈**

### 组件架构
- **ToolEmbed** - iframe 工具嵌入组件
- **GalleryGrid** - 响应式图片网格
- **SearchFilter** - 搜索和过滤功能
- **Layout** - 通用页面布局

## 📱 移动端优化

- 移动优先的响应式设计
- 触摸友好的交互体验
- 优化的加载性能
- 适配不同屏幕尺寸

## 🔄 未来扩展

- PWA 功能支持
- 用户上传系统
- 更多工具集成
- 社交分享功能

---

**开发时间**: 约 2-3 小时完成 MVP 版本  
**技术债务**: 极低，架构清晰简洁  
**维护难度**: 简单，遵循最佳实践
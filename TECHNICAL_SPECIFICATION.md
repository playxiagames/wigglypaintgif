# Wiggly Paint 多语言网站技术规格文档

## 📋 项目概述

### 项目名称
Wiggly Paint 多语言 GIF 生成工具网站

### 项目目标
创建一个简洁高效的多语言响应式网站，以 Wiggly Paint GIF 生成工具为核心，提供工具使用和作品展示功能。

### 核心价值主张
- 🎨 集成 Wiggly Paint GIF 生成工具
- 🌍 支持四种语言的国际化体验
- 📱 移动优先的响应式设计
- 🖼️ 简洁的作品展示功能

## 🛠️ 技术栈

### 前端技术
- **框架**: React 18+ with TypeScript
- **构建工具**: Vite 4+
- **样式**: Tailwind CSS
- **路由**: React Router v6
- **状态管理**: React useState/useReducer (必要时升级)
- **多语言**: react-i18next

### 数据管理
- **图片存储**: Cloudflare R2 CDN (已配置)
- **元数据**: 本地 JSON 文件 (手动维护)
- **用户偏好**: localStorage

### 开发工具
- **代码质量**: ESLint + Prettier
- **类型检查**: TypeScript strict mode
- **UI组件**: MCP 21st.dev 和 MagicUI 工具
- **版本控制**: Git

## 🏗️ 系统架构

### 整体架构图
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   用户界面层     │    │   业务逻辑层     │    │   数据存储层     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ React Components│    │ Custom Hooks    │    │ JSON Files      │
│ Tailwind CSS    │    │ React Context   │    │ R2 CDN Storage  │
│ MCP UI Tools    │    │ Utils Functions │    │ localStorage    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 简化的组件架构
```
App
├── Layout
│   ├── Header (Navigation + Language Switcher)
│   ├── Main (Page Content)
│   └── Footer
├── Pages
│   ├── Home (Wiggly Paint Tool)
│   ├── Gallery (GIF Showcase)
│   └── About (Information)  
└── Common Components
    ├── ToolEmbed (iframe Container)
    ├── GalleryGrid (Image Grid)
    └── SearchFilter (Filter Controls)
```

## 📁 项目文件结构 (简化版)

```
wigglypaintgif.com/
├── public/
│   ├── locales/                  # react-i18next 语言文件
│   │   ├── en.json               # 英语
│   │   ├── ko.json               # 韩语
│   │   ├── ja.json               # 日语
│   │   └── zh.json               # 中文
│   └── favicon.ico
├── src/
│   ├── components/               # React 组件 (每个文件夹≤8个文件)
│   │   ├── layout/              # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── gallery/             # 画廊组件
│   │   │   ├── GalleryGrid.tsx
│   │   │   ├── GalleryItem.tsx
│   │   │   └── SearchFilter.tsx
│   │   └── common/              # 通用组件
│   │       ├── ToolEmbed.tsx
│   │       └── LanguageSwitch.tsx
│   ├── pages/                   # 页面组件
│   │   ├── Home.tsx
│   │   ├── Gallery.tsx
│   │   └── About.tsx
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── useGallery.ts
│   │   └── useLocalStorage.ts
│   ├── utils/                   # 工具函数
│   │   ├── i18n.ts
│   │   └── constants.ts
│   ├── data/                    # 数据文件
│   │   └── gallery.json
│   ├── types/                   # TypeScript 类型
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── eslint.config.js
└── README.md
```

## 🎨 设计系统 (基于Tailwind CSS)

### 主题配置
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6', 
          900: '#1e3a8a'
        }
      },
      fontFamily: {
        'en': ['Inter', 'system-ui', 'sans-serif'],
        'zh': ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        'ja': ['Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'sans-serif'],
        'ko': ['Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif']
      }
    }
  }
}
```

### 响应式断点 (Tailwind默认)
- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px

## 🌍 多语言实现 (react-i18next)

### 语言支持
- **英语 (en)**: 默认语言
- **中文 (zh)**: 简体中文
- **日语 (ja)**: 日本語
- **韩语 (ko)**: 한국어

### react-i18next 配置示例
```typescript
// src/utils/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入翻译资源
import enTranslations from '../locales/en/common';
import zhTranslations from '../locales/zh/common';
import jaTranslations from '../locales/ja/common';
import koTranslations from '../locales/ko/common';

const resources = {
  en: {
    common: enTranslations
  },
  zh: {
    common: zhTranslations
  },
  ja: {
    common: jaTranslations
  },
  ko: {
    common: koTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,

    defaultNS: 'common',
    ns: ['common'],

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;
```

## 🖼️ Gallery 系统

### 数据结构
```typescript
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  category: string;
  createdAt: string;
  author?: string;
  downloads: number;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
}
```

### 功能特性
- **懒加载**: Intersection Observer API
- **搜索**: 标题、标签、分类搜索
- **过滤**: 按分类、时间、热度过滤
- **下载**: 一键下载原图
- **分页**: 虚拟滚动或分页加载

## 🔧 工具嵌入系统

### iframe 容器组件
```typescript
interface ToolEmbedProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
  allowFullscreen?: boolean;
  sandbox?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}
```

### 安全考虑
- CSP (Content Security Policy) 配置
- iframe sandbox 属性
- 跨域通信限制

## 📱 响应式设计

### 移动优先策略
```css
/* 移动端基础样式 */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* 平板端适配 */
@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

/* 桌面端适配 */
@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

### 触摸友好设计
- 最小点击区域 44px
- 手势支持（滑动、缩放）
- 触摸反馈动画

## ⚡ 性能优化

### 代码分割
```typescript
// 路由级别的代码分割
const Gallery = lazy(() => import('./pages/Gallery'));
const Tools = lazy(() => import('./pages/Tools'));
const Blog = lazy(() => import('./pages/Blog'));
```

### 图片优化
- WebP 格式支持
- 响应式图片 (srcset)
- 懒加载实现
- 预加载关键图片

### 缓存策略
```javascript
// Service Worker 缓存策略
const CACHE_NAME = 'wiggly-paint-v1';
const STATIC_ASSETS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];
```

## 🔍 SEO 优化

### Meta 标签
```html
<meta name="description" content="Create amazing animated GIFs with Wiggly Paint tool">
<meta property="og:title" content="Wiggly Paint - Animated GIF Creator">
<meta property="og:description" content="Create amazing animated GIFs">
<meta property="og:image" content="/og-image.jpg">
```

### 结构化数据
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wiggly Paint",
  "description": "Animated GIF creation tool",
  "url": "https://wigglypaintgif.com"
}
```

## 🚀 PWA 功能

### Manifest 配置
```json
{
  "name": "Wiggly Paint",
  "short_name": "Wiggly Paint",
  "description": "Animated GIF Creator",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### Service Worker 功能
- 离线缓存
- 后台同步
- 推送通知（可选）

## 🧪 测试策略

### 单元测试
```typescript
// 组件测试示例
describe('GalleryGrid', () => {
  test('renders gallery items correctly', () => {
    render(<GalleryGrid items={mockItems} />);
    expect(screen.getAllByRole('img')).toHaveLength(mockItems.length);
  });
});
```

### 集成测试
- 路由导航测试
- 多语言切换测试
- 搜索功能测试

### E2E 测试
- 关键用户流程
- 跨浏览器兼容性
- 移动端功能测试

## 📊 性能指标

### Core Web Vitals 目标
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 其他性能指标
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s
- **Bundle Size**: < 500KB (gzipped)

## 🔒 安全考虑

### 内容安全策略
```
Content-Security-Policy: 
  default-src 'self'; 
  img-src 'self' https://gifs.wigglypaintgif.com; 
  frame-src https://gifs.wigglypaintgif.com;
```

### 数据保护
- 用户偏好数据本地存储
- 无敏感信息收集
- GDPR 合规考虑

## 🚀 部署策略

### 构建优化
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
});
```

### 部署环境
- **开发环境**: Vite dev server
- **预览环境**: Vite preview
- **生产环境**: Static hosting (Vercel/Netlify)

## 📈 扩展规划

### 第二阶段功能
- 用户账户系统
- GIF 上传功能
- 评论和评分系统
- 社交分享增强

### 第三阶段功能
- 管理员面板
- 内容审核系统
- 高级搜索功能
- API 接口开放

## 📝 开发规范

### 代码风格
- ESLint + Prettier 配置
- TypeScript strict mode
- 组件命名：PascalCase
- 文件命名：kebab-case

### Git 工作流
- 功能分支开发
- Pull Request 审查
- 语义化提交信息

### 文档要求
- 组件 JSDoc 注释
- README 使用说明
- API 接口文档

---

## 📋 详细开发任务清单

### 第一阶段：项目基础架构 (第1-2周)

#### 1. 项目初始化和环境配置
- [x] 项目初始化和基础架构搭建
- [x] 创建详细的技术规格文档
- [ ] 创建React + Vite + TypeScript项目结构
- [ ] 配置开发环境和构建工具
- [ ] 设计项目文件夹架构和命名规范
- [ ] 创建基础的CSS样式系统和设计tokens
- [ ] 实现响应式布局基础框架

#### 2. 核心工具功能实现
- [ ] 设计和实现Wiggly Paint工具嵌入页面
- [ ] 创建iframe容器组件用于嵌入外部工具
- [ ] 实现工具页面的响应式设计
- [ ] 添加加载状态和错误处理

#### 3. Gallery基础系统
- [ ] 创建简单的Gallery展示系统
- [ ] 设计Gallery网格布局组件
- [ ] 创建GIF元数据JSON数据结构
- [ ] 实现基础的图片懒加载功能
- [ ] 添加简单的过滤和搜索功能
- [ ] 实现一键下载功能

### 第二阶段：导航和多语言 (第3-4周)

#### 4. 导航和路由系统
- [ ] 建立基础导航和路由系统
- [ ] 创建主导航组件（Tools, Gallery, Blog, About）
- [ ] 实现React Router路由配置
- [ ] 设计移动端导航菜单
- [ ] 创建页面布局模板组件

#### 5. 多语言支持系统
- [ ] 实现多语言支持基础架构
- [ ] 创建语言切换组件
- [ ] 设计多语言JSON文件结构
- [ ] 实现localStorage语言偏好保存
- [ ] 添加基础的四种语言翻译内容

### 第三阶段：优化和扩展 (第5-6周)

#### 6. 性能和功能优化
- [ ] 优化和完善MVP功能
- [ ] 实现PWA基础功能（manifest.json, service worker）
- [ ] 添加SEO基础优化（meta标签，结构化数据）
- [ ] 性能优化（代码分割，图片优化）
- [ ] 移动端适配和测试

#### 7. 扩展功能架构
- [ ] 准备扩展功能的架构基础
- [ ] 设计博客系统的数据结构
- [ ] 规划用户提交系统的接口设计
- [ ] 创建管理面板的基础框架
- [ ] 文档编写和部署准备

## 📊 开发里程碑总结

### 第一阶段：MVP 核心功能 (2-3 周)
**目标**: 完成基础的Wiggly Paint工具嵌入和Gallery展示功能
- 项目初始化和基础架构 ✅
- Wiggly Paint 工具嵌入
- 基础 Gallery 展示
- 基础导航系统

### 第二阶段：功能完善 (2-3 周)
**目标**: 实现完整的多语言支持和高级Gallery功能
- 多语言支持实现
- Gallery 高级功能（搜索、过滤、下载）
- 响应式优化
- 导航和路由完善

### 第三阶段：性能和扩展 (1-2 周)
**目标**: 性能优化和为未来扩展做准备
- PWA 功能实现
- SEO 优化
- 性能优化
- 扩展功能架构准备

**总预估开发时间：5-8 周**

## 🎯 任务优先级说明

### 高优先级 (必须完成)
1. Wiggly Paint工具嵌入功能
2. Gallery基础展示功能
3. 多语言支持
4. 响应式设计
5. 基础导航系统

### 中优先级 (重要功能)
1. Gallery高级功能（搜索、过滤）
2. PWA功能
3. SEO优化
4. 性能优化

### 低优先级 (扩展功能)
1. 博客系统架构
2. 用户提交系统
3. 管理面板
4. 高级分析功能

## 📝 实施注意事项

### 开发顺序建议
1. **先搭建基础架构**：确保项目结构清晰，开发环境配置完善
2. **核心功能优先**：Wiggly Paint嵌入是项目的核心价值
3. **渐进式增强**：从基础功能开始，逐步添加高级特性
4. **移动优先**：确保在移动设备上的良好体验
5. **性能考虑**：在开发过程中持续关注性能指标

### 质量保证
- 每个功能模块完成后进行测试
- 定期进行代码审查
- 持续集成和部署
- 用户体验测试

### 风险控制
- 关键功能有备选方案
- 第三方依赖的风险评估
- 性能瓶颈的预防措施
- 安全漏洞的防范

---

*本技术规格文档将随着项目进展持续更新和完善。*
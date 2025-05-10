# Game Launch Boost - 使用指南

## 1. 项目概述

Game Launch Boost 是一个专门为游戏展示和发布设计的模板项目，它提供了丰富的功能和灵活的布局，适合创建游戏展示网站、游戏集合平台或游戏发布页面。

## 2. 技术架构

### 核心技术栈

- **Next.js**: React 框架，提供服务端渲染和静态生成能力
- **Nextra**: 基于 Next.js 的内容框架，支持 MDX（Markdown + JSX）
- **Tailwind CSS**: 实用优先的 CSS 框架，用于样式设计
- **React**: 用户界面库
- **TypeScript**: 为 JavaScript 提供类型支持

### 主要依赖

- `next-themes`: 主题切换功能（明/暗模式）
- `react-share`: 社交分享组件
- `@iconify/react`: 图标库
- `next-sitemap`: 自动生成网站地图
- `@cloudflare/next-on-pages`: Cloudflare Pages 部署支持

## 3. 项目结构

```
.
├── config/              # 配置文件目录
│   └── site.js         # 网站核心配置（站点名称、语言等）
├── pages/              # 页面文件（多语言内容）
│   ├── en/             # 英文内容
│   ├── zh/             # 中文内容
│   ├── _app.tsx       # 应用入口配置
│   └── index.tsx      # 首页重定向
├── theme/              # 主题相关
│   └── src/           # 主题源码
│       ├── layouts/   # 页面布局模板
│       │   ├── default.tsx    # 默认游戏页面布局
│       │   ├── category.tsx   # 分类页面布局
│       │   ├── featured.tsx   # 特色页面布局（首页）
│       │   └── landing.tsx    # 着陆页布局
│       └── components/ # 组件
├── public/            # 静态资源
│   ├── images/        # 图片资源
│   └── favicon.ico    # 网站图标
└── theme.config.jsx   # 主题配置文件
```

## 4. 业务架构

### 内容组织

1. **游戏页面**：使用 MDX 文件定义每个游戏的内容和元数据
2. **分类页面**：收集和展示特定分类的游戏
3. **首页**：特色布局，展示多个分类的游戏
4. **指南页面**：提供使用文档和指南

### 布局系统

项目提供四种主要布局：

1. **Default 布局**：游戏详情页面，支持嵌入游戏 iframe
2. **Category 布局**：游戏分类页面，以网格形式展示游戏列表
3. **Featured 布局**：特色页面（通常用于首页），展示多个分类的轮播
4. **Landing 布局**：营销落地页，用于特殊活动或推广

### 多语言支持

- 支持多语言内容，每种语言在 `pages/` 下有独立目录
- 可通过 `config/site.js` 配置支持的语言和默认语言

## 5. 使用指南

### 5.1 基础配置

首先，需要配置网站的基本信息，打开 `config/site.js`：

```javascript
// 修改网站基础信息
const SITE_CONFIG = {
  url: "https://yourdomain.com", // 修改为你的网站域名
  title: "你的游戏网站", // 修改网站标题
  twitter: "@yourhandle", // 修改社交媒体信息
  siteName: "你的游戏网站", // 修改站点名称
  logo: {
    text: "你的游戏网站", // 修改 Logo 文字
    image: "/your-logo.svg", // 修改 Logo 图片路径
    height: 32, // 修改 Logo 高度
  },
  primaryColor: "#你的主题色", // 修改主题色
  features: {
    i18n: true, // 是否启用多语言
    themeSwitch: true, // 是否启用主题切换
    defaultTheme: "light", // 默认主题: light 或 dark
  },
};
```

### 5.2 添加游戏内容

1. **创建游戏页面文件**：
   在 `pages/[语言]/games/[分类]/` 目录下创建 `.mdx` 文件，如 `my-game.mdx`

2. **游戏页面 Frontmatter 配置**：
```
---
title: 游戏标题        # 必填：页面标题
description: 游戏描述  # 可选：游戏描述
game: https://example.com/game-url  # 游戏iframe链接
cover: /images/game-cover.jpg      # 封面图片路径
date: 2024-03-20                  # 发布日期
tags:                             # 标签
  - action
  - multiplayer
---

# 游戏内容

这里是游戏的详细介绍、玩法说明或其他内容...
```

3. **游戏分类页面**：
   在 `pages/[语言]/games/` 目录下创建分类页面，如 `action.mdx`：
```
---
title: 动作游戏
layout: category
---

这里是动作游戏分类的介绍内容...
```

4. **首页配置**：
   编辑 `pages/[语言]/index.mdx`，使用 Featured 布局：
```
---
title: 首页
layout: featured
categories:
  - games/action     # 展示动作游戏分类
  - games/puzzle     # 展示益智游戏分类
  - games/popular    # 展示热门游戏
---

欢迎来到游戏网站！
```

### 5.3 自定义主题

1. **修改颜色和样式**：
   编辑 `tailwind.config.js` 自定义颜色和样式

2. **自定义布局**：
   如需修改布局，可编辑 `theme/src/layouts/` 下的文件

3. **添加自定义组件**：
   在 `theme/src/components/` 目录创建新组件

### 5.4 部署网站

1. **构建项目**：
   ```
   pnpm build
   ```

2. **部署到 Cloudflare Pages**：
   ```
   # Cloudflare Pages 构建
   pnpm pages:build
   ```
   
   然后按照文档中的指南将代码上传到 GitHub，并在 Cloudflare Pages 中配置部署。

## 6. 注意事项

1. **游戏 iframe 嵌入**：
   - 确保游戏 URL 支持 iframe 嵌入
   - 某些游戏可能需要特定的权限设置

2. **图片资源**：
   - 将图片放在 `public/images/` 目录下
   - 引用路径为 `/images/filename.jpg`

3. **多语言内容**：
   - 确保每种语言的内容结构保持一致
   - 翻译所有必要的文件和配置

4. **性能优化**：
   - 优化图片大小和格式
   - 避免过多的外部资源

5. **SEO 优化**：
   - 为每个页面添加合适的 title 和 description
   - 使用 `next-sitemap` 生成的 sitemap.xml

## 7. 扩展功能

1. **添加评论系统**：
   可集成 Disqus 或其他评论系统

2. **游戏评分系统**：
   可添加评分功能让用户对游戏进行评分

3. **用户账户系统**：
   如需用户注册和登录功能，需要额外开发

4. **广告集成**：
   可以添加 Google AdSense 或其他广告系统

## 8. 常见问题解决

1. **游戏无法嵌入**：
   检查游戏 URL 是否支持 iframe 嵌入，某些站点可能限制 iframe 嵌入

2. **样式问题**：
   检查 Tailwind 配置，可能需要添加自定义样式

3. **部署问题**：
   确保正确配置了 Cloudflare Pages 部署设置

4. **多语言切换问题**：
   检查 `config/site.js` 中的语言配置是否正确

## 9. 资源和链接

- [Next.js 文档](https://nextjs.org/docs)
- [Nextra 文档](https://nextra.site/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/) 
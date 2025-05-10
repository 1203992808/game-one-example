# Game Launch Boost - MDX开发指南

## 一、MDX文件介绍

### 1.1 什么是MDX？

MDX是一种强大的文件格式，它结合了Markdown的简洁写作语法和JSX（React组件）的交互能力。在Game Launch Boost项目中，MDX是构建所有页面内容的核心，允许开发者同时使用简单的Markdown和复杂的React组件。

MDX的主要优势：
- **内容与组件的融合**：在同一文件中写内容和引入交互组件
- **灵活的页面布局**：通过frontmatter配置选择不同的页面布局
- **组件的重用**：在Markdown中嵌入可重用的React组件
- **动态内容生成**：通过变量和组件属性动态生成内容

### 1.2 MDX在本项目中的角色

在Game Launch Boost中，MDX文件用于：
- 创建游戏展示页面
- 配置游戏分类和集合
- 提供游戏详情和描述
- 构建文档和指南页面

## 二、MDX文件结构详解

### 2.1 基本结构

一个典型的MDX文件包含三个主要部分：

```mdx
---
// 1. Frontmatter区域（YAML格式的元数据）
title: 游戏标题
layout: featured
---

// 2. 内容区域（Markdown格式）
# 一级标题
这是普通文本内容

// 3. 组件区域（JSX组件，可穿插在Markdown中）
<GameComponent prop="value" />
```

### 2.2 Frontmatter详解

Frontmatter是MDX文件顶部两个`---`之间的YAML格式内容，用于定义页面的各种属性和配置。

#### 2.2.1 基础属性

```yaml
---
title: 游戏名称          # 页面标题，将显示在浏览器标签和SEO中
description: 游戏简介    # 页面描述，用于SEO和预览
layout: featured        # 页面布局类型
date: 2023-05-01        # 发布日期
---
```

#### 2.2.2 游戏相关属性

```yaml
---
game: https://example.com/game-url  # 游戏嵌入链接
cover: /images/game-cover.jpg       # 游戏封面图
category: action                    # 游戏主分类
tags: [shooting, multiplayer]       # 游戏标签
---
```

#### 2.2.3 布局特定属性

```yaml
---
# Featured布局特有属性
categories:                # 要在页面上显示的游戏分类
  - games/action          
  - games/adventure
  - games/popular
  
# 其他布局属性  
breadcrumb: false          # 是否显示面包屑导航
---
```

### 2.3 Markdown内容

MDX支持所有标准Markdown语法：

```markdown
# 一级标题
## 二级标题

普通段落文本，支持**粗体**和*斜体*。

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

> 引用文本

[链接文本](https://example.com)

![图片描述](/path/to/image.jpg)

| 表格标题1 | 表格标题2 |
|----------|----------|
| 单元格1   | 单元格2   |
```

### 2.4 嵌入JSX组件

除了Markdown，MDX允许直接嵌入React组件：

```jsx
<GameCard
  title="超级游戏"
  description="一个精彩的游戏体验"
  image="/games/super-game.jpg"
/>

{/* 使用JavaScript表达式 */}
{gameList.map(game => (
  <GameCard key={game.id} {...game} />
))}
```

## 三、布局系统详解

Game Launch Boost使用可配置的布局系统，通过在MDX文件中设置`layout`属性来选择不同的页面布局。

### 3.1 可用布局类型

#### 3.1.1 Featured布局 (featured)

**用途**：主页或特色页面，展示精选游戏和多个游戏分类。

**文件位置**：`theme/src/layouts/featured.tsx`

**主要特点**：
- 顶部展示特色游戏（通过`game`属性指定）
- 根据`categories`属性显示多个游戏分类轮播
- 下方显示MDX内容

**核心代码分析**：
```tsx
// 获取特色分类的游戏
const getFeaturedGames = (category: string) => {
    const games = getGamesByCategory(pageMap, category, locale);
    return games.slice(0, 20); // 只取前20个游戏
};

// 从路径获取分类名称
const getCategoryTitle = (path: string) => {
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
```

这段代码将从配置的目录中获取游戏并格式化分类标题，例如"action-games"会变成"Action Games"。

**示例配置**：
```yaml
---
title: 游戏首页
layout: featured
game: https://example.com/featured-game
cover: /images/featured-cover.jpg
categories:
  - games/action
  - games/adventure
  - games/popular
---
```

#### 3.1.2 分类布局 (category)

**用途**：展示单个游戏分类的所有游戏。

**文件位置**：`theme/src/layouts/category.tsx`

**主要特点**：
- 以网格形式展示当前分类的所有游戏
- 支持过滤和排序功能
- 可显示子分类

**示例配置**：
```yaml
---
title: 动作游戏
layout: category
description: 所有动作类游戏
cover: /images/action-cover.jpg
---
```

#### 3.1.3 默认布局 (default)

**用途**：通用内容页面或单个游戏详情页。

**文件位置**：`theme/src/layouts/default.tsx`

**主要特点**：
- 简洁的内容展示
- 可选的游戏展示框
- 适合详细介绍和文档

**示例配置**：
```yaml
---
title: 游戏标题
layout: default
game: https://example.com/game-url
cover: /images/game-cover.jpg
---
```

#### 3.1.4 着陆页布局 (landing)

**用途**：营销或下载页面，强调视觉吸引力。

**文件位置**：`theme/src/layouts/landing.tsx`

**主要特点**：
- 大型横幅和吸引人的视觉元素
- 行动号召按钮和营销内容
- 多区块结构设计

**示例配置**：
```yaml
---
title: 下载我们的游戏
layout: landing
cover: /images/landing-banner.jpg
---
```

### 3.2 布局选择流程

当访问一个MDX页面时，系统处理流程如下：

1. **MDX解析**：Nextra框架解析MDX文件
2. **获取布局类型**：从frontmatter中读取`layout`属性
3. **布局组件选择**：在`theme/src/layouts/index.ts`中查找对应的布局组件
4. **渲染页面**：使用选定的布局组件渲染MDX内容

**核心代码**（`theme/src/index.tsx`）：
```tsx
export default function Layout({ children, pageOpts, themeConfig }) {
  const { frontMatter, pageMap } = pageOpts
  const { layout = 'default' } = frontMatter
  const LayoutComponent = layouts[layout] || layouts.default
  
  return (
    <ThemeProvider>
      <LayoutComponent frontMatter={frontMatter} pageMap={pageMap}>
        {children}
      </LayoutComponent>
    </ThemeProvider>
  )
}
```

## 四、核心组件详解

### 4.1 GameFrame组件

**功能**：展示可玩的游戏框架，支持封面图和点击播放。

**文件位置**：`theme/src/components/GameFrame.tsx`

**主要属性**：
- `src`: 游戏URL
- `title`: 游戏标题
- `cover`: 封面图URL

**工作原理**：
1. 初始显示游戏封面图和播放按钮
2. 用户点击后加载实际游戏iframe
3. 支持重新加载和全屏功能

**自定义方法**：修改组件以支持更多游戏平台或添加额外控制。

### 4.2 GameCarousel组件

**功能**：展示一组游戏卡片的轮播组件。

**文件位置**：`theme/src/components/GameCarousel.tsx`

**主要属性**：
- `title`: 轮播标题
- `games`: 游戏对象数组

**工作原理**：
1. 将游戏分成多行展示
2. 提供翻页按钮在游戏间导航
3. 每页显示固定数量的游戏卡片

**自定义方法**：调整卡片大小、每行显示数量、翻页动画等。

### 4.3 GameCard组件

**功能**：展示单个游戏的卡片组件。

**文件位置**：`theme/src/components/GameCard.tsx`

**主要属性**：
- `title`: 游戏标题
- `description`: 游戏描述
- `cover`: 封面图URL
- `href`: 游戏详情页链接

**工作原理**：
1. 显示游戏封面图
2. 显示游戏标题和简短描述
3. 提供动画效果和交互响应

**自定义方法**：修改卡片样式、添加评分系统、自定义悬停效果等。

## 五、页面结构配置指南

### 5.1 文件组织结构

Game Launch Boost使用以下文件结构组织内容：

```
pages/                  # 所有页面内容
├── en/                 # 英文内容
│   ├── games/          # 游戏根目录
│   │   ├── action/     # 动作游戏分类
│   │   │   ├── game1.mdx  # 游戏1详情页
│   │   │   └── game2.mdx  # 游戏2详情页
│   │   ├── adventure/  # 冒险游戏分类
│   │   ├── action.mdx  # 动作分类页
│   │   ├── index.mdx       # 首页
│   ├── zh/                 # 中文内容
│   └── ...             # 相同结构
```

### 5.2 分类页面配置

分类页面（如`games/action.mdx`）使用Category布局：

```yaml
---
title: 动作游戏
layout: category
description: 刺激的动作游戏集合
cover: /images/action-games.jpg
---

这里是对动作游戏分类的介绍文本，支持完整的Markdown语法。
```

### 5.3 游戏详情页配置

单个游戏详情页（如`games/action/game1.mdx`）通常使用Default布局：

```yaml
---
title: 超级战士
layout: default
game: https://example.com/super-warrior
cover: /images/super-warrior.jpg
description: 一个刺激的动作射击游戏
category: action
tags: [shooting, multiplayer]
date: 2023-06-15
---

# 超级战士

《超级战士》是一款充满刺激的动作射击游戏，具有以下特点：

- 高清3D图形
- 多人在线对战
- 100多种武器选择
- 25个独特地图

## 游戏背景

游戏设定在2150年的未来世界，玩家将扮演...

## 游戏玩法

使用WASD移动，鼠标瞄准和射击，空格跳跃...
```

### 5.4 首页配置

网站首页（`index.mdx`）通常使用Featured布局：

```yaml
---
title: 游戏平台
layout: featured
description: 发现并体验精彩游戏
game: https://example.com/featured-game
cover: /images/featured-cover.jpg
categories:
  - games/action
  - games/adventure
  - games/popular
  - games/new
breadcrumb: false
---

# 欢迎来到游戏平台

在这里，您可以发现各种精彩的游戏，从刺激的动作游戏到放松的休闲游戏，应有尽有。

## 开始探索

浏览上方的游戏分类，或者直接体验我们的特色游戏。每天都有新游戏加入！
```

## 六、多语言支持

### 6.1 配置多语言

Game Launch Boost支持多语言内容，通过以下步骤配置：

1. **启用多语言功能**：在`config/site.js`中设置：
   ```js
   features: {
     i18n: true,  // 启用多语言
   }
   ```

2. **配置支持的语言**：在`config/site.js`的`SUPPORTED_LOCALES`中：
   ```js
   const SUPPORTED_LOCALES = {
     en: {
       name: "English",
       localeName: "English",
       ogLocale: "en_US",
       htmlLang: "en",
       titleSuffix: "- Game Launch Boost",
       isDefault: true,  // 默认语言
     },
     zh: {
       name: "简体中文",
       localeName: "简体中文",
       ogLocale: "zh_CN",
       htmlLang: "zh",
       titleSuffix: "- 游戏启动平台",
     },
   };
   ```

### 6.2 创建多语言内容

按语言组织页面文件夹：

```
pages/
├── en/           # 英文内容
│   ├── games/
│   ├── index.mdx
├── zh/           # 中文内容
│   ├── games/
│   ├── index.mdx
```

内容翻译应保持文件结构一致，但内容可以针对不同语言适配。

## 七、自定义布局和组件开发

### 7.1 创建自定义布局

1. **创建布局文件**：在`theme/src/layouts/`创建新文件，如`custom.tsx`：
   ```tsx
   import React from 'react';
   import type { PageMapItem } from 'nextra';
   import type { FrontMatter } from '../types';

   interface CustomLayoutProps {
       children: React.ReactNode;
       frontMatter: FrontMatter;
       pageMap: PageMapItem[];
   }

   export function CustomLayout({ children, frontMatter, pageMap }: CustomLayoutProps) {
       return (
           <main className="custom-layout">
               <header className="custom-header">
                   <h1>{frontMatter.title}</h1>
               </header>
               <div className="custom-content">
                   {children}
               </div>
           </main>
       );
   }
   ```

2. **注册布局**：在`theme/src/layouts/index.ts`中添加：
   ```ts
   import { CustomLayout } from './custom';

   export const layouts = {
     default: DefaultLayout,
     featured: FeaturedLayout,
     category: CategoryLayout,
     landing: LandingLayout,
     custom: CustomLayout,  // 新增自定义布局
   };
   ```

3. **使用自定义布局**：在MDX文件中设置：
   ```yaml
   ---
   title: 自定义页面
   layout: custom
   ---
   ```

### 7.2 创建自定义组件

1. **创建组件文件**：在`theme/src/components/`创建新文件，如`Rating.tsx`：
   ```tsx
   import React from 'react';
   
   interface RatingProps {
       value: number;
       total?: number;
   }
   
   export function Rating({ value, total = 5 }: RatingProps) {
       return (
           <div className="rating">
               {Array.from({ length: total }).map((_, index) => (
                   <span key={index} className={index < value ? 'star-filled' : 'star-empty'}>
                       ★
                   </span>
               ))}
           </div>
       );
   }
   ```

2. **在MDX中使用**：需要通过自定义布局或MDX提供程序使组件可用。

## 八、高级定制技巧

### 8.1 自定义CSS样式

1. **全局样式**：修改`theme/src/styles/global.css`

2. **特定组件样式**：在组件文件中使用CSS模块或Tailwind类

3. **布局样式**：调整布局组件中的CSS类和样式

### 8.2 数据获取和动态内容

布局组件可以使用React hooks获取数据：

```tsx
import { useState, useEffect } from 'react';

export function CustomLayout({ children, frontMatter }) {
  const [gameData, setGameData] = useState(null);
  
  useEffect(() => {
    // 获取数据
    fetch('/api/games')
      .then(res => res.json())
      .then(data => setGameData(data));
  }, []);
  
  return (
    <main>
      {gameData && <GameList games={gameData} />}
      {children}
    </main>
  );
}
```

### 8.3 搜索引擎优化(SEO)

优化MDX页面的SEO：

1. **提供完整的frontmatter**：
   ```yaml
   ---
   title: 详细的游戏标题
   description: 包含关键词的详细描述
   keywords: 游戏,动作,冒险
   ---
   ```

2. **使用适当的标题层级**：从h1开始，合理使用h2-h6

3. **添加结构化数据**：通过自定义组件添加JSON-LD

## 九、常见问题与解决方案

### 9.1 MDX内容不显示

**问题**：MDX文件内容不在页面上渲染。

**解决方案**：
- 检查布局组件是否正确引用了`children`属性
- 确认MDX语法正确，没有未闭合的标签
- 查看浏览器控制台是否有错误

### 9.2 样式问题

**问题**：组件样式不符合预期。

**解决方案**：
- 检查类名是否正确应用
- 确认Tailwind类是否被正确处理
- 检查CSS优先级冲突

### 9.3 数据加载

**问题**：游戏数据不加载或分类为空。

**解决方案**：
- 确认文件路径和结构正确
- 检查`getGamesByCategory`函数中的路径匹配逻辑
- 查看控制台日志获取更详细信息

## 十、最佳实践与建议

### 10.1 性能优化

- 压缩图片和媒体文件
- 惰性加载非关键组件
- 避免不必要的数据获取

### 10.2 内容组织

- 保持一致的文件命名规则
- 使用明确的分类结构
- 为所有内容提供完整的元数据

### 10.3 开发流程

- 先在开发环境测试变更
- 使用版本控制跟踪修改
- 定期备份内容和配置

---

## 附录：常用配置参考

### A. Frontmatter完整参考

```yaml
---
# 基本信息
title: 页面标题
description: 页面描述
keywords: 关键词1,关键词2

# 布局配置
layout: featured  # featured, default, category, landing等
breadcrumb: true  # 是否显示面包屑

# 游戏相关
game: https://example.com/game-url  # 游戏URL
cover: /images/cover.jpg  # 封面图
category: action  # 主分类
tags: [tag1, tag2]  # 标签列表

# 分类相关（Featured布局专用）
categories:
  - games/category1
  - games/category2

# 元数据
date: 2023-06-15  # 发布日期
author: 作者名称  # 作者
---
```

### B. 常用组件属性参考

**GameFrame组件**:
```jsx
<GameFrame
  src="https://example.com/game"
  title="游戏标题"
  cover="/images/cover.jpg"
  autoplay={false}
/>
```

**GameCard组件**:
```jsx
<GameCard
  title="游戏标题"
  description="游戏描述"
  cover="/images/cover.jpg"
  href="/games/action/game1"
  category="动作"
  date="2023-06-15"
  tags={["多人", "射击"]}
/>
```

**GameCarousel组件**:
```jsx
<GameCarousel
  title="推荐游戏"
  games={gamesList}
/>
``` 
# MDX 样式组件使用指南

在这个Nextra项目中，我们创建了几个用于增强MDX文档样式的React组件，可以让你在保持Markdown简洁性的同时，实现丰富的布局和样式效果。

## 组件概览

我们提供了以下组件用于美化MDX文档：

1. **TextBlock** - 用于创建不同样式的文本块
2. **Paragraph** - 用于精确控制段落样式
3. **Section** - 用于创建具有特定样式的内容区块
4. **Callout** - 用于创建简洁的提示框和警告框

## 安装与使用

所有组件都已经在项目的 `theme/src/components/` 目录中创建好了。使用时，只需在MDX文件中导入它们：

```jsx
import { TextBlock } from 'theme/src/components/TextBlock'
import { Paragraph } from 'theme/src/components/Paragraph'
import { Section } from 'theme/src/components/Section'
import { Callout } from 'theme/src/components/Callout'
```

## TextBlock 组件

TextBlock是一个通用的文本容器组件，可以应用多种样式变体。

### 属性

- `variant`: 布局变体 ('default', 'highlight', 'centered', 'quote', 'box', 'hero', 'split')
- `color`: 颜色主题 ('primary', 'success', 'warning', 'error', 'info', 'neutral')
- `size`: 文字大小 ('sm', 'md', 'lg', 'xl')
- `font`: 字体 ('normal', 'serif', 'mono')
- `align`: 对齐方式 ('left', 'center', 'right')
- `className`: 自定义CSS类

### 示例

```jsx
<TextBlock>
  普通文本块内容
</TextBlock>

<TextBlock variant="highlight" color="primary">
  高亮文本块内容
</TextBlock>

<TextBlock variant="centered" size="lg">
  居中大字文本
</TextBlock>

<TextBlock variant="split">
  <div>左侧内容</div>
  <div>右侧内容</div>
</TextBlock>
```

## Paragraph 组件

Paragraph组件用于控制段落的详细样式，比普通的`<p>`标签提供更多的控制选项。

### 属性

- `lead`: 是否是引导段落，使用较大字号和字重
- `emphasis`: 是否使用中等字重强调文本
- `muted`: 是否使用较淡的颜色展示次要信息
- `color`: 文本颜色 ('default', 'primary', 'success', 'warning', 'error', 'info')
- `size`: 字体大小 ('sm', 'base', 'lg', 'xl')
- `spacing`: 行高 ('tight', 'normal', 'relaxed')
- `align`: 对齐方式 ('left', 'center', 'right')
- `className`: 自定义CSS类

### 示例

```jsx
<Paragraph>
  普通段落内容
</Paragraph>

<Paragraph lead={true}>
  引导段落，比普通段落更醒目
</Paragraph>

<Paragraph emphasis={true} color="primary">
  强调段落，使用了主题色和中等字重
</Paragraph>

<Paragraph muted={true}>
  次要信息段落，使用较淡的颜色
</Paragraph>
```

## Section 组件

Section组件用于创建包含标题和内容的完整区块，支持多种视觉样式。

### 属性

- `title`: 区块标题
- `subtitle`: 区块副标题
- `variant`: 布局变体 ('default', 'card', 'gradient', 'feature', 'banner')
- `color`: 颜色主题 ('primary', 'success', 'warning', 'error', 'info', 'neutral')
- `compact`: 是否使用更紧凑的内边距
- `withIcon`: 是否在标题前显示图标
- `icon`: 图标类型 ('lightbulb', 'warning', 'info', 'success', 'error')
- `className`: 自定义CSS类

### 示例

```jsx
<Section title="卡片样式区块" variant="card" color="primary">
  卡片内容...
</Section>

<Section 
  title="渐变背景区块" 
  subtitle="带有副标题说明"
  variant="gradient" 
  color="info"
  withIcon={true}
  icon="info"
>
  渐变区块内容...
</Section>
```

## Callout 组件

Callout组件是一个简单的提示框组件，用于强调重要信息，提供了几种预设的样式。

### 属性

- `type`: 提示框类型 ('info', 'tip', 'warning', 'danger', 'note')
- `title`: 提示框标题，如不提供则使用默认标题
- `emoji`: 自定义图标，如不提供则使用默认图标
- `className`: 自定义CSS类

### 示例

```jsx
<Callout type="info">
  一般性信息提示
</Callout>

<Callout type="tip" title="游戏小技巧">
  特别提示内容
</Callout>

<Callout type="warning" title="兼容性提示">
  警告提示内容
</Callout>

<Callout type="danger" title="注意！" emoji="🔥">
  危险警告内容
</Callout>
```

## 组合使用

这些组件可以组合使用，创建更复杂的布局和内容块：

```jsx
<Section title="游戏特性介绍" variant="card" color="primary">
  <TextBlock variant="split">
    <div>
      <Paragraph lead={true}>高品质3D图形</Paragraph>
      <Paragraph>详细描述内容...</Paragraph>
    </div>
    <div>
      <Paragraph lead={true}>物理驱动的驾驶模型</Paragraph>
      <Paragraph>详细描述内容...</Paragraph>
    </div>
  </TextBlock>
  
  <Callout type="tip" title="专家建议">
    特别提示内容...
  </Callout>
</Section>
```

## 在项目中的示例

可以查看 `pages/en/styled-example.mdx` 文件，其中包含了所有组件的完整使用示例。 
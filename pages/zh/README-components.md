# MDX 样式组件完全指南

在这个Nextra项目中，我们创建了一系列强大的React组件，用于增强MDX文档的样式和布局。使用这些组件，你可以在保持Markdown简洁性的同时，实现丰富多样的排版效果。

## 目录

1. [组件总览](#组件总览)
2. [基础组件](#基础组件)
   - [TextBlock 文本块组件](#textblock-文本块组件)
   - [Paragraph 段落组件](#paragraph-段落组件)
   - [Callout 提示框组件](#callout-提示框组件)
3. [布局组件](#布局组件)
   - [Section 区块组件](#section-区块组件)
   - [Grid 网格组件](#grid-网格组件)
4. [内容组件](#内容组件)
   - [Card 卡片组件](#card-卡片组件)
   - [Feature 特性组件](#feature-特性组件)
   - [Tabs 选项卡组件](#tabs-选项卡组件)
5. [组件组合示例](#组件组合示例)
6. [最佳实践](#最佳实践)

## 组件总览

我们提供了以下组件用于美化MDX文档：

1. **基础组件**：
   - **TextBlock** - 通用文本容器，支持多种布局变体
   - **Paragraph** - 用于精确控制段落样式
   - **Callout** - 用于创建醒目的提示框和警告框

2. **布局组件**：
   - **Section** - 用于创建具有特定样式的内容区块
   - **Grid** - 用于创建灵活的网格布局

3. **内容组件**：
   - **Card** - 用于创建卡片式内容展示
   - **Feature** - 用于展示特性和功能介绍
   - **Tabs** - 用于创建选项卡式内容切换界面

## 基础组件

### TextBlock 文本块组件

TextBlock是一个通用的文本容器组件，可以应用多种样式变体。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `variant` | string | 'default' | 布局变体：'default', 'highlight', 'centered', 'quote', 'box', 'hero', 'split' |
| `color` | string | 'primary' | 颜色主题：'primary', 'success', 'warning', 'error', 'info', 'neutral' |
| `size` | string | 'md' | 文字大小：'sm', 'md', 'lg', 'xl' |
| `font` | string | 'normal' | 字体：'normal', 'serif', 'mono' |
| `align` | string | 'left' | 对齐方式：'left', 'center', 'right' |
| `className` | string | '' | 自定义CSS类 |

#### 使用示例

```jsx
// 默认文本块
<TextBlock>
  普通文本内容，支持**Markdown**语法。
</TextBlock>

// 高亮文本块
<TextBlock variant="highlight" color="primary">
  高亮文本块内容
</TextBlock>

// 居中文本块
<TextBlock variant="centered" size="lg">
  居中大字文本
</TextBlock>

// 分栏文本块
<TextBlock variant="split">
  <div>左侧内容</div>
  <div>右侧内容</div>
</TextBlock>
```

### Paragraph 段落组件

Paragraph组件用于控制段落的详细样式，比普通的`<p>`标签提供更多的控制选项。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `lead` | boolean | false | 是否是引导段落，使用较大字号和字重 |
| `emphasis` | boolean | false | 是否使用中等字重强调文本 |
| `muted` | boolean | false | 是否使用较淡的颜色展示次要信息 |
| `color` | string | 'default' | 文本颜色：'default', 'primary', 'success', 'warning', 'error', 'info' |
| `size` | string | 'base' | 字体大小：'sm', 'base', 'lg', 'xl' |
| `spacing` | string | 'normal' | 行高：'tight', 'normal', 'relaxed' |
| `align` | string | 'left' | 对齐方式：'left', 'center', 'right' |
| `className` | string | '' | 自定义CSS类 |

#### 使用示例

```jsx
// 普通段落
<Paragraph>
  这是一个普通段落。
</Paragraph>

// 引导段落
<Paragraph lead={true}>
  这是一个引导段落，使用较大的字号和字重，适合作为内容的开场白。
</Paragraph>

// 强调段落
<Paragraph emphasis={true} color="primary">
  这是一个强调段落，使用了主题色和中等字重。
</Paragraph>

// 次要信息段落
<Paragraph muted={true}>
  这是一个次要信息段落，使用较淡的颜色和较小的字号。
</Paragraph>
```

### Callout 提示框组件

Callout组件是一个简单的提示框组件，用于强调重要信息，提供了几种预设的样式。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `type` | string | 'info' | 提示框类型：'info', 'tip', 'warning', 'danger', 'note' |
| `title` | string | - | 提示框标题，如不提供则使用默认标题 |
| `emoji` | string | - | 自定义图标，如不提供则使用默认图标 |
| `className` | string | '' | 自定义CSS类 |

#### 使用示例

```jsx
// 信息提示框
<Callout type="info">
  一般性信息提示内容
</Callout>

// 带自定义标题的提示框
<Callout type="tip" title="游戏小技巧">
  特别提示内容...
</Callout>

// 警告提示框
<Callout type="warning" title="兼容性提示">
  警告提示内容...
</Callout>

// 自定义图标的危险提示框
<Callout type="danger" title="注意！" emoji="🔥">
  危险警告内容...
</Callout>
```

## 布局组件

### Section 区块组件

Section组件用于创建包含标题和内容的完整区块，支持多种视觉样式。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `title` | string | - | 区块标题 |
| `subtitle` | string | - | 区块副标题 |
| `variant` | string | 'default' | 布局变体：'default', 'card', 'gradient', 'feature', 'banner' |
| `color` | string | 'primary' | 颜色主题：'primary', 'success', 'warning', 'error', 'info', 'neutral' |
| `compact` | boolean | false | 是否使用更紧凑的内边距 |
| `withIcon` | boolean | false | 是否在标题前显示图标 |
| `icon` | string | 'lightbulb' | 图标类型：'lightbulb', 'warning', 'info', 'success', 'error' |
| `className` | string | '' | 自定义CSS类 |

#### 使用示例

```jsx
// 卡片样式区块
<Section title="卡片样式区块" variant="card" color="primary">
  卡片内容...
</Section>

// 带副标题和图标的渐变背景区块
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

### Grid 网格组件

Grid组件用于创建灵活的网格布局，支持响应式设计。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `columns` | number \| 'auto' | 2 | 列数：1, 2, 3, 4, 'auto' |
| `gap` | string | 'md' | 间距：'none', 'xs', 'sm', 'md', 'lg', 'xl' |
| `alignItems` | string | 'stretch' | 垂直对齐：'start', 'center', 'end', 'stretch' |
| `justifyItems` | string | 'stretch' | 水平对齐：'start', 'center', 'end', 'stretch' |
| `responsive` | boolean | true | 是否启用响应式布局 |
| `className` | string | '' | 自定义CSS类 |

#### 使用示例

```jsx
// 2列网格
<Grid columns={2} gap="md">
  <div>第一列内容</div>
  <div>第二列内容</div>
</Grid>

// 3列响应式网格
<Grid columns={3} gap="lg" responsive={true}>
  <div>第一列内容</div>
  <div>第二列内容</div>
  <div>第三列内容</div>
</Grid>

// 垂直居中对齐
<Grid columns={2} gap="md" alignItems="center">
  <div>较短内容</div>
  <div>较高内容</div>
</Grid>
```

## 内容组件

### Card 卡片组件

Card组件用于创建卡片式内容展示，支持标题、图片和操作按钮。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `title` | string | - | 卡片标题 |
| `subtitle` | string | - | 卡片副标题 |
| `image` | string | - | 卡片图片URL |
| `imageAlt` | string | '卡片图片' | 图片替代文本 |
| `variant` | string | 'default' | 卡片变体：'default', 'elevated', 'outlined', 'interactive', 'glass' |
| `color` | string | 'neutral' | 颜色主题：'primary', 'success', 'warning', 'error', 'info', 'neutral' |
| `size` | string | 'md' | 卡片大小：'sm', 'md', 'lg' |
| `withAction` | boolean | false | 是否显示操作按钮 |
| `actionText` | string | '查看详情' | 操作按钮文本 |
| `actionIcon` | string | 'arrow-right' | 操作按钮图标 |
| `onActionClick` | function | - | 操作按钮点击事件处理函数 |
| `className` | string | '' | 自定义CSS类 |

#### 使用示例

```jsx
// 基础卡片
<Card title="基础卡片" subtitle="默认样式">
  这是一个基础卡片，展示了简单的标题、副标题和内容。
</Card>

// 带图片的卡片
<Card 
  title="带图片的卡片" 
  subtitle="展示内容" 
  image="/path/to/image.jpg"
>
  卡片内容...
</Card>

// 浮起样式卡片
<Card title="浮起卡片" variant="elevated">
  带有阴影效果的浮起卡片
</Card>

// 交互式卡片
<Card 
  title="交互式卡片" 
  variant="interactive" 
  withAction={true} 
  actionText="了解更多"
>
  鼠标悬停时会有阴影效果的交互式卡片
</Card>
```

### Feature 特性组件

Feature组件用于展示特性和功能介绍，支持图标和不同布局。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `title` | string | - | 特性标题（必填） |
| `icon` | string | '✨' | 图标内容 |
| `iconType` | string | 'emoji' | 图标类型：'emoji', 'custom' |
| `variant` | string | 'default' | 布局变体：'default', 'card', 'compact', 'highlight' |
| `color` | string | 'primary' | 颜色主题：'primary', 'success', 'warning', 'error', 'info', 'neutral' |
| `iconPosition` | string | 'top' | 图标位置：'top', 'left' |
| `iconSize` | string | 'md' | 图标大小：'sm', 'md', 'lg' |
| `className` | string | '' | 自定义CSS类 |

#### 使用示例

```jsx
// 默认特性展示
<Feature title="游戏物理引擎">
  采用先进的物理引擎，模拟真实的车辆动力学。
</Feature>

// 卡片式特性
<Feature title="高级图形" icon="🎮" variant="card">
  支持高分辨率纹理和实时光照效果。
</Feature>

// 高亮特性
<Feature title="自定义车辆" icon="🔧" variant="highlight" color="warning">
  完整的车辆自定义系统。
</Feature>

// 左侧图标布局
<Feature title="左侧图标" iconPosition="left" iconSize="md" variant="card">
  图标位于左侧，更适合阅读流程。
</Feature>
```

### Tabs 选项卡组件

Tabs组件用于创建选项卡式内容切换界面，支持多种样式和布局。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| `items` | array | - | 选项卡项目数组（必填） |
| `defaultTab` | string | - | 默认选中的选项卡ID |
| `variant` | string | 'default' | 选项卡样式：'default', 'pills', 'underline', 'enclosed' |
| `color` | string | 'primary' | 颜色主题：'primary', 'success', 'warning', 'error', 'info', 'neutral' |
| `size` | string | 'md' | 选项卡大小：'sm', 'md', 'lg' |
| `alignment` | string | 'left' | 选项卡对齐：'left', 'center', 'right', 'justify' |
| `className` | string | '' | 自定义CSS类 |

#### TabItem 接口

| 属性名 | 类型 | 说明 |
|-------|------|------|
| `id` | string | 选项卡唯一标识（必填） |
| `label` | string | 选项卡标签文本（必填） |
| `content` | ReactNode | 选项卡内容（必填） |

#### 使用示例

```jsx
// 默认选项卡
<Tabs items={[
  {
    id: 'tab1',
    label: '第一个选项卡',
    content: <p>第一个选项卡的内容</p>
  },
  {
    id: 'tab2',
    label: '第二个选项卡',
    content: <p>第二个选项卡的内容</p>
  }
]} />

// 胶囊样式选项卡
<Tabs 
  variant="pills" 
  color="success"
  items={[
    {
      id: 'tab1',
      label: '选项1',
      content: <p>选项1内容</p>
    },
    {
      id: 'tab2',
      label: '选项2',
      content: <p>选项2内容</p>
    }
  ]} 
/>

// 居中对齐选项卡
<Tabs 
  variant="underline" 
  color="info"
  alignment="center"
  items={[
    {
      id: 'tab1',
      label: '选项1',
      content: <p>选项1内容</p>
    },
    {
      id: 'tab2',
      label: '选项2',
      content: <p>选项2内容</p>
    }
  ]} 
/>
```

## 组件组合示例

这些组件可以组合使用，创建更复杂的布局和内容块：

```jsx
<Section title="游戏模式" variant="card">
  <Tabs
    variant="pills"
    items={[
      {
        id: 'career',
        label: '职业模式',
        content: (
          <Grid columns={2} gap="md">
            <Feature title="职业进阶" icon="📈" iconPosition="left" variant="highlight">
              从新手车手开始，逐步提升技能和声望。
            </Feature>
            <Card variant="elevated" title="奖励系统">
              <ul>
                <li>比赛奖金</li>
                <li>赞助商合约</li>
              </ul>
            </Card>
          </Grid>
        )
      },
      {
        id: 'multiplayer',
        label: '多人游戏',
        content: (
          <Card variant="glass" title="在线竞技">
            <Paragraph lead={true}>与全球玩家一较高下</Paragraph>
            <Feature title="排位赛" icon="🏆" iconPosition="left">
              参加排位比赛，提升你的全球排名。
            </Feature>
          </Card>
        )
      }
    ]}
  />
</Section>
```

## 最佳实践

1. **组件选择**：根据内容类型选择最合适的组件
   - 对于普通文本内容，使用 TextBlock 和 Paragraph
   - 对于需要强调的提示，使用 Callout
   - 对于完整内容模块，使用 Section
   - 对于多列布局，使用 Grid
   - 对于独立内容单元，使用 Card
   - 对于功能介绍，使用 Feature
   - 对于内容分组，使用 Tabs

2. **颜色使用**：合理使用颜色主题
   - primary: 默认主题色，用于一般强调
   - success: 成功、完成相关内容
   - warning: 需要注意的内容
   - error: 错误或危险提示
   - info: 一般信息提示
   - neutral: 中性内容，不需要特别强调

3. **响应式考虑**：
   - 使用 Grid 组件时启用 responsive 属性
   - 避免在小屏幕上使用过多列
   - 对于复杂组合，考虑在移动设备上的显示效果

4. **组件嵌套**：
   - 合理嵌套组件，避免过深的嵌套层级
   - Section > Grid > Card/Feature 是常见的有效组合
   - 在 Tabs 内部使用其他组件时，保持内容简洁

5. **MDX集成**：
   - 在组件内部仍然可以使用Markdown语法
   - 使用组件包裹Markdown内容，而不是将所有内容都转为JSX

## 示例页面

可以查看以下示例页面，了解组件的实际使用效果：

- [基础样式组件示例](/en/styled-example)
- [高级样式组件示例](/en/advanced-styles) 
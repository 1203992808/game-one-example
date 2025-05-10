import React, { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline' | 'enclosed';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  alignment?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
}

export function Tabs({
  items,
  defaultTab,
  variant = 'default',
  color = 'primary',
  size = 'md',
  alignment = 'left',
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || (items.length > 0 ? items[0].id : ''));
  
  // 基础样式
  let tabsContainerStyles = "mb-6 ";
  let tabsListStyles = "flex border-b border-gray-200 dark:border-gray-700 ";
  let tabStyles = "cursor-pointer ";
  let tabActiveStyles = "";
  let tabPanelStyles = "prose dark:prose-invert mt-4";
  
  // 变体样式
  const variantTabsStyles = {
    default: "",
    pills: "space-x-2 border-none",
    underline: "",
    enclosed: "border-b-0"
  };
  
  const variantTabStyles = {
    default: "py-2 px-4 border-b-2 border-transparent -mb-[2px]",
    pills: "py-2 px-4 rounded-full",
    underline: "py-2 px-4 border-b-2 border-transparent -mb-[2px]",
    enclosed: "py-2 px-4 border-b-0 border-l border-t border-r border-transparent first:border-l rounded-t"
  };
  
  const variantTabActiveStyles = {
    default: "border-b-2",
    pills: "",
    underline: "border-b-2",
    enclosed: "border-gray-200 dark:border-gray-700 border-b-white dark:border-b-dark bg-white dark:bg-dark-secondary"
  };
  
  // 颜色样式
  const colorStyles = {
    primary: "text-primary-500 border-primary-500 bg-primary-50 dark:bg-primary-900/10",
    success: "text-success border-success bg-success-light dark:bg-success-dark/10",
    warning: "text-warning border-warning bg-warning-light dark:bg-warning-dark/10",
    error: "text-error border-error bg-error-light dark:bg-error-dark/10",
    info: "text-info border-info bg-info-light dark:bg-info-dark/10",
    neutral: "text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50"
  };
  
  // 尺寸样式
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };
  
  // 对齐方式
  const alignmentStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    justify: "justify-between"
  };
  
  // 组合样式
  tabsListStyles += `${variantTabsStyles[variant]} ${alignmentStyles[alignment]} `;
  tabStyles += `${variantTabStyles[variant]} ${sizeStyles[size]} transition-colors `;
  tabActiveStyles = `${variantTabActiveStyles[variant]} ${colorStyles[color]} `;
  
  // 非活动选项卡样式
  const inactiveTabStyles = "text-theme-text-secondary hover:text-theme-text-primary";
  
  // 添加自定义类
  if (className) {
    tabsContainerStyles += className;
  }
  
  return (
    <div className={tabsContainerStyles}>
      {/* 选项卡列表 */}
      <div className={tabsListStyles} role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`panel-${item.id}`}
            className={`${tabStyles} ${activeTab === item.id ? tabActiveStyles : inactiveTabStyles}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      {/* 选项卡内容 */}
      <div className="tab-panels">
        {items.map((item) => (
          <div
            key={item.id}
            id={`panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            className={`${tabPanelStyles} ${activeTab === item.id ? 'block' : 'hidden'}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
} 
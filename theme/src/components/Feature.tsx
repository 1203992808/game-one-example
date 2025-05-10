import React from 'react';

interface FeatureProps {
  children: React.ReactNode;
  title: string;
  icon?: string;
  iconType?: 'emoji' | 'custom';
  variant?: 'default' | 'card' | 'compact' | 'highlight';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  iconPosition?: 'top' | 'left';
  iconSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Feature({
  children,
  title,
  icon = '✨',
  iconType = 'emoji',
  variant = 'default',
  color = 'primary',
  iconPosition = 'top',
  iconSize = 'md',
  className = ''
}: FeatureProps) {
  // 基础样式
  let featureStyles = "";
  
  // 变体样式
  const variantStyles = {
    default: "",
    card: "rounded-lg bg-white dark:bg-dark-secondary border border-gray-100 dark:border-gray-800 p-6 shadow-sm",
    compact: "p-4",
    highlight: "rounded-lg p-5"
  };
  
  // 颜色样式
  const colorStyles = {
    primary: {
      bg: "bg-primary-50 dark:bg-primary-900/10",
      icon: "text-primary-500 dark:text-primary-400",
      border: "border-primary-200 dark:border-primary-800"
    },
    success: {
      bg: "bg-success-light dark:bg-success-dark/10",
      icon: "text-success dark:text-success-light",
      border: "border-success/20 dark:border-success/20"
    },
    warning: {
      bg: "bg-warning-light dark:bg-warning-dark/10",
      icon: "text-warning dark:text-warning-light",
      border: "border-warning/20 dark:border-warning/20"
    },
    error: {
      bg: "bg-error-light dark:bg-error-dark/10",
      icon: "text-error dark:text-error-light",
      border: "border-error/20 dark:border-error/20"
    },
    info: {
      bg: "bg-info-light dark:bg-info-dark/10",
      icon: "text-info dark:text-info-light",
      border: "border-info/20 dark:border-info/20"
    },
    neutral: {
      bg: "bg-gray-50 dark:bg-gray-800/50",
      icon: "text-gray-600 dark:text-gray-300",
      border: "border-gray-200 dark:border-gray-700"
    }
  };
  
  // 图标尺寸样式
  const iconSizeStyles = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  };
  
  // 图标容器样式
  const iconContainerStyles = {
    top: "flex flex-col items-center text-center",
    left: "flex items-start"
  };
  
  // 图标与内容间距
  const iconSpacingStyles = {
    top: "mb-4",
    left: "mr-4"
  };
  
  // 组合样式
  featureStyles += `${variantStyles[variant]} `;
  
  if (variant === 'highlight') {
    featureStyles += `${colorStyles[color].bg} ${colorStyles[color].border} `;
  }
  
  // 布局样式
  featureStyles += iconContainerStyles[iconPosition];
  
  // 添加自定义类
  if (className) {
    featureStyles += ` ${className}`;
  }
  
  return (
    <div className={featureStyles}>
      {/* 图标 */}
      <div className={`feature-icon ${iconSpacingStyles[iconPosition]}`}>
        {iconType === 'emoji' ? (
          <span className={`${iconSizeStyles[iconSize]}`}>{icon}</span>
        ) : (
          <div className={`${iconSizeStyles[iconSize]} ${colorStyles[color].icon}`}>
            {/* 这里可以替换为自定义图标组件 */}
            {icon}
          </div>
        )}
      </div>
      
      {/* 内容 */}
      <div className="feature-content">
        <h3 className="text-lg font-medium text-theme-text-primary mb-2">{title}</h3>
        <div className="text-theme-text-secondary prose dark:prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
} 
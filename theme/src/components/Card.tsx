import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive' | 'glass';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  withAction?: boolean;
  actionText?: string;
  actionIcon?: string;
  onActionClick?: () => void;
  className?: string;
}

export function Card({
  children,
  title,
  subtitle,
  image,
  imageAlt = '卡片图片',
  variant = 'default',
  color = 'neutral',
  size = 'md',
  withAction = false,
  actionText = '查看详情',
  actionIcon = 'arrow-right',
  onActionClick,
  className = ''
}: CardProps) {
  // 基础样式
  let cardStyles = "rounded-lg overflow-hidden ";
  
  // 变体样式
  const variantStyles = {
    default: "bg-white dark:bg-dark-secondary border border-gray-100 dark:border-gray-800",
    elevated: "bg-white dark:bg-dark-secondary shadow-lg",
    outlined: "bg-transparent border-2",
    interactive: "bg-white dark:bg-dark-secondary border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-300",
    glass: "backdrop-blur-lg bg-white/70 dark:bg-dark-secondary/70 border border-white/20 dark:border-gray-800/20"
  };
  
  // 颜色样式（主要用于outlined和卡片顶部边框）
  const colorStyles = {
    primary: "border-primary-500",
    success: "border-success",
    warning: "border-warning",
    error: "border-error",
    info: "border-info",
    neutral: "border-gray-200 dark:border-gray-700"
  };
  
  // 尺寸样式
  const sizeStyles = {
    sm: "max-w-xs",
    md: "max-w-sm",
    lg: "max-w-md"
  };
  
  // 图片样式
  const imageStyles = "w-full object-cover";
  const imageSizeStyles = {
    sm: "h-32",
    md: "h-48",
    lg: "h-64"
  };
  
  // 内容区样式
  const contentStyles = "p-4";
  const contentSizeStyles = {
    sm: "p-3",
    md: "p-5",
    lg: "p-6"
  };
  
  // 标题样式
  const titleStyles = "font-medium text-theme-text-primary";
  const titleSizeStyles = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl"
  };
  
  // 副标题样式
  const subtitleStyles = "text-theme-text-secondary mt-1";
  const subtitleSizeStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  // 操作按钮样式
  const actionStyles = "mt-4 flex items-center justify-end gap-1 text-primary-500 font-medium hover:text-primary-600 transition-colors";
  const actionSizeStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  // 组合样式
  cardStyles += `${variantStyles[variant]} ${sizeStyles[size]} `;
  
  // 为特定变体添加颜色
  if (variant === 'outlined') {
    cardStyles += colorStyles[color];
  }
  
  // 添加自定义类
  if (className) {
    cardStyles += className;
  }
  
  return (
    <div className={cardStyles}>
      {/* 卡片图片 */}
      {image && (
        <div className="card-image">
          <img 
            src={image} 
            alt={imageAlt} 
            className={`${imageStyles} ${imageSizeStyles[size]}`} 
          />
        </div>
      )}
      
      {/* 卡片内容 */}
      <div className={`card-content ${contentStyles} ${contentSizeStyles[size]}`}>
        {title && (
          <h3 className={`card-title ${titleStyles} ${titleSizeStyles[size]}`}>
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className={`card-subtitle ${subtitleStyles} ${subtitleSizeStyles[size]}`}>
            {subtitle}
          </p>
        )}
        
        <div className="card-body prose dark:prose-invert">
          {children}
        </div>
        
        {withAction && (
          <div className={`card-action ${actionStyles} ${actionSizeStyles[size]}`}>
            <button 
              onClick={onActionClick} 
              className="flex items-center gap-1"
            >
              <span>{actionText}</span>
              {actionIcon === 'arrow-right' && <span>→</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 
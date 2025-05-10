import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'card' | 'gradient' | 'feature' | 'banner';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  compact?: boolean;
  withIcon?: boolean;
  icon?: string;
  className?: string;
}

export function Section({
  children,
  title,
  subtitle,
  variant = 'default',
  color = 'primary',
  compact = false,
  withIcon = false,
  icon = 'lightbulb',
  className = ''
}: SectionProps) {
  // 基础样式
  let sectionStyles = "my-8 ";
  let headerStyles = "mb-6 ";
  let contentStyles = "prose dark:prose-invert";
  
  // 变体样式
  const variantStyles = {
    default: "",
    card: "bg-white dark:bg-dark-secondary rounded-xl shadow-sm border border-gray-100 dark:border-gray-800",
    gradient: "bg-gradient-to-br rounded-xl",
    feature: "border-l-4 pl-6",
    banner: "w-full py-6 px-4 rounded-lg"
  };
  
  // 颜色样式
  const colorStyles = {
    primary: {
      text: "text-primary-700 dark:text-primary-300",
      bg: "from-primary-50 to-white dark:from-primary-900/20 dark:to-transparent",
      border: "border-primary-500"
    },
    success: {
      text: "text-success-dark dark:text-success-light",
      bg: "from-success-light to-white dark:from-success-dark/20 dark:to-transparent",
      border: "border-success"
    },
    warning: {
      text: "text-warning-dark dark:text-warning-light",
      bg: "from-warning-light to-white dark:from-warning-dark/20 dark:to-transparent",
      border: "border-warning"
    },
    error: {
      text: "text-error-dark dark:text-error-light",
      bg: "from-error-light to-white dark:from-error-dark/20 dark:to-transparent",
      border: "border-error"
    },
    info: {
      text: "text-info-dark dark:text-info-light",
      bg: "from-info-light to-white dark:from-info-dark/20 dark:to-transparent",
      border: "border-info"
    },
    neutral: {
      text: "text-theme-text-primary",
      bg: "from-gray-50 to-white dark:from-gray-800 dark:to-transparent",
      border: "border-gray-300 dark:border-gray-700"
    }
  };
  
  // 添加变体样式
  sectionStyles += variantStyles[variant];
  
  // 根据变体添加颜色样式
  if (variant === 'gradient') {
    sectionStyles += ` ${colorStyles[color].bg}`;
  }
  
  if (variant === 'feature') {
    sectionStyles += ` ${colorStyles[color].border}`;
  }
  
  if (variant === 'banner') {
    sectionStyles += ` ${colorStyles[color].bg.replace('from-', 'bg-').replace('to-white dark:from-', 'dark:bg-').replace('dark:to-transparent', '')}`;
  }
  
  // 添加内边距
  if (['card', 'gradient', 'banner'].includes(variant)) {
    sectionStyles += compact ? ' p-6' : ' p-8';
  }
  
  // 标题样式
  if (title) {
    if (variant === 'card' || variant === 'gradient' || variant === 'banner') {
      headerStyles += withIcon ? 'flex items-center gap-3 ' : '';
      headerStyles += `${colorStyles[color].text}`;
    }
  }
  
  // 添加自定义类
  if (className) {
    sectionStyles += ` ${className}`;
  }
  
  return (
    <section className={sectionStyles}>
      {title && (
        <header className={headerStyles}>
          {withIcon && icon && (
            <span className="text-2xl">
              {/* 这里可以使用图标库如@iconify/react */}
              {icon === 'lightbulb' && '💡'}
              {icon === 'warning' && '⚠️'}
              {icon === 'info' && 'ℹ️'}
              {icon === 'success' && '✅'}
              {icon === 'error' && '❌'}
            </span>
          )}
          <div>
            <h3 className={`text-xl font-medium ${colorStyles[color].text}`}>{title}</h3>
            {subtitle && <p className="text-theme-text-secondary mt-1">{subtitle}</p>}
          </div>
        </header>
      )}
      <div className={contentStyles}>
        {children}
      </div>
    </section>
  );
} 
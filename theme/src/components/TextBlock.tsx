import React from 'react';

interface TextBlockProps {
  children: React.ReactNode;
  variant?: 'default' | 'highlight' | 'centered' | 'quote' | 'box' | 'hero' | 'split';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  font?: 'normal' | 'serif' | 'mono';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function TextBlock({ 
  children, 
  variant = 'default', 
  color = 'primary',
  size = 'md',
  font = 'normal',
  align = 'left',
  className = ''
}: TextBlockProps) {
  
  // 基础样式
  const baseStyles = "prose max-w-none dark:prose-invert";
  
  // 变体样式
  const variantStyles = {
    default: "",
    highlight: "p-6 rounded-lg border-l-4",
    centered: "mx-auto text-center",
    quote: "italic border-l-4 pl-6 py-2",
    box: "p-5 rounded-lg border",
    hero: "py-10 text-center",
    split: "grid md:grid-cols-2 gap-6",
  };
  
  // 颜色样式
  const colorStyles = {
    primary: {
      text: "text-primary-700 dark:text-primary-300",
      bg: "bg-primary-50 dark:bg-primary-900/20",
      border: "border-primary-500"
    },
    success: {
      text: "text-success-dark dark:text-success-light",
      bg: "bg-success-light dark:bg-success-dark/20",
      border: "border-success"
    },
    warning: {
      text: "text-warning-dark dark:text-warning-light",
      bg: "bg-warning-light dark:bg-warning-dark/20",
      border: "border-warning"
    },
    error: {
      text: "text-error-dark dark:text-error-light",
      bg: "bg-error-light dark:bg-error-dark/20",
      border: "border-error"
    },
    info: {
      text: "text-info-dark dark:text-info-light",
      bg: "bg-info-light dark:bg-info-dark/20",
      border: "border-info"
    },
    neutral: {
      text: "text-theme-text-primary",
      bg: "bg-theme-bg-secondary",
      border: "border-theme-border"
    }
  };
  
  // 字体大小样式
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };
  
  // 字体样式
  const fontStyles = {
    normal: "font-sans",
    serif: "font-serif",
    mono: "font-mono"
  };
  
  // 对齐方式
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  
  // 组合样式类
  let combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fontStyles[font]} ${alignStyles[align]}`;
  
  // 根据变体添加颜色样式
  if (['highlight', 'box'].includes(variant)) {
    combinedStyles += ` ${colorStyles[color].bg} ${colorStyles[color].border}`;
  }
  
  if (['quote'].includes(variant)) {
    combinedStyles += ` ${colorStyles[color].border}`;
  }
  
  // 添加文本颜色
  if (['highlight', 'quote', 'hero'].includes(variant)) {
    combinedStyles += ` ${colorStyles[color].text}`;
  }
  
  // 添加宽度限制
  if (variant === 'centered') {
    combinedStyles += ' max-w-3xl';
  }
  
  if (variant === 'hero') {
    combinedStyles += ' max-w-4xl mx-auto';
  }
  
  // 添加自定义类
  if (className) {
    combinedStyles += ` ${className}`;
  }

  return (
    <div className={combinedStyles}>
      {children}
    </div>
  );
} 
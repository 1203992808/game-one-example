import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
  lead?: boolean;
  emphasis?: boolean;
  muted?: boolean;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  spacing?: 'tight' | 'normal' | 'relaxed';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function Paragraph({
  children,
  lead = false,
  emphasis = false,
  muted = false,
  color = 'default',
  size = 'base',
  spacing = 'normal',
  align = 'left',
  className = ''
}: ParagraphProps) {
  // 基础样式
  let styles = "mb-6 ";

  // 大小样式
  const sizeStyles = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };

  // 行高样式
  const spacingStyles = {
    tight: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed"
  };

  // 颜色样式
  const colorStyles = {
    default: "text-theme-text-secondary dark:text-theme-text-secondary",
    primary: "text-primary-700 dark:text-primary-300",
    success: "text-success-dark dark:text-success",
    warning: "text-warning-dark dark:text-warning",
    error: "text-error-dark dark:text-error",
    info: "text-info-dark dark:text-info"
  };

  // 对齐方式
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  // 应用基础样式
  styles += `${sizeStyles[size]} ${spacingStyles[spacing]} ${colorStyles[color]} ${alignStyles[align]}`;

  // 应用lead样式（大号引导段落）
  if (lead) {
    styles += " text-xl font-medium mb-8 tracking-wide";
  }

  // 应用强调样式
  if (emphasis) {
    styles += " font-medium";
  }

  // 应用静音样式
  if (muted) {
    styles += " text-gray-500 dark:text-gray-400 text-sm";
  }

  // 添加自定义类
  if (className) {
    styles += ` ${className}`;
  }

  return (
    <p className={styles}>
      {children}
    </p>
  );
} 
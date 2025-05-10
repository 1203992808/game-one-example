import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'tip' | 'warning' | 'danger' | 'note';
  title?: string;
  emoji?: string;
  className?: string;
}

export function Callout({
  children,
  type = 'info',
  title,
  emoji,
  className = ''
}: CalloutProps) {
  const typeStyles = {
    info: {
      border: 'border-info',
      bg: 'bg-info-light/50 dark:bg-info-dark/10',
      text: 'text-info-dark dark:text-info-light',
      icon: 'ℹ️',
      title: '信息'
    },
    tip: {
      border: 'border-primary-500',
      bg: 'bg-primary-50 dark:bg-primary-900/10',
      text: 'text-primary-700 dark:text-primary-300',
      icon: '💡',
      title: '提示'
    },
    warning: {
      border: 'border-warning',
      bg: 'bg-warning-light/50 dark:bg-warning-dark/10',
      text: 'text-warning-dark dark:text-warning-light',
      icon: '⚠️',
      title: '警告'
    },
    danger: {
      border: 'border-error',
      bg: 'bg-error-light/50 dark:bg-error-dark/10',
      text: 'text-error-dark dark:text-error-light',
      icon: '🚨',
      title: '危险'
    },
    note: {
      border: 'border-gray-400 dark:border-gray-600',
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      text: 'text-gray-700 dark:text-gray-300',
      icon: '📝',
      title: '注意'
    }
  };

  const style = typeStyles[type];
  const defaultTitle = style.title;
  const defaultEmoji = style.icon;

  return (
    <div className={`rounded-md border-l-4 ${style.border} ${style.bg} p-4 my-6 ${className}`}>
      <div className="flex items-center gap-2 font-medium mb-1">
        <span role="img" aria-label={type}>
          {emoji || defaultEmoji}
        </span>
        <h5 className={`font-medium ${style.text}`}>
          {title || defaultTitle}
        </h5>
      </div>
      <div className="mt-2 text-theme-text-secondary prose-p:mt-1 prose-p:mb-1">
        {children}
      </div>
    </div>
  );
} 
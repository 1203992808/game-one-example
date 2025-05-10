import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 'auto';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  responsive?: boolean;
  className?: string;
}

export function Grid({
  children,
  columns = 2,
  gap = 'md',
  alignItems = 'stretch',
  justifyItems = 'stretch',
  responsive = true,
  className = ''
}: GridProps) {
  // 基础样式
  let gridStyles = "grid ";
  
  // 列数样式
  const columnsStyles = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    'auto': "grid-cols-auto"
  };
  
  // 响应式列数
  const responsiveColumnsStyles = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "md:grid-cols-3",
    4: "lg:grid-cols-4",
    'auto': "grid-cols-auto"
  };
  
  // 间距样式
  const gapStyles = {
    'none': "gap-0",
    'xs': "gap-2",
    'sm': "gap-4",
    'md': "gap-6",
    'lg': "gap-8",
    'xl': "gap-10",
  };
  
  // 对齐项目
  const alignItemsStyles = {
    'start': "items-start",
    'center': "items-center",
    'end': "items-end",
    'stretch': "items-stretch"
  };
  
  // 项目对齐方式
  const justifyItemsStyles = {
    'start': "justify-items-start",
    'center': "justify-items-center",
    'end': "justify-items-end",
    'stretch': "justify-items-stretch"
  };
  
  // 组合样式
  gridStyles += responsive 
    ? `grid-cols-1 ${responsiveColumnsStyles[columns]} ` 
    : `${columnsStyles[columns]} `;
    
  gridStyles += `${gapStyles[gap]} ${alignItemsStyles[alignItems]} ${justifyItemsStyles[justifyItems]} `;
  
  // 添加自定义类
  if (className) {
    gridStyles += className;
  }
  
  return (
    <div className={gridStyles}>
      {children}
    </div>
  );
} 
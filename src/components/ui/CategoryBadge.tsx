import React from 'react';

interface CategoryBadgeProps {
  name: string;
  color: string;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  name,
  color,
  className = '',
}) => {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ 
        backgroundColor: `${color}20`, // 20% opacity
        color: color 
      }}
    >
      <span className="w-2 h-2 mr-1.5 rounded-full" style={{ backgroundColor: color }}></span>
      {name}
    </span>
  );
};

import React from 'react';
import { Icon } from '@iconify/react';

type AnimationType = 'float' | 'bounce' | 'wiggle' | 'pulse' | 'spin-slow';
type ElementType = 'star' | 'cloud' | 'bubble' | 'note' | 'icon';

interface CuteElementProps {
  type: ElementType;
  animation: AnimationType;
  position: string; // Tailwind positioning classes like "top-10 left-5"
  color?: string; // Tailwind color classes
  size?: string; // Tailwind size classes
  icon?: string; // Icon name if type is 'icon'
  delay?: 0 | 1 | 2 | 3; // Animation delay
  opacity?: number; // 10-90
  className?: string;
}

export function CuteElement({
  type,
  animation,
  position,
  color = 'text-sprunki-pink-400',
  size = 'w-8 h-8',
  icon = 'game-icons:musical-notes',
  delay = 0,
  opacity = 80,
  className = '',
}: CuteElementProps) {
  const getAnimationClass = () => {
    const baseClass = `cute-${animation}`;
    return delay > 0 ? `${baseClass}-delay-${delay}` : baseClass;
  };

  const renderElement = () => {
    switch (type) {
      case 'star':
        return <Icon icon="ph:star-fill" className={size} />;
      case 'cloud':
        return (
          <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M62 28C62 34.6274 53.9411 40 44 40C34.0589 40 26 34.6274 26 28C26 21.3726 34.0589 16 44 16C44.6906 16 45.3701 16.0333 46.0352 16.0975C46.0352 16.0975 46 15.5 46 15C46 9.47715 49.5817 5 54 5C58.4183 5 62 9.47715 62 15C62 16.1047 61.8213 17.1683 61.487 18.1623C61.8213 18.7344 62 19.3527 62 20C62 22.7614 59.7614 25 57 25C56.9369 25 56.874 24.9983 56.8115 24.9948C60.0571 25.549 62 26.7176 62 28Z" fill="currentColor"/>
          </svg>
        );
      case 'bubble':
        return (
          <div className={`${size} rounded-full bg-current opacity-${opacity/2}`}></div>
        );
      case 'note':
        return <Icon icon="game-icons:musical-notes" className={size} />;
      case 'icon':
        return <Icon icon={icon} className={size} />;
      default:
        return <Icon icon="ph:star-fill" className={size} />;
    }
  };

  return (
    <div 
      className={`absolute ${position} ${color} opacity-${opacity} ${getAnimationClass()} ${className}`}
    >
      {renderElement()}
    </div>
  );
} 
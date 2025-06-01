
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const logoSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Cercle jaune tournant */}
        <div className={`absolute inset-0 border-2 border-transparent border-t-mdh-gold border-r-mdh-gold rounded-full animate-spin ${sizeClasses[size]}`}></div>
        
        {/* Logo au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/f8e8c16d-4fa9-4907-9f22-b589716b1360.png" 
            alt="Actu Stars" 
            className={`${logoSizeClasses[size]} object-contain`}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

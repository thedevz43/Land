import React from 'react';

interface AshokaChakraLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AshokaChakraLoader: React.FC<AshokaChakraLoaderProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const spokeCount = 24;
  const spokes = Array.from({ length: spokeCount }, (_, i) => i);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${sizeClasses[size]} animate-chakra`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--navy))"
            strokeWidth="2"
          />
          
          {/* Inner circle */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="hsl(var(--navy))"
          />
          
          {/* 24 Spokes */}
          {spokes.map((_, index) => {
            const angle = (index * 360) / spokeCount;
            const radian = (angle * Math.PI) / 180;
            const x1 = 50 + 10 * Math.cos(radian);
            const y1 = 50 + 10 * Math.sin(radian);
            const x2 = 50 + 43 * Math.cos(radian);
            const y2 = 50 + 43 * Math.sin(radian);
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(var(--navy))"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default AshokaChakraLoader;

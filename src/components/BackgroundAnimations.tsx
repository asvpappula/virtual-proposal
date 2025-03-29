import React from 'react';

const BackgroundAnimations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* Clouds - Moved to front layer */}
      <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden z-20">
        {[...Array(8)].map((_, i) => {
          const sizes = ['24', '32', '40'];
          const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
          const opacity = 0.7 + Math.random() * 0.3;
          return (
            <div 
              key={i} 
              className={`cloud absolute w-${randomSize} h-${parseInt(randomSize)/2} rounded-full`}
              style={{
                background: `rgba(255, 255, 255, ${opacity})`,
                animation: `float-horizontal ${30 + i * 5}s linear infinite`,
                animationDelay: `${i * -3}s`,
                left: `${120 + (i * 15)}%`,
                top: `${i * 20 + Math.random() * 30}px`,
                transform: `scale(${1 + Math.random() * 0.5})`
              }}
            >
              <div 
                className={`cloud-puff absolute -top-3 left-3 w-${parseInt(randomSize)/1.5} h-${parseInt(randomSize)/1.5} rounded-full`}
                style={{ background: `rgba(255, 255, 255, ${opacity})` }}
              />
              <div 
                className={`cloud-puff absolute -top-2 right-3 w-${parseInt(randomSize)/1.8} h-${parseInt(randomSize)/1.8} rounded-full`}
                style={{ background: `rgba(255, 255, 255, ${opacity})` }}
              />
            </div>
          );
        })}
      </div>

      {/* Add keyframes for cloud animation */}
      <style>
        {`
          @keyframes float-horizontal {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default BackgroundAnimations;
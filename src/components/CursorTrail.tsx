import React, { useEffect } from 'react';

const CursorTrail: React.FC = () => {
  useEffect(() => {
    const createTrailElement = (x: number, y: number) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      
      // Randomize size for more dynamic effect
      const size = 5 + Math.random() * 10;
      trail.style.width = `${size}px`;
      trail.style.height = `${size}px`;
      
      // Randomize color between pink and purple shades
      const colors = [
        'rgba(249, 168, 212, 0.7)', // pink-300
        'rgba(244, 114, 182, 0.7)', // pink-400
        'rgba(236, 72, 153, 0.7)',  // pink-500
        'rgba(216, 180, 254, 0.7)', // purple-300
      ];
      trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      document.body.appendChild(trail);
      
      // Remove the element after animation completes
      setTimeout(() => {
        if (trail && document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      }, 1000);
    };
    
    // Throttle function to limit the number of trail elements created
    let lastCreated = 0;
    const throttleDelay = 50; // ms between trail elements
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCreated > throttleDelay) {
        createTrailElement(e.clientX, e.clientY);
        lastCreated = now;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default CursorTrail;
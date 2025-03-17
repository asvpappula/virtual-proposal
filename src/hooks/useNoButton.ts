import { useState } from 'react';

export const useNoButton = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const newX = (Math.random() - 0.5) * 400;
    const newY = (Math.random() - 0.5) * 300;
    
    setNoButtonPosition({
      x: noButtonPosition.x + newX,
      y: noButtonPosition.y + newY
    });
  };

  return { noButtonPosition, moveNoButton };
};
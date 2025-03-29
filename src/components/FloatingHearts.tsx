import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  // Increase the number of hearts for a more dramatic effect
  const hearts = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    // Reduce delay for faster initial appearance
    delay: Math.random() * 2,
    // Significantly reduce duration for faster movement
    duration: 3 + Math.random() * 5,
    size: 20 + Math.random() * 15,
    color: [
      'text-pink-200', 
      'text-pink-300', 
      'text-pink-400', 
      'text-red-300'
    ][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, 1, 1, 0],
            scale: [1, 1.2, 1, 0.8]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            // Change ease to a more energetic function for shooting effect
            ease: [0.2, 0.8, 0.4, 1],
            repeatDelay: 0.5
          }}
          className="absolute"
        >
          <Heart 
            className={heart.color} 
            size={heart.size} 
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
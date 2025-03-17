import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 20,
    size: 12 + Math.random() * 8
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.5, 0.5, 0],
            scale: [1, 1.2, 1, 0.8]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute"
        >
          <Heart 
            className="text-pink-200" 
            size={heart.size} 
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Envelope3DProps {
  isOpen: boolean;
  onClick: () => void;
}

const Envelope3D: React.FC<Envelope3DProps> = ({ isOpen, onClick }) => {
  return (
    <div 
      className="relative w-[400px] h-[280px] mx-auto cursor-pointer perspective-1000"
      onClick={onClick}
    >
      {/* Main envelope body */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-sm shadow-xl transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(5deg)',
        }}
        animate={{
          scale: isOpen ? 1.02 : 1,
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Envelope edges/folds */}
        <div className="absolute inset-0">
          {/* Left fold */}
          <div className="absolute left-0 top-0 w-[20px] h-full bg-gray-100 transform-gpu origin-left"
               style={{ transform: 'rotateY(-5deg)' }} />
          
          {/* Right fold */}
          <div className="absolute right-0 top-0 w-[20px] h-full bg-gray-100 transform-gpu origin-right"
               style={{ transform: 'rotateY(5deg)' }} />
          
          {/* Bottom fold */}
          <div className="absolute bottom-0 left-0 w-full h-[20px] bg-gray-100 transform-gpu origin-bottom"
               style={{ transform: 'rotateX(-5deg)' }} />
        </div>
      </motion.div>

      {/* Back flap */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[140px] bg-gradient-to-b from-gray-50 to-white origin-bottom rounded-t-sm"
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          zIndex: isOpen ? 1 : 2,
          boxShadow: '0 -2px 5px rgba(0,0,0,0.05)',
        }}
        animate={{
          rotateX: isOpen ? '-180deg' : '0deg',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Diagonal folds */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[70%] left-0 w-[50%] h-[2px] bg-gray-200 origin-right"
               style={{ transform: 'rotate(-30deg)' }} />
          <div className="absolute top-[70%] right-0 w-[50%] h-[2px] bg-gray-200 origin-left"
               style={{ transform: 'rotate(30deg)' }} />
        </div>
      </motion.div>

      {/* Heart seal */}
      <motion.div
        className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{
          scale: isOpen ? 0.8 : 1,
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative">
          <Heart
            className="text-red-500 drop-shadow-md"
            size={40}
            fill="currentColor"
          />
          {/* Seal lines */}
          <div className="absolute top-1/2 left-1/2 w-[120px] h-[1px] bg-gray-200 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[120px] h-[1px] bg-gray-200 -translate-x-1/2 -translate-y-1/2 rotate-90" />
        </div>
      </motion.div>

      {/* Letter inside */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[80%] h-[75%] bg-white rounded-sm shadow-sm"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'top',
        }}
        animate={{
          y: isOpen ? -140 : 0,
          rotateX: isOpen ? '-5deg' : '0deg',
          scale: isOpen ? 1.05 : 1,
        }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Click instruction */}
      {!isOpen && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Click to open
        </motion.div>
      )}
    </div>
  );
};

export default Envelope3D;
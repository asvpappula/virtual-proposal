import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onClick }) => {
  return (
    <motion.div
      className="relative w-64 h-48 mx-auto cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-pink-200 rounded-lg shadow-lg"
        animate={{
          rotateX: isOpen ? '180deg' : '0deg',
          originY: 0
        }}
        transition={{ duration: 0.6 }}
      >
        <Heart
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500"
          size={32}
          fill="currentColor"
        />
      </motion.div>
      
      <motion.div
        className="absolute inset-0 bg-pink-300 rounded-lg shadow-lg"
        style={{ transformOrigin: 'top' }}
        animate={{
          rotateX: isOpen ? '0deg' : '-180deg'
        }}
        transition={{ duration: 0.6 }}
      />
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: isOpen ? 0.8 : 1,
          opacity: isOpen ? 0 : 1
        }}
      >
        <span className="text-white text-lg font-semibold">Click to open</span>
      </motion.div>
    </motion.div>
  );
};

export default Envelope;
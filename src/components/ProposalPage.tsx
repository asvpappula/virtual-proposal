import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import CursorTrail from './CursorTrail';

interface ProposalPageProps {
  onYesClick: () => void;
}

const ProposalPage: React.FC<ProposalPageProps> = ({ onYesClick }) => {
  const [noCount, setNoCount] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
   const [displayedText, setDisplayedText] = useState('');

  const fullText = 'Can I Be Your Boyfriend?';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullText.substring(0, index + 1));
      index++;
      
      if (index === fullText.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const getNoButtonStyle = () => {
    return {
      transform: `scale(${Math.max(0.5, 1 - noCount * 0.1)})`,
      opacity: Math.max(0, 1 - noCount * 0.2)
    };
  };

  const getNoButtonText = () => {
    const texts = [
      'No 😭',
      'Are you sure? 🥺',
      'Really sure? 😢',
      'Think again! 💭',
      'Last chance! 🙏',
      'Don\'t do this! 💔',
      'I\'m gonna cry... 😿',
      'You\'re breaking my heart 💔',
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <div className="flex flex-col items-center justify-center relative p-4 w-full h-full min-h-screen">
      {/* Background animations */}
      <FloatingHearts />
      <CursorTrail />
      
      <div className="text-center max-w-3xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
        {/* Main proposal text with typewriter effect - larger and more centered */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-['Pacifico'] text-pink-500 mb-12"
          style={{ 
            textShadow: '3px 3px 6px rgba(0,0,0,0.15)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedText}
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block ml-1"
          >
            |  
          </motion.span>
        </motion.h1>

        {/* Cute emoji avatar - larger size */}
        <motion.div 
          className="text-8xl mb-12"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: isTypingComplete ? 1 : 0,
            rotate: isTypingComplete ? [0, 15, -15, 0] : 0
          }}
          transition={{ 
            delay: 0.5, 
            duration: 0.5,
            rotate: { repeat: 2, duration: 0.2, delay: 1 }
          }}
        >
          💖
        </motion.div>
        
        {/* Interactive buttons */}
        <AnimatePresence>
          {isTypingComplete && (
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.button
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xl md:text-2xl font-bold py-3 px-10 rounded-full shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(249, 168, 212, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Create heart explosion animation
                  const container = document.createElement('div');
                  container.className = 'fixed inset-0 pointer-events-none z-50';
                  document.body.appendChild(container);
                  
                  // Create 100 hearts
                  for (let i = 0; i < 100; i++) {
                    const heart = document.createElement('div');
                    heart.innerHTML = '❤️';
                    heart.className = 'absolute text-2xl';
                    heart.style.left = `${Math.random() * 100}vw`;
                    heart.style.top = `${Math.random() * 100}vh`;
                    heart.style.animation = `explode-heart ${1 + Math.random() * 2}s forwards`;
                    heart.style.animationDelay = `${Math.random() * 0.5}s`;
                    container.appendChild(heart);
                  }
                  
                  // Add keyframes for explosion animation
                  const style = document.createElement('style');
                  style.innerHTML = `
                    @keyframes explode-heart {
                      0% { transform: scale(0) rotate(0deg); opacity: 1; }
                      100% { transform: scale(1.5) rotate(${Math.random() * 360}deg) translate(${Math.random() * 100 - 50}px, ${-Math.random() * 500}px); opacity: 0; }
                    }
                  `;
                  document.head.appendChild(style);
                  
                  // Clean up after animation
                  setTimeout(() => {
                    document.body.removeChild(container);
                    document.head.removeChild(style);
                    onYesClick();
                  }, 2000);
                }}
              >
                Yes 💗
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-purple-300 to-purple-400 text-white text-xl md:text-2xl font-bold py-3 px-10 rounded-full shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(216, 180, 254, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsThinking(true)}
              >
                Let Me Think 😳
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-blue-300 to-blue-400 text-white text-xl md:text-2xl font-bold py-3 px-10 rounded-full shadow-lg"
                style={getNoButtonStyle()}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(191, 219, 254, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNoCount(noCount + 1)}
              >
                {getNoButtonText()}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thinking modal */}
      <AnimatePresence>
        {isThinking && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 max-w-md mx-4 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <button 
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setIsThinking(false)}
              >
                <X size={24} />
              </button>
              
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🤔</div>
                <h3 className="text-2xl font-['Pacifico'] text-pink-500 mb-4">Take Your Time!</h3>
                <p className="text-gray-600 mb-6">I'll be right here waiting for your answer. No pressure at all! 💕</p>
                <div className="flex justify-center gap-4">
                  <motion.button
                    className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsThinking(false);
                      onYesClick();
                    }}
                  >
                    I'm Ready to Say Yes! 💗
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposalPage;
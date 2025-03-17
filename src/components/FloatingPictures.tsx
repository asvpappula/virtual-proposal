import { motion } from 'framer-motion';

interface FloatingPictureProps {
  src: string;
  x: number;
  y: number;
  delay: number;
}

const FloatingPicture = ({ src, x, y, delay }: FloatingPictureProps) => {
  // Generate random positions within viewport
  const generateRandomPosition = () => {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    return { x: randomX, y: randomY };
  };

  // Generate 4 random positions for more varied movement
  const pos1 = generateRandomPosition();
  const pos2 = generateRandomPosition();
  const pos3 = generateRandomPosition();
  const pos4 = generateRandomPosition();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Error loading image: ${src}`);
    const img = e.target as HTMLImageElement;
    img.style.display = 'none';
  };
  return (
    <motion.div
      className="absolute z-20"
      initial={{
        x,
        y,
        scale: 0.5,
        rotate: 0
      }}
      animate={{
        x: [pos1.x, pos2.x, pos3.x, pos4.x],
        y: [pos1.y, pos2.y, pos3.y, pos4.y],
        scale: [0.8, 1.1, 0.9, 1],
        rotate: [`${Math.random() * 30 - 15}deg`, `${Math.random() * 30 - 15}deg`, `${Math.random() * 30 - 15}deg`, `${Math.random() * 30 - 15}deg`]
      }}
      style={{
        opacity: 0.85
      }}
      transition={{
        duration: 35,
        ease: "easeInOut",
        times: [0, 0.33, 0.66, 1],
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 0.1
      }}
    >
      <img 
        src={src} 
        alt="Memory"
        onError={handleImageError}
        loading="eager"
        className="w-64 h-64 object-cover rounded-2xl shadow-2xl transform hover:scale-110 hover:rotate-0 transition-all duration-500 pointer-events-auto"
        style={{ 
          border: '6px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          backgroundColor: 'white',
          WebkitBackfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
      }}
      />
    </motion.div>
  );
};

const FloatingPictures: React.FC = () => {
  // Log available pictures for debugging
  console.log('Loading pictures:', Array.from({ length: 14 }, (_, i) => `/picture${i + 1}.JPG`));
  const pictures = [
    '/picture1.JPG',
    '/picture2.JPG',
    '/picture3.JPG',
    '/picture4.JPG',
    '/picture5.JPG',
    '/picture6.JPG',
    '/picture7.JPG',
    '/picture8.JPG',
    '/picture9.JPG',
    '/picture10.JPG',
    '/picture11.JPG',
    '/picture12.JPG',
    '/picture13.JPG',
    '/picture14.JPG',
  ];

  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        {pictures.map((pic, index) => {
        // Distribute pictures more evenly across the screen
        // Calculate grid dimensions
        const gridSize = Math.ceil(Math.sqrt(pictures.length));
        const cellWidth = window.innerWidth / gridSize;
        const cellHeight = window.innerHeight / gridSize;
        
        // Calculate base grid position
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        // Add some randomness to the grid position
        const randomOffset = Math.min(cellWidth, cellHeight) * 0.4;
        const baseX = cellWidth * (col + 0.5) + (Math.random() - 0.5) * randomOffset;
        const baseY = cellHeight * (row + 0.5) + (Math.random() - 0.5) * randomOffset;
        
        // Add extra randomness to spread pictures more evenly
        const spreadFactor = Math.min(window.innerWidth, window.innerHeight) * 0.15;
        const angleOffset = Math.random() * Math.PI * 2;
        const spreadX = Math.cos(angleOffset) * spreadFactor;
        const spreadY = Math.sin(angleOffset) * spreadFactor;
        
        // Final position with combined grid and spread
        const randomX = baseX + spreadX;
        const randomY = baseY + spreadY;
          return (
            <FloatingPicture
              key={index}
              src={pic}
              x={randomX}
              y={randomY}
              delay={index * 0.2}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FloatingPictures;

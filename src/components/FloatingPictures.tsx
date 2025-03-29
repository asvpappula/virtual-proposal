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
    '/IMG_0366.JPG',
    '/IMG_1187.JPG',
    '/IMG_1209.JPG',
    '/IMG_8802.JPG',
  ];

  // Create a more even distribution by dividing the screen into zones
  const createEvenDistribution = () => {
    // Divide the screen into a grid of zones
    const numZones = pictures.length;
    const zonesPerRow = Math.ceil(Math.sqrt(numZones));
    const zonesPerColumn = Math.ceil(numZones / zonesPerRow);
    
    // Calculate zone dimensions
    const zoneWidth = window.innerWidth / zonesPerRow;
    const zoneHeight = window.innerHeight / zonesPerColumn;
    
    // Create an array of positions, one for each picture
    return pictures.map((_, index) => {
      // Determine which zone this picture belongs to
      const zoneRow = Math.floor(index / zonesPerRow);
      const zoneCol = index % zonesPerRow;
      
      // Calculate the center of the zone
      const zoneCenterX = zoneCol * zoneWidth + zoneWidth / 2;
      const zoneCenterY = zoneRow * zoneHeight + zoneHeight / 2;
      
      // Add randomness within the zone (but not too much)
      // Use a smaller percentage of the zone size to keep pictures more centered in their zones
      const randomOffsetX = (Math.random() - 0.5) * zoneWidth * 0.7;
      const randomOffsetY = (Math.random() - 0.5) * zoneHeight * 0.7;
      
      return {
        x: zoneCenterX + randomOffsetX,
        y: zoneCenterY + randomOffsetY
      };
    });
  };
  
  // Generate positions once
  const positions = createEvenDistribution();

  return (
    <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        {pictures.map((pic, index) => {
        // Use the pre-calculated position for this picture
        const position = positions[index];
        const randomX = position.x;
        const randomY = position.y;
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

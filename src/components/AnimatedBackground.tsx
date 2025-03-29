import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  showFloatingText?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children, showFloatingText = true }) => {
  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Vignette effect */}
      <div className="vignette"></div>
      
      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const size = 10 + Math.random() * 15;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          // Increase duration for slower upward movement
          const duration = 3 + Math.random() * 2;
          const rotate = Math.random() * 360;
          // Use different sparkle emojis for variety
          const sparkles = ['✨', '⭐', '🌟', '💫', '🌠'];
          const sparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
          
          return (
            <div 
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${left}%`,
                top: '100%',
                fontSize: `${size}px`,
                opacity: 0,
                animation: `float-up ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
                '--rotate': `${rotate}deg`
              } as React.CSSProperties}
            >
              {sparkle}
            </div>
          );
        })}
      </div>
      
      {/* Floating love notes - only shown when showFloatingText is true */}
      {showFloatingText && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 8;
            // Increase duration for slower upward movement
            const duration = 5 + Math.random() * 5;
            const rotate = Math.random() * 20 - 10;
            const messages = [
              '💌 Love you!',
              '💕 Forever yours',
              '💖 My heart is yours',
              '💓 Be mine?',
              "💗 You're amazing!",
              '💘 You complete me',
              '💝 My one and only',
              '💞 Together forever',
              '💟 You are my sunshine',
              '💑 Meant to be',
              '👩‍❤️‍👨 Soul mates',
              '💋 Kiss me',
              '🥰 Adore you',
              '😍 You take my breath away',
              '❣️ My everything',
              '💭 Thinking of you',
              '💍 Say yes!',
              '✨ You make me sparkle',
              '🌈 My rainbow after the rain',
              '🫶 Always & forever',
              '💫 My world revolves around you',
              '🌙 Love you to the moon',
              "🌟 You're my star",
              '💌 Miss you already',
              '💕 Only you',
              '🔐 You have my heart',
              '🧸 Cuddle time?',
              '🥺 Stay with me',
              '🐻 My teddy bear',
              '🌹 Just for you',
              '☁️ Floating in love',
              "🐝 You're my honey",
              '🧡 Heart and soul',
              '🍯 Sweetest love',
              '🍓 Love you berry much',
              '🫰 Love in every heartbeat',
              "🧁 You're my cupcake",
              '🫀 My heart beats for you',
              '🥂 To us'
            ];
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            return (
              <div 
                key={i}
                className="absolute bg-white/40 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md"
                style={{
                  left: `${left}%`,
                  top: '100%',
                  transform: `rotate(${rotate}deg)`,
                  opacity: 0,
                  animation: `float-up ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                {message}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Cute teddy bear peeking from corner */}
      <div className="fixed bottom-0 left-0 z-20 pointer-events-none">
        <div 
          className="relative"
          style={{
            animation: 'wiggle 3s ease-in-out infinite',
            transformOrigin: 'bottom center'
          }}
        >
          <div className="text-8xl">🧸</div>
          <div 
            className="absolute -top-5 -right-2 text-4xl"
            style={{
              animation: 'pulse-glow 2s ease-in-out infinite',
              animationDelay: '0.5s'
            }}
          >❤️</div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default AnimatedBackground;
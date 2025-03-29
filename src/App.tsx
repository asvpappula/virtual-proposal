import { useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import BackgroundAnimations from './components/BackgroundAnimations';
import FloatingPictures from './components/FloatingPictures';
import ProposalPage from './components/ProposalPage';
import AnimatedBackground from './components/AnimatedBackground';
import CursorTrail from './components/CursorTrail';

function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setShowContent(true);
    }, 1500);
  };

  const getNoButtonStyle = () => {
    return {
      transform: `scale(${Math.max(0.5, 1 - noCount * 0.1)})`,
      opacity: Math.max(0, 1 - noCount * 0.2)
    };
  };

  if (!showContent) {
    return (
      <AnimatedBackground showFloatingText={true}>
        <CursorTrail />
        <BackgroundAnimations />
        <div className="flex flex-col items-center z-10 relative mt-16">
          <div className="mb-8 text-center">
            <div className="mb-16">
              <h1 
                className="text-7xl md:text-8xl font-['Permanent_Marker'] text-pink-400 transform hover:scale-105 transition-transform duration-300" 
                style={{ 
                  letterSpacing: '2px',
                  WebkitTextStroke: '2px #93c5fd',
                  textShadow: '2px 2px 0 #93c5fd'
                }}
              >
                OPEN THIS
              </h1>
              <h1 
                className="text-8xl md:text-9xl font-['Permanent_Marker'] text-pink-400 mt-2 transform hover:scale-105 transition-transform duration-300" 
                style={{ 
                  letterSpacing: '4px',
                  WebkitTextStroke: '2px #93c5fd',
                  textShadow: '2px 2px 0 #93c5fd'
                }}
              >
                ADITI!
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold text-pink-400 mb-2">OPEN</p>
              <ChevronDown className="w-8 h-8 text-pink-400 bounce-arrow" />
            </div>
          </div>

          <div 
            className="cursor-pointer transform hover:scale-105 transition-transform duration-300 envelope-container relative envelope-hover-effect envelope-glow group"
            onClick={handleEnvelopeClick}
            title="Click me, I'm hiding something sweet... 💌"
          >
            {/* Floating hearts on hover */}
            <div className="absolute -top-10 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute text-xl"
                  style={{
                    left: `${Math.random() * 60}px`,
                    top: `${Math.random() * 60}px`,
                    animation: `float-up ${1 + Math.random() * 2}s linear infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
            <div className={`relative w-[400px] h-[300px] ${isEnvelopeOpen ? 'pointer-events-none' : ''}}`}>
              {/* Main envelope body */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg rounded-sm border-2 border-pink-300">
                <div className="absolute inset-0 bg-opacity-50 bg-pattern"></div>
              </div>
              
              {/* Envelope flap */}
              <div 
                className={`absolute top-0 left-0 w-full h-full envelope-flap ${isEnvelopeOpen ? 'envelope-open' : ''}`}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-pink-100 to-pink-200 shadow-md border-2 border-pink-300"
                  style={{
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                  }}
                >
                  {/* Heart seal */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-red-100 rounded-full animate-pulse"></div>
                      <Heart className="w-8 h-8 text-red-500 relative z-10" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Letter */}
              <div 
                className={`absolute inset-4 bg-white rounded-xl shadow-sm p-6 letter ${isEnvelopeOpen ? 'letter-slide' : ''}`}
              >
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 h-full rounded-lg p-4 flex flex-col items-center justify-center border-2 border-pink-200 border-dashed">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse">
                      <Heart className="w-32 h-32 text-pink-300" fill="currentColor" />
                    </div>
                    <div className="absolute inset-0 animate-ping" style={{ animationDuration: '2s' }}>
                      <Heart className="w-32 h-32 text-pink-400" fill="currentColor" />
                    </div>
                    <Heart className="w-32 h-32 text-pink-500 relative z-10" fill="currentColor" />
                    <div className="absolute -top-6 -right-6 text-4xl animate-pulse">✨</div>
                    <div className="absolute -top-6 -left-6 text-4xl animate-pulse delay-100">✨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground showFloatingText={false}>
      <CursorTrail />
      <BackgroundAnimations />
      
      {!yesPressed ? (
        <ProposalPage onYesClick={() => setYesPressed(true)} />
      ) : (
        <div className="relative w-full h-screen overflow-hidden">
          <FloatingPictures />
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-3xl text-center border-4 border-pink-200 relative overflow-hidden hover:bg-white/40 hover:backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200 animate-shimmer"></div>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200 animate-shimmer"></div>
              <h2 className="text-4xl md:text-5xl font-['Permanent_Marker'] text-pink-500 mb-4" 
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  WebkitTextStroke: '1px #f9a8d4'
                }}>
                Can't Wait To Make
              </h2>
              <h2 className="text-5xl md:text-6xl font-['Permanent_Marker'] text-pink-600 mb-6" 
                style={{ 
                  textShadow: '3px 3px 6px rgba(0,0,0,0.15)',
                  WebkitTextStroke: '1px #f472b6'
                }}>
                Tons More Memories
              </h2>
              <h2 className="text-4xl md:text-5xl font-['Permanent_Marker'] text-pink-500" 
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  WebkitTextStroke: '1px #f9a8d4'
                }}>
                With You! ❤️
              </h2>
              <div className="absolute -top-10 -right-10 text-8xl animate-pulse opacity-50">✨</div>
              <div className="absolute -bottom-10 -left-10 text-8xl animate-pulse opacity-50 delay-500">✨</div>
            </div>
          </div>
        </div>
      )}
    </AnimatedBackground>
  );
}

export default App;
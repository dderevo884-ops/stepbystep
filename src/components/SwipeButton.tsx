import { ArrowRight, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SwipeButtonProps {
  onSwipe: () => void;
  text?: string;
}

export const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipe, text = "Свайп для начала" }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="relative w-full">
      <button 
        onClick={onSwipe}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-xl shadow-purple-500/30 transition-all duration-200 active:scale-95 hover:shadow-2xl hover:shadow-purple-500/40 ${isPressed ? 'scale-95' : ''}`}
      >
        <div className="flex items-center justify-between">
          <span>{text}</span>
          <div className="flex items-center space-x-1">
            <ArrowRight className="w-6 h-6 animate-bounce" />
            <ChevronRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </button>
      
      {/* Анимированный блеск */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};
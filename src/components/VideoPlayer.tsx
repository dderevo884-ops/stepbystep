import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  embedCode: string;
  title: string;
  onProgress?: (progress: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ embedCode, title, onProgress }) => {
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Слушаем сообщения от Kinescope плеера
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://kinescope.io') return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'player:timeupdate' && data.currentTime && data.duration) {
          const currentProgress = (data.currentTime / data.duration) * 100;
          setProgress(currentProgress);
          onProgress?.(currentProgress);
        }
      } catch (error) {
        // Игнорируем ошибки парсинга
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onProgress]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
        <div ref={iframeRef} dangerouslySetInnerHTML={{ __html: embedCode }} />
      </div>
      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Просмотрено: {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
};
import { useState } from 'react';
import { Header } from '../components/Header';
import { VideoPlayer } from '../components/VideoPlayer';
import { ArrowRight, Lock } from 'lucide-react';

interface Video2PageProps {
  userName?: string;
  onNext: () => void;
}

export const Video2Page: React.FC<Video2PageProps> = ({ userName, onNext }) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const isVideoWatched = videoProgress >= 50; // 50% просмотра

  const handleVideoProgress = (progress: number) => {
    setVideoProgress(progress);
  };

  const embedCode = `<div style="position: relative; padding-top: 56.25%; width: 100%"><iframe src="https://kinescope.io/embed/jmU2a49mFS9GPWXMptMbj6" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe></div>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header userName={userName} />
      
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        <VideoPlayer 
          embedCode={embedCode}
          title="Какие инструменты рабочие на самом деле"
          onProgress={handleVideoProgress}
        />

        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="mb-4">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-xl">🛠️</span>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Завершающее видео где я расскажу где применяются инструменты
          </p>
          
          <button 
            onClick={onNext}
            disabled={!isVideoWatched}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
              isVideoWatched 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {isVideoWatched ? (
                <>
                  <span>К следующему видео</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Заблокировано</span>
                </>
              )}
            </div>
          </button>
          
          {!isVideoWatched && (
            <p className="text-sm text-gray-500 mt-3">
              Посмотрите видео чтобы открыть следующее
            </p>
          )}
        </div>

        {/* Прогресс */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Урок 2 из 3</span>
            <span>67%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
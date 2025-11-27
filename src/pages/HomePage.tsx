import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ProgressBar } from '../components/ProgressBar';
import { VideoPlayer } from '../components/VideoPlayer';
import { ArrowRight, Lock } from 'lucide-react';

interface HomePageProps {
  userName?: string;
  onStartJourney: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ userName, onStartJourney }) => {
  const [canContinue, setCanContinue] = useState(false);
  const unlockTime = 5;

  const [debug, setDebug] = useState({
    mounted: false,
    seconds: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mountedAt = Date.now();
    setDebug({ mounted: true, seconds: 0 });

    const interval = window.setInterval(() => {
      const now = Date.now();
      setDebug(prev => ({
        ...prev,
        seconds: Math.floor((now - mountedAt) / 1000),
      }));
    }, 1000);

    const timer = window.setTimeout(() => {
      setCanContinue(true);
    }, unlockTime * 1000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, []);

  const embedCode = `<div style="position: relative; padding-top: 56.25%; width: 100%"><iframe src="https://kinescope.io/embed/jmU2a49mFS9GPWXMptMbj6" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe></div>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* ВИЗУАЛЬНОЕ ОКНО ОТЛАДКИ */}
      <div className="fixed top-2 left-2 z-50 bg-black text-green-400 text-xs font-mono p-3 rounded-lg shadow-lg">
        <div>DEBUG PANEL</div>
        <div>mounted: {debug.mounted ? 'true' : 'false'}</div>
        <div>seconds: {debug.seconds}s</div>
        <div>canContinue: {canContinue ? 'true' : 'false'}</div>
      </div>

      <Header userName={userName} />
      
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-purple-100/50">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🧠</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight text-left">
            10 практических инструментов для управления эмоциями ребёнка
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed text-left mb-6">
            Научитесь помогать вашему ребёнку справляться с эмоциями через проверенные методики
          </p>
        </div>

        <VideoPlayer 
          embedCode={embedCode}
          title="Определяем точку А"
        />

        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="mb-4">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-xl">✓</span>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Вы посмотрели видео и готовы узнать больше? Переходите дальше, чтобы начать обучение!
          </p>
          
          <button 
            onClick={onStartJourney}
            disabled={!canContinue}
            className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
              canContinue
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 active:scale-95' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {canContinue ? (
                <>
                  <span>Перейти дальше</span>
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
          
          {!canContinue && (
            <p className="text-sm text-gray-500 mt-3">
              Подождите {unlockTime} секунд, чтобы открыть следующее
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <ProgressBar 
            current={1} 
            total={3} 
            label="Ваш прогресс" 
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Урок 1 из 3</p>
            <p className="text-xs text-gray-400 mt-1">33% завершено</p>
          </div>
        </div>
      </div>
    </div>
  );
};

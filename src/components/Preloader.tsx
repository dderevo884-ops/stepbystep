import { useEffect, useState } from 'react';

interface PreloaderProps {
  user: { firstName: string; username?: string; id: number } | null;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ user, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  useEffect(() => {
    const steps = [
      'Подключение к Telegram...',
      `Загружаем профиль ${user?.firstName || 'пользователя'}...`,
      `Получаем ID: ${user?.id || 'неизвестен'}`,
      `Привет, ${user?.username ? '@' + user.username : user?.firstName || 'друг'}!`,
      'Готовим материалы...',
      'Запускаем приложение!'
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      const newProgress = Math.min(progress + Math.random() * 20, 100);
      setProgress(newProgress);
      
      if (currentStepIndex < steps.length) {
        setCurrentStep(steps[currentStepIndex]);
        currentStepIndex++;
      }

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [user, progress, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Анимированные градиентные орбы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-400"></div>
      </div>

      <div className="relative z-10 text-center text-white">
        {/* Неоновый логотип */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z"/>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>

        {/* Текст загрузки */}
        <div className="mb-8 min-h-[60px] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Маркетинг для психологов
          </h2>
          <p className="text-lg opacity-90 animate-pulse">{currentStep}</p>
        </div>

        {/* Прогресс-бар */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-purple-500/50"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm opacity-75 mt-2">{Math.round(progress)}%</p>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

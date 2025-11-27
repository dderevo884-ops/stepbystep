import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ProgressBar } from '../components/ProgressBar';
import { VideoPlayer } from '../components/VideoPlayer';
import { ArrowRight, Lock } from 'lucide-react';

interface HomePageProps {
  userName?: string;
  onStartJourney: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ userName, onStartJourney }) => {
  const [canContinue, setCanContinue] = useState(false); // разблокировка
  const unlockTime = 5; // 5 секунд

  useEffect(() => {
    const timer = setTimeout(() => setCanContinue(true), unlockTime * 1000);
    return () => clearTimeout(timer);
  }, []);

  const embedCode = `<div style="position: relative; padding-top: 56.25%; width: 100%"><iframe src="https://kinescope.io/embed/jmU2a49mFS9GPWXMptMbj6" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe></div>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header userName={userName} />
      
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        {/* Заголовок */}
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

        {/* Видео */}
        <VideoPlayer 
          embedCode={embedCode}
          title="Определяем точку А"
        />

        {/* Кнопка далее */}
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

        {/* Прогресс */}
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

        {/* Автор */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Психолог" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Анна Петрова</h3>
            <p className="text-sm text-purple-600 font-medium mb-4">Детский психолог, эксперт по эмоциональному развитию</p>
          </div>
          
          <div className="text-left space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-lg mt-1">🎓</span>
              <span className="text-gray-700">15+ лет практики работы с детьми и родителями</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-lg mt-1">📚</span>
              <span className="text-gray-700">Автор методик по эмоциональному интеллекту</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-lg mt-1">❤️</span>
              <span className="text-gray-700">Помогла более 1000 семей наладить отношения</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

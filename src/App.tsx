import { useState, useEffect } from 'react';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';
import { Preloader } from './components/Preloader';
import { HomePage } from './pages/HomePage';
import { Video1Page } from './pages/Video1Page';
import { Video2Page } from './pages/Video2Page';
import { Video3Page } from './pages/Video3Page';

type AppState = 'loading' | 'home' | 'video1' | 'video2' | 'video3' | 'completed';

function App() {
  const { user, isLoaded } = useTelegramWebApp();
  const [currentState, setCurrentState] = useState<AppState>('loading');

  // Функция для прокрутки к началу страницы
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => setCurrentState('home'), 500);
    }
  }, [isLoaded]);

  // Прокрутка к началу при изменении состояния
  useEffect(() => {
    if (currentState !== 'loading') {
      scrollToTop();
    }
  }, [currentState]);
  const handlePreloaderComplete = () => {
    setCurrentState('home');
  };

  const handleStartJourney = () => {
    setCurrentState('video1');
  };

  const handleVideo1Next = () => {
    setCurrentState('video2');
  };

  const handleVideo2Next = () => {
    setCurrentState('video3');
  };

  const handleVideo3Back = () => {
    setCurrentState('video2');
  };

  const handleCompleted = () => {
    setCurrentState('completed');
  };

  if (currentState === 'loading') {
    return <Preloader user={user} onComplete={handlePreloaderComplete} />;
  }

  const userName = user?.firstName || user?.username;

  switch (currentState) {
    case 'home':
      return <HomePage userName={userName} onStartJourney={handleStartJourney} />;
    case 'video1':
      return <Video1Page userName={userName} onNext={handleVideo1Next} />;
    case 'video2':
      return <Video2Page userName={userName} onNext={handleVideo2Next} />;
    case 'video3':
      return <Video3Page userName={userName} onBack={handleVideo3Back} onFinish={handleCompleted} />;
    case 'completed':
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
          <div className="text-center bg-white rounded-3xl p-8 shadow-2xl max-w-md">
            <div className="text-6xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Поздравляем!</h1>
            <p className="text-gray-600">Вы успешно завершили обучение и получили доступ к полному практикуму!</p>
          </div>
        </div>
      );
    default:
      return <HomePage userName={userName} onStartJourney={handleStartJourney} />;
  }
}

export default App;
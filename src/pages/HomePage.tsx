import { Header } from '../components/Header';
import { ProgressBar } from '../components/ProgressBar';
import { SwipeButton } from '../components/SwipeButton';

interface HomePageProps {
  userName?: string;
  onStartJourney: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ userName, onStartJourney }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header userName={userName} />
      
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        {/* УТП */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-purple-100/50">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🧠</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
              10 практических инструментов для управления эмоциями ребёнка
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Научитесь помогать вашему ребёнку справляться с эмоциями через проверенные методики
            </p>
          </div>
        </div>

        {/* Прогресс */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <ProgressBar 
            current={0} 
            total={3} 
            label="Ваш прогресс" 
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Вы на старте обучения</p>
            <p className="text-xs text-gray-400 mt-1">Всего 3 видео урока</p>
          </div>
        </div>

        {/* Преимущества */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-purple-500">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎯</span>
              <span className="font-medium text-gray-800">Практические техники</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-pink-500">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⏱️</span>
              <span className="font-medium text-gray-800">Быстрые результаты</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-md border-l-4 border-blue-500">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">❤️</span>
              <span className="font-medium text-gray-800">Проверено экспертами</span>
            </div>
          </div>
        </div>

        {/* Кнопка начать */}
        <div className="pt-4">
          <SwipeButton onSwipe={onStartJourney} text="Начать обучение →" />
        </div>
      </div>
    </div>
  );
};
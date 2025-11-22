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
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4 leading-tight text-left">
              Переведите 10 лет практики в автоматизированный доход за 60 дней: Запустим ваш онлайн-курс 'под ключ' с гарантией первого потока, пока вы продолжаете консультировать.
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed text-left mb-6">
              Мы берем на себя всю техническую настройку, маркетинг и продажи, чтобы вы сохранили фокус на клиентах и получили масштабируемый продукт без стресса
            </p>
            
            {/* Кнопка начать */}
            <div className="mb-6">
              <SwipeButton onSwipe={onStartJourney} text="Начать обучение →" />
            </div>
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

        {/* Об авторе */}
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

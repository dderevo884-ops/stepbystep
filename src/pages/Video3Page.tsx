import { Header } from '../components/Header';
import { VideoPlayer } from '../components/VideoPlayer';
import { ArrowLeft, ArrowRight, Lock, Unlock } from 'lucide-react';
import { useState } from 'react';

interface Video3PageProps {
  userName?: string;
  onBack: () => void;
  onFinish: () => void;
}

export const Video3Page: React.FC<Video3PageProps> = ({ userName, onBack, onFinish }) => {
  const [codeWord, setCodeWord] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);

  const embedCode = `<div style="position: relative; padding-top: 56.25%; width: 100%"><iframe src="https://kinescope.io/embed/jmU2a49mFS9GPWXMptMbj6" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;" frameborder="0" allowfullscreen style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"></iframe></div>`;

  const handleSubmitCode = () => {
    if (codeWord.toLowerCase().trim() === 'страсти') {
      setIsUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitCode();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header userName={userName} />
      
      <div className="max-w-md mx-auto px-4 py-8 space-y-8">
        <VideoPlayer 
          embedCode={embedCode}
          title="Практика + доступ к закрытому материалу"
        />

        {!isUnlocked ? (
          /* Форма ввода кодового слова */
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ввод кодового слова</h3>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={codeWord}
                  onChange={(e) => setCodeWord(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите кодовое слово..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-center text-lg font-medium"
                />
              </div>

              <button
                onClick={handleSubmitCode}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
              >
                Принять
              </button>

              {showError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <p className="text-red-600 text-sm">Неверное кодовое слово. Попробуйте еще раз.</p>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 text-center mt-4 leading-relaxed">
              Введите кодовое слово из видео, чтобы получить доступ к закрытым материалам
            </p>
          </div>
        ) : (
          /* Разблокированный контент */
          <div className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-emerald-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                <Unlock className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800">Доступ получен!</h2>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6">
              <p className="text-gray-700 leading-relaxed text-center">
                Чтобы развить в себе навыки супермамы, надо больше контекста и информации. 
                Вы сможете взять под контроль всё, и я делюсь своими наработками из практики. 
                Переходите на страницу, где вас ждет материал!
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={onFinish}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-xl shadow-emerald-500/30 transition-all duration-200 hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-95"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>Перейти к закрытым материалам</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Кнопка назад */}
        <div className="text-center">
          <button 
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад</span>
          </button>
        </div>

        {/* Прогресс */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Урок 3 из 3</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
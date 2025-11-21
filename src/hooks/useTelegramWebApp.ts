import { useEffect, useState } from 'react';
import { TelegramWebApp } from '../types/telegram';

interface TelegramUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
}

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready();
      tg.expand();
      setWebApp(tg);

      // Получаем данные пользователя
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          username: userData.username,
        });
      } else {
        // Для тестирования, если запущено не в Telegram
        setUser({
          id: 12345,
          firstName: 'Анна',
          username: 'anna_test',
        });
      }
    } else {
      // Фолбек для тестирования
      setUser({
        id: 12345,
        firstName: 'Анна',
        username: 'anna_test',
      });
    }

    // Имитируем загрузку
    setTimeout(() => setIsLoaded(true), 2000);
  }, []);

  return { webApp, user, isLoaded };
};
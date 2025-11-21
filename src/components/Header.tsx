import { User } from 'lucide-react';

interface HeaderProps {
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-lg font-semibold text-gray-800">
            Привет, {userName || 'друг'}! 👋
          </div>
        </div>
        
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};
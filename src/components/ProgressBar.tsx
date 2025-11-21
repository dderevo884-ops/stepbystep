interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">{current}/{total}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
      <div className="text-right mt-1">
        <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};
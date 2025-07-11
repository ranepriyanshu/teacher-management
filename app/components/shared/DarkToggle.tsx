// components/shared/DarkToggle.tsx
import { useTheme } from '../../context/ThemeContext';

export default function DarkToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-1 rounded border text-sm bg-gray-100 dark:bg-gray-800 dark:text-white"
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

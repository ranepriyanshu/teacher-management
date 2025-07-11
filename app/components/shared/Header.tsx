// components/shared/Header.tsx
import DarkToggle from './DarkToggle';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/login');
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 mb-6 bg-white dark:bg-gray-800 shadow rounded-md">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Teacher Dashboard</h1>

      <div className="flex items-center gap-3">
        <DarkToggle />
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

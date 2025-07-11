import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';
    if (isLoggedIn) router.push('/');
  }, []);

  const handleLogin = () => {
    if (email === 'admin@school.com' && pass === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } else {
      alert('Invalid credentials. Try admin@school.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-sm w-full bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <Input label="Email" value={email} onChange={setEmail} />
        <Input label="Password" type="password" value={pass} onChange={setPass} />

        <Button className="w-full mt-4" onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}

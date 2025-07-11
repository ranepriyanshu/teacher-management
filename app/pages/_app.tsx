import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { TeacherProvider } from '../context/TeacherContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <TeacherProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      </TeacherProvider>
    </ThemeProvider>
  );
}

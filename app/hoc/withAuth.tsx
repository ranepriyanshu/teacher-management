// hoc/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = localStorage.getItem('loggedIn');
      if (isLoggedIn !== 'true') {
        router.replace('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;

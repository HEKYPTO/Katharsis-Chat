"use client"
import { isLoggedIn } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push('/login');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (isLoading) {
        
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

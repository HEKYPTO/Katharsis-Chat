"use client"
import { isLoggedIn } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ExcludedRouteProps {
  children: React.ReactNode;
}

const ExclutedRoute: React.FC<ExcludedRouteProps> = ({ children }) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn()) {
            // router.push('/');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (isLoading) {
        
        return null;
    }

    return <>{children}</>;
};

export default ExclutedRoute;

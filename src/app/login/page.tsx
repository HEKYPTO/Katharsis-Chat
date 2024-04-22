import LoginForm from '@/components/Login/login';
import ExclutedRoute from '@/utils/excludedRoute';
import React from 'react';


export default function LoginPage() {
    return (
        <div className='flex items-center justify-center h-screen bg-white'>
            <ExclutedRoute>
                <LoginForm />
            </ExclutedRoute>
        </div>
    );
}

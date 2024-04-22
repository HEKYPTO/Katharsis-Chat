import SignupForm from '@/components/Signup/signup';
import ExclutedRoute from '@/utils/excludedRoute';
import React from 'react';


export default function SignupPage() {
    return (
        <div className='flex items-center justify-center h-screen bg-white'>
            <ExclutedRoute>
                <SignupForm />
            </ExclutedRoute>
        </div>
    );
}

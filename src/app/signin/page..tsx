// src/app/signin/page.tsx

import React from 'react';
import { SignUpForm } from '@/components/ui/SignUpForm';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <SignUpForm />
    </div>
  );
};

export default SignInPage;
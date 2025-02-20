import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from 'shadcn/ui'; // Assuming Button is a component from Shadcn/UI

const CreateAccount = () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Default value
  console.log('Base URL:', baseUrl);

  try {
    const fullUrl = new URL('/auth/v1', baseUrl);
    console.log('Full URL:', fullUrl.toString());

    return (
      <div className="create-account">
        <h2>Create an Account</h2>
        <Button onClick={() => signIn('google')} className="sso-button google">
          Sign in with Google
        </Button>
        <Button onClick={() => signIn('apple')} className="sso-button apple">
          Sign in with Apple
        </Button>
      </div>
    );
  } catch (error) {
    console.error('Error constructing URL:', error);
    // Handle error appropriately
    return null;
  }
};

export default CreateAccount; 
// app/create-account/page.js
'use client'; // Required for client-side interactivity

import { useState } from 'react';
import React from 'react';
import './create-account.css';
import Link from 'next/link';
import { motion } from "framer-motion";
import { AuroraBackground } from '@/components/ui/aurora-background';
// Import the font in your global CSS or _app.js file
// Example: import 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add your account creation logic here (e.g., API call)
    console.log('Creating account with:', { email, password });
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 min-h-screen"
      >
        <div 
          className="bg-gray-800 bg-opacity-50 p-8 text-white w-96" 
          style={{ 
            fontFamily: "'Orbitron', sans-serif", 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'none'
          }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                className="w-full p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4"
            >
              Sign Up
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account? 
              <Link href="/signin" className="text-blue-400 hover:underline ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
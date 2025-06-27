// src/pages/SignupPage.jsx
import React from 'react';
import { useState } from 'react';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailSignup = async () => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: email.split('@')[0] });
    navigate('/chat');
  };

  const handleGoogleSignup = async () => {
    await signInWithPopup(auth, provider);
    navigate('/chat');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">GET STARTED</h1>
        <p className="text-center text-gray-600">Welcome! Let's start your journey</p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label>
              <input type="checkbox" className="mr-1" />
              Remember me
            </label>
            <span className="cursor-pointer">Forgot password</span>
          </div>

          <button onClick={handleEmailSignup} className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Sign up
          </button>

          <button onClick={handleGoogleSignup} className="w-full border flex items-center justify-center py-3 rounded-lg">
            <img src="https://icon2.cleanpng.com/20180324/dtw/avdf2wwjk.webp" alt="Google" className="w-5 mr-2" />
            Sign up with Google
          </button>

          <p className="text-xs text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600">Login!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

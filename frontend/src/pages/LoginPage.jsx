import React from 'react';
// src/pages/LoginPage.jsx
import { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/chat');
  };

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, provider);
    navigate('/chat');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">
          WELCOME <span className="text-blue-600">BACK</span>
        </h1>
        <p className="text-center text-gray-600">Welcome back! Please enter your details.</p>

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

          <button onClick={handleEmailLogin} className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Sign in
          </button>

          <button onClick={handleGoogleLogin} className="w-full border flex items-center justify-center py-3 rounded-lg">
            <img src="https://icon2.cleanpng.com/20180324/dtw/avdf2wwjk.webp" alt="Google" className="w-5 mr-2" />
            Sign in with Google
          </button>

          <p className="text-xs text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600">Sign up for free!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogIn } from 'lucide-react';

export function AuthScreen() {
  const { loading, error, signIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome to I MOSLAM</h2>
          <p className="mt-2 text-gray-400">Sign in to continue</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <button 
            onClick={signIn}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4">
            <p className="text-red-500 text-center text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
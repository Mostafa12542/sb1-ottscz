import React from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthScreen } from './components/AuthScreen';
import { Feed } from './components/Feed';
import { Header } from './components/Header';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      {!user ? <AuthScreen /> : <Feed />}
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithRedirect,
  GoogleAuthProvider, 
  getRedirectResult,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { auth } from '../config/firebase';
import type { User, AuthState } from '../types/auth';

const provider = new GoogleAuthProvider();

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setAuthState(prev => ({ ...prev, loading: false, error: null }));
        }
      } catch (error: any) {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData: User = {
          id: user.uid,
          email: user.email!,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        setAuthState({ user: userData, loading: false, error: null });
      } else {
        setAuthState({ user: null, loading: false, error: null });
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        await signInWithPopup(auth, provider);
      } catch (error: any) {
        if (error.code === 'auth/popup-blocked') {
          await signInWithRedirect(auth, provider);
        } else {
          throw error;
        }
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message,
      }));
    }
  };

  return { ...authState, signIn, signOut };
}
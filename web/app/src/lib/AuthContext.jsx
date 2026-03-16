import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthChange, logOut } from '@/lib/firebaseAuthService';
import { isFirebaseConfigured } from '@/lib/firebase';
import { fetchUserRole } from '@/lib/userRoleService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      // Firebase not configured – run in unauthenticated/local mode
      setIsLoadingAuth(false);
      return;
    }
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoadingAuth(false);
        return;
      }

      try {
        const role = await fetchUserRole(firebaseUser.uid);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          emailVerified: firebaseUser.emailVerified,
          role,
          full_name: firebaseUser.displayName || firebaseUser.email,
        });
        setAuthError(null);
      } catch (err) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          emailVerified: firebaseUser.emailVerified,
          role: null,
          full_name: firebaseUser.displayName || firebaseUser.email,
        });
        setAuthError({
          type: 'role_fetch_failed',
          message: err.message || 'Failed to load user role.',
        });
      } finally {
        setIsLoadingAuth(false);
      }
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await logOut();
    setUser(null);
    setAuthError(null);
    window.location.href = '/Login';
  };

  const navigateToLogin = () => {
    window.location.href = '/Login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingAuth,
        isLoadingPublicSettings: false,
        authError,
        setAuthError,
        navigateToLogin,
        logout,
        hasRemoteAuth: isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

import { createContext, useState, useCallback } from 'react';
import { adminLogin as loginApi, adminLogout as logoutApi, getDashboard } from '../lib/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      await getDashboard();
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setChecking(false);
    }
  }, []);

  async function login(email, password) {
    await loginApi(email, password);
    setAuthenticated(true);
  }

  async function logout() {
    await logoutApi();
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ authenticated, checking, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

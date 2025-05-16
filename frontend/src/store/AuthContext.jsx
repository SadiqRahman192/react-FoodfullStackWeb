import { createContext, useState, useContext, useEffect } from "react";
import { validateEmail, validatePassword, validateName } from "../utils/validation";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  loginWithGoogle: () => {},
  loginWithFacebook: () => {},
  error: null,
  loading: false,
  getUserData: () => {}, // New method for accessing user data
  requireAuth: () => {}, // New method for checking authentication
});

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function login(email, password) {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      if (!validatePassword(password)) {
        throw new Error('Invalid password format');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'demo@example.com' && password === 'Demo@123') {
        const userData = {
          email,
          name: 'Demo User',
          id: '1',
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signup(name, email, password) {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      if (!validateName(name)) {
        throw new Error('Name must be at least 2 characters and contain only letters');
      }
      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      if (!validatePassword(password)) {
        throw new Error('Invalid password format');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        email,
        name,
        id: Date.now().toString(),
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function loginWithGoogle() {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        email: 'google@example.com',
        name: 'Google User',
        id: 'google-1',
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function loginWithFacebook() {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        email: 'facebook@example.com',
        name: 'Facebook User',
        id: 'facebook-1',
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    setError(null); // Clear error on logout
  }

  // New method to get user data for pre-filling forms
  function getUserData() {
    return user ? { name: user.name, email: user.email } : null;
  }

  // New method to enforce authentication
  function requireAuth() {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to perform this action');
    }
    return true;
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    error,
    loading,
    getUserData,
    requireAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
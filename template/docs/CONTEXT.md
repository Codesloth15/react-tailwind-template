# Context

React Context API providers for managing global state without prop drilling.

## Purpose
The `context/` folder stores React Context providers that manage global application state.

## What to Put Here
- `AuthContext.jsx` - Authentication and user session context
- `ThemeContext.jsx` - Theme context (dark/light mode)
- `UserContext.jsx` - Global user data context
- `AppContext.jsx` - General app-wide state
- `NotificationContext.jsx` - Global notifications/toasts

## Guidelines
- Create context for **truly global state** only
- Combine with hooks for cleaner API
- Use lazy initialization when appropriate
- Provide both context and custom hook
- Avoid over-using context (prefer local state)

## Examples

### Auth Context
```jsx
// context/AuthContext.jsx
import { createContext, useState, useCallback } from 'react';
import { authService } from '@/services/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Theme Context
```jsx
// context/ThemeContext.jsx
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

## Custom Hooks for Context

```jsx
// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// hooks/useTheme.js
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

## App Setup

```jsx
// App.jsx
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Router from './Router';

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
```

## Usage in Components

```jsx
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      <p>Welcome, {user?.name}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
```

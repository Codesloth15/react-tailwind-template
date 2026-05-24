# Project Folder Structure Guide

This document explains the purpose of each folder and what files should be placed inside.

## Directory Layout

```
src/
├── components/      - Reusable React components
├── pages/          - Full-page route components
├── hooks/          - Custom React hooks
├── services/       - External API calls & business logic
├── context/        - React Context API providers
├── constants/      - App constants & configuration
├── utils/          - Utility & helper functions
├── assets/         - Static files (images, icons)
├── App.jsx         - Main app component
├── index.css       - Global styles with Tailwind CSS
└── main.jsx        - Application entry point
```

---

## 📦 Folders Overview

### `components/`
**Purpose:** Reusable React components used across multiple pages

**What to put here:**
- `Button.jsx` - Reusable button component
- `Card.jsx` - Card layout component
- `Header.jsx` - Header component
- `Footer.jsx` - Footer component
- `Modal.jsx` - Modal dialog component
- `Navbar.jsx` - Navigation bar component
- `Form.jsx` - Form component
- `Loader.jsx` - Loading spinner component

**Example:**
```jsx
export function Button({ text, onClick }) {
  return (
    <button 
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
```

---

### `pages/`
**Purpose:** Full-page components that represent different routes/views

**What to put here:**
- `HomePage.jsx` - Landing/home page
- `DashboardPage.jsx` - Dashboard page
- `ProfilePage.jsx` - User profile page
- `NotFoundPage.jsx` - 404 error page
- `LoginPage.jsx` - Login page
- `SettingsPage.jsx` - Settings page

**Example:**
```jsx
export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <h1 className="text-4xl font-bold">Home</h1>
    </div>
  );
}
```

---

### `hooks/`
**Purpose:** Custom React hooks for reusable logic and state management

**What to put here:**
- `useAuth.js` - Authentication logic
- `useFetch.js` - Data fetching logic
- `useLocalStorage.js` - Local storage management
- `useForm.js` - Form handling logic
- `useDebounce.js` - Debounce hook
- `useClickOutside.js` - Click outside detection

**Example:**
```jsx
export function useAuth() {
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    // Login logic
  };
  return { user, login };
}
```

---

### `services/`
**Purpose:** External API calls and business logic services

**What to put here:**
- `api.js` - API client configuration
- `auth.js` - Authentication service
- `users.js` - User-related API calls
- `products.js` - Product-related API calls
- `chat.js` - Chat API calls

**Example:**
```javascript
const API_BASE = 'https://api.example.com';

export const authService = {
  login: (email, password) => 
    fetch(`${API_BASE}/login`, { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    }),
  logout: () => 
    fetch(`${API_BASE}/logout`)
};
```

---

### `context/`
**Purpose:** React Context API providers for global state management

**What to put here:**
- `AuthContext.jsx` - Authentication context
- `ThemeContext.jsx` - Theme context (dark/light mode)
- `UserContext.jsx` - User data context
- `AppContext.jsx` - General app context

**Example:**
```jsx
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

### `constants/`
**Purpose:** Application constants and configuration values

**What to put here:**
- `api.js` - API endpoints and base URLs
- `messages.js` - Error and success messages
- `config.js` - App configuration settings
- `routes.js` - Route paths

**Example:**
```javascript
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  USERS: '/users',
  PRODUCTS: '/products'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred',
  INVALID_EMAIL: 'Invalid email address'
};
```

---

### `utils/`
**Purpose:** Utility functions and helper methods

**What to put here:**
- `formatters.js` - Date, currency, text formatting
- `validators.js` - Input validation functions
- `helpers.js` - General helper functions
- `storage.js` - Local/session storage helpers

**Example:**
```javascript
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US');
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

---

### `assets/`
**Purpose:** Static files like images, icons, and fonts

**What to put here:**
- `logo.png` - Application logo
- `icons/` - SVG and icon files
- `images/` - Static images
- `fonts/` - Custom font files

**Directory structure:**
```
assets/
├── logo.png
├── icons/
│   ├── home.svg
│   ├── settings.svg
│   └── user.svg
├── images/
│   ├── hero.png
│   └── banner.jpg
└── fonts/
    └── custom-font.ttf
```

---

## 🎨 Root Level Files

### `App.jsx`
Main application component. Handles routing and layout structure.

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
```

### `index.css`
Global styles with Tailwind CSS. Import this in `main.jsx`.

```css
@import "tailwindcss";

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
```

### `main.jsx`
Application entry point. Renders the React app to the DOM.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 📋 Quick Reference

| Folder | Purpose | Contains |
|--------|---------|----------|
| `components/` | Reusable UI pieces | Buttons, Cards, Headers |
| `pages/` | Full page views | HomePage, Dashboard |
| `hooks/` | Custom logic | useAuth, useFetch |
| `services/` | API calls | API client, requests |
| `context/` | Global state | Providers, contexts |
| `constants/` | Fixed values | Endpoints, messages |
| `utils/` | Helper functions | Formatters, validators |
| `assets/` | Static files | Images, icons, fonts |

---

## 🚀 Best Practices

1. **Keep components small** - Each component should do one thing well
2. **Use hooks** - Extract reusable logic into custom hooks
3. **Centralize API calls** - Put all API logic in `services/`
4. **Use Context** - For global state (auth, theme, user data)
5. **Organize constants** - Keep all magic strings in `constants/`
6. **DRY principle** - Reuse components and functions
7. **Tailwind CSS** - Use utility classes for styling (no extra CSS files needed)

---

## 🔗 Integration Example

```jsx
// pages/DashboardPage.jsx
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';
import { userService } from '@/services/users';
import { formatDate } from '@/utils/formatters';

export function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <Button text="Logout" onClick={() => userService.logout()} />
      <p>Joined: {formatDate(user.createdAt)}</p>
    </div>
  );
}
```

---

**Last Updated:** 2026-05-18

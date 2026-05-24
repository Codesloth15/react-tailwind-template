# Hooks

Custom React hooks that encapsulate reusable logic and state management.

## Purpose
The `hooks/` folder stores custom React hooks that extract component logic for reuse across multiple components.

## What to Put Here
- `useAuth.js` - Authentication logic and user state
- `useFetch.js` - Data fetching with loading/error states
- `useLocalStorage.js` - Local storage management
- `useForm.js` - Form handling and validation
- `useDebounce.js` - Debounce hook for search/input
- `useClickOutside.js` - Detect clicks outside element
- `useWindowSize.js` - Get window dimensions
- `usePrevious.js` - Get previous value from render

## Guidelines
- Follow React hooks rules
- Keep hooks **focused on one concern**
- Return clear, simple interfaces
- Use other hooks internally if needed
- Name hooks starting with `use`

## Examples

### useAuth Hook
```jsx
// hooks/useAuth.js
import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, loading, login, logout };
}
```

### useFetch Hook
```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

### useForm Hook
```jsx
// hooks/useForm.js
import { useState } from 'react';

export function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return { values, errors, handleChange, handleSubmit, setValues };
}
```

## Usage in Components

```jsx
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const { login, loading } = useAuth();
  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    login
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

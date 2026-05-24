# Services

External API calls and business logic services for data operations.

## Purpose
The `services/` folder contains all API calls and external service interactions, keeping your components clean.

## What to Put Here
- `api.js` - API client configuration and base setup
- `auth.js` - Authentication API calls (login, logout, register)
- `users.js` - User-related API calls
- `products.js` - Product-related API calls
- `chat.js` - Chat/messaging API calls
- `notifications.js` - Notification service calls

## Guidelines
- **Centralize all API calls** - Don't fetch directly in components
- Use consistent **error handling**
- Return structured responses
- Keep **business logic** separate from UI
- Use environment variables for API URLs

## Examples

### API Configuration
```jsx
// services/api.js
const API_BASE = process.env.REACT_APP_API_URL || 'https://api.example.com';

export const apiClient = {
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
};
```

### Auth Service
```jsx
// services/auth.js
import { apiClient } from './api';

export const authService = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  logout: () =>
    apiClient.post('/auth/logout', {}),

  register: (email, password, name) =>
    apiClient.post('/auth/register', { email, password, name }),

  refreshToken: () =>
    apiClient.post('/auth/refresh', {}),

  getCurrentUser: () =>
    apiClient.get('/auth/me')
};
```

### Users Service
```jsx
// services/users.js
import { apiClient } from './api';

export const usersService = {
  getAll: () =>
    apiClient.get('/users'),

  getById: (id) =>
    apiClient.get(`/users/${id}`),

  update: (id, data) =>
    apiClient.put(`/users/${id}`, data),

  delete: (id) =>
    apiClient.delete(`/users/${id}`)
};
```

## Usage in Components

```jsx
import { useEffect, useState } from 'react';
import { usersService } from '@/services/users';

export function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    usersService.getAll()
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

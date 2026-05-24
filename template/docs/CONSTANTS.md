# Constants

Application constants, configuration values, and fixed strings.

## Purpose
The `constants/` folder stores all app-wide constants and configuration values, avoiding magic strings scattered throughout code.

## What to Put Here
- `api.js` - API endpoints and base URLs
- `messages.js` - Error and success messages
- `config.js` - App configuration settings
- `routes.js` - Route paths and navigation paths
- `colors.js` - Color constants (if not using Tailwind)
- `limits.js` - Validation limits (max length, min value, etc.)

## Guidelines
- Use **UPPER_CASE** for constant names
- Group related constants together
- Use meaningful names that describe purpose
- **Don't hardcode** values in components
- Reference constants instead

## Examples

### API Constants
```js
// constants/api.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',

  // Users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  USER_PROFILE: '/users/me',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};
```

### Messages Constants
```js
// constants/messages.js
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters.',
  LOGIN_FAILED: 'Invalid email or password.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  REQUIRED_FIELD: (field) => `${field} is required.`
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  REGISTRATION_SUCCESS: 'Account created successfully!',
  UPDATE_SUCCESS: 'Changes saved successfully!',
  DELETE_SUCCESS: 'Deleted successfully!'
};

export const INFO_MESSAGES = {
  LOADING: 'Loading...',
  PROCESSING: 'Processing your request...',
  CONFIRMING: 'Please confirm this action.'
};
```

### Routes Constants
```js
// constants/routes.js
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOT_FOUND: '/404'
};

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.SETTINGS
];
```

### Config Constants
```js
// constants/config.js
export const APP_NAME = 'My Chat App';
export const APP_VERSION = '1.0.0';

export const VALIDATION = {
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 255,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50
};

export const LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGE_SIZE: 2 * 1024 * 1024, // 2MB
  PAGINATION_LIMIT: 20,
  CHAT_MESSAGE_MAX_LENGTH: 5000
};

export const TIMEOUTS = {
  NETWORK_TIMEOUT: 30000, // 30 seconds
  SESSION_TIMEOUT: 1800000, // 30 minutes
  DEBOUNCE_DELAY: 300 // 300ms
};
```

## Usage in Components

```jsx
// services/auth.js
import { API_ENDPOINTS } from '@/constants/api';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/constants/messages';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      return {
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS
      };
    } catch (error) {
      return {
        success: false,
        message: ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  }
};
```

```jsx
// components/Form.jsx
import { VALIDATION } from '@/constants/config';

export function Form() {
  const handlePasswordChange = (password) => {
    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      showError(`Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`);
    }
  };

  return (
    <input
      type="password"
      maxLength={VALIDATION.PASSWORD_MAX_LENGTH}
      onChange={(e) => handlePasswordChange(e.target.value)}
    />
  );
}
```

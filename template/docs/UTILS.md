# Utils

Utility functions and helper methods for common operations.

## Purpose
The `utils/` folder contains reusable helper functions that perform common tasks used throughout the application.

## What to Put Here
- `formatters.js` - Date, currency, text formatting functions
- `validators.js` - Input validation and data validation functions
- `helpers.js` - General helper and utility functions
- `storage.js` - Local/session storage wrapper functions
- `string.js` - String manipulation utilities
- `arrays.js` - Array manipulation utilities
- `objects.js` - Object manipulation utilities

## Guidelines
- Keep functions **pure** (no side effects)
- Use **descriptive names** that indicate purpose
- Add **JSDoc comments** for clarity
- Handle **edge cases** properly
- Keep functions **focused and small**

## Examples

### Formatters
```js
// utils/formatters.js

/**
 * Format a date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format pattern (default: 'MM/DD/YYYY')
 * @returns {string} Formatted date
 */
export function formatDate(date, format = 'MM/DD/YYYY') {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
}

/**
 * Format currency with locale
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated string
 */
export function truncate(str, length = 50) {
  return str.length > length ? str.slice(0, length) + '...' : str;
}
```

### Validators
```js
// utils/validators.js

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with feedback
 */
export function validatePassword(password) {
  const result = {
    isValid: true,
    feedback: []
  };

  if (password.length < 8) {
    result.isValid = false;
    result.feedback.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    result.isValid = false;
    result.feedback.push('Password must contain uppercase letter');
  }

  if (!/[0-9]/.test(password)) {
    result.isValid = false;
    result.feedback.push('Password must contain number');
  }

  return result;
}

/**
 * Validate phone number
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid phone
 */
export function validatePhone(phone) {
  const regex = /^[0-9]{10,}$/;
  return regex.test(phone.replace(/\D/g, ''));
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

### Helpers
```js
// utils/helpers.js

/**
 * Debounce function execution
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle function execution
 * @param {function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {function} Throttled function
 */
export function throttle(func, limit) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    }
  };
}

/**
 * Check if user is online
 * @returns {boolean} True if online
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Resolves after delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Storage
```js
// utils/storage.js

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('localStorage error:', error);
  }
}

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default if not found
 * @returns {any} Stored value or default
 */
export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('localStorage error:', error);
    return defaultValue;
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('localStorage error:', error);
  }
}
```

## Usage Examples

```jsx
// components/UserForm.jsx
import { validateEmail, validatePassword } from '@/utils/validators';
import { capitalize, truncate } from '@/utils/formatters';

export function UserForm() {
  const handleEmailChange = (email) => {
    const isValid = validateEmail(email);
    // Handle validation
  };

  const handlePasswordChange = (password) => {
    const validation = validatePassword(password);
    // Handle validation feedback
  };

  return (
    <form>
      <input onChange={(e) => handleEmailChange(e.target.value)} />
      <input onChange={(e) => handlePasswordChange(e.target.value)} />
    </form>
  );
}
```

```jsx
// hooks/useSearch.js
import { debounce } from '@/utils/helpers';
import { useState } from 'react';

export function useSearch(searchFn) {
  const [query, setQuery] = useState('');

  const debouncedSearch = debounce((q) => {
    searchFn(q);
  }, 300);

  const handleSearch = (q) => {
    setQuery(q);
    debouncedSearch(q);
  };

  return { query, handleSearch };
}
```

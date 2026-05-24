# Chat App - Project Structure Guide

## 📁 Current File Organization (Flat - Ready to Organize)

All new files are created in `src/` directory. To maintain the recommended structure, organize files as follows:

### Current Structure:
```
src/
├── App.jsx                 # Main app component
├── App.css                 # (Empty - using Tailwind)
├── main.jsx                # Entry point
├── index.css               # Tailwind imports
├── ARCHITECTURE.md         # Architecture guide
│
├── Components:
├── Navigation.jsx          # Navigation bar
├── HeroSection.jsx         # Hero section
├── FeaturesSection.jsx     # Features grid
├── Footer.jsx              # Footer
├── Button.jsx              # Reusable button
├── Card.jsx                # Reusable card
│
├── Utilities & Services:
├── formatting.js           # Format utilities
├── validation.js           # Validation utilities
├── api.js                  # API configuration
├── useAuth.js              # Auth hook
```

## 🎯 Recommended Folder Structure

To implement proper organization, create these folders and move files:

```bash
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/hooks
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/constants
mkdir -p src/context
mkdir -p src/styles
mkdir -p src/assets
```

### Then move files:

```bash
# Components
mv src/Navigation.jsx src/components/
mv src/HeroSection.jsx src/components/
mv src/FeaturesSection.jsx src/components/
mv src/Footer.jsx src/components/
mv src/Button.jsx src/components/
mv src/Card.jsx src/components/

# Utilities
mv src/formatting.js src/utils/
mv src/validation.js src/utils/

# Services & API
mv src/api.js src/services/

# Hooks
mv src/useAuth.js src/hooks/

# Styles
mv src/index.css src/styles/
mv src/App.css src/styles/

# Architecture docs
mv src/ARCHITECTURE.md docs/ (optional)
```

## 📋 File Organization Reference

### Components (`src/components/`)
Reusable UI components - stateless or minimal state

```javascript
// Navigation.jsx - Header navigation
// HeroSection.jsx - Hero banner
// FeaturesSection.jsx - Features grid
// Footer.jsx - App footer
// Button.jsx - Reusable button component
// Card.jsx - Reusable card wrapper
```

### Pages (`src/pages/`)
Page-level components - compose multiple components

Example (create later):
```javascript
// Home.jsx - Landing page
// Chat.jsx - Chat interface
// Profile.jsx - User profile
```

### Hooks (`src/hooks/`)
Custom React hooks for shared logic

```javascript
// useAuth.js - Authentication logic
// useChat.js - Chat logic
// useFetch.js - Data fetching
```

### Services (`src/services/`)
API calls and external service integration

```javascript
// api.js - API configuration
// authService.js - Auth API calls
// chatService.js - Chat API calls
```

### Utils (`src/utils/`)
Helper functions and utilities

```javascript
// formatting.js - Date, text formatting
// validation.js - Form validation
// localStorage.js - Local storage helpers
```

### Constants (`src/constants/`)
Application constants - create later as needed

```javascript
// api.js - API endpoints
// config.js - App config
// messages.js - Message templates
```

### Context (`src/context/`)
Global state management - create later as needed

```javascript
// AuthContext.jsx - Auth state
// ChatContext.jsx - Chat state
```

### Assets (`src/assets/`)
Images, icons, fonts

```
assets/
├── images/
├── icons/
└── fonts/
```

## 🚀 Usage Patterns

### Using Components
```javascript
import Navigation from './components/Navigation'
import { Button, Card } from './components'

function App() {
  return (
    <>
      <Navigation />
      <Card>
        <Button>Click Me</Button>
      </Card>
    </>
  )
}
```

### Using Utils
```javascript
import { formatDate, isValidEmail } from './utils/formatting'
import { validateEmail } from './utils/validation'

const email = 'user@example.com'
if (isValidEmail(email)) {
  console.log('Valid email!')
}
```

### Using Hooks
```javascript
import { useAuth } from './hooks/useAuth'

function Login() {
  const { login, loading, error } = useAuth()
  
  const handleLogin = async (email, password) => {
    await login(email, password)
  }
}
```

### Using Services
```javascript
import api from './services/api'

async function fetchUser() {
  const user = await api.get('/user/profile')
  return user
}
```

## 📝 Import Best Practices

### ✅ Good
```javascript
import Navigation from '@/components/Navigation'
import { formatDate } from '@/utils/formatting'
import { useAuth } from '@/hooks/useAuth'
import api from '@/services/api'
```

### ❌ Avoid
```javascript
import Navigation from '../../components/Navigation'
import formatDate from '../utils/formatting'
```

**Note:** Setup path aliases (`@/`) in `vite.config.js` for cleaner imports:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
})
```

## 📚 Component Examples

### Button Component
```javascript
import Button from '@/components/Button'

// Usage
<Button variant="primary" size="md">
  Click Me
</Button>
```

### Card Component
```javascript
import Card from '@/components/Card'

// Usage
<Card hover={true} className="p-4">
  <h3>Card Title</h3>
</Card>
```

## 🔄 Data Flow Architecture

```
User Interaction
    ↓
Component Handler
    ↓
Custom Hook (useAuth, useChat)
    ↓
Service (api.js, authService.js)
    ↓
Context / State Update
    ↓
Component Re-render
```

## 🛠️ Next Steps

1. **Create folders** - Run mkdir commands above
2. **Move files** - Organize files into folders
3. **Update imports** - Fix import paths in components
4. **Setup aliases** - Add `@/` alias in vite.config.js
5. **Create .env** - Add API configuration
6. **Add pages** - Create page-level components as needed

## 📖 File Location Quick Reference

| Task | Location |
|------|----------|
| Create new component | `src/components/ComponentName.jsx` |
| Create new page | `src/pages/PageName.jsx` |
| Add utility function | `src/utils/utilName.js` |
| Add API endpoint | `src/services/api.js` |
| Add custom hook | `src/hooks/useHookName.js` |
| Add constant | `src/constants/constantName.js` |
| Add context | `src/context/ContextName.jsx` |

## ✨ Benefits of This Structure

✅ **Scalable** - Easy to add features  
✅ **Maintainable** - Clear separation of concerns  
✅ **Testable** - Components isolated and testable  
✅ **Professional** - Industry standard structure  
✅ **Team Ready** - Clear conventions for teams  
✅ **Performance** - Organized code loads faster  

---

For detailed architecture information, see `ARCHITECTURE.md`

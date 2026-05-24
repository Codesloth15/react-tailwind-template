# Chat App - Folder Structure & Architecture

## Directory Structure

```
chat-app/src/
│
├── components/                 # Reusable UI components
│   ├── Navigation.jsx         # Header/navigation bar
│   ├── Button.jsx             # Reusable button component
│   ├── Card.jsx               # Card component
│   └── Footer.jsx             # Footer component
│
├── pages/                      # Page-level components
│   ├── Home.jsx               # Home/landing page
│   ├── Chat.jsx               # Chat page (future)
│   └── Profile.jsx            # Profile page (future)
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.js             # Authentication hook
│   └── useChat.js             # Chat data hook
│
├── services/                   # API calls & external services
│   ├── api.js                 # API configuration
│   ├── authService.js         # Auth API calls
│   └── chatService.js         # Chat API calls
│
├── context/                    # Context API for state management
│   ├── AuthContext.jsx        # Auth state
│   └── ChatContext.jsx        # Chat state
│
├── constants/                  # Application constants
│   ├── api.js                 # API endpoints
│   ├── messages.js            # Message constants
│   └── config.js              # App configuration
│
├── utils/                      # Helper functions
│   ├── formatting.js          # Date/text formatting
│   ├── validation.js          # Form validation
│   └── localStorage.js        # Local storage helpers
│
├── assets/                     # Static files
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── styles/                     # Global styles
│   └── globals.css            # Global CSS (if needed beyond Tailwind)
│
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── index.css                   # Tailwind imports
```

## Architecture Layers

### 1. **Presentation Layer** (components/, pages/)
- Pure UI components
- No business logic
- Receive props, display content
- Handle user interactions

### 2. **Container Layer** (pages/)
- Page-level components
- Manage local state
- Connect to context/hooks
- Coordinate child components

### 3. **Logic Layer** (hooks/, context/)
- Custom hooks for reusable logic
- Context for global state
- Business logic separation

### 4. **Data Layer** (services/, constants/)
- API communication
- Data transformation
- Constants & configuration

### 5. **Utilities** (utils/)
- Helper functions
- Format, validate, parse
- Reusable utilities

## File Organization Principles

✅ **Single Responsibility** - Each file has one purpose
✅ **Reusability** - Components accept props, not hardcoded data
✅ **Scalability** - Easy to add features without modifying existing code
✅ **Maintainability** - Clear separation of concerns
✅ **Testability** - Easy to test in isolation

## Naming Conventions

- **Components**: PascalCase.jsx (e.g., Navigation.jsx)
- **Hooks**: camelCase with 'use' prefix (e.g., useAuth.js)
- **Utilities**: camelCase.js (e.g., formatting.js)
- **Context**: PascalCase + Context.jsx (e.g., AuthContext.jsx)
- **Services**: camelCase + Service.js (e.g., authService.js)

## Import/Export Patterns

### Component
```javascript
export default function Navigation() {
  return <nav>{...}</nav>
}
```

### Hook
```javascript
export function useAuth() {
  // hook logic
}
```

### Service
```javascript
export const authService = {
  login: async (credentials) => {...},
  logout: async () => {...}
}
```

## Data Flow

```
User Interaction
    ↓
Component Event Handler
    ↓
Custom Hook / Context Update
    ↓
Service/API Call
    ↓
State Update
    ↓
Component Re-render
```

## Future Features Integration

When adding new features:

1. **Create feature components** in `components/FeatureName/`
2. **Create feature page** in `pages/FeatureName/`
3. **Add custom hooks** if needed in `hooks/`
4. **Add services** for API calls in `services/`
5. **Add constants** in `constants/`
6. **Add utilities** in `utils/`

## State Management

### Local State (useState)
- Component-specific state
- Props for child components

### Context API (AuthContext, ChatContext)
- Global state (authentication, user data)
- Shared across multiple components

### Custom Hooks
- Reusable logic patterns
- Combine useState + context + side effects

## Benefits of This Structure

✅ **Clear Organization** - Easy to find files
✅ **Scalable** - Add features without chaos
✅ **Maintainable** - Clear responsibility
✅ **Testable** - Components isolated
✅ **Professional** - Industry standard
✅ **Team Ready** - Easy onboarding

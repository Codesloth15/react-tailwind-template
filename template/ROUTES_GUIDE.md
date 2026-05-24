# Routes Configuration Guide

This guide explains how to set up and use routing in your React Vite Tailwind application.

## Overview

Routes are defined in `src/routes.jsx` using React Router v6. This file contains all route configurations for your application.

## File Structure

```
src/
├── routes.jsx           # Main router configuration
├── pages/               # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── layouts/             # Layout components (optional)
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx
└── ...
```

## Installation

React Router is already included in `package.json`. Install dependencies:

```bash
npm install
```

## Basic Usage

### 1. Set Up Router in App.jsx

```javascript
import { RouterProvider } from 'react-router-dom'
import router from '@/routes'

export default function App() {
  return <RouterProvider router={router} />
}
```

### 2. Define Routes in src/routes.jsx

```javascript
import { createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'
import About from '@/pages/About'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
export default router
```

### 3. Create Page Components

**src/pages/Home.jsx**
```javascript
export default function Home() {
  return <div>Home Page</div>
}
```

## Route Examples

### Simple Route
```javascript
{
  path: '/about',
  element: <About />
}
```

### Nested Routes with Layout
```javascript
{
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: 'about',
      element: <About />
    }
  ]
}
```

### Dynamic Routes
```javascript
{
  path: '/user/:id',
  element: <UserDetail />
}
```

### Protected Routes
```javascript
{
  path: '/admin',
  element: <ProtectedRoute><Admin /></ProtectedRoute>,
  children: [...]
}
```

## Navigation

### Using Links
```javascript
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}
```

### Using useNavigate Hook
```javascript
import { useNavigate } from 'react-router-dom'

export default function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/about')
  }
  
  return <button onClick={handleClick}>Go to About</button>
}
```

## Advanced Patterns

### Route Groups (No Layout)
```javascript
{
  path: '/auth',
  children: [
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    }
  ]
}
```

### Error Boundary
```javascript
{
  path: '/',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [...]
}
```

### Lazy Loading Routes
```javascript
import { lazy } from 'react'

const About = lazy(() => import('@/pages/About'))

const routes = [
  {
    path: '/about',
    element: <Suspense fallback={<Loading />}><About /></Suspense>
  }
]
```

## Useful Hooks

### useNavigate
Navigate programmatically:
```javascript
const navigate = useNavigate()
navigate('/home')
navigate(-1) // Go back
```

### useLocation
Get current location:
```javascript
const location = useLocation()
console.log(location.pathname)
```

### useParams
Get route parameters:
```javascript
const { id } = useParams()
```

### useSearchParams
Get query parameters:
```javascript
const [searchParams] = useSearchParams()
const page = searchParams.get('page')
```

## Resources

- [React Router Documentation](https://reactrouter.com)
- [Route Configuration](https://reactrouter.com/en/main/start/overview)
- [Data APIs](https://reactrouter.com/en/main/start/data)

## Next Steps

1. Create your page components in `src/pages/`
2. Create layout components in `src/layouts/` (optional)
3. Add route definitions to `src/routes.jsx`
4. Use `<RouterProvider>` in your main `App.jsx`
5. Use `<Link>` or `useNavigate()` for navigation

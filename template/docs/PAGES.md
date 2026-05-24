# Pages

Full-page route components that represent different views/routes in your application.

## Purpose
The `pages/` folder contains complete page components that are rendered based on URL routes.

## What to Put Here
- `HomePage.jsx` - Landing/home page
- `DashboardPage.jsx` - Dashboard page
- `ProfilePage.jsx` - User profile page
- `NotFoundPage.jsx` - 404 error page
- `LoginPage.jsx` - Login/authentication page
- `SettingsPage.jsx` - Settings/preferences page
- `BlogPage.jsx` - Blog listing page
- `BlogPostPage.jsx` - Individual blog post page

## Guidelines
- Page components should be **large and complete**
- Import smaller components from `components/`
- Use hooks from `hooks/` for logic
- Can directly use Context values
- Handle routing and page-level state

## Example

```jsx
// pages/HomePage.jsx
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';

export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection title="Welcome" />
        {user && <p>Hello, {user.name}!</p>}
      </main>
      <Footer />
    </div>
  );
}
```

## Routing Setup

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

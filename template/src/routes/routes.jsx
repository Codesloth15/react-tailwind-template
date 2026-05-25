import { createBrowserRouter } from 'react-router-dom'

// Import auth pages
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import ForgotPassword from '@/pages/ForgotPassword'
import SplashScreen from '@/pages/SplashScreen'
import Home from '@/pages/Home'

// Import other pages
// import Home from '@/pages/Home'
// import About from '@/pages/About'
// import Contact from '@/pages/Contact'

// Import layouts
// import MainLayout from '@/layouts/MainLayout'

/**
 * Route Configuration
 * 
 * Define all routes for your application here.
 * Routes are organized by layout and feature.
 */
const routes = [
  {
    path: '/',
    element: <SplashScreen />,
    meta: { title: 'Splash' }
  },

  // Auth Routes
  {
    path: '/login',
    element: <Login />,
    meta: { title: 'Login' }
  },
  {
    path: '/signup',
    element: <Signup />,
    meta: { title: 'Sign Up' }
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    meta: { title: 'Forgot Password' }
  },
  {
    path: '/home',
    element:<Home/>,
    meta:{title: 'Home'}
  }
  // Admin Routes (Uncomment to use)
  // {
  //   path: '/admin',
  //   element: <AdminLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Dashboard />
  //     },
  //     {
  //       path: 'users',
  //       element: <Users />
  //     },
  //     {
  //       path: 'settings',
  //       element: <Settings />
  //     }
  //   ]
  // },

  // Catch-all 404 route (optional)
  // {
  //   path: '*',
  //   element: <NotFound />
  // }
]

/**
 * Create the router with configuration
 */
export const router = createBrowserRouter(routes)

export default router

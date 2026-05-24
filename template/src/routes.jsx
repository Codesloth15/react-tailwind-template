import { createBrowserRouter } from 'react-router-dom'

// Import pages
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
    // element: <MainLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      //   meta: { title: 'Home' }
      // },
      // {
      //   path: 'about',
      //   element: <About />,
      //   meta: { title: 'About' }
      // },
      // {
      //   path: 'contact',
      //   element: <Contact />,
      //   meta: { title: 'Contact' }
      // }
    ]
  },

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

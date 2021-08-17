import React from 'react';
const routes = [
  // {
  //   path: '/',
  //   component: React.lazy(() => import('pages/Home/HomePage')),
  //   exact: true
  // },
  {
    path: '/',
    component: React.lazy(() => import('pages/Chat/Chat')),
    exact: true
  },
  {
    path: '/login',
    component: React.lazy(() => import('pages/Auth/Login')),
    exact: true
  },
  // {
  //   path: '/chat',
  //   component: React.lazy(() => import('pages/Chat/Chat')),
  //   exact: true
  // },
  {
    path: '*',
    component: React.lazy(() => import('pages/NotFound')),
    exact: true
  }
]

export default routes;

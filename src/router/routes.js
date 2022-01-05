const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      {path: '', redirect: '/dashboard'},
      {
        path: 'dashboard',
        components: {
          default: () => import('pages/Dashboard'),
          drawer: () => import('layouts/drawers/MainDrawer'),
          header: () => import('layouts/headers/MainHeader'),
        }
      },
      {
        path: 'hid',
        components: {
          default: () => import('pages/HidMonitor'),
          drawer: () => import('layouts/drawers/MainDrawer'),
          header: () => import('layouts/headers/MainHeader'),
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFound.vue')
  }
]

export default routes

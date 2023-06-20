import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard' },
      {
        path: 'dashboard',
        components: {
          header: () => import('layouts/headers/MainHeader.vue'),
          leftDrawer: () => import('layouts/drawers/LeftMainDrawer.vue'),
          default: () => import('pages/DashboardPage.vue'),
          rightDrawer: () => import('layouts/drawers/RightMainDrawer.vue'),
        }
      },
      {
        path: 'bluetooth',
        components: {
          header: () => import('layouts/headers/MainHeader.vue'),
          leftDrawer: () => import('layouts/drawers/LeftMainDrawer.vue'),
          default: () => import('pages/BluetoothPage.vue'),
          rightDrawer: () => import('layouts/drawers/RightMainDrawer.vue'),
          footer: () => import('layouts/footers/BluetoothFooter.vue'),
        }
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

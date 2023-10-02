import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/FooterLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/Register',
    component: () => import('layouts/FooterLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
  {
    path: '/History',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistoryPage.vue') }],
  },
  {
    path: '/Groups',
    component: () => import('layouts/FooterLayout.vue'),
    children: [{ path: '', component: () => import('pages/GroupsPage.vue') }],
  },
  {
    path: '/User',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/UserPage.vue') }],
  },
  {
    path: '/CreateGroup',
    component: () => import('layouts/FooterLayout.vue'),
    children: [{ path: '', component: () => import('pages/CreateGroup.vue') }],
  },
  {
    path: '/Edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/EditPage.vue') }],
  },
  {
    path: '/Notifications',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NotificationsPage.vue') },
    ],
  },
  {
    path: '/Inactive-users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/inactiveUsersPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

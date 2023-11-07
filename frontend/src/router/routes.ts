import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/FooterLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/register',
    component: () => import('layouts/FooterLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
  {
    path: '/register-group',
    component: () => import('layouts/FooterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RegisterGroupPage.vue') },
    ],
  },
  {
    path: '/history',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HistoryPage.vue') }],
  },
  {
    path: '/notifications',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NotificationsPage.vue') },
    ],
  },
  {
    path: '/data',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/EditPage.vue') }],
  },
  {
    path: '/groups',
    component: () => import('layouts/FooterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GroupChoicePage.vue') },
    ],
  },
  {
    path: '/inactives',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/InactiveUsersPage.vue') },
    ],
  },
   {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserPage.vue') },
    ],
  },
    {
    path: '/password',
    component: () => import('layouts/FooterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PasswordPage.vue') },
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

import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/Home",
    component: () => import("pages/IndexPage.vue"),
  },
  {
    path: "/",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/Register",
    component: () => import("pages/RegisterPage.vue"),
  },
  {
    path: "/History",
    component: () => import("pages/HistoryPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  //comentario
];

export default routes;

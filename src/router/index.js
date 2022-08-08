import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/teammanagement',
    name: 'teammanagement',
    component: () => import('../views/TeamManagement.vue'),
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/TeamView.vue'),
  },
  {
    path: '/trashbin',
    name: 'trashbin',
    component: () => import('../views/ProjectTrashBin.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('../views/ProjectViews/ProjectMainView.vue'),
  },
  {
    path: '/personcenter',
    name: 'personcenter',
    component: () => import('../views/PersonCenter.vue'),
  },
  {
    path: '/prototypelist',
    name: 'prototypelist',
    component: () => import('../views/ProjectViews/PrototypeListView.vue'),
  },
  {
    path: '/prototype',
    name: 'prototype',
    component: () => import('../views/PrototypeViews/PrototypeMainView.vue'),
  },
  {
    path: '/file',
    name: 'file',
    component: () => import('../views/ProjectViews/FileView.vue'),
  },
  {
    path: '/fileedit',
    name: 'fileedit',
    component: () => import('../views/FileEditView.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;

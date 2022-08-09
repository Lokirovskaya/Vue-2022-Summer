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
    path: '/file',
    name: 'file',
    component: () => import('../views/ProjectViews/FileView.vue'),
  },
  {
    path: '/fileedit',
    name: 'fileedit',
    component: () => import('../views/FileEditView.vue'),
  },
  {
    path: '/doccenter',
    name: 'doccenter',
    component: () => import('../views/DocCenterView.vue'),
  },
  // 它们被做成组件了，丧失路由权了呜呜呜
  // {
  //   path: '/prototypelist',
  //   name: 'prototypelist',
  //   component: () => import('../views/PrototypeViews/PrototypeList.vue'),
  // },
  // {
  //   path: '/prototype',
  //   name: 'prototype',
  //   component: () => import('../views/PrototypeViews/PrototypeEdit.vue'),
  // },
  {
    path: '/protopreview',
    name: 'protopreview',
    component: () => import('../views/PrototypeViews/PrototypePreview.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import { loadable } from '@/utils';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/home')
  },
  {
    path: '/course',
    name: 'course',
    component: loadable(()=>import('@/views/course'))
  },
  {
    path: '/mine',
    name: 'mine',
    component: loadable(()=>import('@/views/mine'))
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router

// router.ts
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// Импорт компонентов
import Home from '../pages/Home.vue';
import Characters from '../pages/Characters.vue';
import Items from '../pages/Items.vue';
import ItemCard from '../pages/ItemCard.vue';
import Assembles from '../pages/Assembles.vue';
import Favorites from '../pages/Favorites.vue';

import PersonCard from '../pages/PersonCard.vue';
import PersonAssembles from '../pages/PersonAssembles.vue';
import AssemblesCard from '../pages/AssemblesCard.vue';
import AssemblesCreate from '../pages/AssemblesCreate.vue';

import NotFound from '../pages/NotFound.vue';

import Register from '../pages/User/Register.vue';
import Login from '../pages/User/Login.vue';

// Определение маршрутов
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/Characters',
    name: 'Characters',
    component: Characters,
    meta: {
      title: 'Characters',
    },
  },
  {
    path: '/PersonCard/:id',
    name: 'PersonCard',
    component: PersonCard,
    meta: {
      title: 'PersonCard',
    },
  },
  {
    path: '/Items',
    name: 'Items',
    component: Items,
    meta: {
      title: 'Items',
    },
  },
  {
    path: '/ItemCard/:id',
    name: 'ItemCard',
    component: ItemCard,
    meta: {
      title: 'ItemCard',
    },
  },
  {
    path: '/Assembles',
    name: 'Assembles',
    component: Assembles,
    meta: {
      title: 'Assembles',
    },
  },
  {
    path: '/AssemblesCard/:id',
    name: 'AssemblesCard',
    component: AssemblesCard,
    meta: {
      title: 'AssemblesCard',
    },
  },
  {
    path: '/AssemblesCreate/:id',
    name: 'AssemblesCreate',
    component: AssemblesCreate,
    meta: {
      title: 'AssemblesCreate',
    },
  },
  {
    path: '/PersonAssembles/:id',
    name: 'PersonAssembles',
    component: PersonAssembles,
    meta: {
      title: 'PersonAssembles',
    },
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    component: Favorites,
    meta: {
      title: 'Favorites',
    },
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register',
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: '404 Not Found',
    },
  },
];

// Настройка маршрутизатора
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Экспорт маршрутизатора
export default router;
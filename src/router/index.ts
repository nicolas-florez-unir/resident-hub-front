import { defineRouter } from '#q-app/wrappers';
import type { RouteRecordRaw } from 'vue-router';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import authRoutes, { PublicRoutesName } from './auth-routes';
import privateRoutes, { PrivateRoutesName } from 'src/router/private-routes'; // Importa las rutas privadas
import { useAuthStore } from 'src/modules/common/infrastructure/stores/auth.store';
import ErrorNotFound from 'src/modules/common/infrastructure/ui/pages/ErrorNotFound.vue';
import UnknownErrorPage from 'src/modules/common/infrastructure/ui/pages/UnknownErrorPage.vue';
import { UserRole } from 'src/modules/user/domain/enums';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: PublicRoutesName.Login }, // Redirige a la página de login por defecto
  },
  {
    path: '/',
    children: authRoutes,
    meta: { requiresGuest: true },
  },
  {
    path: '',
    meta: { requiresAuth: true },
    children: privateRoutes,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: ErrorNotFound,
  },
  {
    path: '/unknown-error',
    name: 'unknown-error',
    component: UnknownErrorPage,
  },
];

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

export default defineRouter(function (/* { store, ssrContext } */) {
  Router.beforeEach((to, from, next) => {
    const store = useAuthStore();

    // Si la ruta es privada y no está autenticado, redirige a login
    if (to.meta.requiresAuth && !store.isAuthenticated) {
      next({ name: PublicRoutesName.Login });
      return;
    }

    // Si la ruta tiene roles definidos, verifica si el usuario tiene el rol adecuado
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = store.user?.getRole();
      if (!userRole || !to.meta.roles.includes(userRole)) {
        // Si el usuario no tiene el rol adecuado, redirige a una página de error
        next({ name: 'not-found' });
        return;
      }
    }

    // Si la ruta es solo para invitados y está autenticado, redirige al dashboard
    if (to.meta.requiresGuest && store.isAuthenticated) {
      next({
        name:
          store.user?.getRole() === UserRole.Administrator
            ? PrivateRoutesName.Admin
            : PrivateRoutesName.OwnerHomePage,
      });
      return;
    }

    next(); // Permitir la navegación
  });

  return Router;
});

export { Router };

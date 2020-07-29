import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import('@/views/Auth.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('@/views/Projects.vue')
      },
      {
        path: '/projects/:id/details',
        name: 'projects-details',
        component: () => import('@/views/ProjectDetails.vue')
      },
      {
        path: '/projects/:idIssue/issue',
        name: 'issue-details',
        component: () => import('@/views/IssueDetails.vue')
      },
      {
        path: '/issues',
        name: 'issues',
        component: () => import('@/views/Issues.vue')
      },
      {
        path: '/issues/new-issue',
        name: 'new-issues',
        component: () => import('@/views/NewIssues.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuth']) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;

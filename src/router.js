import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersList from './pages/UsersList.vue';
import UsersFooter from './pages/UsersFooter.vue';
import NotFound from './pages/NotFound.vue';

const router = new createRouter({
  history: createWebHistory(), // using the browser supported history
  routes: [
    { path: '/', redirect: '/teams' },
    // or
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      // component: TeamsList,
      components: { default: TeamsList, footer: TeamsFooter },
      // nested routes, won't go to a 'new page'
      // TeamList will need a router-view in order that the child get reached
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true, // 'teamId' is seen as a prop now
        },
      ],
      // this
      // alias: '/', // meaning that both routes lead to the same component
    },
    // check about route priority

    {
      path: '/users',
      // component: UsersList,
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log('users before enter');
        console.log(to, from);

        next();
      },
    },
    // for nonsense entered at the path
    // needs to be at the end to not overwrite the existing routes
    // use a component or a redirect
    { path: '/:notFound(.*)', component: NotFound },
  ],
  // for link styles, "active" will overite the default name "router-link-active"
  linkActiveClass: 'active',
  // nice for user experience
  scrollBehavior(_, _2, savedPosition) {
    // console.log('to ', to, 'from ', from, 'saved position ', savedPosition);

    // goes to the exact point where it was when going back
    // OR scrolls all the way to the top
    return savedPosition
      ? savedPosition
      : {
          left: 0,
          top: 0,
        };
  },
});

// Navigation Guards
router.beforeEach(function (to, from, next) {
  console.log('Global before each');

  console.log(to, from);

  // if (to.meta.needsAuth) {
  //   console.log('Needs auth!');
  //   next();
  // } else {
  //   // redirect somewhere else in case it is not authenticated to access the route;
  //   next();
  // }

  // next(false); cancels the navigation
  // can also receive an object next({ name: 'team-members', params: { teamId: 't2' }});
  // but would create an infinite loop, so check if it alread is in that path already;
  next();
});

router.afterEach(function (to, from) {
  // sending analytics data
  console.log('Global after each');
  console.log(to, from);
});

export default router;

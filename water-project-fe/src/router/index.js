import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import store from '@/store';
import { message } from 'ant-design-vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    redirect:'/auth',
    component: () => import(/* webpackChunkName: "layout" */ '../layout/BasicLayout/index.vue'),
    children:[
      {
        path: 'orders',
        name: 'orders',
        component: () => import(/* webpackChunkName: "order" */ '../views/Orders/index.vue'),
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import(/* webpackChunkName: "goods" */ '../views/Goods/index.vue'),
      },
      {
        path: 'goods/:id',
        name: 'GoodDetail',
        component: () => import(/* webpackChunkName: "GoodDetail" */ '../views/GoodDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
      {
        path: 'reset/password',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '../views/ResetPassword/index.vue'),
      },
      {
        path: 'invite-code',
        name: 'inviteCode',
        component: () => import(/* webpackChunkName: "inviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path: 'good-classify',
        name: 'goodClassify',
        component: () => import(/* webpackChunkName: "goodClassify" */ '../views/GoodClassify/index.vue'),
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import(/* webpackChunkName: "Message" */ '../views/message/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
      },
      // {
      //   path: 'users',
      //   name: 'users',
      //   component: () => import(/* webpackChunkName: "order" */ '../views/Users/index.vue'),
      // },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  let res = {};

  try {
    res = await user.info();
  } catch (e) {
    
    if (e.message.includes('code 401')) {
      res.code = 401;
    }
  }

  const { code } = res;

  if (code === 401) {
    if (to.path === '/auth') {
      next();
      return;
    }

    message.error('认证失败，请重新登入');
    next('/auth');

    return;
  }

  if (!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo');
  }

  //const reqArr = [];

  if (!store.state.userInfo.account) {
    await store.dispatch('getUserInfo')
  }

  if (!store.state.goodClassify.length) {
    await store.dispatch('getGoodClassify')
  }

  //await Promise.all(reqArr);

  if (to.path === '/auth') {
    next('/orders');
    return;
  }

  next();
});
// router.beforeEach(async (to,from,next)=>{

//  // const reqArr = [];
//   if(!store.state.characterInfo.length){
    
//     await store.dispatch('getCharacterInfo')

//   }

//   if(!store.state.userInfo.account){
//      await store.dispatch('getUserInfo')
//   }
  
//   await store.dispatch('getGoodClassify')
//  // await Promise.all(reqArr)
  
//    next();
// })
export default router;

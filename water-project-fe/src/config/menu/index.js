import _ from '../common';

export default [
  {
    title: '首页',
    url: '/dashboard',
  },
  {
    title: '订单管理',
    url: '/orders',
    onlyAdmin: false,
  },
  {
    title: '商品管理',
    url: '/goods',
    onlyAdmin: true,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
  },
    {
    title: '日志管理',
    url: '/log',
    onlyAdmin: true,
  },
  {
    title: '其它功能',
    onlyAdmin: false,
    children: [
      {
        title: '重制密码列表',
        url: '/reset/password',
        onlyAdmin: true,
      },
      {
        title: '邀请码管理',
        url: '/invite-code',
        onlyAdmin: true,
      },
	   {
        title: '商品分类管理',
        url: '/good-classify',
        onlyAdmin: true,
      },
      {
        title: '消息管理',
        url: '/message',
        onlyAdmin: true,
      },
    ],
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: false,
  },
];

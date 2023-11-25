export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user/register',
        name: 'register',
        icon: 'smile',
        component: './user/register',
      },
      {
        icon: 'smile',
        name: 'register.result',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        menuRender: false,
        component: '404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        name: 'monitor',
        // menuRender: false,
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  {
    path: '/form',
    icon: 'form',
    name: 'form',
    routes: [
      {
        name: 'basic-form',
        icon: 'smile',
        path: '/form/basic-form',
        component: './form/basic-form',
      },
      {
        name: 'step-form',
        icon: 'smile',
        path: '/form/step-form',
        component: './form/step-form',
      },
      {
        name: 'advanced-form',
        icon: 'smile',
        path: '/form/advanced-form',
        component: './form/advanced-form',
      },
    ],
  },
  {
    path: '/list',
    icon: 'table',
    name: 'list',
    routes: [
      {
        path: '/list/search',
        name: 'search-list',
        component: './list/search',
        routes: [
          {
            name: '文章',
            icon: 'smile',
            path: '/list/search/articles/1',
          },
          {
            path: '/list/search/articles/:id',
            component: './list/search/articles',
          },
          {
            name: '项目',
            icon: 'smile',
            path: '/list/search/projects',
          },
          {
            path: '/list/search/projects/:id',
            component: './list/search/projects',
          },
          {
            name: '应用',
            icon: 'smile',
            path: '/list/search/applications/1',
          },
          {
            path: '/list/search/applications/:id',
            component: './list/search/applications',
          },
        ],
      },
      {
        name: 'list1',
        icon: 'smile',
        path: '/list/table-list1',
        component: './list/table-list1',
      },
      {
        name: 'list2',
        icon: 'smile',
        path: '/list/table-list2',
        component: './list/table-list2',
      },
      {
        name: 'list3',
        icon: 'smile',
        path: '/list/table-list3',
        component: './list/table-list3',
      },
      {
        name: 'list4',
        icon: 'smile',
        path: '/list/table-list4',
        component: './list/table-list4',
      },
      {
        name: 'list9',
        icon: 'smile',
        path: '/list/backend',
        redirect: '/list/backend/1',
      },
      {
        name: '',
        icon: 'smile',
        path: '/list/backend/:id',
        menuRender: false, // 不渲染菜单
        component: './list/list',
      },
      {
        name: 'list5',
        icon: 'smile',
        path: '/list/template',
        redirect: '/list/template/1',
      },
      {
        name: '',
        icon: 'smile',
        path: '/list/template/:id',
        menuRender: false, // 不渲染菜单
        component: './list/list',
      },
      {
        name: 'list8',
        icon: 'smile',
        path: '/list/type',
        redirect: '/list/type/1',
      },
      {
        name: '',
        icon: 'smile',
        path: '/list/type/:id',
        menuRender: false, // 不渲染菜单
        component: './list/list',
      },
      {
        name: 'list7',
        icon: 'smile',
        path: '/list/field',
        redirect: '/list/field/1',
      },
      {
        name: '',
        icon: 'smile',
        path: '/list/field/:id',
        menuRender: false, // 不渲染菜单
        component: './list/list',
      },
      {
        name: 'list6',
        icon: 'smile',
        path: '/list/data',
        redirect: '/list/data/1',
      },
      {
        name: '',
        icon: 'smile',
        path: '/list/data/:id',
        menuRender: false, // 不渲染菜单
        component: './list/list',
      },
      {
        name: 'basic-list',
        icon: 'smile',
        path: '/list/basic-list',
        component: './list/basic-list',
      },
      {
        name: 'card-list',
        icon: 'smile',
        path: '/list/card-list',
        component: './list/card-list',
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    icon: 'profile',
    routes: [
      {
        name: 'basic',
        icon: 'smile',
        path: '/profile/basic',
        component: './profile/basic',
      },
      {
        name: 'advanced',
        icon: 'smile',
        path: '/profile/advanced',
        component: './profile/advanced',
      },
    ],
  },
  {
    name: 'result',
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
      {
        name: 'success',
        icon: 'smile',
        path: '/result/success',
        component: './result/success',
      },
      {
        name: 'fail',
        icon: 'smile',
        path: '/result/fail',
        component: './result/fail',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    name: 'editor',
    icon: 'highlight',
    path: '/editor',
    routes: [
      {
        name: 'flow',
        icon: 'smile',
        path: '/editor/flow',
        component: './editor/flow',
      },
      {
        name: 'mind',
        icon: 'smile',
        path: '/editor/mind',
        component: './editor/mind',
      },
      {
        name: 'koni',
        icon: 'smile',
        path: '/editor/koni',
        component: './editor/koni',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard/analysis',
  },
  {
    menuRender: false,
    component: '404',
  },
];

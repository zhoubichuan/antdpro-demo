import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { list as listRequest } from './pages/list/search/service';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
export const initialStateConfig = {
  loading: <PageLoading />,
};
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

export const request: RequestConfig = {
  errorHandler: (error: any) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  },
  requestInterceptors: [
    (url, options) => {
      let headers = {};
      // history.location.pathname !== loginPath ||
      if (!url.includes('user/login')) {
        headers = {
          ...options.headers,
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        };
      }
      return {
        url: (localStorage.antdprourl || 'http://localhost:7001') + url,
        options: { ...options, headers },
      };
    },
  ],
  responseInterceptors: [
    async (response) => {
      const res = await response.clone().json(); //这里是关键，获取所有接口请求成功之后的数据
      if (res?.result) {
        const { sacpresult, sucess } = res.result;
        if (sucess) {
          return sacpresult;
        } else {
          console.error(res.result.sacpinfo || 'Error');
        }
      }
      return response;
    },
  ],
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    siderWidth: 250,
    isChildrenLayout: true,
    openKeys: false,
    collapsedButtonRender: false,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => (location.href.includes('dashboard/analysis') ? <Footer /> : []),
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && !location.pathname.includes('/user/')) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    menu: {
      locale: false,
      autoClose: true,
      params: initialState,
      request: async (params, defaultMenuData) => {
        const result: any = await listRequest('page/1', {}, {});
        let routes: any = [
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
              ...result.data.map((i: any,index:any) => ({
                name: i.name,
                path: '/list/' + i.type + '/1',
              })),
              {
                name: '',
                icon: 'smile',
                path: '/list/backend/:id',
                menuRender: false, // 不渲染菜单
                component: './list/list',
              },
              {
                name: '',
                icon: 'smile',
                path: '/list/tab/:id',
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
        return Promise.resolve(routes);
      },
    },
  };
};

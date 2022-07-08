// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {

          name: 'login',
          // path: '/ourlogin',
          // component: './OurLogin',
          // layout: false,
          component: './user/Login',
          path: '/user/login',
          layout: false,
        },
        {
          path: '/user',
          // redirect: '/ourlogin',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      icon: 'home',
      component: './Home/index',
    },
    {
      path: '/profile',
      name: 'profile',
      icon: 'profile',
      hideInMenu: true,
      routes: [
        {
          path: '/profile',
          redirect: '/profile/basic',
        },
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
      hideInMenu: true,
      routes: [
        {
          path: '/result',
          redirect: '/result/success',
        },
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
      name: 'exception',
      icon: 'warning',
      path: '/exception',
      hideInMenu: true,
      routes: [
        {
          path: '/exception',
          redirect: '/exception/403',
        },
        {
          name: '403',
          icon: 'smile',
          path: '/exception/403',
          component: './exception/403',
        },
        {
          name: '404',
          icon: 'smile',
          path: '/exception/404',
          component: './exception/404',
        },
        {
          name: '500',
          icon: 'smile',
          path: '/exception/500',
          component: './exception/500',
        },
      ],
    },
    {
      name: 'account',
      icon: 'user',
      path: '/account',
      hideInMenu: true,
      routes: [
        {
          path: '/account',
          redirect: '/account/center',
        },
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
      name: 'entrustment',
      icon: 'edit',
      path: '/entrustment',
      routes: [
        {
          path: '/entrustment',
          redirect: '/entrustment/list',
        },
        {
          name: 'display',
          icon: 'smile',
          path: '/entrustment/display',
          component: './pageViewer/EntrustmentViewer',
          hideInMenu: true,
        },
        {
          name: 'list',
          icon: 'smile',
          path: '/entrustment/list',
          component: './EntrustmentList',
        },
        {
          name: 'fill',
          icon: 'smile',
          path: '/entrustment/fill',
          component: './EntrustmentFill',
          hideInMenu: true,
        },
        {
          name: 'fill',
          icon: 'smile',
          path: '/entrustment/fill/',
          component: './EntrustmentFill',
        },
        {
          name: 'assign',
          icon: 'smile',
          path: '/entrustment/assign',
          component: './Assign',
          hideInMenu: true,
        },
        {
          name: 'fill',
          icon: 'smile',
          path: '/entrustment/quotation/fill',
          component: './QuotationFill',
          hideInMenu: true,
        },
        {
          name: 'display',
          icon: 'smile',
          path: '/entrustment/quotation/display',
          component: './QuotationDisplay',
          hideInMenu: true,
        },
        {
          name: 'accept',
          icon: 'smile',
          path: '/entrustment/quotation/accept',
          component: './QuotationAccept',
          hideInMenu: true,
        },
        {
          name: 'verify',
          icon: 'smile',
          path: '/entrustment/verify',
          component: './EntrustmentVerify',
          hideInMenu: true,
        },
        {
          name: 'ducumentVerify',
          icon: 'smile',
          path: '/entrustment/documentVerify',
          component: './DocumentVerify',
          hideInMenu: true,
        },
      ],
    },
    {
      name: 'test',
      icon: 'experiment',
      path: '/test',
      redirect: '/test/list'
    },
    {
      name: 'test',
      icon: 'edit',
      path: '/test',
      hideInMenu: true,
      routes: [
        {
          name: 'testassign',
          icon: 'smile',
          path: '/test/assign',
          component: './TestAssign',
          hideInMenu: true,
        },
        {
          name: 'list',
          icon: 'smile',
          path: '/test/list',
          component: './TestList',
        },
        {
          name: 'verify',
          icon: 'smile',
          path: '/test/verify',
          component: './testingTable/JS013',
          hideInMenu: true,
        },
        {
          name: 'js007',
          icon: 'smile',
          path: '/test/report',
          component: './testingTable/JS007',
          hideInMenu: true,
        },
        {
          name: 'reportDisplay',
          icon: 'smile',
          path: '/test/reportDisplay',
          component: './pageViewer/JS007Display',
          hideInMenu: true,
        },
        {
          name: 'js012',
          icon: 'smile',
          path: '/test/workcheck',
          component: './testingTable/JS012',
          hideInMenu: true,
        },
        {
          name: 'js008',
          icon: 'smile',
          path: '/test/testCase',
          component: './testingTable/JS008',
          hideInMenu: true,
        },
        {
          name: 'testcaseDisplay',
          icon: 'smile',
          path: '/test/testcaseDisplay',
          component: './pageViewer/JS008Display',
          hideInMenu: true,
        },
        {
          name: 'js009',
          icon: 'smile',
          path: '/test/testRecord',
          component: './testingTable/JS009',
          hideInMenu: true,
        },
        {
          name: 'testRecordDisplay',
          icon: 'smile',
          path: '/test/testRecordDisplay',
          component: './pageViewer/JS009Display',
          hideInMenu: true,
        },
        {
          name: 'js011',
          icon: 'smile',
          path: '/test/testIssue',
          component: './testingTable/JS011',
          hideInMenu: true,
        },
        {
          name: 'testIssueDisplay',
          icon: 'smile',
          path: '/test/testIssueDisplay',
          component: './pageViewer/JS011Display',
          hideInMenu: true,
        },
        {
          name: 'test scheme',
          icon: 'smile',
          path: '/test/scheme',
          component: './testingTable/JS006',
          hideInMenu: true,
        },
        {
          name: 'js010',
          icon: 'smile',
          path: '/test/reportcheck',
          component: './testingTable/JS010',
          hideInMenu: true,
        },
        {
          name: 'docdisplay',
          icon: 'smile',
          path: '/test/docview',
          component: './DocDisplay',
          hideInMenu: true,
        },
        {
          name: 'docverify',
          icon: 'smile',
          path: '/test/docver',
          component: './DocVerify',
          hideInMenu: true,
        },
        {
          name: 'repoverify',
          icon: 'smile',
          path: '/test/repover',
          component: './RepoVerify',
          hideInMenu: true,
        },
        {
          name: 'documents',
          icon: 'smile',
          path: '/test/documents',
          component: './Documents',
          hideInMenu: true,
        },
        {
          name: 'test scheme view',
          path: '/test/schemeview',
          component: './pageViewer/JS006',
          hideInMenu: true,
        },
        {
          name: 'rvupload',
          icon: 'smile',
          path: '/test/rvupload',
          component: './uploads/RepoVerUpload',
          hideInMenu: true,
        },
        {
          name: 'rvdownload',
          icon: 'smile',
          path: '/test/rvdownload',
          component: './downloads/RepoVerDownload',
          hideInMenu: true,
        },
        {
          name: 'svupload',
          icon: 'smile',
          path: '/test/svupload',
          component: './uploads/ScheVerUpload',
          hideInMenu: true,
        },
        {
          name: 'svdownload',
          icon: 'smile',
          path: '/test/svdownload',
          component: './downloads/ScheVerDownload',
          hideInMenu: true,
        },
      ],
    },
    {
      name: 'sample',
      icon: 'save',
      path: '/sample',
      redirect: '/sample/list',
    },
    {
      name: 'sample',
      icon: 'highlight',
      path: '/sample',
      hideInMenu: true,
      routes: [
        {
          name: 'list',
          icon: 'smile',
          path: '/sample/list',
          component: './SampleList',
          hideInMenu: true,
        },
        {
          name: 'fill',
          icon: 'smile',
          path: '/sample/fill',
          component: './SampleFill',
          hideInMenu: true,
        },
        {
          name: 'display',
          icon: 'smile',
          path: '/sample/display',
          component: './SampleDisplay',
          hideInMenu: true,
        },
      ]
    },
    {
      path: '/progress',
      component: './Progress',
      hideInMenu: true,
    },
    {
      name: 'contract',
      icon: 'highlight',
      path: '/contract',
      hideInMenu: true,
      routes: [
        {
          path: '/contract',
          redirect: '/contract/display',
        },
        {
          name: 'fill',
          icon: 'smile',
          path: '/contract/fill',
          component: './ContractFill',
        },
        {
          name: 'display',
          icon: 'smile',
          path: '/contract/display',
          component: './ContractDisplay',
        },
        {
          name: 'review',
          icon: 'smile',
          path: '/contract/verify',
          component: './ContractVerify',
        },
        {
          name: 'upload',
          icon: 'smile',
          path: '/contract/upload',
          component: './ContractUpload',
        },
        {
          name: 'download',
          icon: 'smile',
          path: '/contract/download',
          component: './downloads/ContractDownload',
        },
      ],
    },
    // {
    //   name: 'ourlogin',
    //   icon: 'team',
    //   path: '/ourlogin',
    //   component: './OurLogin',
    //   hideInMenu: true,
    // },
    {
      name: 'download',
      icon: 'team',
      path: '/download',
      component: './Download',
      hideInMenu: true,
    },
    {
      name: 'userinfo',
      icon: 'user',
      path: '/userinfo',
      component: './UserInfo',
      hideInMenu: true,
    },
    // {
    //   path: '/signup',
    //   component: './SignUp',
    // },
    {
      path: '/',
      redirect: '/home',
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: "南大在线测试平台",
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  resolve: { includes: ['docs'] },
  mode: "site",
  logo: "/01.png",
  // config now
  // menus: {
  //   // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
  //   '/': [
  //     {
  //       title: '菜单项',
  //       path: '菜单路由（可选）',
  //       children: [
  //         // 菜单子项（可选）
  //         'index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
  //       ],
  //     },
  //   ],
  // },
  navs: [
    null,
    { title: 'GitHub', path: 'https://github.com/umijs/dumi' },
    { title: '更新日志', path: 'https://github.com/umijs/dumi/releases' },
  ],


});

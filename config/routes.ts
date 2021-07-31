export default [
  {
    path: '/sysrole/init.do',
    name: 'sysrole',
    component: './sysrole/init',
  },
  {
    path: '/sysuser/init.do',
    name: 'sysuser',
    component: './sysuser/init',
  },
  {
    path: '/sysmenu/init.do',
    name: 'sysmenu',
    component: './sysmenu/init',
  },
  {
    path: '/sysProperty/init.do',
    name: 'sysProperty',
    component: './sysProperty/init',
  },
  {
    path: '/syslookuptype/init.do',
    name: 'syslookuptype',
    component: './syslookuptype/init',
  },
  {
    path: '/statistics/banliinit.do',
    name: 'banliinit',
    component: './statistics/banliinit',
  },
  {
    path: '/statistics/bjlmyldepinit.do',
    name: 'bjlmyldepinit',
    component: './statistics/bjlmyldepinit',
  },
  {
    path: '/statistics/chaoqiinit.do',
    name: 'chaoqiinit',
    component: './statistics/chaoqiinit',
  },
  {
    path: '/statistics/chartinit.do',
    name: 'chartinit',
    component: './statistics/chartinit',
  },
  {
    path: '/statistics/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './statistics/tuiweiinit',
  },
  {
    path: '/question/toedit.do',
    name: 'toedit',
    component: './question/toedit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/question/tuiweiinit.do',
    name: 'tuiweiinit',
    component: './question/tuiweiinit',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },

];

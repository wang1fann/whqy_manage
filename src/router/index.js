import Vue from 'vue'
import Router from 'vue-router'
import Menu from 'view/Menu'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['view/usersManage/Login'], resolve)
Vue.use(Router)

let router = new Router({
  mode: 'history', //去掉了地址栏的/#，使得看起来美观
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Menu,
      children: [{
          path: '/rightsManage',
          name: '权限管理',
          component: resolve => {
            require(['view/rightsManage/rightsList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/rights.png')
        },
        {
          path: '/usersManage',
          name: '用户管理',
          component: resolve => {
            require(['view/usersManage/userList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/user.png')

        },
        {
          path: '/contentManage',
          name: '内容管理',
          component: resolve => {
            require(['view/contentManage/ContentList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/content.png')

        },
        {
          path: '/siteManage',
          name: '站点管理',
          component: resolve => {
            require(['view/siteManage/siteList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/site.png')
        },
        {
          path: '/bannerManage',
          name: '栏目管理',
          component: resolve => {
            require(['view/bannerManage/pageBannerList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/banner.png')
        },
        {
          path: '/dataCopy',
          name: '数据备份',
          component: resolve => {
            require(['view/dataCopy/dataCopyList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/data.png')
        },
        {
          path: '/visitCount',
          name: '访问统计',
          component: resolve => {
            require(['view/visitCount/visitCountList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/access.png')
        },
        {
          path: '/logManage',
          name: '日志管理',
          component: resolve => {
            require(['view/logManage/logManageList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/log.png')
        },
        {
          path: '/linkManage',
          name: '链接管理',
          component: resolve => {
            require(['view/linkManage/linkManageList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/link.png')
        },
        {
          path: '/systemMaintain',
          name: '系统维护',
          component: resolve => {
            require(['view/systemMaintain/systemMaintainList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/maintain.png')
        },
        {
          path: '/interfaceManage',
          name: '接口管理',
          component: resolve => {
            require(['view/interfaceManage/interfaceManageList'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/interface.png')
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => {
        require(['view/usersManage/Register'], resolve)
      },
    },
  ]
})
router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + '渭华起义后台管理系统';
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = window.localStorage.getItem('access-user');
    if (!user) {
      // next({
      //     path: '/login'
      // })
      next()
    } else {
      next()
    }
  }
})
export default router;

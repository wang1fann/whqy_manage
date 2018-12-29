import Vue from 'vue'
import Router from 'vue-router'
import Menu from 'view/Menu'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['view/usersManage/Login'], resolve)
Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            component: Menu,
            children: [{
                    path: '/rights',
                    name: '权限管理',
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/rights.png'),
                    component: resolve => {
                        require(['view/rightsManage/rightsList'], resolve)
                    },
                    children: []
                },
                {
                    path: '/addRights',
                    name: '添加权限',
                    component: resolve => {
                        require(['view/rightsManage/addRights'], resolve)
                    },
                    class: 'fa-line-chart',
                    show: false,
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
                        require(['view/contentManage/content'], resolve)
                    },
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/content.png'),
                    children: [{
                            path: 'senceSituation',
                            name: '景区概况',
                            component: resolve => {
                                require(['view/contentManage/senceSituation'], resolve)
                            },
                            class: 'fa-line-chart',
                            img: require('@/assets/img/access/user.png')
                        }, {
                            path: 'senceNews',
                            name: '景区新闻',
                            component: resolve => {
                                require(['view/contentManage/senceNews'], resolve)
                            },
                            class: 'fa-line-chart',
                            img: require('@/assets/img/access/user.png')
                        },
                        {
                            path: 'xiSpirit',
                            name: '习老精神',
                            component: resolve => {
                                require(['view/contentManage/xiSpirit'], resolve)
                            },
                            class: 'fa-line-chart',
                            img: require('@/assets/img/access/user.png')
                        }
                    ]
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
                        require(['view/systemMaintain/system'], resolve)
                    },
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/maintain.png'),
                    children: []
                },
                {
                    path: '/system/interfaceManage',
                    name: '接口管理',
                    component: resolve => {
                        require(['view/interfaceManage/interfaceManageList'], resolve)
                    },
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/interface.png')
                },
                {
                    path: '/system/cacheClear',
                    name: '缓存清理',
                    component: resolve => {
                        require(['view/systemMaintain/cacheClear'], resolve)
                    },
                    class: 'sys',
                    show: false,
                    bg: require('@/assets/img/system/green.png'),
                    img: require('@/assets/img/system/clear.png')
                }, {
                    path: '/system/problemDiagnose',
                    name: '问题诊断',
                    component: resolve => {
                        require(['view/systemMaintain/problemDiagnose'], resolve)
                    },
                    class: 'sys',
                    show: false,
                    bg: require('@/assets/img/system/orange.png'),
                    img: require('@/assets/img/system/problem.png')
                },
                {
                    path: 'performanceOptimize',
                    name: '性能优化',
                    show: false,
                    component: resolve => {
                        require(['view/systemMaintain/performanceOptimize'], resolve)
                    },
                    class: 'sys',
                    bg: require('@/assets/img/system/blue.png'),
                    img: require('@/assets/img/system/info.png')
                }
            ]
        },
        {
<<<<<<< HEAD
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
            require(['view/contentManage/content'], resolve)
          },
          class: 'fa-line-chart',
          img: require('@/assets/img/access/content.png'),
          children: [{
              path: 'senceSituation',
              name: '景区概况',
              component: resolve => {
                require(['view/contentManage/senceSituation'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png'),

              children:[
                {
                  path: '',
                  name: '景区简介',
                  component: resolve => {
                    require(['view/contentManage/situationIntroduce'], resolve)
                  },
                  class: 'fa-line-chart',
                  img: require('@/assets/img/access/user.png'),
                  meta: {
                    "si":{url:"situationIntroduce",title:"xxx1"},
                    "simg":{url:"simg",title:"xxx2"}
                  }
                },
                {
                  path: 'situationImg',
                  name: '景区掠影',
                  component: resolve => {
                    require(['view/contentManage/situationImg'], resolve)
                  },
                  class: 'fa-line-chart',
                  img: require('@/assets/img/access/user.png')
                },
                {
                  path: 'situationDepart',
                  name: '组织机构',
                  component: resolve => {
                    require(['view/contentManage/situationDepart'], resolve)
                  },
                  class: 'fa-line-chart',
                  img: require('@/assets/img/access/user.png')
                }
              ]
            }, {
              path: 'senceNews',
              name: '景区新闻',
              component: resolve => {
                require(['view/contentManage/senceNews'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'collectionAppreciation',
              name: '藏品欣赏',
              component: resolve => {
                require(['view/contentManage/collectionAppreciation'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'huaIntroduction',
              name: '渭华起义',
              component: resolve => {
                require(['view/contentManage/huaIntroduction'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'xianThings',
              name: '先烈事迹',
              component: resolve => {
                require(['view/contentManage/xianThings'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'xiSpirit',
              name: '习老精神',
              component: resolve => {
                require(['view/contentManage/xiSpirit'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'redEducation',
              name: '红色教育',
              component: resolve => {
                require(['view/contentManage/redEducation'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'partyEducation',
              name: '党性教育',
              component: resolve => {
                require(['view/contentManage/partyEducation'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'culturalEducation',
              name: '文化教育',
              component: resolve => {
                require(['view/contentManage/culturalEducation'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'themeEducation',
              name: '主题教育',
              component: resolve => {
                require(['view/contentManage/themeEducation'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'huaHall',
              name: '渭华讲堂',
              component: resolve => {
                require(['view/contentManage/huaHall'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'knowledgeAnswer',
              name: '知识问答',
              component: resolve => {
                require(['view/contentManage/knowledgeAnswer'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'redTourism',
              name: '红色旅游',
              component: resolve => {
                require(['view/contentManage/redTourism'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'serviceGuide',
              name: '服务指南',
              component: resolve => {
                require(['view/contentManage/serviceGuide'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            },
            {
              path: 'visitMessage',
              name: '参观留言',
              component: resolve => {
                require(['view/contentManage/visitMessage'], resolve)
              },
              class: 'fa-line-chart',
              img: require('@/assets/img/access/user.png')
            }
          ]
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
            require(['view/visitCount/echarts'], resolve)
            // require(['view/visitCount/visitCountList'], resolve)
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
=======
            path: '/register',
            name: 'Register',
            component: resolve => {
                require(['view/usersManage/Register'], resolve)
            },
>>>>>>> 5dfdd16586fe02753dad5948bd7a3c8472abe62b
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
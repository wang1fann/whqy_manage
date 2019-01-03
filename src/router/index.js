import Vue from 'vue'
import Router from 'vue-router'
import Menu from 'view/Menu'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['view/usersManage/Login'], resolve)
Vue.use(Router)
const contentRouter = [{
        path: 'senceSituation',
        name: '景区概况',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        redirect: '/contentManage/senceSituation/situationIntroduce',
        children: [{
                path: 'situationIntroduce',
                name: '景区简介',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationIntroduce'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            },
            {
                path: 'situationImg',
                name: '景区掠影',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationImg'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            },
            {
                path: 'situationDepart',
                name: '组织机构',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationDepart'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }
        ]
    }, {
        path: 'senceNews',
        name: '景区新闻',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        redirect: '/contentManage/senceNews/senceNews',
        children: [{
                // 新闻中心
                path: 'senceNews',
                name: '新闻中心',
                component: resolve => {
                    require(['view/contentManage/senceNews/senceNews'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            },
            {
                // 新闻中心
                path: 'inform',
                name: '通知公告',
                component: resolve => {
                    require(['view/contentManage/senceNews/senceNews'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }
        ]
    },
    {
        path: 'collectionAppreciation',
        name: '藏品欣赏',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        redirect: '/contentManage/collectionAppreciation/appreciationShow',
        children: [{
                path: 'appreciationShow',
                name: '精品展示',
                component: resolve => {
                    require(['view/contentManage/collectionAppreciation/appreciationShow'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            },
            {
                path: 'appreciationStrory',
                name: '文物故事',
                component: resolve => {
                    require(['view/contentManage/collectionAppreciation/appreciationStrory'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: [

                ]
            }, {
                path: 'souvenir',
                name: '亲切留念',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationImg'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }
        ]
    },
    {
        path: 'huaIntroduction',
        name: '渭华起义',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [ //situationDepart
            {
                path: 'revoltIntro',
                name: '起义简介',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationDepart'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: [{
                    // 详情
                    path: 'situationIntroduce',
                    name: '起义详情',
                    component: resolve => {
                        require(['view/contentManage/senceSituation/situationIntroduce'], resolve)
                    },
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/user.png'),
                    children: [],
                    show: false
                }]
            },
            {
                path: 'revoltProcess',
                name: '起义经过',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationDepart'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }, {
                path: 'imgRecord',
                name: '图片档案',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationImg'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }, {
                path: 'souvenir',
                name: '回忆纪念',
                component: resolve => {
                    require(['view/contentManage/huaIntroduction/huaWord'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }, {
                path: 'historyData',
                name: '历史资料',
                component: resolve => {
                    require(['view/contentManage/huaIntroduction/huaWord'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            },
            {
                path: 'StudyTheTheoryOf',
                name: '研究论著',
                component: resolve => {
                    require(['view/contentManage/huaIntroduction/huaWord'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }, {
                path: 'VideoWorks',
                name: '影音作品',
                component: resolve => {
                    require(['view/contentManage/huaIntroduction/huaVideo'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }
        ]
    },
    {
        path: 'xianThings',
        name: '先烈事迹',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        redirect: '/contentManage/xianThings/heros',
        children: [{
            path: 'heros',
            name: '渭华英雄',
            component: resolve => {
                require(['view/contentManage/xianThings/heros'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }, {
            path: 'GreatDeeds',
            name: '重大事迹',
            component: resolve => {
                require(['view/contentManage/xianThings/GreatDeeds'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }]
    },
    {
        path: 'xiSpirit',
        name: '习老精神',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
                path: 'biography',
                name: '生平简介',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationIntroduce'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            },
            {
                path: 'TheFeats',
                name: '丰功伟绩',
                component: resolve => {
                    require(['view/contentManage/senceSituation/situationDepart'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }, {
                path: 'HistoricalMoments',
                name: '历史瞬间',
                component: resolve => {
                    require(['view/contentManage/collectionAppreciation/appreciationShow'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }, {
                path: 'xiSpirtArtical',
                name: '著作文章',
                component: resolve => {
                    require(['view/contentManage/xiSpirit/xiSpirtArtical'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: [{
                    path: 'situationIntroduce',
                    name: '著作文章添加',
                    component: resolve => {
                        require(['view/contentManage/senceSituation/situationIntroduce'], resolve)
                    },
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/user.png'),
                    children: [],
                    show: false
                }]
            }, {
                path: 'motto',
                name: '格言精选',
                component: resolve => {
                    require(['view/contentManage/xiSpirit/xiSpirtArtical'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }, {
                path: 'inscription',
                name: '题词手迹',
                component: resolve => {
                    require(['view/contentManage/xiSpirit/xiSpirtArtical'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            },
            {
                path: 'Memoriam',
                name: '追思缅怀',
                component: resolve => {
                    require(['view/contentManage/xiSpirit/xiSpirtArtical'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }
        ]
    },
    {
        path: 'redEducation',
        name: '红色教育',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            path: 'redSpeak',
            name: '红色宣传',
            component: resolve => {
                require(['view/contentManage/redEducation/redSpeak'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: [{
                path: 'redEducationDetail',
                name: '详情',
                component: resolve => {
                    require(['view/contentManage/redEducation/redEducationDetail'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }]
        }, {
            path: 'TradeAlerts',
            name: '行业快讯',
            component: resolve => {
                require(['view/contentManage/redEducation/redSpeak'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }, {
            path: 'LeadingCare',
            name: '领导关怀',
            component: resolve => {
                require(['view/contentManage/redEducation/redSpeak'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }]
    },
    {
        path: 'partyEducation',
        name: '党性教育',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            path: 'WHspirit',
            name: '渭华起义精神',
            component: resolve => {
                require(['view/contentManage/senceSituation/situationDepart'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }, {
            path: '19thSpirit',
            name: '十九大精神',
            component: resolve => {
                require(['view/contentManage/senceSituation/situationDepart'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }, {
            path: 'ThePartyConstitution',
            name: '党章党规',
            component: resolve => {
                require(['view/contentManage/xiSpirit/xiSpirtArtical'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }, {
            path: 'classic',
            name: '经典著作',
            component: resolve => {
                require(['view/contentManage/xiSpirit/xiSpirtArtical'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }]
    },
    {
        path: 'culturalEducation',
        name: '历史文化教育',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            path: 'culturalEducation',
            name: '文化遗产',
            component: resolve => {
                require(['view/contentManage/collectionAppreciation/appreciationStrory'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }, {
            path: 'culturalOldAppend',
            name: '文化古迹',
            component: resolve => {
                require(['view/contentManage/collectionAppreciation/appreciationStrory'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: []
        }, {
            path: 'celebrity',
            name: '古今名人',
            component: resolve => {
                require(['view/contentManage/huaIntroduction/huaWord'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: [{
                // culturalOldAppend添加
                path: 'culturalOldAppend',
                name: '添加',
                component: resolve => {
                    require(['view/contentManage/culturalEducation/culturalOldAppend'], resolve)
                },
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                children: []
            }]
        }]
    },
    {
        path: 'themeEducation',
        name: '主题教育',
        component: resolve => {
            require(['view/contentManage/themeEducation/themeEducation'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        show: false
    },
    {
        path: 'huaHall',
        name: '渭华讲堂',
        component: resolve => {
            require(['view/contentManage/huaHall/huaHall'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            // 添加
            path: 'huaHallAppend',
            name: '渭华讲堂添加',
            component: resolve => {
                require(['view/contentManage/huaHall/huaHallAppend'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: [],
            show: false
        }]

    },
    {
        path: 'knowledgeAnswer',
        name: '知识问答',
        component: resolve => {
            require(['view/contentManage/knowledgeAnswer/knowledgeAnswerAppend'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            path: 'knowledgeAnswerAppend',
            name: '知识问答添加',
            component: resolve => {
                require(['view/contentManage/knowledgeAnswer/knowledgeAnswerAppend'], resolve)
            },
            class: 'fa-line-chart',
            img: require('@/assets/img/access/user.png'),
            children: [],
            show: false
        }]
    },
    {
        path: 'redTourism',
        name: '红色旅游',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            path: 'classicRoute',
            name: '经典路线',
            component: resolve => {
                require(['view/contentManage/redTourism/redTourism'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }, {
            path: 'folk',
            name: '风土民俗',
            component: resolve => {
                require(['view/contentManage/collectionAppreciation/appreciationShow'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }, {
            path: 'convenienceSearch',
            name: '便民查询',
            component: resolve => {
                require(['view/contentManage/redTourism/convenienceSearch'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }]
    },
    {
        path: 'serviceGuide',
        name: '服务指南',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            path: 'TicketReservation',
            name: '门票预订',
            component: resolve => {
                require(['view/contentManage/serviceGuide/TicketReservation'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }, {
            path: 'InterpretationOfTheBook',
            name: '讲解预订',
            component: resolve => {
                require(['view/contentManage/serviceGuide/InterpretationOfTheBook'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }, {
            path: 'rulesAndRegulations',
            name: '游客须知',
            component: resolve => {
                require(['view/contentManage/serviceGuide/rulesAndRegulations'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }]
    },
    {
        path: 'visitMessage',
        name: '参观留言',
        component: resolve => {
            require(['view/contentManage/contentCommon'], resolve)
        },
        class: 'fa-line-chart',
        img: require('@/assets/img/access/user.png'),
        children: [{
            // 游客签到
            path: 'SignIn',
            name: '游客签到',
            component: resolve => {
                require(['view/contentManage/visitMessage/SignIn'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }, {
            // 游客留言
            path: 'message',
            name: '游客留言',
            component: resolve => {
                require(['view/contentManage/visitMessage/message'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }, {
            // 留言回复
            path: 'answering',
            name: '留言回复',
            component: resolve => {
                require(['view/contentManage/visitMessage/answering'], resolve)
            },
            class: 'fa-line-chart',
            children: []
        }]
    }
];

let router = new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            component: Menu,
            redirect: "/rights",
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
                    redirect: "/contentManage/senceSituation",
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/content.png'),
                    children: contentRouter
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
                    path: '/dataRestore',
                    name: '数据还原',
                    component: resolve => {
                        require(['view/dataCopy/dataRestore'], resolve)
                    },
                    class: 'fa-line-chart',
                    img: require('@/assets/img/access/data.png'),
                    show: false
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

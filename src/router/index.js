import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent.vue'
import Home from '@/components/Home'
import Create from '@/pages/Event/Create'
import List from '@/pages/Event/List'
import showStu from '@/pages/StuEvent/showStu'
import showFK from '@/pages/StuEvent/showFK'
import showDorm from '@/pages/StuEvent/showDorm'
import Login from '@/pages/Login'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        name: '登录'
      },
      component: Login
    },


    {
      path: '/index',
      component: Index,
      redirect: '/main',
      children: [
        {
          path: '/grzx',
          meta: {
            name: '个人中心'
          },
          component: Create
        },
        {
          path: '/xsgl',
          meta: {
            name: '学生管理'
          },
          component: MainContent,
          children: [
            {
              path: '/xsgl/xslb',
              meta: {
                name: '学生列表'
              },
              component: showStu
            }
          ]
        },
        {
          path: '/ssgl',
          meta: {
            name: '宿舍管理'
          },
          component: MainContent,
          children: [
            {
              path: '/ssgl/ssxx',
              meta: {
                name: '宿舍列表'
              },
              component: showDorm
            }
          ]
        },
        {
          path: '/fkgl',
          meta: {
            name: '访客管理'
          },
          component: MainContent,
          children: [
            {
              path: '/fkgl/fklb',
              meta: {
                name: '访客列表'
              },
              component: showFK
            }
          ]
        },
        {
          path: '/shgl',
          meta: {
            name: '损耗管理'
          },
          component: MainContent,
          children: [
            {
              path: '/shgl/shxx',
              meta: {
                name: '损耗信息'
              },
              component: showStu
            }
          ]
        }
      ] 
    },
    
    






    
    {
      path: '/index',
      component: Index,
      redirect: '/main',
      children: [
        {
          path: '/main',
          /* meta的name主要用来做面包屑 */
          meta: {
            name: '首页'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: Home
            }
          ]
        },
        {
          path: '/event',
          meta: {
            name: '活动'
          },
          component: MainContent,
          children: [
            {
              path: 'create',
              meta: {
                name: '创建'
              },
              component: Create
            },
            {
              path: 'list',
              meta: {
                name: '管理'
              },
              component: List
            }
          ]
        }
      ]
    },




    {
      path: '/index',
      component: Index,
      redirect: '/main',
      children: [
        {
          path: '/showstu',
          meta: {
            name: '账户'
          },
          component: MainContent,
          children: [
            {
              path: 'zhcz',
              meta: {
                name: '账户充值'
              },
              component: showStu
            }
          ]
        }
      ] 
    }


  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Main'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home')
      },
      {
        path: '/articles/:id',
        name: 'article',
        props: true,
        component: () => import('../views/Article')
      }
    ]
  },
  {
    path: '/heroes/:id',
    name: 'hero',
    props: true,
    component: () => import('../views/Hero')
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {isPublic: true},
    component: () => import('../views/Login')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main'),
    redirect: 'categories/list',
    children: [

      {path: 'categories/create', component: () => import('../views/CategorEdit')},
      {path: 'categories/edit/:id', component: () => import('../views/CategorEdit'), props: true},
      {path: 'categories/list', component: () => import('../views/CategorList')},

      {path: 'items/create', component: () => import('../views/ItemEdit')},
      {path: 'items/edit/:id', component: () => import('../views/ItemEdit'),props: true},
      {path: 'items/list', component: () => import('../views/ItemList')},

      {path: 'heroes/create', component: () => import('../views/HeroEdit')},
      {path: 'heroes/edit/:id', component: () => import('../views/HeroEdit'), props: true},
      {path: 'heroes/list', component: () => import('../views/HeroList')},
      
      {path: 'articles/create', component: () => import('../views/ArticleEdit')},
      {path: 'articles/edit/:id', component: () => import('../views/ArticleEdit'), props: true},
      {path: 'articles/list', component: () => import('../views/ArticleList')},
      
      {path: 'ads/create', component: () => import('../views/AdEdit')},
      {path: 'ads/edit/:id', component: () => import('../views/AdEdit'), props: true},
      {path: 'ads/list', component: () => import('../views/AdList')},
      
      {path: 'admins/create', component: () => import('../views/AdminEdit')},
      {path: 'admins/edit/:id', component: () => import('../views/AdminEdit'), props: true},
      {path: 'admins/list', component: () => import('../views/AdminList')}
      
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    next('/login')
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import SearchResults from '../pages/SearchResults.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Login from '../pages/Login.vue'
import MyPage from '../pages/MyPage.vue'
import Board from '../pages/Board.vue'
import BoardDetail from '../pages/BoardDetail.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/mypage', name: 'mypage', component: MyPage },
  {
  path: '/search',
  name: 'search',
  component: SearchResults,
  props: (route) => ({
    keyword: route.query.keyword || '',
    condition: route.query.condition || 'all',
  }),
},
  { path: '/product/:id', name: 'productDetail', component: ProductDetail, props: true },
  { path: '/board', name: 'board', component: Board },
  { path: '/board/:id', name: 'boardDetail', component: BoardDetail, props: true },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/checkout', name: 'checkout', component: Checkout },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
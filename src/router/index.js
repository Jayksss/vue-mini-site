import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/product/:id', name: 'productDetail', component: ProductDetail, props: true },
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
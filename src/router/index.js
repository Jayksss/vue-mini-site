import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Todos from '../pages/Todos.vue'
import Notes from '../pages/Notes.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/todos', component: Todos },
    { path: '/notes', component: Notes },

    // 항상 마지막에!
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
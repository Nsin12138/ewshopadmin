import Home from '@/views/Home.vue'
import Login from '@/views/login/index.vue'
import dashboard from "./modules/dashboard";
import { createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login,
        nameL:'Login',
        meta:{
            title:'登录'
        }
    }
]
const baseRoutes = [...routes, ...dashboard];
console.log(baseRoutes);
export const router = createRouter({
    history:createWebHistory(),
    routes:baseRoutes, // 'routes: routes'的缩写
})

router.beforeEach((to, from, next)=>{
    console.log(to,from)
    console.log(to.meta.title)
    document.title = (to?.meta?.title as string) || document.title
    if(to.name != 'login'){
        // 判断是否登陆
        if(!localStorage.getItem('token')){
            next({
                path:'/login',
                query:{
                    redirect: to.fullPath
                }
            })
        }
    }
    next()
})
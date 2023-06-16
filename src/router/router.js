import {createRouter, createWebHistory} from 'vue-router';
import UserLogin from "@/pages/UserLogin.vue";
import MainPage from "@/pages/MainPage.vue";
import MailingPage from "@/pages/MailingPage.vue";
import store from "@/store/index.js";
import AdminPage from "@/pages/AdminPage.vue";


const routes = [
    {
        path: '/:role?/:id?',
        name: 'mainPage',
        component: MainPage
    },
    {
        path: '/login',
        name: 'loginPage',
        component: UserLogin
    },
    {
        path: '/mailing/:role/:id',
        name: 'mailingPage',
        component: MailingPage
    },
    {
        path: '/admin/:role/:id',
        name: 'adminPage',
        component: AdminPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach(async (to) => {
    if (!store.getters.getIsAuth && to.name !== 'loginPage' && to.name !== 'mainPage')
    {
        return [{ name : 'mailingPage'},
            {name : 'adminPage'}]
    }

})

export default router;
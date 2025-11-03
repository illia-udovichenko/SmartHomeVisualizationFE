import {createRouter, createWebHistory} from 'vue-router';
import welcomePage from "@/pages/authentication/welcomePage.vue";
import registrationPage from "@/pages/authentication/registrationPage.vue";
import loginPage from "@/pages/authentication/loginPage.vue";
import mainMenu from "@/pages/projectManagment/mainMenu.vue";
import newProject from "@/pages/projectManagment/newProject.vue";
import openProject from "@/pages/projectManagment/openProject.vue";
import editorMain from "@/pages/editor/editorMainPage.vue";

const routes = [
    {
        path: '/',
        component: welcomePage
    },
    {
        path: '/registration',
        component: registrationPage
    },
    {
        path: '/login',
        component: loginPage
    },
    {
        path: '/mainMenu',
        component: mainMenu
    },
    {
        path: '/newProject',
        component: newProject
    },
    {
        path: '/openProject',
        component: openProject
    },
    {
        path: '/editor',
        component: editorMain
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;
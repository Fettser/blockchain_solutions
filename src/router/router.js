import BriefcasePage from "@/components/BriefcasePage";
import ConverterPage from "@/components/ConverterPage";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/briefcase',
        component: BriefcasePage
    },
    {
        path: '/converter',
        component: ConverterPage
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/briefcase'
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router
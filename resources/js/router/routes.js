import Register from "../components/auth/register";
import Index from "../components/projects/index/index";
import Show from "../components/projects/show/index";
import Store from "../components/projects/store/index";
import Update from "../components/projects/update/index"
import Login from "../components/auth/login/index";
import ResetPassword from "../components/auth/reset-password";
import ForgetPassword from "../components/auth/forget-password";
import User from "../components/user";
import Home from "../components/pages/home";

export default [
    {
        path: '/',
        exact: true,
        component: Home,
        private: false
    },
    {
        path: '/projects',
        exact: true,
        component: Index,
        private: true
    },
    {
        path: '/projects/:id',
        component: Show,
        private: true,
    },
    {
        path: '/new-project',
        component: Store,
        private: true
    },
    {
        path: '/edit-project/:id',
        component: Update,
        private: true,
    },
    {
        path: '/me/:id',
        component: User,
        private: true,
    },
    {
        path: '/registration',
        component: Register,
        auth: true
    },
    {
        path: '/login',
        component: Login,
        auth: true
    },
    {
        path: '/reset-password',
        component: ResetPassword,
        auth: true
    },
    {
        path: '/forget-password',
        component: ForgetPassword,
        auth: true
    },
]
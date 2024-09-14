import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/HomeView.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/users-list",
            name: "users-list",
            component: () => import("../views/UsersList.vue"),
        },
        {
            path: "/discussions",
            name: "discussions",
            component: () => import("../views/Discussions.vue"),
        },
    ]
});

export default router;
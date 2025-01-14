import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/layouts/AuthLayout.vue"),
      redirect: "/login",
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/views/LoginView.vue"),
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("@/views/SignupView.vue"),
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: () => import("@/views/ForgotPasswordView.vue"),
        },
        {
          path: "forgot-password-confirmation",
          name: "forgot-password-confirmation",
          component: () => import("@/views/ForgotPasswordConfirmationView.vue"),
        },
        {
          path: "reset-password/:token",
          name: "reset-password",
          component: () => import("@/views/ResetPasswordView.vue"),
        },
      ],
    },
  ],
});

export default router;

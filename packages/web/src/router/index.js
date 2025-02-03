import { useNProgress } from "@/lib/nprogress";
import "nprogress/nprogress.css";
import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/overview",
      component: () => import("@/layouts/BaseLayout.vue"),
      children: [
        {
          path: "overview",
          name: "overview",
          component: () => import("@/views/overview/OverviewView.vue"),
        },
        {
          path: "transactions",
          name: "transactions",
          component: () => import("@/views/transactions/TransactionsView.vue"),
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/layouts/AuthLayout.vue"),
      redirect: "/auth/login",
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
        {
          path: "verify-email",
          name: "verify-email",
          component: () => import("@/views/VerifyEmailView.vue"),
        },
      ],
    },
  ],
});

const nProgress = useNProgress();

router.beforeEach(async (to, _, next) => {
  const auth = useAuthStore();

  nProgress.start();

  await auth.ensureAuth();

  // If user is logged in, redirect to overview if trying to access auth pages
  if (auth.isAuthenticated && to.fullPath.includes("/auth")) {
    return next({ name: "overview" });
  }

  // If user is not logged in and trying to access a non-auth page, redirect to login
  if (!auth.isAuthenticated && !to.fullPath.includes("/auth")) {
    return next({
      name: "login",
      query: { redirect: encodeURIComponent(`${to.fullPath}`) },
    });
  }

  // Allow access otherwise
  next();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;

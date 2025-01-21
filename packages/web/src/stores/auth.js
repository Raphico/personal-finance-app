import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { user as userApi } from "@/api/user";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthCheckDone = ref(false);

  const isAuthenticated = computed(() => !!user.value);

  async function ensureAuth() {
    if (isAuthCheckDone.value) return;

    try {
      const response = await userApi.getCurrentUser();
      login(response.data);
    } catch (error) {
      logout();
    } finally {
      isAuthCheckDone.value = true;
    }
  }

  function login(data) {
    user.value = data;
  }

  function logout() {
    user.value = null;
  }

  return {
    isAuthCheckDone,
    isAuthenticated,
    user,
    ensureAuth,
    login,
    logout,
  };
});

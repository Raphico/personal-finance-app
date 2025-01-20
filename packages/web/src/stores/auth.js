import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { user as userApi } from "@/api/user";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthCheckDone = ref(false);
  const signupEmail = ref(null);

  const isAuthenticated = computed(() => !!user.value);

  async function ensureAuth() {
    if (isAuthCheckDone.value) return;

    try {
      const { data: response } = await userApi.getCurrentUser();
      login(response.data);
    } catch (error) {
      logout();
    } finally {
      isAuthCheckDone.value = true;
    }
  }

  function login(data) {
    user.value = data;
    signupEmail.value = null;
  }

  function updateSignupEmail(email) {
    signupEmail.value = email;
  }

  function logout() {
    user.value = null;
  }

  return {
    isAuthCheckDone,
    isAuthenticated,
    user,
    signupEmail,
    updateSignupEmail,
    login,
    logout,
    ensureAuth,
  };
});

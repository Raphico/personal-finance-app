<script setup>
import { useAuthStore } from "./stores/auth";
import AppLoader from "./components/AppLoader.vue";

const store = useAuthStore();
</script>

<template>
  <RouterView v-if="store.isAuthCheckDone" />
  <AppLoader v-else />
</template>

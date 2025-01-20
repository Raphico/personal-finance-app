<script setup lang="ts">
import { ref } from "vue";
import { auth } from "@/api/auth";
import BaseButton from "@/components/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { logout, user } = useAuthStore();
const router = useRouter();

const loading = ref(false);

async function onLogout() {
  loading.value = true;

  try {
    await auth.logout();
    logout();
    router.push({ name: "auth" });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <h1>Overview: {{ user.name }}</h1>
  <BaseButton :loading="loading" @click="onLogout">logout</BaseButton>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { auth } from "@/api/auth";
import BaseButton from "@/components/BaseButton.vue";
import PageHeader from "@/components/PageHeader.vue";

const { logout, user } = useAuthStore();
const router = useRouter();

const loading = ref(false);

async function onLogout() {
  loading.value = true;

  try {
    await auth.logout();
    logout();
    await nextTick();
    router.push({ name: "auth" });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <header>
    <PageHeader>Overview</PageHeader>
    <BaseButton :loading="loading" @click="onLogout">logout</BaseButton>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

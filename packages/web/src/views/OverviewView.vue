<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { auth } from "@/api/auth";
import BaseButton from "@/components/BaseButton.vue";

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
  <h1>Overview: {{ user.name }}</h1>
  <BaseButton :loading="loading" @click="onLogout">logout</BaseButton>
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique eveniet
    animi fugiat, veniam omnis dolorem aliquam suscipit, optio, laborum tenetur
    sit voluptatibus molestias earum nam blanditiis placeat sunt ut officia.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos fuga ipsam
    repellat quod, voluptas nulla recusandae quam non quibusdam provident
    explicabo voluptatibus nisi aliquam harum voluptate aperiam delectus. Nihil,
    provident. lorem
  </p>
</template>

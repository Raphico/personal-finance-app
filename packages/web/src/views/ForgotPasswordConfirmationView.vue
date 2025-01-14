<script setup>
import BaseButton from "@/components/BaseButton.vue";
</script>

<template>
  <div class="confirmation">
    <h1 class="text-preset-1">Email sent</h1>
    <p class="text-preset-4-regular">
      A link to reset your password has been sent to you on raphico@gmail.com.
    </p>
    <RouterLink to="/auth/login">
      <BaseButton>return to login</BaseButton>
    </RouterLink>
  </div>
</template>

<style scoped>
.confirmation {
  display: grid;
  justify-content: center;
  text-align: center;
}

h1 {
  margin: 0;
}

.confirmation :last-child {
  text-decoration: none;
  width: 100%;
}

p {
  color: var(--clr-grey-500);
  max-width: 400px;
}
</style>

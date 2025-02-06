<script setup>
import { useRedirect } from "@/composables/useRedirect";
import BaseButton from "@/components/BaseButton.vue";
import PageHeader from "@/components/PageHeader.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Forgot password confirmation - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app forgot password confirmation page",
    },
  ],
});

const { redirect, urlEncodedEmail, goTo } = useRedirect();
</script>

<template>
  <div class="confirmation">
    <PageHeader>Email sent</PageHeader>
    <p class="text-preset-4-regular">
      A link to reset your password has been sent to you on
      {{ urlEncodedEmail }}.
    </p>
    <RouterLink :to="goTo('/auth/login', { redirect, email: urlEncodedEmail })">
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

.confirmation :last-child {
  text-decoration: none;
  width: 100%;
}

p {
  color: var(--clr-grey-500);
  max-width: 400px;
}
</style>

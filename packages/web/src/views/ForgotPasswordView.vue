<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Forgot Password - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app forgot password page",
    },
  ],
});
</script>

<template>
  <h1 class="text-preset-1">Forgot Password?</h1>
  <p class="desc text-preset-4-regular">
    Enter your email address and we will send instructions to reset your
    password
  </p>
  <BaseForm>
    <BaseFormItem>
      <BaseLabel for="email">email</BaseLabel>
      <BaseInput type="email" id="email" name="email" />
    </BaseFormItem>
    <BaseButton>continue</BaseButton>
    <RouterLink to="/auth/login" class="login-link text-preset-4-bold"
      >Back to login page</RouterLink
    >
  </BaseForm>
</template>

<style scoped>
h1 {
  margin: 0;
}

.desc {
  margin-block: var(--spacing-100) var(--spacing-200);
  color: var(--clr-grey-500);
}

.login-link {
  text-align: center;
  color: var(--clr-grey-900);
  text-decoration: 2px underline;
  text-underline-offset: 3px;
}
</style>

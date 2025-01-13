<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BasePasswordInput from "@/components/BasePasswordInput.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Login - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app login page",
    },
  ],
});
</script>

<template>
  <AuthLayout>
    <h1 class="text-preset-1">Login</h1>
    <BaseForm>
      <BaseFormItem>
        <BaseLabel for="email">email</BaseLabel>
        <BaseInput type="email" id="email" name="email" />
      </BaseFormItem>
      <BaseFormItem>
        <BaseLabel for="password">password</BaseLabel>
        <BasePasswordInput id="password" name="password" />
      </BaseFormItem>
      <BaseButton>login</BaseButton>
      <p class="text-preset-4-regular">
        Need to create an account?
        <RouterLink to="/signup" class="signup-link text-preset-4-bold"
          >Sign up</RouterLink
        >
      </p>
    </BaseForm>
  </AuthLayout>
</template>

<style scoped>
h1 {
  margin-top: 0;
}

p {
  text-align: center;
  color: var(--clr-grey-500);
}

.signup-link {
  color: var(--clr-grey-900);
  text-decoration: 2px underline;
  text-underline-offset: 3px;
  transition: color var(--transition-duration) var(--transition-easing);
}

.signup-link:hover,
.signup-link:focus {
  color: var(--clr-grey-500);
}
</style>

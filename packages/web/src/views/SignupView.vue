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
  title: "Signup - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app signup page",
    },
  ],
});
</script>

<template>
  <AuthLayout>
    <h1 class="text-preset-1">Signup</h1>
    <BaseForm>
      <BaseFormItem>
        <BaseLabel for="name">name</BaseLabel>
        <BaseInput type="name" id="name" name="name" />
      </BaseFormItem>
      <BaseFormItem>
        <BaseLabel for="email">email</BaseLabel>
        <BaseInput type="email" id="email" name="email" />
      </BaseFormItem>
      <BaseFormItem>
        <BaseLabel for="password">password</BaseLabel>
        <BasePasswordInput id="password" name="password" />
      </BaseFormItem>
      <BaseButton>create account</BaseButton>
      <p class="text-preset-4-regular">
        Already have an account?
        <RouterLink to="/login" class="login-link text-preset-4-bold"
          >login</RouterLink
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

.login-link {
  color: var(--clr-grey-900);
  text-decoration: 2px underline;
  text-underline-offset: 3px;
}
</style>

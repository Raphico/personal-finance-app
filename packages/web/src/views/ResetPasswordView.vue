<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BasePasswordInput from "@/components/BasePasswordInput.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Reset Password - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app reset password page",
    },
  ],
});
</script>

<template>
  <h1 class="text-preset-1">Reset password</h1>
  <BaseForm>
    <BaseFormItem>
      <BaseLabel for="newPassword">new password</BaseLabel>
      <BasePasswordInput id="newPassword" name="newPassword" />
    </BaseFormItem>
    <BaseFormItem>
      <BaseLabel for="confirmPassword">confirm password</BaseLabel>
      <BasePasswordInput id="confirmPassword" name="confirmPassword" />
    </BaseFormItem>
    <BaseButton>reset password</BaseButton>
  </BaseForm>
</template>

<style scoped>
h1 {
  margin-top: 0;
}
</style>

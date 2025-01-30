<script setup>
import { useToast } from "vue-toast-notification";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "@/composables/useForm";
import { auth } from "@/api/auth";
import { passwordSchema } from "@repo/shared-validators/auth";
import { useHead } from "@unhead/vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BasePasswordInput from "@/components/BasePasswordInput.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import PageHeader from "@/components/PageHeader.vue";

useHead({
  title: "Reset Password - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app reset password page",
    },
  ],
});

const router = useRouter();
const route = useRoute();
const toast = useToast();
const form = useForm({
  password: "",
});

function onsubmit() {
  form.submit(
    async (fields) => {
      const { password } = fields;
      passwordSchema.parse({
        password,
      });
      return auth.resetPassword(route.params.token, password);
    },
    {
      onSuccess() {
        router.push("/auth/login");
        toast.success("Password has been updated successfully", {
          position: "top",
        });
      },
    }
  );
}
</script>

<template>
  <PageHeader>Reset password</PageHeader>
  <BaseForm @submit.prevent="onsubmit">
    <BaseFormItem>
      <BaseAlert v-if="form.error.general" :message="form.error.general" />
      <BaseLabel :data-error="form.error.password" for="newPassword"
        >new password</BaseLabel
      >
      <BasePasswordInput
        id="newPassword"
        name="newPassword"
        :data-error="form.error.password"
        v-model="form.fields.password"
      />
      <BaseFormMessage
        v-if="form.error.password"
        :message="form.error.password"
      />
    </BaseFormItem>
    <BaseButton
      type="submit"
      :loading="form.isLoading"
      :disabled="form.isLoading"
      >reset password</BaseButton
    >
  </BaseForm>
</template>

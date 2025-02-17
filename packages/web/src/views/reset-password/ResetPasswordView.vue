<script setup>
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
import { getError } from "@/utils/helpers";
import { useMutation } from "@tanstack/vue-query";

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
const form = useForm({
  password: "",
});

const { isPending, mutate: resetPassword } = useMutation({
  mutationFn: ({ token, password }) => auth.resetPassword(token, password),
  onSuccess() {
    router.push("/auth/login");
  },
  onError(error) {
    form.setError(getError(error));
  },
});

function onSubmit() {
  const { password } = form.fields;
  form.clearError();
  const { data, error } = passwordSchema.safeParse({
    password,
  });
  if (error) {
    form.setError(getError(error));
    return;
  }
  resetPassword({ ...data, token: route.params.token });
}
</script>

<template>
  <PageHeader>Reset password</PageHeader>
  <BaseForm @submit.prevent="onSubmit">
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
    <BaseButton type="submit" :loading="isPending" :disabled="isPending"
      >reset password</BaseButton
    >
  </BaseForm>
</template>

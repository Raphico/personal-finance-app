<script setup>
import { useForm } from "@/composables/useForm";
import { useHead } from "@unhead/vue";
import { useRedirect } from "@/composables/useRedirect";
import { auth } from "@/api/auth";
import { useRouter } from "vue-router";
import { emailSchema } from "@repo/shared-validators/auth";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import PageHeader from "@/components/PageHeader.vue";
import { getError } from "@/utils/helpers";
import { useMutation } from "@tanstack/vue-query";

useHead({
  title: "Forgot Password - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app forgot password page",
    },
  ],
});

const { urlEncodedEmail, redirect, goTo } = useRedirect();
const router = useRouter();
const form = useForm({
  email: urlEncodedEmail,
});

const { isPending, mutate: requestPasswordReset } = useMutation({
  mutationFn: ({ email }) => auth.requestPasswordReset(email),
  onSuccess() {
    router.push(
      goTo(`/auth/forgot-password-confirmation`, {
        redirect,
        email: form.fields.email,
      })
    );
  },
  onError(error) {
    form.setError(getError(error));
  },
});

function onSubmit() {
  const { email } = form.fields;
  form.clearError();
  const { data, error } = emailSchema.safeParse({ email });
  if (error) {
    form.setError(getError(error));
    return;
  }
  requestPasswordReset(data);
}
</script>

<template>
  <PageHeader>Forgot Password?</PageHeader>
  <p class="desc text-preset-4-regular">
    Enter your email address and we will send instructions to reset your
    password
  </p>
  <BaseForm @submit.prevent="onSubmit" novalidate>
    <BaseAlert v-if="form.error.general" :message="form.error.general" />
    <BaseFormItem>
      <BaseLabel for="email" :data-error="form.error.email">email</BaseLabel>
      <BaseInput
        type="email"
        id="email"
        name="email"
        :data-error="form.error.email"
        v-model="form.fields.email"
      />
      <BaseFormMessage v-if="form.error.email" :message="form.error.email" />
    </BaseFormItem>
    <BaseButton type="submit" :loading="isPending" :disabled="isPending"
      >continue</BaseButton
    >
    <RouterLink
      :to="goTo('/auth/login', { redirect, email: form.fields.email })"
      class="login-link text-preset-4-bold"
      >Back to login page</RouterLink
    >
  </BaseForm>
</template>

<style scoped>
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

<script setup>
import { useForm } from "@/composables/useForm";
import { useRedirect } from "@/composables/useRedirect";
import { useHead } from "@unhead/vue";
import { auth } from "@/api/auth";
import { signupSchema } from "@repo/shared-validators/auth";
import { useRouter } from "vue-router";
import BaseAlert from "@/components/BaseAlert.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BasePasswordInput from "@/components/BasePasswordInput.vue";

useHead({
  title: "Sign up - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app sign up page",
    },
  ],
});

const { urlEncodedEmail, redirect, goTo } = useRedirect();

const router = useRouter();
const form = useForm({
  name: "",
  email: urlEncodedEmail,
  password: "",
});

function onsubmit() {
  form.submit(
    async (fields) => {
      const { name, email, password } = fields;
      signupSchema.parse({
        name,
        email,
        password,
      });
      return auth.signup(name, email, password);
    },
    {
      onSuccess() {
        router.push(
          goTo("/auth/verify-email", { redirect, email: form.fields.email })
        );
      },
    }
  );
}
</script>

<template>
  <h1 class="text-preset-1">Sign up</h1>
  <BaseForm @submit.prevent="onsubmit" novalidate>
    <BaseAlert v-if="form.error.general" :message="form.error.general" />
    <BaseFormItem>
      <BaseLabel for="name" :data-error="form.error.name">name</BaseLabel>
      <BaseInput
        type="text"
        v-model="form.fields.name"
        :data-error="form.error.name"
        id="name"
        name="name"
      />
      <BaseFormMessage v-if="form.error.name" :message="form.error.name" />
    </BaseFormItem>
    <BaseFormItem>
      <BaseLabel :data-error="form.error.email" for="email">email</BaseLabel>
      <BaseInput
        :data-error="form.error.email"
        v-model="form.fields.email"
        type="email"
        id="email"
        name="email"
      />
      <BaseFormMessage v-if="form.error.email" :message="form.error.email" />
    </BaseFormItem>
    <BaseFormItem>
      <BaseLabel for="password" :data-error="form.error.password"
        >password</BaseLabel
      >
      <BasePasswordInput
        id="password"
        name="password"
        :data-error="form.error.password"
        v-model="form.fields.password"
      />
      <BaseFormMessage
        v-if="form.error.password"
        :message="form.error.password"
      />
    </BaseFormItem>
    <BaseButton
      :loading="form.isLoading"
      :disabled="form.isLoading"
      type="submit"
      >create account</BaseButton
    >
  </BaseForm>
  <p class="text-preset-4-regular">
    Already have an account?
    <RouterLink
      :to="goTo('/auth/login', { redirect, email: form.fields.email })"
      class="login-link text-preset-4-bold"
      >login</RouterLink
    >
  </p>
</template>

<style scoped>
h1 {
  margin-top: 0;
}

p {
  text-align: center;
  color: var(--clr-grey-500);
  margin-top: var(--spacing-400);
}

.login-link {
  color: var(--clr-grey-900);
  text-decoration: 2px underline;
  text-underline-offset: 3px;
}
</style>

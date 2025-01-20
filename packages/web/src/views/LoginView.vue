<script setup>
import { useForm } from "@/composables/useForm";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";
import { auth } from "@/api/auth";
import { useHead } from "@unhead/vue";
import { loginSchema } from "@repo/shared-validators/auth";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BasePasswordInput from "@/components/BasePasswordInput.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseAlert from "@/components/BaseAlert.vue";

useHead({
  title: "Login - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app login page",
    },
  ],
});

const { login, updateSignupEmail } = useAuthStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();
const form = useForm({
  email: "",
  password: "",
});

function onsubmit() {
  form.submit(
    (fields) => {
      const { email, password } = fields;
      loginSchema.parse({
        email,
        password,
      });
      return auth.login(email, password);
    },
    {
      onError(error) {
        if (error instanceof AxiosError && error.status == 403) {
          updateSignupEmail(form.fields.email);
          const redirect = route.query?.redirect || "home";
          toast.error("You need to verify your email before logging in", {
            position: "top",
          });
          router.push(`/auth/verify-email?redirect=${redirect}`);
        }
      },
      onSuccess: (response) => {
        const redirect = route.query?.redirect || "home";
        login(response.data);
        router.push({ name: redirect });
      },
    }
  );
}
</script>

<template>
  <h1 class="text-preset-1">Login</h1>
  <BaseForm @submit.prevent="onsubmit">
    <BaseAlert v-if="form.error.general" :message="form.error.general" />
    <BaseFormItem>
      <BaseLabel for="email" :data-error="form.error.email">email</BaseLabel>
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
        v-model="form.fields.password"
        id="password"
        name="password"
        :data-error="form.error.password"
      />
      <BaseFormMessage
        v-if="form.error.password"
        :message="form.error.password"
      />
      <RouterLink
        to="/auth/forgot-password"
        class="forgot-password text-preset-5-bold"
        >forgot password?</RouterLink
      >
    </BaseFormItem>
    <BaseButton
      :loading="form.isLoading"
      :disabled="form.isLoading"
      type="submit"
      >login</BaseButton
    >
  </BaseForm>
  <p class="text-preset-4-regular">
    Need to create an account?
    <RouterLink to="/auth/signup" class="signup-link text-preset-4-bold"
      >Sign up</RouterLink
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

.forgot-password {
  text-decoration: none;
  text-align: right;
  color: var(--clr-grey-900);
}

.signup-link {
  color: var(--clr-grey-900);
  text-decoration: 2px underline;
  text-underline-offset: 3px;
}
</style>

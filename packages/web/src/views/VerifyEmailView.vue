<script setup>
import { nextTick } from "vue";
import { useForm } from "@/composables/useForm";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import { auth } from "@/api/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { emailSchema, verifyEmailSchema } from "@repo/shared-validators/auth";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseOTPInput from "@/components/BaseOTPInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";

useHead({
  title: "Verify email - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app verify email page",
    },
  ],
});

const route = useRoute();
const redirect = decodeURIComponent(route.query?.redirect || "/");
const urlEncodedEmail = decodeURIComponent(route.query?.email || "");

const { login } = useAuthStore();
const isResendingEmail = ref(false);
const router = useRouter();
const form = useForm({
  code: "",
});

function onsubmit() {
  form.submit(
    async (fields) => {
      const { code } = fields;
      verifyEmailSchema.parse({
        code,
      });
      if (!code) return;
      return auth.verifyEmail(code);
    },
    {
      async onSuccess(response) {
        login(response.data);
        await nextTick();
        router.push(redirect);
      },
    }
  );
}

function resendCode() {
  form.submit(
    async () => {
      emailSchema.parse({ email: urlEncodedEmail });
      return auth.resendEmailVerification(urlEncodedEmail);
    },
    {
      onBefore() {
        isResendingEmail.value = true;
      },
      onComplete() {
        isResendingEmail.value = false;
      },
    }
  );
}
</script>

<template>
  <div class="verify-email">
    <h1>Verify Email</h1>
    <p class="desc text-preset-4-regular">
      Enter the verification code sent to your email to continue
    </p>
    <BaseForm @submit.prevent="onsubmit">
      <BaseAlert v-if="form.error.general" :message="form.error.general" />
      <BaseOTPInput
        :is-error="!!form.error.code"
        @complete="
          (otp) => {
            form.fields.code = otp;
          }
        "
      />
      <BaseButton
        :loading="form.isLoading && !isResendingEmail"
        :disabled="isResendingEmail || form.isLoading"
        type="submit"
        >Verify</BaseButton
      >
    </BaseForm>
    <button
      class="resend-email text-preset-4-bold"
      :disabled="form.isLoading"
      @click="resendCode"
    >
      resend code
    </button>
  </div>
</template>

<style scoped>
h1 {
  margin: 0;
  text-align: center;
}

.verify-email {
  max-width: 400px;
  margin: 0 auto;
}

.desc {
  text-align: center;
  margin-block: var(--spacing-100) var(--spacing-200);
  color: var(--clr-grey-500);
}

.resend-email {
  margin: 0 auto;
  display: block;
  text-transform: capitalize;
  cursor: pointer;
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--clr-grey-900);
  margin-top: var(--spacing-250);
}

.resend-email:disabled {
  color: var(--clr-grey-500);
  pointer-events: none;
}
</style>

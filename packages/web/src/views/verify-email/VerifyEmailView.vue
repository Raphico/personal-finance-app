<script setup>
import { useToast } from "vue-toast-notification";
import { useForm } from "@/composables/useForm";
import { useHead } from "@unhead/vue";
import { useRedirect } from "@/composables/useRedirect";
import { auth } from "@/api/auth";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseOTPInput from "@/components/BaseOTPInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import PageHeader from "@/components/PageHeader.vue";
import { getError } from "@/utils/helpers";
import { useMutation } from "@tanstack/vue-query";

useHead({
  title: "Verify email - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app verify email page",
    },
  ],
});

const { redirect, urlEncodedEmail, goTo } = useRedirect();
const router = useRouter();
const toast = useToast();

const form = useForm({
  code: "",
});

const { isPending: isVerifyingEmail, mutate: verifyEmail } = useMutation({
  mutationFn: ({ code }) => auth.verifyEmail(code),
  onSuccess() {
    router.push(
      goTo("/auth/login", {
        redirect,
        email: urlEncodedEmail,
      })
    );
  },
  onError(error) {
    form.setError(getError(error));
  },
});

const { isPending: isResendingEmail, mutate: resendEmailVerification } =
  useMutation({
    mutationFn: ({ email }) => auth.resendEmailVerification(email),
    async onSuccess() {
      toast.success("Verification code has been sent", {
        position: "top",
      });
    },
    onError(error) {
      form.setError(getError(error));
    },
  });

function onSubmit() {
  const { code } = form.fields;
  if (!code) return;
  form.clearError();
  verifyEmail({ code });
}

function resendCode() {
  form.clearError();
  resendEmailVerification({ email: urlEncodedEmail });
}
</script>

<template>
  <div class="verify-email">
    <PageHeader class="text-center">Verify Email</PageHeader>
    <p class="desc text-preset-4-regular text-center">
      Enter the verification code sent to your email to continue
    </p>
    <BaseForm @submit.prevent="onSubmit">
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
        :loading="isVerifyingEmail && !isResendingEmail"
        :disabled="isResendingEmail || isVerifyingEmail"
        type="submit"
        >Verify</BaseButton
      >
    </BaseForm>
    <button
      class="resend-email text-preset-4-bold"
      :disabled="isVerifyingEmail || isResendingEmail"
      @click="resendCode"
    >
      resend code
    </button>
  </div>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.verify-email {
  max-width: 400px;
  margin: 0 auto;
}

.desc {
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

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseOTPInput from "@/components/BaseOTPInput.vue";

const otp = ref("");
</script>

<template>
  <div class="verify-email">
    <h1>Verify Email</h1>
    <p class="desc text-preset-4-regular">
      Enter the verification code sent to your email to continue
    </p>
    <BaseForm>
      <BaseOTPInput
        @complete="
          (value) => {
            otp = value;
          }
        "
      />
      <BaseButton :disabled="!otp">Verify</BaseButton>
    </BaseForm>
    <button class="resend-email text-preset-4-bold">resend code</button>
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
</style>

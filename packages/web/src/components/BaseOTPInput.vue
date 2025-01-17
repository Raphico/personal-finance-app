<script setup>
import { useTemplateRef, reactive } from "vue";

const { size } = defineProps({
  size: {
    type: Number,
    default: 6,
  },
});

const emit = defineEmits(["complete"]);

const otpValues = reactive(Array(size).fill(null));
const otp = useTemplateRef("otp");

function onkeyup(event, index) {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    const nextInput = otp.value.children[index].nextElementSibling;

    otpValues[index] = key;

    if (nextInput) {
      nextInput.focus();
      return;
    }

    emit("complete", otpValues.join(""));
  }

  if (key == "Backspace" || key == "Delete") {
    const prevInput = otp.value.children[index].previousElementSibling;

    if (otpValues[index]) {
      otpValues[index] = null;
      return;
    }

    if (prevInput) {
      otpValues[index - 1] = null;
      prevInput.focus();
    }
  }
}
</script>

<template>
  <div class="inputs-container" ref="otp">
    <input
      class="text-preset-4-regular"
      v-for="(_, index) in otpValues"
      :key="index"
      :value="otpValues[index] ?? ''"
      type="text"
      :tabindex="index == 0 ? 0 : -1"
      @keyup="onkeyup($event, index)"
      maxlength="1"
      :aria-label="`OTP digit ${index + 1} of ${otpValues.length}`"
      :data-test="`input-${index + 1}`"
    />
  </div>
</template>

<style scoped>
.inputs-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-150);
}

input {
  width: 100%;
  height: 55px;
  border: 1px solid var(--clr-beige-500);
  border-radius: 8px;
  text-align: center;
  pointer-events: all;
  cursor: pointer;
  outline: 0;
  transition: var(--transition-duration) var(--transition-easing);
  -webkit-transition: var(--transition-duration) var(--transition-easing);
}

@media (max-width: 700px) {
  input {
    height: 45px;
  }
}

input:focus {
  box-shadow: 0 0 0 var(--ring-offset-width) var(--clr-grey-900);
}
</style>

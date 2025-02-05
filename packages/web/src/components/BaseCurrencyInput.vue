<script setup>
import { ref } from "vue";
import BaseInput from "./BaseInput.vue";

const parsedAmount = ref("");
const amount = ref("");

const emits = defineEmits(["complete"]);

function onblur() {
  if (!amount.value) return;
  parsedAmount.value = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount.value);
  emits("complete", amount);
}

function onfocus() {
  parsedAmount.value = amount.value;
}

function onkeydown(event) {
  const key = event.key;
  const cursorPosition = event.target.selectionStart;

  if (/^[0-9]$/.test(key)) {
    amount.value += key;
  }

  if (key == "Backspace" || key == "Delete") {
    event.preventDefault();
    amount.value =
      amount.value.slice(0, cursorPosition - 1) +
      amount.value.slice(cursorPosition);
  }

  parsedAmount.value = amount.value;
}
</script>

<template>
  <div class="currency-input-container">
    <span class="currency-symbol text-preset-4-regular">$</span>
    <BaseInput
      type="text"
      :value="parsedAmount"
      @keydown="onkeydown"
      @focus.prevent="onfocus"
      @blur.prevent="onblur"
    />
  </div>
</template>

<style scoped>
.currency-input-container {
  position: relative;
}
.currency-input-container input {
  padding-left: var(--spacing-400);
}
.currency-symbol {
  position: absolute;
  top: 12.5px;
  color: var(--clr-beige-500);
  left: 16px;
}
</style>

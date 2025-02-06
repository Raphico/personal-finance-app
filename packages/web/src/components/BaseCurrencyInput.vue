<script setup>
import { ref } from "vue";
import BaseInput from "./BaseInput.vue";

const props = defineProps({
  defaultValue: {
    type: String,
    default: "",
  },
});

const parsedAmount = ref(parseAmount(props.defaultValue));
const amount = ref(props.defaultValue);

const emits = defineEmits(["complete"]);

function parseAmount(amount) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  }).format(amount);
}

function onblur() {
  if (!amount.value) return;
  parsedAmount.value = parseAmount(amount.value);
  emits("complete", amount);
}

function onfocus() {
  parsedAmount.value = amount.value;
}

function onkeydown(event) {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    amount.value = parsedAmount.value;
  }
}
</script>

<template>
  <div class="currency-input-container">
    <span class="currency-symbol text-preset-4-regular">$</span>
    <BaseInput
      type="text"
      v-model="parsedAmount"
      @keyup="onkeydown"
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

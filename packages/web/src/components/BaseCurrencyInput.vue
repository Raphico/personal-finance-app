<script setup>
import { ref, computed } from "vue";
import BaseInput from "./BaseInput.vue";

defineOptions({
  inheritAttrs: false,
});

const model = defineModel({ default: "" });
const isFocused = ref(false);
const displayValue = computed({
  get() {
    return isFocused.value ? model.value : parseAmount(model.value);
  },
  set(value) {
    model.value = value;
  },
});

function parseAmount(amount) {
  const num = parseFloat(amount);
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function onBlur() {
  isFocused.value = false;
}

function onFocus() {
  isFocused.value = true;
}
</script>

<template>
  <div class="currency-input-container">
    <span class="currency-symbol text-preset-4-regular">$</span>
    <BaseInput
      type="text"
      v-model="displayValue"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus"
      autocomplete="off"
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

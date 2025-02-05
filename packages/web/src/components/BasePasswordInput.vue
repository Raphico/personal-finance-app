<script setup>
import { computed, reactive } from "vue";
import IconShowPassword from "./Icons/IconShowPassword.vue";
import IconHidePassword from "./Icons/IconHidePassword.vue";
import BaseInput from "./BaseInput.vue";

defineOptions({
  inheritAttrs: false,
});

let state = reactive({
  showPassword: false,
});

function toggleShowPassword() {
  state.showPassword = !state.showPassword;
}

const getIcon = computed(() =>
  state.showPassword ? IconHidePassword : IconShowPassword
);
const getInputType = computed(() => (state.showPassword ? "text" : "password"));
const getButtonLabel = computed(() =>
  state.showPassword ? "Hide password" : "Show password"
);
</script>

<template>
  <div class="password-input-container">
    <BaseInput
      :type="getInputType"
      v-bind="$attrs"
      data-test="password-input"
    />
    <button
      :aria-label="getButtonLabel"
      @click="toggleShowPassword"
      type="button"
      data-test="password-visibility-toggle"
    >
      <component :is="getIcon" />
    </button>
  </div>
</template>

<style scoped>
.password-input-container {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
}

.password-input-container input {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

.password-input-container button {
  cursor: pointer;
  border: none;
  background-color: transparent;
  grid-column: 2 / 3;
  align-self: center;
  margin-right: var(--spacing-150);
  grid-row: 1 / 2;
}
</style>

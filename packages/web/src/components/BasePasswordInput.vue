<script setup>
import { computed, reactive } from "vue";
import IconShowPassword from "./Icons/IconShowPassword.vue";
import IconHidePassword from "./Icons/IconHidePassword.vue";

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
  <div class="container">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input :type="getInputType" v-bind="$attrs" data-test="password-input" />
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
.container {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
}

input {
  display: block;
  height: 45px;
  border: 1px solid var(--clr-beige-500);
  border-radius: 8px;
  padding: 0 var(--spacing-200);
  outline: none;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

input:focus {
  border: 2px solid var(--clr-grey-500);
}

button {
  cursor: pointer;
  border: none;
  background-color: transparent;
  grid-column: 2 / 3;
  align-self: center;
  margin-right: var(--spacing-150);
  grid-row: 1 / 2;
}
</style>

<script setup>
const { variant } = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator(value) {
      return [
        "primary",
        "secondary",
        "tertiary",
        "destroy",
        "outline",
        "ghost",
      ].includes(value);
    },
  },
  size: {
    type: String,
    default: "default",
    validator(value) {
      return ["default", "icon", "md", "sm"].includes(value);
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="{
      button: true,
      [`${variant}-button`]: true,
      [size]: true,
      'text-preset-4-bold': variant != 'tertiary' && variant != 'outline',
      'text-preset-4-regular': variant == 'tertiary' || variant == 'outline',
    }"
  >
    <span aria-hidden="true" class="loader" v-if="loading"></span>
    <slot v-else />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition-property: background, color, border, opacity;
  transition-timing-function: var(--transition-easing);
  transition-duration: var(--transition-duration);
  text-transform: capitalize;
  padding: 0;
}

.default {
  height: 52px;
  padding: var(--spacing-250);
}

.md {
  height: 45px;
  padding: var(--spacing-200);
}

.sm {
  height: 32px;
  padding: 0 var(--spacing-150);
}

.icon {
  height: 36px;
  width: 36px;
}

.button:disabled {
  pointer-events: none;
}

.primary-button {
  background-color: var(--clr-grey-900);
  color: var(--clr-white);
}

.primary-button:hover,
.primary-button:disabled {
  background-color: var(--clr-grey-500);
}

.secondary-button {
  background-color: var(--clr-beige-100);
  color: var(--clr-grey-900);
  border: 1px solid transparent;
}

.secondary-button:hover {
  background-color: transparent;
  border-color: var(--clr-beige-500);
}

.tertiary-button {
  padding: 0;
  height: auto;
  background-color: transparent;
  color: var(--clr-grey-500);
}

.tertiary-button:hover {
  color: var(--clr-grey-900);
}

.destroy-button {
  background-color: var(--clr-red);
  color: var(--clr-white);
}

.destroy-button:hover {
  opacity: 0.8;
}

.outline-button {
  border: 1px solid var(--clr-beige-500);
  background-color: transparent;
}

.outline-button:hover {
  background-color: var(--clr-beige-100);
  color: var(--clr-grey-900);
  border: 1px solid transparent;
}

.outline-button:disabled {
  color: var(--clr-grey-500);
}

.ghost-button {
  background-color: transparent;
  border: none;
}

.ghost-button:hover {
  background-color: var(--clr-beige-100);
}
</style>

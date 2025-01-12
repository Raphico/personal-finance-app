<script setup>
import { computed } from "vue";

const { variant } = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary", "tertiary", "destroy"].includes(value);
    },
  },
});

const buttonClasses = computed(() => ({
  button: true,
  [`${variant}-button`]: true,
  "text-preset-4-bold": variant != "tertiary",
  "text-preset-4-regular": variant == "tertiary",
}));
</script>

<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1em;
  border: none;
  border-radius: 8px;
  transition-property: background, color, border, opacity;
  transition-timing-function: var(--transition-easing);
  transition-duration: var(--transition-duration);
  text-transform: capitalize;
}

.primary-button {
  background-color: var(--clr-grey-900);
  color: var(--clr-white);
}

.primary-button:hover,
.primary-button:focus {
  background-color: var(--clr-grey-500);
}

.secondary-button {
  background-color: var(--clr-beige-100);
  color: var(--clr-grey-900);
  border: 1px solid transparent;
}

.secondary-button:hover,
.secondary-button:focus {
  background-color: transparent;
  border-color: var(--clr-beige-500);
}

.tertiary-button {
  padding: 0.2em;
  background-color: transparent;
  color: var(--clr-grey-500);
}

.tertiary-button:hover,
.tertiary-button:focus {
  color: var(--clr-grey-900);
}

.destroy-button {
  background-color: var(--clr-red);
  color: var(--clr-white);
}

.destroy-button:hover,
.destroy-button:focus {
  opacity: 0.8;
}
</style>

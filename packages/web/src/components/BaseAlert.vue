<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "error",
    validator(value) {
      return ["error", "warn"].includes(value);
    },
  },
});
</script>

<template>
  <div role="alert" :data-type="type" aria-live="assertive" class="alert">
    <p class="text-preset-4-regular">{{ message }}</p>
  </div>
</template>

<style scoped>
.alert[data-type="error"] {
  --alert-bg: #ffe4e1;
  --alert-fg: #d8000c;
}
.alert {
  padding: var(--spacing-50) var(--spacing-200);
  border-radius: 8px;
  background: var(--alert-bg);
  color: var(--alert-fg);
}

.alert p::first-letter {
  text-transform: capitalize;
}
</style>

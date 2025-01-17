<script setup>
defineProps({
  message: {
    type: String,
  },
});
</script>

<template>
  <span class="message text-preset-5-bold" aria-live="polite">{{
    message
  }}</span>
</template>

<style scoped>
.message {
  color: var(--clr-red);
  text-align: right;
}

.message::first-letter {
  text-transform: capitalize;
}
</style>

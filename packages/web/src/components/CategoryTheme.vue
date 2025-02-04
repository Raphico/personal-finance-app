<script setup>
defineProps({
  theme: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span :style="`--color: var(--clr-${theme})`" class="theme"></span>
</template>

<style setup>
.theme {
  --color: var(--clr-green);

  display: inline-block;
  background-color: var(--color);
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
</style>

<script setup>
import BaseButton from "./components/BaseButton.vue";
import IconCaretRight from "./components/Icons/IconCaretRight.vue";
</script>

<template>
  <div class="button-containers">
    <BaseButton variant="primary">placeholder</BaseButton>
    <BaseButton variant="secondary">placeholder</BaseButton>
    <BaseButton variant="tertiary">
      placeholder
      <IconCaretRight />
    </BaseButton>
    <BaseButton variant="destroy">placeholder</BaseButton>
  </div>
</template>

<style scoped>
.button-containers {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

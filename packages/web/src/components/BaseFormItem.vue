<template>
  <div class="form-item">
    <slot />
  </div>
</template>

<style scoped>
.form-item {
  display: grid;
  gap: var(--spacing-50);
}
</style>

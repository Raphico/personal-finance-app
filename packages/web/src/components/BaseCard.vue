<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card {
  display: grid;
  gap: var(--spacing-200);
  border-radius: 12px;
  background-color: var(--clr-white);
  box-shadow: var(--box-shadow);
  padding: var(--spacing-300);
}

@media (min-width: 768px) {
  .card {
    padding: var(--spacing-400);
  }
}
</style>

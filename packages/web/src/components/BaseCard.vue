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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  padding: var(--spacing-250);
}
</style>

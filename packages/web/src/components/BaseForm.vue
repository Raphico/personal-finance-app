<template>
  <form>
    <slot />
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: var(--spacing-200);
}
</style>

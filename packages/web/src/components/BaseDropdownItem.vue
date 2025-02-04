<template>
  <div role="menuitem" tabindex="-1">
    <slot />
  </div>
</template>

<style scoped>
[role="menuitem"] {
  cursor: pointer;
  text-transform: capitalize;
  transition: all var(--transition-duration) var(--transition-easing);
}

[role="menuitem"]:hover {
  opacity: 0.8;
}
</style>

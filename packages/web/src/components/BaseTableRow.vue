<template>
  <tr>
    <slot />
  </tr>
</template>

<style scoped>
tr {
  border-bottom: 1px solid var(--clr-grey-100);
  transition: background var(--transition-duration) var(--transition-easing);
}

tr:last-of-type {
  border-bottom: 0;
}

tr:hover {
  background-color: var(--clr-grey-100);
}
</style>

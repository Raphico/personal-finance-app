<template>
  <th scope="col" class="text-preset-5-regular">
    <slot />
  </th>
</template>

<style scoped>
th {
  color: var(--clr-grey-500);
  text-align: left;
  padding: var(--spacing-200);
  text-transform: capitalize;
}

th {
  border-bottom: 1px solid var(--clr-grey-100);
}
</style>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
  <label class="text-preset-5-bold">
    <slot />
  </label>
</template>

<style scoped>
label {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}

label[data-error="true"] {
  color: var(--clr-red);
}
</style>

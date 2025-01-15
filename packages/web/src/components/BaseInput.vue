<template>
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <input class="text-preset-4-regular" />
</template>

<style scoped>
input {
  display: block;
  height: 45px;
  border: 1px solid var(--clr-beige-500);
  border-radius: 8px;
  padding: 0 var(--spacing-200);
  outline: none;
  transition: var(--transition-duration) var(--transition-easing);
  -webkit-transition: var(--transition-duration) var(--transition-easing);
}

input:focus {
  box-shadow: 0 0 0 var(--ring-offset-width) var(--clr-grey-900);
}
</style>

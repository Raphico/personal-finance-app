<template>
  <a class="link text-preset-4-regular" href="#">
    <slot />
  </a>
</template>

<style>
.link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  height: auto;
  background-color: transparent;
  color: var(--clr-grey-500);
  cursor: pointer;
  border: none;
  transition-property: background, color, border, opacity;
  transition-timing-function: var(--transition-easing);
  transition-duration: var(--transition-duration);
  text-transform: capitalize;
  text-decoration: none;
}

.link:disabled {
  pointer-events: none;
  background-color: var(--clr-grey-500);
}

.link:hover,
.link:focus {
  color: var(--clr-grey-900);
}
</style>

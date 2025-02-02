<script setup>
import { selectRandomColor } from "@/utils/helpers";

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <dl>
    <div
      v-for="item in items"
      :key="item.term"
      :style="`--color: var(--clr-${selectRandomColor()})`"
    >
      <dt class="text-preset-5-regular">{{ item.term }}</dt>
      <dd class="text-preset-4-bold">{{ item.description }}</dd>
    </div>
  </dl>
</template>

<style scoped>
dl {
  display: grid;
  width: 100%;
  gap: var(--spacing-200);
}

dl dt {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}

dl > * {
  position: relative;
  padding-left: var(--spacing-200);
}

dl > *::before {
  position: absolute;
  content: "";
  width: 4px;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--color);
  border-radius: 8px;
}
</style>

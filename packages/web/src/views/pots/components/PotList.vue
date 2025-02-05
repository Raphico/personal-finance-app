<script setup>
import PotListCard from "./PotListCard.vue";

defineProps({
  pots: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="pot-list">
    <PotListCard v-for="pot in pots" :key="pot.id" :pot="pot" />
  </div>
</template>

<style setup>
.pot-list {
  display: grid;
  gap: var(--spacing-200);
}

@media (min-width: 1024px) {
  .pot-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

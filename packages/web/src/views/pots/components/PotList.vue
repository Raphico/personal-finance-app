<script setup>
import IconPot from "@/components/Icons/IconPot.vue";
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
    <div v-if="pots.length == 0" class="pot-list__empty" role="status">
      <IconPot class="pot-list__empty-icon" />
      <p>No pots yet! Create a new pot to start saving for your goals</p>
    </div>
    <PotListCard v-for="pot in pots" :key="pot.id" :pot="pot" />
  </div>
</template>

<style setup>
.pot-list {
  display: grid;
  gap: var(--spacing-200);
}

.pot-list__empty {
  display: grid;
  place-content: center;
  text-align: center;
  height: 200px;
  color: var(--clr-grey-500);
  gap: var(--spacing-100);
}

.pot-list__empty p {
  max-width: 380px;
  margin: 0 auto;
}

.pot-list__empty-icon {
  justify-self: center;
}

@media (min-width: 1024px) {
  .pot-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .pot-list__empty {
    grid-column: 1 / -1;
  }
}
</style>

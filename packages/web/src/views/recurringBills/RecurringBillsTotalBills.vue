<script setup lang="ts">
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import IconRecurringBills from "@/components/Icons/IconRecurringBills.vue";
import { formatCurrency } from "@/utils/helpers";

defineProps({
  totalBills: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <BaseCard class="total-bills-card">
    <div class="icon-container">
      <IconRecurringBills />
    </div>
    <BaseCardTitle class="text-preset-4-regular">Total Bills</BaseCardTitle>
    <p class="text-preset-1">{{ formatCurrency(totalBills) }}</p>
  </BaseCard>
</template>

<style scoped>
@media (max-width: 768px) {
  .total-bills-card {
    grid-template-columns: 50px 1fr;
    grid-template-rows: repeat(2, auto);
  }

  .icon-container {
    grid-row: 1 / -1;
    margin: auto;
    margin-left: 0;
  }

  .total-bills-card p {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  .total-bills-card h2 {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
}

@media (min-width: 768px) {
  .icon-container {
    margin-block: var(--spacing-200) var(--spacing-400);
  }
}
.total-bills-card {
  background-color: var(--clr-grey-900);
  color: var(--clr-white);
  gap: var(--spacing-100);
}

.total-bills-card p {
  margin: 0;
}
</style>

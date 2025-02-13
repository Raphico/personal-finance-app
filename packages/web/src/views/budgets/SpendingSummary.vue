<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import { formatCurrency } from "@/utils/helpers";

defineProps({
  summary: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <BaseCard class="spending-summary">
    <div class="spending-summary__chart"></div>
    <BaseCardTitle class="spending-summary__header"
      >spending summary</BaseCardTitle
    >
    <DescriptionList :items="summary" class="spending-summary__list">
      <template #term="{ item }">
        <span class="text-preset-4-regular">{{
          item.category.split("-").join(" ")
        }}</span>
      </template>
      <template #description="{ item }">
        <span class="text-preset-3"
          >{{ formatCurrency(item.amountSpent, "USD") }} </span
        >{{}}
        <span class="spending-summary__list-budget text-preset-5-regular"
          >of {{ formatCurrency(item.maximumSpend, "USD") }}</span
        >
      </template>
    </DescriptionList>
  </BaseCard>
</template>

<style scoped>
.spending-summary__chart {
  background-color: var(--clr-beige-100);
  width: 240px;
  height: 240px;
  border-radius: 50%;
  justify-self: center;
  margin-block: var(--spacing-250) var(--spacing-400);
}

.spending-summary__list {
  gap: var(--spacing-250);
}

.spending-summary__list > * {
  display: flex;
  justify-content: space-between;
}

.spending-summary__list-budget {
  color: var(--clr-grey-500);
}

@media (min-width: 768px) and (max-width: 1023px) {
  .spending-summary {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    align-items: start;
    gap: var(--spacing-100);
    padding: var(--spacing-500);
  }

  .spending-summary__chart {
    justify-self: start;
    grid-row: 1 / -1;
    grid-column: 1 / 2;
    margin-block: 0;
  }

  .spending-summary__header {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    align-self: end;
  }

  .spending-summary__list {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
}
</style>

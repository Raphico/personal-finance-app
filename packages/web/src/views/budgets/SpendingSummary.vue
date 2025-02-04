<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import { formatCurrency } from "@/utils/helpers";

const spendingSummary = [
  { category: "entertainment", spent: 50.0, budget: 200 },
  { category: "bills", spent: 750.0, budget: 800 },
  { category: "dinning out", spent: 100, budget: 250 },
  { category: "personal care", spent: 100, budget: 144 },
];
</script>

<template>
  <BaseCard id="spending-summary-card" class="spending-summary-card">
    <div class="budgets-chart"></div>
    <BaseCardTitle>spending summary</BaseCardTitle>
    <DescriptionList :items="spendingSummary" class="spending-summary">
      <template #term="{ item }">
        <span class="text-preset-4-regular">{{ item.category }}</span>
      </template>
      <template #description="{ item }">
        <span class="text-preset-3"
          >{{ formatCurrency(item.spent, "USD") }} </span
        >{{}}
        <span class="budget text-preset-5-regular"
          >of {{ formatCurrency(item.budget, "USD") }}</span
        >
      </template>
    </DescriptionList>
  </BaseCard>
</template>

<style scoped>
.budgets-chart {
  background-color: var(--clr-beige-100);
  width: 240px;
  height: 240px;
  border-radius: 50%;
  justify-self: center;
  margin-block: var(--spacing-250) var(--spacing-400);
}

.spending-summary {
  gap: var(--spacing-250);
}

.spending-summary > * {
  display: flex;
  justify-content: space-between;
}

.spending-summary .budget {
  color: var(--clr-grey-500);
}

@media (min-width: 768px) and (max-width: 1023px) {
  #spending-summary-card {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    align-items: start;
    gap: var(--spacing-100);
    padding: var(--spacing-500);
  }

  .budgets-chart {
    justify-self: start;
    grid-row: 1 / -1;
    grid-column: 1 / 2;
    margin-block: 0;
  }

  .spending-summary-card h2 {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    align-self: end;
  }

  .spending-summary {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
}
</style>

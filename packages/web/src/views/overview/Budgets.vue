<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";
import { formatCurrency } from "@/utils/helpers";

const budgets = [
  { category: "entertainment", amount: 50.0 },
  { category: "bills", amount: 750.0 },
  { category: "dinning out", amount: 100 },
  { category: "personal care", amount: 100 },
];
</script>

<template>
  <BaseCard class="budgets-card">
    <BaseCardTitle>Budgets</BaseCardTitle>
    <BaseButton variant="tertiary">
      see details
      <IconCaretRight />
    </BaseButton>
    <div class="budgets-chart"></div>
    <DescriptionList
      class="budgets-list"
      :items="
        budgets.map((budget) => ({
          term: budget.category,
          description: formatCurrency(budget.amount, 'USD'),
        }))
      "
    />
  </BaseCard>
</template>

<style scoped>
.budgets-card {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--spacing-250);
}

.budgets-card button {
  justify-content: flex-end;
}

.budgets-chart {
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  background-color: var(--clr-beige-100);
  width: 240px;
  height: 240px;
  border-radius: 50%;
  justify-self: center;
}

.budgets-list {
  grid-template-columns: repeat(2, 1fr);
  grid-row: 3 / 4;
  grid-column: 1 / -1;
}
</style>

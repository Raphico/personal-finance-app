<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import { formatCurrency } from "@/utils/helpers";

const summaryData = [
  { title: "current balance", amount: 4836.0 },
  { title: "income", amount: 3814.25 },
  { title: "expenses", amount: 1700.5 },
];
</script>

<template>
  <div class="summary-container">
    <BaseCard
      v-for="item in summaryData"
      :key="item.title"
      class="summary-card"
    >
      <BaseCardTitle class="text-preset-4-regular">{{
        item.title
      }}</BaseCardTitle>
      <p class="text-preset-1">{{ formatCurrency(item.amount, "USD") }}</p>
    </BaseCard>
  </div>
</template>

<style scoped>
.summary-container * + * {
  margin-top: var(--spacing-150);
}
.summary-card:first-of-type {
  background-color: var(--clr-grey-900);
  color: var(--clr-white);
}

.summary-card:not(:first-of-type) h2 {
  color: var(--clr-grey-500);
}

.summary-card {
  gap: var(--spacing-150);
}

.summary-card p {
  margin: 0;
}
</style>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import Transactions from "./Transactions.vue";
import Pots from "./Pots.vue";
import Summary from "./Summary.vue";
import Budgets from "./Budgets.vue";
import RecurringBills from "./RecurringBills.vue";
</script>

<template>
  <div class="overview-container">
    <header>
      <PageHeader>Overview</PageHeader>
    </header>

    <Summary />

    <div class="overview-main">
      <Pots />
      <Transactions />
      <Budgets />
      <RecurringBills />
    </div>
  </div>
</template>

<style scoped>
.overview-container h1 {
  margin: 0;
}

.overview-container {
  display: grid;
  gap: var(--spacing-400);
}

.overview-main {
  display: grid;
  gap: var(--spacing-200);
}

@media (min-width: 1100px) {
  .overview-main {
    grid-template-columns: 1.25fr 1fr;
    grid-template-rows: repeat(3, auto);
  }

  .overview-main > :first-child {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .overview-main > :nth-child(2) {
    grid-row: 2 / 4;
    grid-column: 1 / 2;
  }

  .overview-main > :nth-child(3) {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }

  .overview-main > :last-child {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
  }
}
</style>

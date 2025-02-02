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
</style>

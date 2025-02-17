<script setup>
import PageHeader from "@/components/PageHeader.vue";
import OverviewPots from "./OverviewPots.vue";
import OverviewSummary from "./OverviewSummary.vue";
import OverviewBudgets from "./OverviewBudgets.vue";
import OverviewRecurringBills from "./OverviewRecurringBills.vue";
import { useHead } from "@unhead/vue";
import OverviewTransactions from "./OverviewTransactions.vue";
import { auth } from "@/api/auth";

useHead({
  title: "Overview - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app overview page",
    },
  ],
});
</script>

<template>
  <button @click="auth.logout()">logout</button>
  <div class="overview">
    <header>
      <PageHeader class="overview__header">Overview</PageHeader>
    </header>

    <OverviewSummary />

    <div class="overview__main-content">
      <OverviewPots />
      <OverviewTransactions />
      <OverviewBudgets />
      <OverviewRecurringBills />
    </div>
  </div>
</template>

<style scoped>
.overview {
  display: grid;
  gap: var(--spacing-400);
}

.overview__main-content {
  display: grid;
  gap: var(--spacing-200);
}

.overview__header {
  margin: 0;
}

@media (min-width: 1300px) {
  .overview__main-content {
    grid-template-columns: 1.25fr 1fr;
    grid-template-rows: repeat(3, auto);
  }

  .overview__main-content > :first-child {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .overview__main-content > :nth-child(2) {
    grid-row: 2 / 4;
    grid-column: 1 / 2;
  }

  .overview__main-content > :nth-child(3) {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
  }

  .overview__main-content > :last-child {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
  }
}
</style>

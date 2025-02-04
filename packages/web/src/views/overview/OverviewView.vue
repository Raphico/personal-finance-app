<script setup>
import PageHeader from "@/components/PageHeader.vue";
import OverviewPots from "./OverviewPots.vue";
import OverviewSummary from "./OverviewSummary.vue";
import OverviewBudgets from "./OverviewBudgets.vue";
import OverviewRecurringBills from "./OverviewRecurringBills.vue";
import TransactionsTable from "@/components/TransactionsTable.vue";

const transactions = [
  {
    name: "Movie Tickets",
    amount: -15.0,
    date: "2024-04-18",
  },
  {
    name: "Game shop",
    amount: -20.0,
    date: "2024-04-18",
  },
  {
    name: "Salary",
    amount: 1500.0,
    date: "2024-04-20",
  },
  {
    name: "Family gift",
    amount: 200.0,
    date: "2024-04-20",
  },
  {
    name: "Electricity Bill",
    amount: -100.0,
    date: "2024-04-20",
  },
  {
    name: "Haircut",
    amount: -200.0,
    date: "2024-04-20",
  },
];
</script>

<template>
  <div class="overview-container">
    <header>
      <PageHeader>Overview</PageHeader>
    </header>

    <OverviewSummary />

    <div class="overview-main">
      <OverviewPots />
      <TransactionsTable
        link-text="see all"
        title="transactions"
        :transactions="transactions"
      />
      <OverviewBudgets />
      <OverviewRecurringBills />
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

@media (min-width: 1300px) {
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

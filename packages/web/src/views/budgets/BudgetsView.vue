<script setup>
import PageHeader from "@/components/PageHeader.vue";
import SpendingSummary from "./SpendingSummary.vue";
import BudgetList from "./components/BudgetList.vue";
import AddNewBudgetModal from "./components/AddNewBudgetModal.vue";

const budgets = [
  {
    id: 1,
    category: "entertainment",
    amount: 50.0,
    theme: "green",
    spent: 15.0,
    latestSpending: [
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
    ],
  },
  {
    id: 2,
    category: "bills",
    amount: 200.0,
    theme: "blue",
    spent: 100.0,
    latestSpending: [
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
    ],
  },
  {
    id: 3,
    category: "dining out",
    amount: 75.0,
    theme: "orange",
    spent: 30.0,
    latestSpending: [
      {
        name: "Dinner at Italian Bistro",
        amount: -30.0,
        date: "2024-04-22",
      },
      {
        name: "Dinner at Italian Bistro",
        amount: -30.0,
        date: "2024-04-22",
      },
    ],
  },
  {
    id: 4,
    category: "personal care",
    amount: 100.0,
    theme: "purple",
    spent: 40.0,
    latestSpending: [
      {
        name: "Haircut & Styling",
        amount: -40.0,
        date: "2024-04-25",
      },
      {
        name: "Haircut & Styling",
        amount: -40.0,
        date: "2024-04-25",
      },
    ],
  },
];
</script>

<template>
  <div class="budgets-container">
    <header>
      <PageHeader>Budgets</PageHeader>
      <AddNewBudgetModal />
    </header>

    <div class="content">
      <SpendingSummary />
      <BudgetList :budgets="budgets" />
    </div>
  </div>
</template>

<style scoped>
.budgets-container {
  display: grid;
  gap: var(--spacing-400);
}

.budgets-container .content {
  display: grid;
  gap: var(--spacing-300);
}

.budgets-container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}

@media (min-width: 1024px) {
  .budgets-container .content {
    grid-template-columns: 1fr 1.5fr;
    align-items: start;
  }
}
</style>

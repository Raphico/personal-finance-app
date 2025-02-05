<script setup>
import PageHeader from "@/components/PageHeader.vue";
import TransactionsTable from "./TransactionsTable.vue";
import AddNewTransactionModal from "./components/AddNewTransactionModal.vue";

const transactions = [
  {
    id: 1,
    name: "Freelance Payment",
    category: "General",
    date: "2024-08-19",
    amount: 75.5,
  },
  {
    id: 2,
    name: "Dinner at Restaurant",
    category: "Dining Out",
    date: "2024-08-19",
    amount: -55.5,
  },
  {
    id: 3,
    name: "Gas Bill",
    category: "General",
    date: "2024-08-18",
    amount: -42.3,
  },
  {
    id: 4,
    name: "Side Job Income",
    category: "General",
    date: "2024-08-17",
    amount: 120.0,
  },
  {
    id: 5,
    name: "Clothing Shopping",
    category: "General",
    date: "2024-08-17",
    amount: -65.0,
  },
  {
    id: 6,
    name: "Supermarket Groceries",
    category: "Groceries",
    date: "2024-08-15",
    amount: 65.75,
  },
  {
    id: 7,
    name: "Gift from Friend",
    category: "General",
    date: "2024-08-14",
    amount: 50.0,
  },
  {
    id: 8,
    name: "Lunch at Cafe",
    category: "Dining Out",
    date: "2024-08-13",
    amount: -32.5,
  },
  {
    id: 9,
    name: "Movie Ticket",
    category: "Entertainment",
    date: "2024-08-11",
    amount: -5.0,
  },
  {
    id: 10,
    name: "Concert Ticket",
    category: "Entertainment",
    date: "2024-08-11",
    amount: -10.0,
  },
  {
    id: 11,
    name: "New Shoes",
    category: "Shopping",
    date: "2024-08-10",
    amount: -80.0,
  },
  {
    id: 12,
    name: "Doctor Visit",
    category: "Health",
    date: "2024-08-09",
    amount: -120.5,
  },
  {
    id: 13,
    name: "Flight Ticket",
    category: "Travel",
    date: "2024-08-08",
    amount: -200.0,
  },
  {
    id: 14,
    name: "Monthly Salary",
    category: "Salary",
    date: "2024-08-07",
    amount: 2000.0,
  },
  {
    id: 15,
    name: "Grocery Shopping",
    category: "Groceries",
    date: "2024-08-06",
    amount: -75.0,
  },
  {
    id: 16,
    name: "Streaming Subscription",
    category: "Entertainment",
    date: "2024-08-05",
    amount: -15.0,
  },
  {
    id: 17,
    name: "Dinner with Friends",
    category: "Dining Out",
    date: "2024-08-04",
    amount: -40.0,
  },
  {
    id: 18,
    name: "Monthly Rent",
    category: "Rent",
    date: "2024-08-03",
    amount: -1000.0,
  },
  {
    id: 19,
    name: "Book Purchase",
    category: "General",
    date: "2024-08-02",
    amount: 30.0,
  },
  {
    id: 20,
    name: "Savings Deposit",
    category: "Savings",
    date: "2024-08-01",
    amount: 500.0,
  },
];
</script>

<template>
  <div class="transactions-container">
    <header>
      <PageHeader>Transactions</PageHeader>
      <AddNewTransactionModal />
    </header>

    <TransactionsTable :transactions="transactions" />
  </div>
</template>

<style scoped>
h1 {
  margin: 0;
}

.transactions-container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-400);
}
</style>

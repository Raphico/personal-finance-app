<script setup>
import PageHeader from "@/components/PageHeader.vue";
import TransactionsTable from "./TransactionsTable.vue";

const transactions = [
  {
    id: 1,
    category: "General",
    date: "2024-08-19",
    amount: 75.5,
    theme: "green",
  },
  {
    id: 2,
    category: "Dining Out",
    date: "2024-08-19",
    amount: -55.5,
    theme: "yellow",
  },
  {
    id: 3,
    category: "General",
    date: "2024-08-18",
    amount: -42.3,
    theme: "cyan",
  },
  {
    id: 4,
    category: "General",
    date: "2024-08-17",
    amount: 120.0,
    theme: "navy",
  },
  {
    id: 5,
    category: "General",
    date: "2024-08-17",
    amount: -65.0,
    theme: "red",
  },
  {
    id: 6,
    category: "Groceries",
    date: "2024-08-15",
    amount: 65.75,
    theme: "purple",
  },
  {
    id: 7,
    category: "General",
    date: "2024-08-14",
    amount: 50.0,
    theme: "pink",
  },
  {
    id: 8,
    category: "Dining Out",
    date: "2024-08-13",
    amount: -32.5,
    theme: "turquoise",
  },
  {
    id: 9,
    category: "Entertainment",
    date: "2024-08-11",
    amount: -5.0,
    theme: "brown",
  },
  {
    id: 10,
    category: "Entertainment",
    date: "2024-08-11",
    amount: -10.0,
    theme: "magenta",
  },
  {
    id: 11,
    category: "Shopping",
    date: "2024-08-10",
    amount: -80.0,
    theme: "blue",
  },
  {
    id: 12,
    category: "Health",
    date: "2024-08-09",
    amount: -120.5,
    theme: "navy-grey",
  },
  {
    id: 13,
    category: "Travel",
    date: "2024-08-08",
    amount: -200.0,
    theme: "army-green",
  },
  {
    id: 14,
    category: "Salary",
    date: "2024-08-07",
    amount: 2000.0,
    theme: "gold",
  },
  {
    id: 15,
    category: "Groceries",
    date: "2024-08-06",
    amount: -75.0,
    theme: "orange",
  },
  {
    id: 16,
    category: "Entertainment",
    date: "2024-08-05",
    amount: -15.0,
    theme: "yellow",
  },
  {
    id: 17,
    category: "Dining Out",
    date: "2024-08-04",
    amount: -40.0,
    theme: "cyan",
  },
  {
    id: 18,
    category: "Rent",
    date: "2024-08-03",
    amount: -1000.0,
    theme: "red",
  },
  {
    id: 19,
    category: "General",
    date: "2024-08-02",
    amount: 30.0,
    theme: "pink",
  },
  {
    id: 20,
    category: "Savings",
    date: "2024-08-01",
    amount: 500.0,
    theme: "turquoise",
  },
];
</script>

<template>
  <div class="transactions-container">
    <header>
      <PageHeader>Transactions</PageHeader>
    </header>

    <TransactionsTable :transactions="transactions" />
  </div>
</template>

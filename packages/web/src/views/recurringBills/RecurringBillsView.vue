<script setup>
import PageHeader from "@/components/PageHeader.vue";
import RecurringBillsTotalBills from "./RecurringBillsTotalBills.vue";
import { useHead } from "@unhead/vue";
import RecurringBillsSummary from "./RecurringBillsSummary.vue";
import RecurringBillsTable from "./RecurringBillsTable.vue";

useHead({
  title: "Recurring Bills - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app recurring bills page",
    },
  ],
});

const recurringBills = [
  { name: "Rent", dueDate: "monthly-1st", amount: 1200, status: "paid" },
  { name: "Electricity", dueDate: "monthly-10th", amount: 100, status: "paid" },
  { name: "Internet", dueDate: "monthly-15th", amount: 50, status: "paid" },
  {
    name: "Gym Membership",
    dueDate: "monthly-20th",
    amount: 30,
    status: "paid",
  },
  { name: "Insurance", dueDate: "monthly-25th", amount: 150, status: "paid" },
  { name: "Water", dueDate: "monthly-5th", amount: 80, status: "paid" },
  { name: "Netflix", dueDate: "monthly-1st", amount: 15, status: "paid" },
  { name: "Spotify", dueDate: "monthly-5th", amount: 10, status: "paid" },
  { name: "Hulu", dueDate: "monthly-15th", amount: 12, status: "upcoming" },
  {
    name: "Mobile Phone",
    dueDate: "monthly-10th",
    amount: 60,
    status: "upcoming",
  },
  {
    name: "Car Payment",
    dueDate: "monthly-1st",
    amount: 350,
    status: "upcoming",
  },
  {
    name: "Student Loan",
    dueDate: "monthly-15th",
    amount: 200,
    status: "upcoming",
  },
  {
    name: "Credit Card Payment",
    dueDate: "monthly-20th",
    amount: 100,
    status: "upcoming",
  },
  {
    name: "Property Tax",
    dueDate: "monthly-25th",
    amount: 120,
    status: "upcoming",
  },
  {
    name: "Electricity Bill",
    dueDate: "monthly-10th",
    amount: 50,
    status: "due",
  },
  {
    name: "Trash Collection",
    dueDate: "monthly-5th",
    amount: 25,
    status: "due",
  },
  {
    name: "Streaming Services",
    dueDate: "monthly-1st",
    amount: 45,
    status: "due",
  },
  {
    name: "Health Insurance",
    dueDate: "monthly-1st",
    amount: 200,
    status: "due",
  },
  { name: "Home Security", dueDate: "monthly-5th", amount: 30, status: "due" },
  { name: "Pest Control", dueDate: "monthly-15th", amount: 40, status: "due" },
];

const getTotalBills = recurringBills.reduce(
  (acc, currentBill) => (acc += currentBill.amount),
  0
);

const getRecurringBillsSummary = recurringBills.reduce(
  (acc, currentBill) => {
    const statusIndex = {
      paid: 0,
      upcoming: 1,
      due: 2,
    }[currentBill.status];

    acc[statusIndex].count += 1;
    acc[statusIndex].total += currentBill.amount;

    return acc;
  },
  [
    {
      name: "paid bills",
      count: 0,
      total: 0,
    },
    {
      name: "total upcoming",
      count: 0,
      total: 0,
    },
    {
      name: "due soon",
      count: 0,
      total: 0,
    },
  ]
);
</script>

<template>
  <div class="recurring-bills-container">
    <header>
      <PageHeader>Recurring Bills</PageHeader>
    </header>

    <div class="content">
      <RecurringBillsTotalBills :total-bills="getTotalBills" />
      <RecurringBillsSummary :summary="getRecurringBillsSummary" />
      <RecurringBillsTable :recurring-bills="recurringBills" />
    </div>
  </div>
</template>

<style scoped>
.recurring-bills-container {
  display: grid;
  gap: var(--spacing-400);
}

.recurring-bills-container .content {
  display: grid;
  gap: var(--spacing-300);
}

h1 {
  margin: 0;
}

@media (min-width: 768px) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }

  .content > :last-child {
    grid-column: 1 / -1;
  }
}

@media (min-width: 768px) {
  .content {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto auto;
    align-items: start;
  }

  .content > :last-child {
    grid-row: 1 / -1;
    grid-column: 2 / 3;
  }
}
</style>

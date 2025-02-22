<script setup>
import PageHeader from "@/components/PageHeader.vue";
import RecurringBillsTotalBills from "./RecurringBillsTotalBills.vue";
import { useHead } from "@unhead/vue";
import RecurringBillsSummary from "./RecurringBillsSummary.vue";
import RecurringBillsTable from "./RecurringBillsTable.vue";
import { useToast } from "vue-toast-notification";
import { useQuery } from "@tanstack/vue-query";
import { transactions } from "@/api/transactions";
import { computed, watch } from "vue";
import { QUERY_KEYS } from "@/constants";

useHead({
  title: "Recurring Bills - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app recurring bills page",
    },
  ],
});

const toast = useToast();
const {
  isPending,
  data: recurringBills,
  error,
} = useQuery({
  queryKey: QUERY_KEYS.recurringBills,
  queryFn: fetchRecurringBills,
  staleTime: 300000,
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

async function fetchRecurringBills() {
  const response = await transactions.getRecurringBills();
  return response.data.bills;
}

const getTotalBills = computed(() => {
  if (!recurringBills.value) return;

  return recurringBills.value.reduce(
    (acc, currentBill) => (acc += Number(currentBill.amount)),
    0
  );
});

const getRecurringBillsSummary = computed(() => {
  if (!recurringBills.value) return new Map();

  const summary = new Map();

  for (const bill of recurringBills.value) {
    const status = bill.status;
    const amount = Number(bill.amount);

    if (!summary.has(status)) {
      summary.set(status, { count: 0, total: 0 });
    }

    const current = summary.get(status);
    summary.set(status, {
      count: current.count + 1,
      total: current.total + amount,
    });
  }

  return summary;
});
</script>

<template>
  <div class="recurring-bills">
    <header>
      <PageHeader class="recurring-bills__header">Recurring Bills</PageHeader>
    </header>

    <div aria-live="polite" class="sr-only">
      <span v-if="isPending">Loading recurring bills. Please wait</span>
      <span v-else>Recurring bills loaded</span>
    </div>

    <div class="recurring-bills__content">
      <div
        v-if="isPending"
        class="recurring-bills__loading-total-bills animate-pulse"
      ></div>
      <RecurringBillsTotalBills v-else :total-bills="getTotalBills ?? 0" />

      <div
        v-if="isPending"
        class="recurring-bills__loading-bills-summary animate-pulse"
      ></div>
      <RecurringBillsSummary v-else :summary="getRecurringBillsSummary" />

      <div
        v-if="isPending"
        class="recurring-bills__loading-table animate-pulse"
      ></div>
      <RecurringBillsTable v-else :recurring-bills="recurringBills ?? []" />
    </div>
  </div>
</template>

<style scoped>
.recurring-bills {
  display: grid;
  gap: var(--spacing-400);
}

.recurring-bills__content {
  display: grid;
  gap: var(--spacing-300);
}

.recurring-bills__header {
  margin: 0;
}

.recurring-bills__loading-total-bills {
  width: 100%;
  height: 115px;
  background-color: var(--clr-white);
  border-radius: 8px;
}

.recurring-bills__loading-table {
  width: 100%;
  height: 400px;
  background-color: var(--clr-white);
  border-radius: 8px;
}

.recurring-bills__loading-bills-summary {
  width: 100%;
  height: 200px;
  background-color: var(--clr-white);
  border-radius: 8px;
}

@media (min-width: 768px) {
  .recurring-bills__content {
    grid-template-columns: repeat(2, 1fr);
  }

  .recurring-bills__content > :last-child {
    grid-column: 1 / -1;
  }
}

@media (min-width: 800px) {
  .recurring-bills__content {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto auto;
    align-items: start;
  }

  .recurring-bills__content > :last-child {
    grid-row: 1 / -1;
    grid-column: 2 / 3;
  }
}
</style>

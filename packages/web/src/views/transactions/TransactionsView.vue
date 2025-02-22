<script setup>
import PageHeader from "@/components/PageHeader.vue";
import TransactionsTable from "./TransactionsTable.vue";
import AddNewTransactionModal from "./components/AddNewTransactionModal.vue";
import { useHead } from "@unhead/vue";
import { useToast } from "vue-toast-notification";
import { useQuery } from "@tanstack/vue-query";
import { transactions } from "@/api/transactions";
import { watch } from "vue";
import { QUERY_KEYS } from "@/constants";

useHead({
  title: "Transactions - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app transactions page",
    },
  ],
});

const toast = useToast();
const {
  isPending,
  data: transactionList,
  error,
} = useQuery({
  queryKey: QUERY_KEYS.transactions,
  queryFn: fetchTransactions,
  staleTime: 300000,
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

async function fetchTransactions() {
  const response = await transactions.getList();
  return response.data.transactions;
}
</script>

<template>
  <div class="transactions">
    <header>
      <PageHeader class="transactions__header">Transactions</PageHeader>
      <AddNewTransactionModal />
    </header>

    <div aria-live="polite" class="sr-only">
      <span v-if="isPending">Loading transactions. Please wait</span>
      <span v-else>transactions loaded</span>
    </div>

    <div v-if="isPending" class="transactions__loading animate-pulse"></div>
    <TransactionsTable v-else :transactions="transactionList ?? []" />
  </div>
</template>

<style scoped>
.transactions__header {
  margin: 0;
}

.transactions__loading {
  width: 100%;
  border-radius: 8px;
  height: 700px;
  background-color: var(--clr-white);
}

.transactions header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-400);
}
</style>

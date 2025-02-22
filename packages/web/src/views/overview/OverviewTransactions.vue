<script setup>
import { transactions } from "@/api/transactions";
import { formatCurrency, formatDate, generateId } from "@/utils/helpers";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { watch } from "vue";
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import BaseLink from "@/components/BaseLink.vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseTableBody from "@/components/BaseTableBody.vue";
import BaseTableCell from "@/components/BaseTableCell.vue";
import BaseTableHead from "@/components/BaseTableHead.vue";
import BaseTableHeader from "@/components/BaseTableHeader.vue";
import BaseTableRow from "@/components/BaseTableRow.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";
import IconNavTransactions from "@/components/Icons/IconNavTransactions.vue";
import { QUERY_KEYS } from "@/constants";

const toast = useToast();
const {
  isPending,
  data: transactionList,
  error,
  isError,
} = useQuery({
  queryKey: QUERY_KEYS.overviewTransactions,
  queryFn: fetchTransactions,
  staleTime: 300000,
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

async function fetchTransactions() {
  const response = await transactions.getList({ params: { limit: 5 } });
  return response.data.transactions;
}
</script>

<template>
  <BaseCard class="transactions">
    <BaseCardTitle class="transactions__header">transactions</BaseCardTitle>
    <BaseLink to="/transactions" class="transactions__link">
      see all
      <IconCaretRight />
    </BaseLink>

    <div
      v-if="isPending"
      class="transactions__loading animate-pulse"
      aria-label="Loading transactions"
    ></div>

    <div
      v-else-if="isError || (transactionList && transactionList.length == 0)"
      aria-live="polite"
      class="transactions__empty"
    >
      <IconNavTransactions class="transactions__empty-icon" />
      <p>No recent transactions</p>
    </div>

    <BaseTable v-else class="transactions__table">
      <BaseTableHead class="sr-only">
        <BaseTableRow>
          <BaseTableHeader>name</BaseTableHeader>
          <BaseTableHeader>transaction date</BaseTableHeader>
          <BaseTableHeader>amount</BaseTableHeader>
        </BaseTableRow>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow
          class="transactions__table-body-row"
          v-for="transaction in transactionList"
          :key="generateId({ prefix: transaction.name, length: 4 })"
        >
          <BaseTableCell class="text-preset-5-bold">{{
            transaction.name
          }}</BaseTableCell>
          <BaseTableCell class="text-preset-5-regular">{{
            formatDate(transaction.date)
          }}</BaseTableCell>
          <BaseTableCell
            :class="{
              'text-preset-5-bold': true,
              transactions__credit: transaction.amount > 0,
            }"
            >{{
              formatCurrency(transaction.amount, "USD", true)
            }}</BaseTableCell
          >
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
  </BaseCard>
</template>

<style scoped>
.transactions {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 24px auto;
  gap: var(--spacing-400);
  align-items: start;
}

.transactions__empty {
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  color: var(--clr-grey-500);
  text-align: center;
  display: grid;
  gap: var(--spacing-100);
  place-content: center;
  height: 300px;
}

.transactions__empty p {
  margin: 0;
}

.transactions__empty-icon {
  justify-self: center;
}

.transactions__loading {
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  width: 100%;
  height: 300px;
  border-radius: 8px;
  background-color: var(--clr-beige-100);
}

.transactions__header {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.transactions__credit {
  color: var(--clr-green);
}

.transactions__link {
  grid-row: 1 / 2;
  grid-column: 2 / -1;
  justify-self: end;
}

.transactions__table {
  grid-column: 1 / -1;
}

.transactions-table td {
  padding-inline: 0;
}

.transactions__table-body-row {
  display: grid;
  grid-template-columns: 1.75fr 1fr;
  grid-template-rows: auto auto;
  padding-block: var(--spacing-100);
}

.transactions__table-body-row > :first-child {
  grid-row: 1 / 3;
  grid-column: 1 / 2;
}

.transactions__table-body-row > :nth-child(2) {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  margin: 0;
  padding: 0;
  justify-self: end;
}

.transactions__table-body-row:first-of-type {
  padding-top: 0;
}

.transactions__table-body-row:last-of-type {
  padding-bottom: 0;
}

.transactions__table-body-row > :last-child {
  margin: 0;
  padding: 0;
  justify-self: end;
}
</style>

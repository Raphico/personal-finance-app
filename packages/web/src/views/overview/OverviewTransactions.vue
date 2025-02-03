<script setup>
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
import { formatCurrency, formatDate } from "@/utils/helpers";

const transactions = [
  {
    id: 1,
    recipient: "Emma Richardson",
    date: "2024-08-19",
    amount: "75.50",
    image: "/src/assets/images/aqua-flow-utilities.jpg",
  },
  {
    id: 2,
    recipient: "Daniel Carter",
    date: "2024-06-19",
    amount: "42.40",
    image: "/src/assets/images/green-plate-eatery.jpg",
  },
];
</script>

<template>
  <BaseCard class="transactions-card">
    <BaseCardTitle>transactions</BaseCardTitle>
    <BaseLink href="/transactions">
      view all
      <IconCaretRight />
    </BaseLink>

    <BaseTable class="transactions-table">
      <caption class="sr-only">
        Recent transactions
      </caption>
      <BaseTableHead class="sr-only">
        <BaseTableRow>
          <BaseTableHeader scope="col">recipient/sender</BaseTableHeader>
          <BaseTableHeader scope="col">transaction date</BaseTableHeader>
          <BaseTableHeader scope="col">amount</BaseTableHeader>
        </BaseTableRow>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow v-for="transaction in transactions" :key="transaction.id">
          <BaseTableCell class="sender-recipient-col">
            <img :src="transaction.image" alt="" aria-hidden="true" />
            <span class="text-preset-4-bold">{{ transaction.recipient }}</span>
          </BaseTableCell>
          <div class="merge-column">
            <BaseTableCell>
              <time :datetime="transaction.date" class="text-preset-5-regular">
                {{ formatDate(transaction.date) }}
              </time>
            </BaseTableCell>
            <BaseTableCell>
              <span class="amount text-preset-4-bold">{{
                formatCurrency(transaction.amount, "USD")
              }}</span>
            </BaseTableCell>
          </div>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
  </BaseCard>
</template>

<style scoped>
.transactions-card {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: var(--spacing-250);
  place-content: start;
}

.transactions-card a {
  justify-content: end;
}

.transactions-table {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
}

.transactions-table img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.transactions-table td {
  padding: 0;
}

.transactions-table .amount {
  color: var(--clr-green);
}

.transactions-table time {
  color: var(--clr-grey-500);
}

.transactions-table .sender-recipient-col {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-200);
}

.transactions-table tbody tr {
  display: flex;
  justify-content: space-between;
}

.merge-column {
  display: inline-flex;
  flex-direction: column-reverse;
  padding: var(--spacing-200);
}

.merge-column > td {
  padding: 0;
  text-align: right;
}
</style>

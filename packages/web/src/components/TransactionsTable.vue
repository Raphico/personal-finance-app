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
import { formatCurrency, formatDate, generateId } from "@/utils/helpers";

defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <BaseCard id="transactions-card" class="transactions-card">
    <BaseCardTitle class="text-preset-3">{{ title }}</BaseCardTitle>
    <BaseLink>
      {{ linkText }}
      <IconCaretRight />
    </BaseLink>
    <BaseTable class="transactions-table">
      <BaseTableHead class="sr-only">
        <BaseTableRow>
          <BaseTableHeader>name</BaseTableHeader>
          <BaseTableHeader>transaction date</BaseTableHeader>
          <BaseTableHeader>amount</BaseTableHeader>
        </BaseTableRow>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow
          v-for="transaction in transactions"
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
              credit: transaction.amount > 0,
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
.transactions-card {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
}

.transactions-card h2 {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.credit {
  color: var(--clr-green);
}

.transactions-card a {
  grid-row: 1 / 2;
  grid-column: 2 / -1;
  justify-self: end;
}

.transactions-table {
  grid-column: 1 / -1;
}

.transactions-table td {
  padding-inline: 0;
}

.transactions-table tbody tr {
  display: grid;
  grid-template-columns: 1.75fr 1fr;
  grid-template-rows: auto auto;
  padding-block: var(--spacing-100);
}

.transactions-table tbody tr > :first-child {
  grid-row: 1 / 3;
  grid-column: 1 / 2;
}

.transactions-table tbody tr > :nth-child(2) {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  margin: 0;
  padding: 0;
  justify-self: end;
}

.transactions-table tbody tr > :last-child {
  margin: 0;
  padding: 0;
  justify-self: end;
}
</style>

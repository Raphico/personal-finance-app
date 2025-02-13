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
});
</script>

<template>
  <BaseCard class="latest-spending">
    <BaseCardTitle class="latest-spending__header text-preset-3"
      >Latest spending</BaseCardTitle
    >
    <BaseLink class="latest-spending__link" to="/transactions">
      see all
      <IconCaretRight />
    </BaseLink>

    <BaseTable class="latest-spending__table">
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
          class="latest-spending__table-row"
        >
          <BaseTableCell class="text-preset-5-bold">{{
            transaction.name
          }}</BaseTableCell>
          <BaseTableCell class="text-preset-5-regular">{{
            formatDate(transaction.date)
          }}</BaseTableCell>
          <BaseTableCell class="text-preset-5-bold">{{
            formatCurrency(transaction.amount, "USD", true)
          }}</BaseTableCell>
        </BaseTableRow>

        <BaseTableRow v-if="!transactions.length">
          <BaseTableCell
            :colspan="3"
            class="latest-spending__empty text-preset-4-regular"
          >
            No recent spending
          </BaseTableCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
  </BaseCard>
</template>

<style scoped>
.latest-spending {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  align-items: start;
}

.latest-spending__empty {
  color: var(--clr-grey-500);
  text-align: center;
}

.latest-spending__empty p {
  margin: 0;
}

.latest-spending__header {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.latest-spending__link {
  grid-row: 1 / 2;
  grid-column: 2 / -1;
  justify-self: end;
}

.latest-spending__table {
  grid-column: 1 / -1;
}

.latest-spending__table td {
  padding-inline: 0;
}

.latest-spending__table-row {
  display: grid;
  grid-template-columns: 1.75fr 1fr;
  grid-template-rows: auto auto;
  padding-block: var(--spacing-100);
}

.latest-spending__table-row > :first-child {
  grid-row: 1 / 3;
  grid-column: 1 / 2;
}

.latest-spending__table-row > :nth-child(2) {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  margin: 0;
  padding: 0;
  justify-self: end;
  color: var(--clr-grey-500);
}

.latest-spending__table-row > :last-child {
  margin: 0;
  padding: 0;
  justify-self: end;
}
</style>

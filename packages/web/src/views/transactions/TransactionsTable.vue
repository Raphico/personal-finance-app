<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseTableBody from "@/components/BaseTableBody.vue";
import BaseTableCell from "@/components/BaseTableCell.vue";
import BaseTableHead from "@/components/BaseTableHead.vue";
import BaseTableHeader from "@/components/BaseTableHeader.vue";
import BaseTableRow from "@/components/BaseTableRow.vue";
import { formatCurrency, formatDate } from "@/utils/helpers";
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";
import { ref } from "vue";
import { h } from "vue";
import TransactionsTablePagination from "./components/TransactionsTablePagination.vue";
import TransactionsTableFilter from "./components/TransactionsTableFilter.vue";

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    cell: (props) =>
      h("span", { class: "text-preset-4-bold" }, props.getValue()),
  }),

  columnHelper.accessor("category", {
    header: "category",
    cell: (props) => {
      const transaction = props.row.original;
      return [
        h(
          "span",
          {
            class: "text-preset-5-regular",
          },
          transaction.category
        ),
      ];
    },
  }),
  columnHelper.accessor("date", {
    header: "transaction date",
    cell: (props) => {
      return h(
        "span",
        { class: "text-preset-5-regular" },
        formatDate(props.getValue())
      );
    },
  }),
  columnHelper.accessor("amount", {
    header: "amount",
    cell: (props) => {
      const amount = props.getValue();
      return h(
        "span",
        {
          class: "text-preset-4-bold",
          "data-credit": amount > 0,
        },
        formatCurrency(amount, "USD")
      );
    },
  }),
];

const data = ref(props.transactions);

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
</script>

<template>
  <BaseCard>
    <TransactionsTableFilter />
    <BaseTable class="transactions-table">
      <BaseTableHead>
        <BaseTableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <BaseTableHeader
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </BaseTableHeader>
        </BaseTableRow>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow v-for="row in table.getRowModel().rows" :key="row.id">
          <BaseTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </BaseTableCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
    <TransactionsTablePagination :table="table" />
  </BaseCard>
</template>

<style scoped>
.transactions-table tbody tr > :is(:nth-child(2), :nth-child(3)) {
  color: var(--clr-grey-500);
}

.transactions-table tbody tr > :last-child:has([data-credit="true"]) {
  color: var(--clr-green);
}

.transactions-table tbody tr > :last-child,
.transactions-table thead tr > :last-child {
  text-align: right;
}

@media (max-width: 540px) {
  .transactions-table thead {
    display: none;
  }

  .transactions-table tbody tr {
    display: grid;
    grid-template-columns: 1.75fr 1fr;
    grid-template-rows: auto auto;
    padding-block: var(--spacing-200);
  }

  .transactions-table tbody tr > :first-child {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
  }

  .transactions-table td {
    padding: 0;
  }

  .transactions-table tbody tr > :nth-child(2) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  .transactions-table tbody tr > :nth-child(3) {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    justify-self: end;
  }

  .transactions-table tbody tr > :last-child {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    margin: 0;
    padding: 0;
    justify-self: end;
  }
}
</style>

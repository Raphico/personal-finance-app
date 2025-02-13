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
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";
import { ref, computed } from "vue";
import { h } from "vue";
import TransactionsTableToolbar from "./components/TransactionsTableToolbar.vue";
import TransactionTableRowAction from "./components/TransactionTableRowAction.vue";
import TransactionsTablePagination from "@/views/transactions/components/TransactionsTablePagination.vue";
import IconNavTransactions from "@/components/Icons/IconNavTransactions.vue";

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const getCategories = computed(() => {
  return new Set(props.transactions.map((transaction) => transaction.category));
});

const columnHelper = createColumnHelper();
const columnFilters = ref([]);
const sorting = ref([]);

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
        formatCurrency(amount, "USD", true)
      );
    },
  }),
  columnHelper.accessor("actions", {
    id: "actions",
    header: "",
    cell: ({ row }) =>
      row.original.category == "pot"
        ? null
        : h(TransactionTableRowAction, { row }),
  }),
];

const table = useVueTable({
  get data() {
    return props.transactions;
  },
  columns,
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue;
  },
  getFilteredRowModel: getFilteredRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
});
</script>

<template>
  <BaseCard>
    <TransactionsTableToolbar
      :table="table"
      :categories="Array.from(getCategories)"
    />
    <BaseTable class="transactions__table">
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
        <BaseTableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="transactions__row"
        >
          <BaseTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </BaseTableCell>
        </BaseTableRow>

        <BaseTableRow v-if="!table.getRowModel().rows?.length">
          <BaseTableCell
            :colspan="columns.length"
            class="transactions__empty text-preset-4-regular"
          >
            <IconNavTransactions class="transactions__empty-icon" />
            No transactions
          </BaseTableCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
    <TransactionsTablePagination :table="table" />
  </BaseCard>
</template>

<style scoped>
.transactions__row > :is(:nth-child(2), :nth-child(3)) {
  color: var(--clr-grey-500);
}

.transactions__row > :nth-child(4):has([data-credit="true"]) {
  color: var(--clr-green);
}

.transactions__empty {
  text-align: center;
  padding-top: var(--spacing-400);
  color: var(--clr-grey-500);
  text-transform: none;
}

.transactions__empty-icon {
  display: none;
}

.transactions__row > :last-child,
.transactions__table thead tr > :last-child {
  text-align: right;
}

@media (max-width: 540px) {
  .transactions__table thead {
    display: none;
  }

  .transactions__row {
    display: grid;
    grid-template-columns: 1.75fr 1fr 36px;
    grid-template-rows: auto auto;
    padding-block: var(--spacing-200);
  }

  .transactions__empty {
    height: 96px;
    display: grid;
    place-content: center;
    gap: var(--spacing-100);
  }

  .transactions__empty-icon {
    display: block;
    justify-self: center;
  }

  .transactions__row > :last-child {
    grid-row: 1 / -1;
    grid-column: 3 / 4;
    place-self: center;
  }

  .transactions__row > :first-child {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
  }

  .transactions__table td {
    padding: 0;
  }

  .transactions__row > :nth-child(2) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  .transactions__row > :nth-child(3) {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    justify-self: end;
  }

  .transactions__row > :nth-child(4) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    margin: 0;
    padding: 0;
    justify-self: end;
  }
}
</style>

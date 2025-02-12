<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseTableBody from "@/components/BaseTableBody.vue";
import BaseTableCell from "@/components/BaseTableCell.vue";
import BaseTableHead from "@/components/BaseTableHead.vue";
import BaseTableHeader from "@/components/BaseTableHeader.vue";
import BaseTableRow from "@/components/BaseTableRow.vue";
import IconBillDue from "@/components/Icons/IconBillDue.vue";
import IconBillPaid from "@/components/Icons/IconBillPaid.vue";
import { formatCurrency } from "@/utils/helpers";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/vue-table";
import { ref } from "vue";
import { h } from "vue";
import RecurringBillsTableFilter from "./components/RecurringBillsTableFilter.vue";
import IconNavRecurringBills from "@/components/Icons/IconNavRecurringBills.vue";

const props = defineProps({
  recurringBills: {
    type: Array,
    required: true,
  },
});

const columnHelper = createColumnHelper();
const columnFilters = ref([]);
const sorting = ref([]);

const columns = [
  columnHelper.accessor("title", {
    header: "Bill title",
    cell: (props) =>
      h("span", { class: "text-preset-4-bold" }, props.getValue()),
  }),
  columnHelper.accessor("dueDate", {
    header: "due date",
    cell: (props) => {
      const recurringBill = props.row.original;
      const iconComponent =
        recurringBill.status === "paid" ? IconBillPaid : IconBillDue;

      return h(
        "span",
        {
          class: ["text-preset-5-regular"],
          "data-status": recurringBill.status,
        },
        [
          recurringBill.status !== "upcoming" &&
            h("span", { class: "status" }, [h(iconComponent)]),
          props.getValue(),
        ]
      );
    },
  }),
  columnHelper.accessor("amount", {
    header: "amount",
    cell: (props) => {
      const recurringBill = props.row.original;
      return h(
        "span",
        {
          class: "text-preset-4-bold",
          "data-status": recurringBill.status,
        },
        formatCurrency(recurringBill.amount)
      );
    },
  }),
];

const table = useVueTable({
  get data() {
    return props.recurringBills;
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
    <RecurringBillsTableFilter :table="table" />
    <BaseTable class="recurring-bills__table">
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
          v-if="table.getRowModel().rows?.length"
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="recurring-bills__rows"
        >
          <BaseTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </BaseTableCell>
        </BaseTableRow>

        <BaseTableRow v-else>
          <BaseTableCell
            :colspan="columns.length"
            class="recurring-bills__empty text-preset-4-regular"
          >
            <IconNavRecurringBills class="recurring-bills__empty-icon" />
            No recurring bills
          </BaseTableCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>
  </BaseCard>
</template>

<style scoped>
.recurring-bills__rows > :nth-child(2) {
  color: var(--clr-green);
}

.recurring-bills__rows > :nth-child(2) > span {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row-reverse;
  gap: var(--spacing-100);
}

.recurring-bills__empty {
  text-align: center;
  padding-top: var(--spacing-400);
  color: var(--clr-grey-500);
  text-transform: none;
}

.recurring-bills__empty-icon {
  display: none;
}

.recurring-bills__rows > :last-child,
.recurring-bills__table thead tr > :last-child {
  text-align: right;
}

[data-status="due"] {
  color: var(--clr-red);
}

@media (max-width: 540px) {
  .recurring-bills__table thead {
    display: none;
  }

  .recurring-bills__empty {
    height: 96px;
    display: grid;
    place-content: center;
    gap: var(--spacing-100);
  }

  .recurring-bills__empty-icon {
    display: block;
    justify-self: center;
  }

  .recurring-bills__rows {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    padding-block: var(--spacing-200);
  }

  .recurring-bills__rows > :last-child {
    grid-row: 1 / -1;
    grid-column: 2 / 3;
  }

  .recurring-bills__rows > :first-child {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .recurring-bills__table td {
    padding: 0;
  }

  .recurring-bills__rows > :nth-child(2) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    justify-self: start;
  }
}
</style>

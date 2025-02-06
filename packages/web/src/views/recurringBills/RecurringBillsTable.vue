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
  getPaginationRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";
import { ref } from "vue";
import { h } from "vue";
import RecurringBillsTableFilter from "./components/RecurringBillsTableFilter.vue";
import TablePagination from "@/components/TablePagination.vue";

const props = defineProps({
  recurringBills: {
    type: Array,
    required: true,
  },
});

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Bill name",
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
        formatCurrency(recurringBill.amount, "USD")
      );
    },
  }),
];

const data = ref(props.recurringBills);

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
    <RecurringBillsTableFilter />
    <BaseTable class="recurring-bills-table">
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
    <TablePagination :table="table" />
  </BaseCard>
</template>

<style scoped>
.recurring-bills-table tbody tr > :nth-child(2) {
  color: var(--clr-green);
}

.recurring-bills-table tbody tr > :nth-child(2) > span {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: var(--spacing-100);
}

.recurring-bills-table tbody tr > :last-child,
.recurring-bills-table thead tr > :last-child {
  text-align: right;
}

[data-status="due"] {
  color: var(--clr-red);
}

@media (max-width: 540px) {
  .recurring-bills-table thead {
    display: none;
  }

  .recurring-bills-table tbody tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    padding-block: var(--spacing-200);
  }

  .recurring-bills-table tbody tr > :last-child {
    grid-row: 1 / -1;
    grid-column: 2 / 3;
  }

  .recurring-bills-table tbody tr > :first-child {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }

  .recurring-bills-table td {
    padding: 0;
  }

  .recurring-bills-table tbody tr > :nth-child(2) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    justify-self: start;
  }
}
</style>

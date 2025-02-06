<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import CategoryTheme from "@/components/CategoryTheme.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import { formatCurrency } from "@/utils/helpers";
import { computed, ref } from "vue";
import TransactionsTable from "@/components/TransactionsTable.vue";
import BudgetActions from "./BudgetActions.vue";
import DeleteBudgetModal from "./DeleteBudgetModal.vue";
import EditBudgetModal from "./EditBudgetModal.vue";

const props = defineProps({
  budget: {
    type: Object,
    required: true,
  },
});

const showDeleteModal = ref(false);
const showEditModal = ref(false);

const spentRemaining = [
  {
    term: "spent",
    description: formatCurrency(props.budget.spent, "USD"),
    theme: props.budget.theme,
  },
  {
    term: "remaining",
    description: formatCurrency(props.budget.spent, "USD"),
    theme: "beige-100",
  },
];

const getRemainingPercentage = computed(() =>
  Math.round((props.budget.spent / props.budget.amount) * 100)
);
</script>

<template>
  <BaseCard class="budget-card">
    <BaseCardTitle class="text-preset-2">
      <CategoryTheme :theme="budget.theme" />
      {{ budget.category }}
    </BaseCardTitle>
    <BudgetActions
      @delete="showDeleteModal = true"
      @edit="showEditModal = true"
      class="budget-actions"
    />
    <p class="budget-amount text-preset-4-regular">
      Maximum of {{ formatCurrency(budget.amount, "USD") }}
    </p>
    <div class="progress-bar">
      <div
        class="progress"
        :style="`--color: var(--clr-${budget.theme}); --width: ${getRemainingPercentage}%`"
      ></div>
    </div>
    <DescriptionList id="spent-remaining" :items="spentRemaining" />
    <TransactionsTable
      id="latest-spending"
      :transactions="budget.latestSpending"
      link-text="see all"
      title="latest spending"
    />

    <DeleteBudgetModal :budget="budget" v-model="showDeleteModal" />
    <EditBudgetModal :budget="budget" v-model="showEditModal" />
  </BaseCard>
</template>

<style setup>
.budget-card.budget-card {
  grid-template-rows: repeat(5, auto);
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

.budget-card h2 {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  grid-row: 1 / 2;
  text-wrap: nowrap;
  grid-column: 1 / 2;
}

.budget-amount {
  color: var(--clr-grey-500);
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  margin-block: var(--spacing-200);
}

#latest-spending {
  grid-column: 1 / -1;
  background-color: var(--clr-beige-100);
}

#latest-spending tr {
  border-color: var(--clr-grey-200);
}

.budget-card .budget-actions {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  justify-self: end;
}

.budget-card .progress-bar {
  width: 100%;
  height: 32px;
  background-color: var(--clr-beige-100);
  border-radius: 4px;
  padding: var(--spacing-50);
  grid-row: 3 / 4;
  grid-column: 1 / -1;
}

#spent-remaining {
  grid-column: 1 / -1;
  grid-row: 4 / 5;
  grid-template-columns: repeat(2, 1fr);
  margin-block: var(--spacing-250);
}

.budget-card .progress {
  background-color: var(--color);
  width: var(--width);
  height: 100%;
  border-radius: 4px;
}
</style>

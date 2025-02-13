<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import CategoryTheme from "@/components/CategoryTheme.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import { formatCurrency } from "@/utils/helpers";
import { computed, ref } from "vue";
import LatestSpending from "./LatestSpending.vue";
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

const getAmountSpent = computed(() =>
  props.budget.transactions.reduce(
    (accumulator, currentTransaction) =>
      (accumulator += Math.abs(Number(currentTransaction.amount))),
    0
  )
);

const getRemainingPercentage = computed(() =>
  Math.min(
    Math.round((getAmountSpent.value / props.budget.maximumSpend) * 100),
    100
  )
);

const getSpentRemaining = computed(() => {
  const amountRemaining = Math.max(
    props.budget.maximumSpend - getAmountSpent.value,
    0
  );

  return [
    {
      term: "spent",
      description: formatCurrency(getAmountSpent.value),
      theme: props.budget.theme,
    },
    {
      term: "remaining",
      description: formatCurrency(amountRemaining),
      theme: "beige-100",
    },
  ];
});
</script>

<template>
  <BaseCard class="budget-card">
    <BaseCardTitle class="text-preset-2">
      <CategoryTheme :theme="budget.theme" />
      {{ budget.category.split("-").join(" ") }}
    </BaseCardTitle>
    <BudgetActions
      @delete="showDeleteModal = true"
      @edit="showEditModal = true"
      class="budget-actions"
    />
    <p class="budget-amount text-preset-4-regular">
      Maximum of {{ formatCurrency(budget.maximumSpend) }}
    </p>
    <div class="progress-bar">
      <div
        class="progress"
        :style="`--color: var(--clr-${budget.theme}); --width: ${getRemainingPercentage}%`"
      ></div>
    </div>
    <DescriptionList id="spent-remaining" :items="getSpentRemaining" />
    <LatestSpending
      id="latest-spending"
      :transactions="budget.transactions.slice(0, 3)"
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
  white-space: nowrap;
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

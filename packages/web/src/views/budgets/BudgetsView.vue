<script setup>
import PageHeader from "@/components/PageHeader.vue";
import SpendingSummary from "./SpendingSummary.vue";
import BudgetList from "./components/BudgetList.vue";
import AddNewBudgetModal from "./components/AddNewBudgetModal.vue";
import { useHead } from "@unhead/vue";
import { useToast } from "vue-toast-notification";
import { useQuery } from "@tanstack/vue-query";
import { budgets } from "@/api/budgets";
import { watch, computed } from "vue";
import { useBudgetsStore } from "@/stores/budgets";

useHead({
  title: "Budgets - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app budgets page",
    },
  ],
});

const { setAlreadyUsedThemes, setAlreadyUsedCategories } = useBudgetsStore();
const toast = useToast();
const {
  isPending,
  data: budgetList,
  error,
} = useQuery({
  queryKey: ["budgets"],
  queryFn: fetchBudgets,
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

watch(budgetList, () => {
  if (budgetList.value) {
    setAlreadyUsedThemes(budgetList.value.map((budget) => budget.theme));
    setAlreadyUsedCategories(budgetList.value.map((budget) => budget.category));
  }
});

const getSpendingSummary = computed(() => {
  if (!budgetList.value) return;

  return budgetList.value.map((budget) => {
    const amountSpent = budget.transactions.reduce(
      (accumulator, currentTransaction) =>
        (accumulator += Number(currentTransaction.amount)),
      0
    );

    return {
      category: budget.category,
      maximumSpend: budget.maximumSpend,
      amountSpent,
      theme: budget.theme,
    };
  });
});

async function fetchBudgets() {
  const response = await budgets.getList();
  return response.data.budgets;
}
</script>

<template>
  <div class="budgets">
    <header>
      <PageHeader class="budgets__header">Budgets</PageHeader>
      <AddNewBudgetModal />
    </header>

    <div class="budgets__content">
      <div
        class="budgets__loading-summary animate-pulse"
        role="status"
        v-if="isPending"
      ></div>
      <SpendingSummary v-else :summary="getSpendingSummary ?? []" />

      <div v-if="isPending" class="budgets__loading-list-container">
        <div
          class="budgets__loading-list-item animate-pulse"
          role="status"
        ></div>
        <div
          class="budgets__loading-list-item animate-pulse"
          role="status"
        ></div>
        <div
          class="budgets__loading-list-item animate-pulse"
          role="status"
        ></div>
        <div
          class="budgets__loading-list-item animate-pulse"
          role="status"
        ></div>
      </div>
      <BudgetList v-else :budgets="budgetList ?? []" />
    </div>
  </div>
</template>

<style scoped>
.budgets {
  display: grid;
  gap: var(--spacing-400);
}

.budgets__loading-summary {
  height: 584px;
  border-radius: 8px;
  background-color: var(--clr-white);
}

.budgets__loading-list-container {
  display: grid;
  gap: var(--spacing-200);
}

.budgets__loading-list-item {
  height: 470px;
  background-color: var(--clr-white);
  border-radius: 8px;
}

.budgets__content {
  display: grid;
  gap: var(--spacing-300);
}

.budgets header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.budgets__header {
  margin: 0;
}

@media (min-width: 1024px) {
  .budgets__content {
    grid-template-columns: 1fr 1.5fr;
    align-items: start;
  }
}
</style>

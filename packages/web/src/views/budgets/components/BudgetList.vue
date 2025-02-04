<script setup>
import BudgetListCard from "./BudgetListCard.vue";

defineProps({
  budgets: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="budget-list">
    <BudgetListCard
      v-for="budget in budgets"
      :key="budget.id"
      :budget="budget"
    />
  </div>
</template>

<style setup>
.budget-list {
  display: grid;
  gap: var(--spacing-200);
}
</style>

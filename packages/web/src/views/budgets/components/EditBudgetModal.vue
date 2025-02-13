<script setup>
import BaseModal from "@/components/BaseModal.vue";
import BudgetForm from "./BudgetForm.vue";

defineProps({
  budget: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <BaseModal :show-trigger="false">
    <template #modalTitle>edit budget</template>
    <template #modalDescription>
      As your budgets change, feel free to update your spending limits.
    </template>
    <template #modalBody="{ closeModal }">
      <BudgetForm :budget="budget" @successful="closeModal" />
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from "@/components/BaseModal.vue";
import BudgetForm from "./BudgetForm.vue";
</script>

<template>
  <BaseModal>
    <template #modalTrigger>new budget</template>
    <template #modalTitle>add new budget</template>
    <template #modalDescription
      >Choose a category to set a spending budget. These categories can help you
      monitor spending.</template
    >
    <template #modalBody="{ closeModal }">
      <BudgetForm @successful="closeModal" />
    </template>
  </BaseModal>
</template>

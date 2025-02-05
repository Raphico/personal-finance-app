<script setup>
import BaseModal from "@/components/BaseModal.vue";
import AddNewTransactionForm from "./AddNewTransactionForm.vue";
</script>

<template>
  <BaseModal>
    <template #modalTrigger>
      + new <span class="hide-on-mobile">transaction</span></template
    >
    <template #modalTitle>add new transaction</template>
    <template #modalDescription>
      Add an income or expense. Income increases your balance, and expenses can
      be linked to a budget
    </template>
    <template #modalBody>
      <AddNewTransactionForm />
    </template>
  </BaseModal>
</template>

<style scoped>
.hide-on-mobile {
  margin-left: -0.75em;
}
@media (max-width: 540px) {
  .hide-on-mobile {
    display: none;
  }
}
</style>

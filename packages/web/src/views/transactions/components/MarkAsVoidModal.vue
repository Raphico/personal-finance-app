<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";

defineProps({
  transactionId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <BaseModal :show-trigger="false">
    <template #modalTitle>Void transaction</template>
    <template #modalDescription>
      Are you sure you want to void this transaction? This action cannot be
      undone, but the record will remain for tracking purposes
    </template>
    <template #modalBody="slotProps">
      <div class="actions">
        <BaseButton variant="destroy">yes</BaseButton>
        <BaseButton variant="ghost" @click="slotProps.closeModal">
          no, go back
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
.actions {
  display: grid;
  gap: var(--spacing-250);
}

.actions :last-child {
  color: var(--clr-grey-500);
  font-weight: 400;
  padding: 0;
  height: 21px;
}

.actions :last-child:hover {
  color: var(--clr-grey-900);
  background-color: transparent;
}
</style>

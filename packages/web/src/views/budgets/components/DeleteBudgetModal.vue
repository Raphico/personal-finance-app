<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";

defineProps({
  budget: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <BaseModal :show-trigger="false">
    <template #modalTitle>delete '{{ budget.category }}'?</template>
    <template #modalDescription>
      Are you sure you want to delete this budget? This action cannot be
      reversed, and all the data inside it will be removed forever.
    </template>
    <template #modalBody="slotProps">
      <div class="actions">
        <BaseButton variant="destroy"> yes, confirm deletion </BaseButton>
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

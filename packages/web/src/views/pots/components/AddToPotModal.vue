<script setup>
import BaseModal from "@/components/BaseModal.vue";
import AddToPotForm from "./AddToPotForm.vue";

defineProps({
  pot: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <BaseModal button-variant="secondary">
    <template #modalTrigger>add money</template>
    <template #modalTitle>Add to '{{ pot.name }}'?</template>
    <template #modalDescription>
      Add money to your pot to keep it separate from your main balance. As soon
      as you add this money, it will be deducted from your current balance.
    </template>
    <template #modalBody>
      <AddToPotForm :pot="pot" />
    </template>
  </BaseModal>
</template>

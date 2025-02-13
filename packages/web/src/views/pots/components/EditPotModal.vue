<script setup>
import BaseModal from "@/components/BaseModal.vue";
import PotForm from "./PotForm.vue";

defineProps({
  pot: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <BaseModal :show-trigger="false">
    <template #modalTitle>edit pot</template>
    <template #modalDescription>
      If your saving targets change, feel free to update your pots.
    </template>
    <template #modalBody="{ closeModal }">
      <PotForm :pot="pot" @successful="closeModal" />
    </template>
  </BaseModal>
</template>

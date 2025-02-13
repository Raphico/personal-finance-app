<script setup>
import BaseModal from "@/components/BaseModal.vue";
import WithdrawFromPotForm from "./WithdrawFromPotForm.vue";

defineProps({
  pot: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <BaseModal variant="secondary">
    <template #modalTrigger>withdraw</template>
    <template #modalTitle>withdraw from '{{ pot.name }}'?</template>
    <template #modalDescription>
      Withdraw from your pot to put money back in your main balance. This will
      reduce the amount you have in this pot.
    </template>
    <template #modalBody>
      <WithdrawFromPotForm :pot="pot" />
    </template>
  </BaseModal>
</template>

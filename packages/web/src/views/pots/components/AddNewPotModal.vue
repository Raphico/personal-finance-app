<script setup>
import BaseModal from "@/components/BaseModal.vue";
import PotForm from "./PotForm.vue";
</script>

<template>
  <BaseModal>
    <template #modalTrigger>new pot</template>
    <template #modalTitle>add new pot</template>
    <template #modalDescription>
      Create a pot to set savings targets. These can help keep you on track as
      you save for special purchases.
    </template>
    <template #modalBody>
      <PotForm />
    </template>
  </BaseModal>
</template>

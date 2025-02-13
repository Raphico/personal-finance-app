<script setup>
import { transactions } from "@/api/transactions";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { watchEffect } from "vue";
import { useToast } from "vue-toast-notification";

const emits = defineEmits(["done"]);
defineProps({
  transactionId: {
    type: String,
    required: true,
  },
});

const queryClient = useQueryClient();
const toast = useToast();

const {
  isPending,
  isError,
  error,
  isSuccess,
  mutate: voidTransaction,
} = useMutation({
  mutationFn: (transactionId) => transactions.updateItem(transactionId),
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["overview-transactions"] });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  },
});

watchEffect(() => {
  if (isError.value) {
    toast.error(error.value.response.data.message, {
      position: "top",
    });
  } else if (isSuccess.value) {
    emits("done");
  }
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
        <BaseButton
          variant="destroy"
          @click="() => voidTransaction(transactionId)"
          :loading="isPending"
          >yes</BaseButton
        >
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
  margin-bottom: var(--spacing-100);
}

.actions > :last-child {
  color: var(--clr-grey-500);
  font-weight: 400;
  padding: 0;
  height: 21px;
}

.actions > :last-child:hover {
  color: var(--clr-grey-900);
  background-color: transparent;
}
</style>

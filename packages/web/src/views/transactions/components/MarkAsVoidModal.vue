<script setup>
import { transactions } from "@/api/transactions";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import { QUERY_KEYS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { AxiosError } from "axios";
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

const { isPending, mutate: voidTransaction } = useMutation({
  mutationFn: (transactionId) => transactions.updateItem(transactionId),
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.overviewTransactions,
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.budgets });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overviewBudgets });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.recurringBills });
    emits("done");
  },
  onError(error) {
    const message =
      error instanceof AxiosError ? error.response.data.message : error.message;
    toast.error(message, {
      position: "top",
    });
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

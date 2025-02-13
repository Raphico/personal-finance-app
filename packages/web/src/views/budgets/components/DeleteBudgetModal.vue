<script setup>
import { budgets } from "@/api/budgets";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { AxiosError } from "axios";
import { useToast } from "vue-toast-notification";
import { watchEffect } from "vue";
import { QUERY_KEYS } from "@/constants";

const emits = defineEmits(["done"]);
defineProps({
  budget: {
    type: Object,
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
  mutate: deleteBudget,
} = useMutation({
  mutationFn: (budgetId) => budgets.deleteItem(budgetId),
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overviewBudgets });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.budgets });
  },
});

watchEffect(() => {
  if (isError.value && error.value instanceof AxiosError) {
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
    <template #modalTitle>delete '{{ budget.category }}'?</template>
    <template #modalDescription>
      Are you sure you want to delete this budget? This action cannot be
      reversed, and all the data inside it will be removed forever.
    </template>
    <template #modalBody="slotProps">
      <div class="actions">
        <BaseButton
          variant="destroy"
          @click="() => deleteBudget(budget.id)"
          :loading="isPending"
        >
          yes, confirm deletion
        </BaseButton>
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

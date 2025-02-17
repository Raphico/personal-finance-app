<script setup>
import { pots } from "@/api/pots";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/constants";

const emits = defineEmits(["done"]);
defineProps({
  pot: {
    type: Object,
    required: true,
  },
});

const queryClient = useQueryClient();
const toast = useToast();

const { isPending, mutate: deletePot } = useMutation({
  mutationFn: (potId) => pots.deleteItem(potId),
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overviewPots });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pots });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.overviewTransactions,
    });
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
    <template #modalTitle>delete '{{ pot.name }}'?</template>
    <template #modalDescription>
      Are you sure you want to delete this pot? This action cannot be reversed,
      and all the data inside it will be removed forever.
    </template>
    <template #modalBody="slotProps">
      <div class="actions">
        <BaseButton
          variant="destroy"
          @click="() => deletePot(pot.id)"
          :loading="isPending"
          >yes, confirm deletion</BaseButton
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

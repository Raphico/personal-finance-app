<script setup>
import { transactions } from "@/api/transactions";
import BaseButton from "@/components/BaseButton.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseCurrencyInput from "@/components/BaseCurrencyInput.vue";
import BaseDatePicker from "@/components/BaseDatePicker.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { useForm } from "@/composables/useForm";
import { transactionCategories } from "@repo/shared-config";
import { transactionSchema } from "@repo/shared-validators/transactions";
import { watch } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/constants";
import { getError } from "@/utils/helpers";

const queryClient = useQueryClient();

const emits = defineEmits(["successful"]);
const toast = useToast();
const form = useForm({
  name: "",
  category: "income",
  amount: "",
  date: "",
  isRecurring: false,
});

const { isPending, mutate: addTransaction } = useMutation({
  mutationFn: (data) => transactions.addItem(data),
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.overviewTransactions,
    });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.budgets });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overviewBudgets });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions });
    form.reset();
    emits("successful");
  },
  onError(error) {
    const message =
      error instanceof AxiosError ? error.response.data.message : error.message;
    toast.error(message, {
      position: "top",
    });
  },
});

watch(
  () => form.fields.category,
  (value) => {
    if (value === "income") {
      form.fields.isRecurring = false;
    }
  }
);

function onSubmit() {
  const { name, category, amount, date, isRecurring } = form.fields;
  form.clearError();

  const { data, error } = transactionSchema.safeParse({
    name,
    category,
    amount,
    date: date.split("T")[0],
    isRecurring,
  });

  if (error) {
    form.setError(getError(error));
    return;
  }

  addTransaction(data);
}
</script>

<template>
  <BaseForm @submit.prevent="onSubmit" autocomplete="off">
    <BaseFormItem>
      <BaseLabel for="name" :data-error="form.error.name">name</BaseLabel>
      <BaseInput
        v-model="form.fields.name"
        :data-error="form.error.name"
        id="name"
        name="name"
      />
      <BaseFormMessage v-if="form.error.name" :message="form.error.name" />
    </BaseFormItem>

    <BaseFormItem>
      <BaseLabel for="category" :data-error="form.error.category"
        >category</BaseLabel
      >
      <BaseSelect
        id="category"
        :defaultValue="form.fields.category"
        :options="
          transactionCategories.map((category) => ({
            label: category.split('-').join(' '),
            value: category,
          }))
        "
        @select="
          (value) => {
            form.fields.category = value;
          }
        "
      />
      <BaseFormMessage
        v-if="form.error.category"
        :message="form.error.category"
      />
    </BaseFormItem>

    <BaseFormItem>
      <BaseLabel for="date" :data-error="form.error.date">
        Transaction date
      </BaseLabel>
      <BaseDatePicker id="date" v-model="form.fields.date" />
      <BaseFormMessage v-if="form.error.date" :message="form.error.date" />
    </BaseFormItem>

    <BaseFormItem>
      <BaseLabel for="amount" :data-error="form.error.amount">amount</BaseLabel>
      <BaseCurrencyInput
        v-model="form.fields.amount"
        :data-error="form.error.amount"
        id="amount"
        name="amount"
      />
      <BaseFormMessage v-if="form.error.amount" :message="form.error.amount" />
    </BaseFormItem>

    <BaseFormItem class="recurring">
      <BaseLabel for="isRecurring" :data-error="form.error.isRecurring"
        >Set as recurring</BaseLabel
      >
      <BaseCheckbox
        v-model="form.fields.isRecurring"
        :disabled="form.fields.category === 'income'"
        id="isRecurring"
        name="isRecurring"
      />
      <BaseFormMessage
        v-if="form.error.isRecurring"
        :message="form.error.isRecurring"
      />
    </BaseFormItem>

    <BaseButton :loading="isPending" :disabled="isPending" type="submit"
      >add transaction</BaseButton
    >
  </BaseForm>
</template>

<style scoped>
:deep(#category) {
  justify-content: space-between;
}

.recurring {
  display: flex;
  gap: var(--spacing-50);
  align-items: center;
}
</style>

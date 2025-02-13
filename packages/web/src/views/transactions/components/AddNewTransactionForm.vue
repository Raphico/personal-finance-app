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
import { useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios";

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

watch(
  () => form.fields.category,
  (value) => {
    if (value === "income") {
      form.fields.isRecurring = false;
    }
  }
);

function onSubmit() {
  form.submit(
    async (fields) => {
      const { name, category, amount, date, isRecurring } = fields;

      const values = transactionSchema.parse({
        name,
        category,
        amount,
        date: date.split("T")[0],
        isRecurring,
      });

      return transactions.addItem(values);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["overview-transactions"] });
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        form.reset();
        emits("successful");
      },
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response.data.message;
          toast.error(message, {
            position: "top",
          });
        }
      },
    }
  );
}
</script>

<template>
  <BaseForm @submit.prevent="onSubmit" autocomplete="off">
    <BaseFormItem>
      <BaseLabel for="name" :data-error="form.error.name">name</BaseLabel>
      <BaseInput v-model="form.fields.name" id="name" name="name" />
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

    <BaseButton
      :loading="form.isLoading"
      :disabled="form.isLoading"
      type="submit"
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

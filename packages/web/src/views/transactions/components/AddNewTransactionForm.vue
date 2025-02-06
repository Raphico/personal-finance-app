<script setup>
import BaseAlert from "@/components/BaseAlert.vue";
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
import { budgetCategories } from "@/constants";

const form = useForm({
  name: "",
  category: "",
  amount: "",
  transactionDate: "",
  isRecurring: false,
});

const categories = ["income", ...budgetCategories];
</script>

<template>
  <BaseForm>
    <BaseAlert v-if="form.error.general" :message="form.error.general" />
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
        :options="
          categories.map((category) => ({
            label: category,
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
      <BaseLabel for="transactionDate" :data-error="form.error.transactionDate">
        Transaction date
      </BaseLabel>
      <BaseDatePicker v-model="form.fields.transactionDate" />
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
      >add budget</BaseButton
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

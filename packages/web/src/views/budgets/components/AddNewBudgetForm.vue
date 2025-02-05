<script setup>
import BaseAlert from "@/components/BaseAlert.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseButton from "@/components/BaseButton.vue";
import CategoryTheme from "@/components/CategoryTheme.vue";
import { useForm } from "@/composables/useForm";
import { budgetCategories, themes } from "@/constants";
import BaseCurrencyInput from "@/components/BaseCurrencyInput.vue";

const form = useForm({
  budgetCategory: "",
  maximumSpend: "",
  theme: "",
});
</script>

<template>
  <BaseForm>
    <BaseAlert v-if="form.error.general" :message="form.error.general" />
    <BaseFormItem>
      <BaseLabel for="budgetCategory" :data-error="form.error.budgetCategory"
        >budget category</BaseLabel
      >
      <BaseSelect
        id="budgetCategory"
        :options="
          budgetCategories.map((category) => ({
            label: category,
            value: category,
          }))
        "
        @select="
          (value) => {
            form.fields.budgetCategory = value;
          }
        "
      />
      <BaseFormMessage
        v-if="form.error.budgetCategory"
        :message="form.error.budgetCategory"
      />
    </BaseFormItem>
    <BaseFormItem>
      <BaseLabel for="maximumSpend" :data-error="form.error.maximumSpend"
        >maximum spend</BaseLabel
      >
      <BaseCurrencyInput
        @complete="
          (value) => {
            form.fields.maximumSpend = value;
          }
        "
        id="maximumSpend"
        name="maximumSpend"
      />
      <BaseFormMessage
        v-if="form.error.maximumSpend"
        :message="form.error.maximumSpend"
      />
    </BaseFormItem>
    <BaseFormItem>
      <BaseLabel for="theme" :data-error="form.error.theme">theme</BaseLabel>
      <BaseSelect
        id="theme"
        position="top"
        :options="
          themes.map((theme) => ({
            label: theme,
            value: theme,
          }))
        "
        @select="
          (value) => {
            form.fields.theme = value;
          }
        "
      >
        <template #currentValue="{ currentValue }">
          <span class="theme-container">
            <CategoryTheme :theme="currentValue" />
            {{ currentValue }}
          </span>
        </template>
      </BaseSelect>
      <BaseFormMessage v-if="form.error.theme" :message="form.error.theme" />
    </BaseFormItem>
    <BaseButton
      :loading="form.isLoading"
      :disabled="form.isLoading"
      type="submit"
      >add budget</BaseButton
    >
  </BaseForm>
</template>

<style>
#budgetCategory,
#theme {
  justify-content: space-between;
}

.theme-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
}
</style>

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
import BaseInput from "@/components/BaseInput.vue";

const form = useForm({
  name: "",
  target: "",
  theme: "",
});
</script>

<template>
  <BaseForm>
    <BaseAlert v-if="form.error.general" :message="form.error.general" />
    <BaseFormItem>
      <BaseLabel for="name" :data-error="form.error.name">pot name</BaseLabel>
      <BaseInput v-model="form.fields.name" id="name" name="name" />
      <BaseFormMessage v-if="form.error.name" :message="form.error.name" />
    </BaseFormItem>
    <BaseFormItem>
      <BaseLabel for="target" :data-error="form.error.target">target</BaseLabel>
      <BaseCurrencyInput
        @complete="
          (value) => {
            form.fields.target = value;
          }
        "
        id="target"
        name="target"
      />
      <BaseFormMessage v-if="form.error.target" :message="form.error.target" />
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
      >add pot</BaseButton
    >
  </BaseForm>
</template>

<style scoped>
:deep(#budgetCategory),
:deep(#theme) {
  justify-content: space-between;
}

.theme-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
}
</style>

<script setup>
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseButton from "@/components/BaseButton.vue";
import CategoryTheme from "@/components/CategoryTheme.vue";
import { useForm } from "@/composables/useForm";
import { themes, budgetCategories } from "@repo/shared-config";
import BaseCurrencyInput from "@/components/BaseCurrencyInput.vue";
import { useBudgetsStore } from "@/stores/budgets";
import { useToast } from "vue-toast-notification";
import { useQueryClient } from "@tanstack/vue-query";
import { budgetSchema } from "@repo/shared-validators/budgets";
import { AxiosError } from "axios";
import { budgets } from "@/api/budgets";
import { computed } from "vue";

const emits = defineEmits(["successful"]);
const props = defineProps({
  budget: {
    type: Object,
  },
});

const store = useBudgetsStore();

const getCategories = computed(() =>
  budgetCategories
    .filter(
      (category) =>
        props.budget?.category == category ||
        !store.alreadyUsedCategories.includes(category)
    )
    .map((category) => ({
      label: category.split("-").join(" "),
      value: category,
    }))
);

const getThemes = computed(() =>
  themes
    .filter(
      (theme) =>
        props.budget?.theme == theme || !store.alreadyUsedThemes.includes(theme)
    )
    .map((theme) => ({
      label: theme.split("-").join(" "),
      value: theme,
    }))
);

const toast = useToast();
const queryClient = useQueryClient();
const form = useForm({
  category: props.budget?.category ?? getCategories.value[0].value,
  maximumSpend: props.budget?.maximumSpend ?? "",
  theme: props.budget?.theme ?? getThemes.value[0].value,
});

function onSubmit() {
  form.submit(
    async (fields) => {
      const { category, maximumSpend, theme } = fields;

      const values = budgetSchema.parse({
        theme,
        maximumSpend,
        category,
      });

      return !props.budget
        ? budgets.addItem(values)
        : budgets.updateItem(props.budget.id, values);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["budgets"] });
        queryClient.invalidateQueries({ queryKey: ["overview-budgets"] });
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
      <BaseLabel for="category" :data-error="form.error.category"
        >budget category</BaseLabel
      >
      <BaseSelect
        id="category"
        :default-value="form.fields.category"
        :options="getCategories"
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
      <BaseLabel for="maximumSpend" :data-error="form.error.maximumSpend"
        >maximum spend</BaseLabel
      >
      <BaseCurrencyInput
        v-model="form.fields.maximumSpend"
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
        :default-value="form.fields.theme"
        :options="getThemes"
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
      >{{ props.budget ? "update budget" : "add budget" }}</BaseButton
    >
  </BaseForm>
</template>

<style scoped>
:deep(#category),
:deep(#theme) {
  justify-content: space-between;
}

.theme-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
}
</style>

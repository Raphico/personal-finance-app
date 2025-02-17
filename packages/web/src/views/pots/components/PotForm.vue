<script setup>
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseButton from "@/components/BaseButton.vue";
import CategoryTheme from "@/components/CategoryTheme.vue";
import { useForm } from "@/composables/useForm";
import { themes } from "@repo/shared-config";
import BaseCurrencyInput from "@/components/BaseCurrencyInput.vue";
import BaseInput from "@/components/BaseInput.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios";
import { potSchema } from "@repo/shared-validators/pots";
import { pots } from "@/api/pots";
import { computed } from "vue";
import { usePotsStore } from "@/stores/pots";
import { QUERY_KEYS } from "@/constants";
import { getError } from "@/utils/helpers";

const emits = defineEmits(["successful"]);
const props = defineProps({
  pot: {
    type: Object,
  },
});

const store = usePotsStore();

const getThemes = computed(() =>
  themes
    .filter(
      (theme) =>
        props.pot?.theme == theme || !store.alreadyUsedThemes.includes(theme)
    )
    .map((theme) => ({
      label: theme.split("-").join(" "),
      value: theme,
    }))
);

const toast = useToast();
const queryClient = useQueryClient();
const form = useForm({
  name: props.pot?.name ?? "",
  target: props.pot?.target ?? "",
  theme: props.pot?.theme ?? getThemes.value[0].value,
});

const { isPending, mutate: potMutation } = useMutation({
  mutationFn: (data) =>
    !props.pot ? pots.addItem(data) : pots.updateItem(props.pot.id, data),
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.overviewPots });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pots });
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

function onSubmit() {
  const { name, target, theme } = form.fields;

  form.clearError();

  if (props.pot && Number(props.pot.totalSaved) > target) {
    form.setError({
      target: "New target must be greater than the total saved.",
    });
    return;
  }

  const { data, error } = potSchema.safeParse({
    name,
    target,
    theme,
  });

  if (error) {
    form.setError(getError(error));
    return;
  }

  potMutation(data);
}
</script>

<template>
  <BaseForm @submit.prevent="onSubmit" autocomplete="off">
    <BaseFormItem>
      <BaseLabel for="name" :data-error="!!form.error.name">pot name</BaseLabel>
      <BaseInput
        v-model="form.fields.name"
        :data-error="!!form.error.name"
        id="name"
        name="name"
      />
      <BaseFormMessage v-if="!!form.error.name" :message="form.error.name" />
    </BaseFormItem>

    <BaseFormItem>
      <BaseLabel for="target" :data-error="!!form.error.target"
        >target</BaseLabel
      >
      <BaseCurrencyInput
        v-model="form.fields.target"
        :data-error="!!form.error.target"
        id="target"
        name="target"
      />
      <BaseFormMessage
        v-if="!!form.error.target"
        :message="form.error.target"
      />
    </BaseFormItem>

    <BaseFormItem>
      <BaseLabel for="theme">theme</BaseLabel>
      <BaseSelect
        id="theme"
        :default-value="form.fields.theme"
        position="top"
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
    </BaseFormItem>

    <BaseButton :loading="isPending" :disabled="isPending" type="submit">{{
      pot ? "update pot" : "add pot"
    }}</BaseButton>
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

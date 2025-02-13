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
import { useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios";
import { potSchema } from "@repo/shared-validators/pots";
import { pots } from "@/api/pots";
import { computed } from "vue";
import { usePotsStore } from "@/stores/pots";

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
      label: theme,
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

function onSubmit() {
  form.submit(
    async (fields) => {
      const { name, target, theme } = fields;

      if (props.pot && props.pot.totalSaved > target) {
        throw new Error(
          JSON.stringify({
            target: "New target must be greater than the total saved.",
          })
        );
      }

      const values = potSchema.parse({
        name,
        target,
        theme,
      });

      return !props.pot
        ? pots.addItem(values)
        : pots.updateItem(props.pot.id, values);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["overview-pots"] });
        queryClient.invalidateQueries({ queryKey: ["pots"] });
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
      <BaseLabel for="name" :data-error="form.error.name">pot name</BaseLabel>
      <BaseInput v-model="form.fields.name" id="name" name="name" />
      <BaseFormMessage v-if="form.error.name" :message="form.error.name" />
    </BaseFormItem>

    <BaseFormItem>
      <BaseLabel for="target" :data-error="form.error.target">target</BaseLabel>
      <BaseCurrencyInput
        v-model="form.fields.target"
        id="target"
        name="target"
      />
      <BaseFormMessage v-if="form.error.target" :message="form.error.target" />
    </BaseFormItem>

    <BaseFormItem>
      <BaseLabel for="theme" :data-error="form.error.theme">theme</BaseLabel>
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
      <BaseFormMessage v-if="form.error.theme" :message="form.error.theme" />
    </BaseFormItem>

    <BaseButton
      :loading="form.isLoading"
      :disabled="form.isLoading"
      type="submit"
      >{{ pot ? "update pot" : "add pot" }}</BaseButton
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

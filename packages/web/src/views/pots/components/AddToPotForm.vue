<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseCurrencyInput from "@/components/BaseCurrencyInput.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import { useForm } from "@/composables/useForm";
import { formatCurrency } from "@/utils/helpers";
import { computed } from "vue";

const props = defineProps({
  pot: {
    type: Object,
  },
});

const form = useForm({
  amountToAdd: "",
});

const getLastTotalSavedPercentage = computed(() =>
  Math.floor((props.pot.totalSaved / props.pot.target) * 100)
);
const getAmountToAddPercentage = computed(() =>
  Math.floor((Number(form.fields.amountToAdd) / props.pot.target) * 100)
);
const getTotalSavedPercentage = computed(() =>
  Math.floor(
    ((Number(form.fields.amountToAdd) + props.pot.totalSaved) /
      props.pot.target) *
      100
  )
);
</script>

<template>
  <BaseForm>
    <div>
      <p class="new-amount text-preset-1">
        <span class="text-preset-4-regular">new amount</span>
        {{ formatCurrency(pot.totalSaved) }}
      </p>
      <div class="progress">
        <div
          class="last-progress"
          :style="`--width: ${getLastTotalSavedPercentage}%;`"
        ></div>
        <div
          class="amount-to-add-progress {"
          :style="`--width: ${getAmountToAddPercentage}%; --theme: var(--clr-${pot.theme});`"
        ></div>
      </div>
      <p
        class="target text-preset-5-regular"
        :style="`--theme: var(--clr-${pot.theme});`"
      >
        <span>{{ getTotalSavedPercentage }}%</span>
        Target of {{ formatCurrency(pot.target) }}
      </p>
    </div>
    <BaseFormItem>
      <BaseLabel for="amountToAdd" :data-error="form.error.target"
        >Amount to add</BaseLabel
      >
      <BaseCurrencyInput
        @complete="
          (value) => {
            form.fields.amountToAdd = value;
          }
        "
        id="amountToAdd"
        name="amountToAdd"
      />
      <BaseFormMessage
        v-if="form.error.amountToAdd"
        :message="form.error.amountToAdd"
      />
    </BaseFormItem>
    <BaseButton
      :loading="form.isLoading"
      :disabled="form.isLoading"
      type="submit"
      >confirm addition</BaseButton
    >
  </BaseForm>
</template>

<style scoped>
.new-amount,
.target {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.new-amount {
  margin-top: var(--spacing-250);
  margin-bottom: var(--spacing-200);
}

.new-amount span {
  color: var(--clr-grey-500);
}

.progress {
  width: 100%;
  border-radius: 4px;
  height: 8px;
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: var(--clr-beige-100);
}

.last-progress {
  width: var(--width);
  height: 8px;
  background-color: var(--clr-grey-900);
  border-radius: 4px 0 0 4px;
}

.amount-to-add-progress {
  width: var(--width);
  height: 8px;
  border-radius: 4px;
  border-radius: 0 4px 4px 0;
  background-color: var(--theme);
}

.target span {
  color: var(--theme);
  font-weight: bold;
}

.target {
  color: var(--clr-grey-500);
  margin-bottom: var(--spacing-250);
  margin-top: var(--spacing-200);
}
</style>

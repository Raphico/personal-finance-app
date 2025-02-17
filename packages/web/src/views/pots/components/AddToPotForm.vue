<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseCurrencyInput from "@/components/BaseCurrencyInput.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import { useForm } from "@/composables/useForm";
import {
  formatCurrency,
  getError,
  truncateToTwoDecimals,
} from "@/utils/helpers";
import { computed } from "vue";
import { amountSchema } from "@repo/shared-validators/pots";
import { pots } from "@/api/pots";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { AxiosError } from "axios";
import { QUERY_KEYS } from "@/constants";

const emits = defineEmits(["successful"]);
const props = defineProps({
  pot: {
    type: Object,
  },
});

const queryClient = useQueryClient();
const toast = useToast();
const form = useForm({
  amount: "",
});

const { isPending, mutate: addToPot } = useMutation({
  mutationFn: (data) => pots.addWithdrawMoney(props.pot.id, data),
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

const getLastTotalSavedPercentage = computed(() =>
  truncateToTwoDecimals((props.pot.totalSaved / props.pot.target) * 100)
);
const getAmountToAddPercentage = computed(() =>
  truncateToTwoDecimals(
    Math.min(
      (Number(form.fields.amount) / props.pot.target) * 100,
      100 - getLastTotalSavedPercentage.value
    )
  )
);
const getTotalSavedPercentage = computed(() =>
  truncateToTwoDecimals(
    Math.min(
      ((Number(form.fields.amount) + Number(props.pot.totalSaved)) /
        props.pot.target) *
        100,
      100
    )
  )
);
const getTotalSaved = computed(
  () => Number(form.fields.amount) + Number(props.pot.totalSaved)
);

function onSubmit() {
  const { amount } = form.fields;
  form.clearError();

  const { error, data } = amountSchema.safeParse({
    amount,
  });

  if (error) {
    form.setError(getError(error));
    return;
  }

  if (data.amount > Number(props.pot.target)) {
    form.setError({
      amount: "Deposit should not exceed target amount",
    });
    return;
  }

  addToPot(data);
}
</script>

<template>
  <BaseForm @submit.prevent="onSubmit">
    <div>
      <p class="new-amount text-preset-1">
        <span class="text-preset-4-regular">new amount</span>
        {{ formatCurrency(getTotalSaved) }}
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
      <BaseLabel for="amount" :data-error="!!form.error.amount"
        >Amount to add</BaseLabel
      >
      <BaseCurrencyInput
        v-model="form.fields.amount"
        :data-error="!!form.error.amount"
        id="amount"
        name="amount"
      />
      <BaseFormMessage
        v-if="!!form.error.amount"
        :message="form.error.amount"
      />
    </BaseFormItem>
    <BaseButton :loading="isPending" :disabled="isPending" type="submit"
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

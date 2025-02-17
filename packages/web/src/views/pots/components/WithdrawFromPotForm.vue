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
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { useToast } from "vue-toast-notification";
import { amountSchema } from "@repo/shared-validators/pots";
import { AxiosError } from "axios";
import { pots } from "@/api/pots";
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

const { isPending, mutate: withdrawFromPot } = useMutation({
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

const getTotalSaved = computed(
  () => props.pot.totalSaved - Number(form.fields.amount)
);
const getAmountWithdrawnPercentage = computed(() =>
  truncateToTwoDecimals((form.fields.amount / props.pot.target) * 100)
);
const getAfterWithdrawPercentage = computed(() =>
  truncateToTwoDecimals((getTotalSaved.value / props.pot.target) * 100)
);
const getTotalSavedPercentage = computed(() =>
  truncateToTwoDecimals(
    ((props.pot.totalSaved - Number(form.fields.amount)) / props.pot.target) *
      100
  )
);

function onSubmit() {
  const { amount } = form.fields;

  const { data, error } = amountSchema.safeParse({
    amount,
  });

  if (error) {
    form.setError(getError(error));
    return;
  }

  if (data.amount > Number(props.pot.totalSaved)) {
    form.setError({
      amount: "You cannot withdraw more than the total saved",
    });
    return;
  }

  withdrawFromPot({ amount: -data.amount });
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
          class="after-withdraw-progress"
          :style="`--width: ${getAfterWithdrawPercentage}%;`"
        ></div>
        <div
          class="amount-withdrawn-progress {"
          :style="`--width: ${getAmountWithdrawnPercentage}%;`"
        ></div>
      </div>
      <p class="target text-preset-5-regular">
        <span>{{ getTotalSavedPercentage }}%</span>
        Target of {{ formatCurrency(pot.target) }}
      </p>
    </div>
    <BaseFormItem>
      <BaseLabel for="amount" :data-error="form.error.amount"
        >Amount to withdraw</BaseLabel
      >
      <BaseCurrencyInput
        v-model="form.fields.amount"
        :data-error="form.error.amount"
        id="amount"
        name="amount"
      />
      <BaseFormMessage v-if="form.error.amount" :message="form.error.amount" />
    </BaseFormItem>
    <BaseButton :loading="isPending" :disabled="isPending" type="submit"
      >confirm withdrawal</BaseButton
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

.after-withdraw-progress {
  width: var(--width);
  height: 8px;
  background-color: var(--clr-grey-900);
  border-radius: 4px 0 0 4px;
}

.amount-withdrawn-progress {
  width: var(--width);
  height: 8px;
  border-radius: 4px;
  border-radius: 0 4px 4px 0;
  background-color: var(--clr-red);
}

.target span {
  color: var(--clr-red);
  font-weight: bold;
}

.target {
  color: var(--clr-grey-500);
  margin-bottom: var(--spacing-250);
  margin-top: var(--spacing-200);
}
</style>

<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseCurrencyInput from "@/components/BaseCurrencyInput.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseFormItem from "@/components/BaseFormItem.vue";
import BaseFormMessage from "@/components/BaseFormMessage.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import { useForm } from "@/composables/useForm";
import { formatCurrency, truncateToTwoDecimals } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { useToast } from "vue-toast-notification";
import { amountSchema } from "@repo/shared-validators/pots";
import { AxiosError } from "axios";
import { pots } from "@/api/pots";

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
  form.submit(
    async (fields) => {
      const { amount } = fields;

      const values = amountSchema.parse({
        amount,
      });

      if (values.amount > props.pot.totalSaved) {
        throw new Error(
          JSON.stringify({
            amount: "You cannot withdraw more than the total saved",
          })
        );
      }

      return pots.addWithdrawMoney(props.pot.id, { amount: -values.amount });
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
        id="amount"
        name="amount"
      />
      <BaseFormMessage v-if="form.error.amount" :message="form.error.amount" />
    </BaseFormItem>
    <BaseButton
      :loading="form.isLoading"
      :disabled="form.isLoading"
      type="submit"
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

<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import BaseLink from "@/components/BaseLink.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";
import { formatCurrency, selectRandomTheme } from "@/utils/helpers";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { watch } from "vue";
import { transactions } from "@/api/transactions";
import IconRecurringBills from "@/components/Icons/IconRecurringBills.vue";
import { QUERY_KEYS } from "@/constants";

const toast = useToast();
const {
  isPending,
  error,
  isError,
  data: recurringBills,
} = useQuery({
  queryKey: QUERY_KEYS.overviewRecurringBills,
  queryFn: fetchRecurringBills,
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

async function fetchRecurringBills() {
  const response = await transactions.getRecurringBills({ limit: 3 });
  return response.data.bills;
}
</script>

<template>
  <BaseCard class="recurring-bills">
    <BaseCardTitle class="recurring-bills__title"
      >recurring bills</BaseCardTitle
    >
    <BaseLink to="/recurring-bills" class="recurring-bills__link">
      see details
      <IconCaretRight />
    </BaseLink>
    <div v-if="isPending" role="status" class="recurring-bills__loading"></div>
    <div
      class="recurring-bills__empty"
      v-else-if="isError || (recurringBills && recurringBills.length == 0)"
      role="status"
      aria-live="polite"
    >
      <IconRecurringBills class="recurring-bills__empty-icon" />
      <p>No recent recurring bills</p>
    </div>
    <dl v-else class="recurring-bills__list">
      <div
        v-for="bill in recurringBills"
        :key="bill.id"
        :style="`--color: ${selectRandomTheme()}`"
      >
        <dt class="text-preset-4-regular">{{ bill.title }}</dt>
        <dd class="text-preset-4-bold">
          {{ formatCurrency(bill.amount) }}
        </dd>
      </div>
    </dl>
  </BaseCard>
</template>

<style scoped>
.recurring-bills {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 25px auto;
  gap: var(--spacing-400);
  min-height: 250px;
  align-items: start;
}

.recurring-bills__empty {
  grid-column: 1 / -1;
  text-align: center;
  display: grid;
  place-content: center;
  gap: var(--spacing-100);
  height: 300px;
  color: var(--clr-grey-500);
}

.recurring-bills__empty p {
  margin: 0;
}

.recurring-bills__empty-icon {
  justify-self: center;
}

.recurring-bills__loading {
  width: 100%;
  height: 300px;
  grid-column: 1 / -1;
  border-radius: 5px;
  background-color: var(--clr-beige-100);
}

.recurring-bills__title {
  white-space: nowrap;
}

.recurring-bills__link {
  justify-self: end;
}

.recurring-bills__list {
  display: grid;
  gap: var(--spacing-150);
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  margin: 0;
}

.recurring-bills__list > * {
  --color: var(--clr-green);

  display: flex;
  justify-content: space-between;
  background-color: var(--clr-beige-100);
  padding: var(--spacing-250) var(--spacing-200);
  border-radius: 8px;
  border-left: 4px solid var(--color);
}

.recurring-bills__list dt {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}
</style>

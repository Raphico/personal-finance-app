<script setup>
import { transactions } from "@/api/transactions";
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import { formatCurrency } from "@/utils/helpers";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { watch, computed } from "vue";

const toast = useToast();
const {
  isPending,
  error,
  data: summary,
  isError,
} = useQuery({
  queryKey: ["overview-summary"],
  queryFn: fetchSummary,
});

const currentBalance = computed(() => {
  if (!isError.value && summary.value) {
    return summary.value.income - summary.value.expenses;
  }

  return 0;
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

async function fetchSummary() {
  const response = await transactions.getSummary();
  return response.data;
}
</script>

<template>
  <div class="summary">
    <BaseCard class="summary__card">
      <BaseCardTitle class="text-preset-4-regular"
        >current balance</BaseCardTitle
      >
      <span
        v-if="isPending"
        role="status"
        class="summary__loading animate-pulse"
      ></span>
      <p class="text-preset-1" v-else>
        {{ formatCurrency(currentBalance) }}
      </p>
    </BaseCard>
    <BaseCard class="summary__card">
      <BaseCardTitle class="text-preset-4-regular">income</BaseCardTitle>
      <span
        v-if="isPending"
        role="status"
        class="summary__loading animate-pulse"
      ></span>
      <p class="text-preset-1" v-else>
        {{ formatCurrency(summary?.income ?? 0) }}
      </p>
    </BaseCard>
    <BaseCard class="summary__card">
      <BaseCardTitle class="text-preset-4-regular">expenses</BaseCardTitle>
      <span
        v-if="isPending"
        role="status"
        class="summary__loading animate-pulse"
      ></span>
      <p class="text-preset-1">{{ formatCurrency(summary?.expenses ?? 0) }}</p>
    </BaseCard>
  </div>
</template>

<style scoped>
.summary {
  display: grid;
  gap: var(--spacing-150);
}

.summary__card:first-of-type {
  background-color: var(--clr-grey-900);
  color: var(--clr-white);
}

.summary__loading {
  width: 100%;
  height: 40px;
  background-color: var(--clr-beige-100);
}

.summary__card:first-of-type .loading {
  background-color: var(--clr-grey-500);
}

.summary__card:not(:first-of-type) h2 {
  color: var(--clr-grey-500);
}

.summary__card {
  gap: var(--spacing-150);
}

.summary__card p {
  margin: 0;
}

@media (min-width: 768px) {
  .summary {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-300);
  }
  .summary__card {
    padding: var(--spacing-300);
  }
}
</style>

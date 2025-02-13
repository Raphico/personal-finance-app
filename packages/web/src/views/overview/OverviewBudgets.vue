<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import BaseLink from "@/components/BaseLink.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";
import { formatCurrency } from "@/utils/helpers";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { watch } from "vue";
import { budgets } from "@/api/budgets";
import IconNavBudgets from "@/components/Icons/IconNavBudgets.vue";
import { QUERY_KEYS } from "@/constants";

const toast = useToast();
const {
  isPending,
  error,
  isError,
  data: budgetList,
} = useQuery({
  queryKey: QUERY_KEYS.overviewBudgets,
  queryFn: fetchBudgets,
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

async function fetchBudgets() {
  const response = await budgets.getList({ limit: 8 });
  return response.data.budgets;
}
</script>

<template>
  <BaseCard class="budgets">
    <BaseCardTitle>Budgets</BaseCardTitle>
    <BaseLink class="budgets__link" href="/budgets">
      see details
      <IconCaretRight />
    </BaseLink>

    <div
      class="budgets__empty"
      v-if="isError || (budgetList && budgetList.length == 0)"
      role="status"
      aria-live="polite"
    >
      <IconNavBudgets class="budgets__empty-icon" />
      <p>No recent budgets</p>
    </div>

    <div v-else class="budgets__content">
      <div
        v-if="isPending"
        class="budgets__loading-chart animate-pulse"
        role="status"
      ></div>
      <div v-else class="budgets__chart"></div>

      <div
        v-if="isPending"
        class="budgets__loading-list animate-pulse"
        role="status"
      ></div>
      <DescriptionList
        v-else
        class="budgets__list"
        :items="
          budgetList.map((budget) => ({
            term: budget.category,
            description: formatCurrency(budget.maximumSpend),
            theme: budget.theme,
          }))
        "
      />
    </div>
  </BaseCard>
</template>

<style scoped>
.budgets {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: var(--spacing-250);
  align-items: start;
}

.budgets__content {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 0 var(--spacing-250);
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  align-items: start;
}

.budgets__empty {
  grid-column: 1 / -1;
  text-align: center;
  display: grid;
  gap: var(--spacing-100);
  place-content: center;
  height: 300px;
  color: var(--clr-grey-500);
}

.budgets__empty p {
  margin: 0;
}

.budgets__empty-icon {
  justify-self: center;
}

.budgets__link {
  justify-content: end;
}

.budgets__chart,
.budgets__loading-chart {
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  background-color: var(--clr-beige-100);
  width: 240px;
  height: 240px;
  border-radius: 50%;
  justify-self: center;
}

.budgets__list {
  margin-block: var(--spacing-200) 0;
  grid-template-columns: repeat(2, 1fr);
  grid-row: 2 / 3;
  grid-column: 1 / -1;
}

.budgets__loading-list {
  height: 100px;
  background-color: var(--clr-beige-100);
  margin-block: var(--spacing-200) 0;
  grid-row: 2 / 3;
  border-radius: 8px;
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .budgets__content {
    grid-template-columns: 1fr 110px;
    grid-template-rows: auto auto;
    margin-top: var(--spacing-250);
  }

  .budgets__list {
    grid-template-columns: 1fr;
    grid-row: 2 / 3;
    width: 95%;
    margin-left: auto;
    margin-top: 0;
    grid-column: 2 / -1;
  }

  .budgets__loading-list {
    height: 100%;
    grid-row: 2 / 3;
    margin-top: 0;
    grid-column: 2 / -1;
  }

  .budgets__chart,
  .budgets__loading-chart {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
}
</style>

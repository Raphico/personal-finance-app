<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import BaseLink from "@/components/BaseLink.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";
import { formatCurrency, selectRandomTheme } from "@/utils/helpers";

const recurringBills = [
  {
    title: "paid bills",
    amount: 190,
  },
  {
    title: "total upcoming",
    amount: 194.98,
  },
  {
    title: "due soon",
    amount: 59.98,
  },
];
</script>

<template>
  <BaseCard class="recurringBills-card">
    <BaseCardTitle>recurring bills</BaseCardTitle>
    <BaseLink href="/recurring-bills">
      see details
      <IconCaretRight />
    </BaseLink>
    <dl class="recurringBills-list">
      <div
        v-for="bill in recurringBills"
        :key="bill.title"
        :style="`--color: ${selectRandomTheme()}`"
      >
        <dt class="text-preset-4-regular">{{ bill.title }}</dt>
        <dd class="text-preset-4-bold">
          {{ formatCurrency(bill.amount, "USD") }}
        </dd>
      </div>
    </dl>
  </BaseCard>
</template>

<style scoped>
.recurringBills-card {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: var(--spacing-250);
}

.recurringBills-card a {
  justify-self: end;
}

.recurringBills-list {
  display: grid;
  gap: var(--spacing-150);
  grid-column: 1 / -1;
  grid-row: 2 / 3;
}

.recurringBills-list > * {
  --color: var(--clr-green);

  display: flex;
  justify-content: space-between;
  background-color: var(--clr-beige-100);
  padding: var(--spacing-250) var(--spacing-200);
  border-radius: 8px;
  border-left: 4px solid var(--color);
}

.recurringBills-list dt {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}
</style>

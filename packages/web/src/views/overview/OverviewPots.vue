<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import BaseLink from "@/components/BaseLink.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";
import IconPots from "@/components/Icons/IconPots.vue";
import { formatCurrency } from "@/utils/helpers";

const pots = [
  { name: "savings", amount: 159 },
  { name: "gift", amount: 40 },
  { name: "concert ticket", amount: 110 },
  { name: "new laptop", amount: 10 },
];

const totalSaved = 850;
</script>

<template>
  <BaseCard class="pots-card">
    <BaseCardTitle>Pots</BaseCardTitle>
    <BaseLink href="/pots">
      See details
      <IconCaretRight />
    </BaseLink>
    <div class="total-saved">
      <div class="total-saved-icon-container">
        <IconPots />
      </div>
      <p class="text-preset-4-regular">total saved</p>
      <p class="text-preset-1">{{ formatCurrency(totalSaved, "USD") }}</p>
    </div>
    <DescriptionList
      class="pots-list"
      :items="
        pots.map((pot) => ({
          term: pot.name,
          description: formatCurrency(pot.amount, 'USD'),
        }))
      "
    />
  </BaseCard>
</template>

<style scoped>
.pots-card {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--spacing-250);
}

.pots-card a {
  justify-content: flex-end;
}

.total-saved {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto auto;
  gap: var(--spacing-100) var(--spacing-200);
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  background-color: var(--clr-beige-100);
  border-radius: 12px;
  padding: var(--spacing-200);
}

.total-saved-icon-container {
  margin: auto;
}

.total-saved .total-saved-icon-container {
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  color: var(--clr-green);
}

.total-saved p:first-of-type {
  grid-row: 1 / 2;
  grid-column: 2 / -1;
  color: var(--clr-grey-500);
  align-self: end;
  text-transform: capitalize;
  margin: 0;
}

.total-saved p:nth-of-type(2) {
  grid-row: 2 / 3;
  grid-column: 2 / -1;
  margin: 0;
}

.pots-list {
  grid-row: 3 / 4;
  grid-column: 1 / -1;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .pots-card {
    grid-template-rows: repeat(2, auto);
    grid-template-columns: 0.75fr 1fr;
  }

  .total-saved {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  .pots-list {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }
}
</style>

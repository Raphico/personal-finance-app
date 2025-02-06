<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import { formatCurrency } from "@/utils/helpers";

defineProps({
  summary: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <BaseCard class="summary-card">
    <BaseCardTitle class="text-preset-3">summary</BaseCardTitle>
    <dl class="summary-list">
      <div v-for="item in summary" :key="item.name">
        <dt class="text-preset-5-regular">{{ item.name }}</dt>
        <dd class="text-preset-5-bold">
          {{ item.count }}({{ formatCurrency(item.total) }})
        </dd>
      </div>
    </dl>
  </BaseCard>
</template>

<style scoped>
.summary-list {
  margin-block: var(--spacing-100) 0;
}
.summary-list dt {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}

.summary-list > * {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-150);
}

.summary-list > :last-child {
  padding-bottom: 0;
  color: var(--clr-red);
}

.summary-list > :last-child dt {
  color: var(--clr-red);
}

.summary-list > * + * {
  border-top: 1px solid var(--clr-grey-100);
  padding-top: var(--spacing-150);
}
</style>

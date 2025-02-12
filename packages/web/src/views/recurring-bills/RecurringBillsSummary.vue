<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import { formatCurrency } from "@/utils/helpers";

const props = defineProps({
  summary: {
    type: Map,
    required: true,
  },
});
</script>

<template>
  <BaseCard>
    <BaseCardTitle class="text-preset-3">summary</BaseCardTitle>
    <dl class="summary__list">
      <div>
        <dt class="text-preset-5-regular">paid bills</dt>
        <dd class="text-preset-5-bold">
          {{ summary.get("PAID")?.count ?? 0 }}({{
            formatCurrency(summary.get("PAID")?.total ?? 0)
          }})
        </dd>
      </div>
      <div>
        <dt class="text-preset-5-regular">total upcoming</dt>
        <dd class="text-preset-5-bold">
          {{ summary.get("UPCOMING")?.count ?? 0 }}({{
            formatCurrency(summary.get("UPCOMING")?.total ?? 0)
          }})
        </dd>
      </div>
      <div>
        <dt class="text-preset-5-regular">due soon</dt>
        <dd class="text-preset-5-bold">
          {{ summary.get("DUE_SOON")?.count ?? 0 }}({{
            formatCurrency(summary.get("DUE_SOON")?.total ?? 0)
          }})
        </dd>
      </div>
    </dl>
  </BaseCard>
</template>

<style scoped>
.summary__list {
  margin-block: var(--spacing-100) 0;
}
.summary__list dt {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}

.summary__list > * {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-150);
}

.summary__list > :last-child {
  padding-bottom: 0;
  color: var(--clr-red);
}

.summary__list > :last-child dt {
  color: var(--clr-red);
}

.summary__list > * + * {
  border-top: 1px solid var(--clr-grey-100);
  padding-top: var(--spacing-150);
}
</style>

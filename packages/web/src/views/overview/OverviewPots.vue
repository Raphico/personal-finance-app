<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import BaseLink from "@/components/BaseLink.vue";
import DescriptionList from "@/components/DescriptionList.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";
import IconPots from "@/components/Icons/IconPots.vue";
import { formatCurrency } from "@/utils/helpers";
import { useQuery } from "@tanstack/vue-query";
import { useToast } from "vue-toast-notification";
import { watch } from "vue";
import { pots } from "@/api/pots";
import { QUERY_KEYS } from "@/constants";

const toast = useToast();

const {
  isPending: isLoadingPots,
  error: potListError,
  data: potList,
} = useQuery({
  queryKey: QUERY_KEYS.overviewPots,
  queryFn: fetchPots,
});

const {
  isPending: isLoadingTotalSaved,
  error: totalSavedError,
  data: totalSaved,
} = useQuery({
  queryKey: QUERY_KEYS.overviewPotsTotalSaved,
  queryFn: fetchTotalSaved,
});

watch(potListError, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

watch(totalSavedError, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

async function fetchPots() {
  const response = await pots.getList({ params: { limit: 4 } });
  return response.data.pots;
}

async function fetchTotalSaved() {
  const response = await pots.getTotalSaved();
  return response.data.totalSaved;
}
</script>

<template>
  <BaseCard class="pots">
    <BaseCardTitle>Pots</BaseCardTitle>
    <BaseLink href="/pots" class="pots__link">
      See details
      <IconCaretRight />
    </BaseLink>

    <div class="pots__total-saved">
      <div class="pots__total-saved-icon">
        <IconPots />
      </div>
      <p class="text-preset-4-regular">total saved</p>
      <span
        v-if="isLoadingTotalSaved"
        role="status"
        class="pots__loading-total-saved animate-pulse"
      ></span>
      <p class="text-preset-1" v-else>{{ formatCurrency(totalSaved ?? 0) }}</p>
    </div>

    <div
      class="pots__loading-pot-list animate-pulse"
      role="status"
      v-if="isLoadingPots"
    ></div>
    <DescriptionList
      class="pots__list"
      v-else-if="potList && potList.length > 0"
      :items="
        potList.map((pot) => ({
          term: pot.name,
          description: formatCurrency(pot.target),
          theme: pot.theme,
        }))
      "
    />
  </BaseCard>
</template>

<style scoped>
.pots {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--spacing-250);
}

.pots__link {
  justify-content: flex-end;
}

.pots__loading-pot-list {
  height: 100px;
  background-color: var(--clr-beige-100);
  border-radius: 8px;
  grid-row: 3 / 4;
  grid-column: 1 / -1;
}

.pots__loading-total-saved {
  width: 50%;
  height: 40px;
  background-color: var(--clr-white);
}

.pots__total-saved {
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

.pots__total-saved-icon {
  margin: auto;
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  color: var(--clr-green);
}

.pots__total-saved p:first-of-type {
  grid-row: 1 / 2;
  grid-column: 2 / -1;
  color: var(--clr-grey-500);
  align-self: end;
  text-transform: capitalize;
  margin: 0;
}

.pots__total-saved p:nth-of-type(2) {
  grid-row: 2 / 3;
  grid-column: 2 / -1;
  margin: 0;
}

.pots__list {
  grid-row: 3 / 4;
  grid-column: 1 / -1;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .pots {
    grid-template-rows: repeat(2, auto);
    grid-template-columns: 0.75fr 1fr;
  }

  .pots__total-saved {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  .pots__list,
  .pots__loading-pot-list {
    align-self: start;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }
}
</style>

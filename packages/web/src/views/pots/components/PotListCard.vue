<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import CategoryTheme from "@/components/CategoryTheme.vue";
import EditDeletePotAction from "./EditDeletePotAction.vue";
import { formatCurrency, truncateToTwoDecimals } from "@/utils/helpers";
import { computed } from "vue";
import EditPotModal from "./EditPotModal.vue";
import { ref } from "vue";
import DeletePotModal from "./DeletePotModal.vue";
import AddToPotModal from "./AddToPotModal.vue";
import WithdrawFromPotModal from "./WithdrawFromPotModal.vue";

const props = defineProps({
  pot: {
    type: Object,
    required: true,
  },
});

const showEditModal = ref(false);
const showDeleteModal = ref(false);

const getTotalSavedPercentage = computed(() =>
  truncateToTwoDecimals((props.pot.totalSaved / props.pot.target) * 100)
);
</script>

<template>
  <BaseCard class="pot">
    <BaseCardTitle class="pot__header text-preset-2">
      <CategoryTheme :theme="pot.theme" />
      {{ pot.name }}
    </BaseCardTitle>

    <EditDeletePotAction
      @edit="showEditModal = true"
      @delete="showDeleteModal = true"
      class="pot__edit-delete-action"
    />

    <div class="pot__overview">
      <p class="pot__overview-total-saved text-preset-1">
        <span class="text-preset-4-regular">total saved</span>
        {{ formatCurrency(pot.totalSaved) }}
      </p>
      <div class="pot__overview-progress">
        <div
          class="pot__overview-progress-bar"
          :style="`--width: ${getTotalSavedPercentage}%; --theme: var(--clr-${pot.theme});`"
        ></div>
      </div>
      <p class="pot__overview-target text-preset-5-regular">
        <span>{{ getTotalSavedPercentage }}%</span>
        Target of {{ formatCurrency(pot.target) }}
      </p>
    </div>

    <AddToPotModal :pot="pot" />
    <WithdrawFromPotModal :pot="pot" />

    <EditPotModal :pot="pot" v-model="showEditModal" />
    <DeletePotModal
      :pot="pot"
      @done="showDeleteModal = false"
      v-model="showDeleteModal"
    />
  </BaseCard>
</template>

<style scoped>
.pot {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--spacing-400) var(--spacing-200);
}

.pot__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  white-space: nowrap;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.pot__overview {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
}

.pot__edit-delete-action {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  justify-self: end;
}

.pot__overview-total-saved,
.pot__overview-target {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pot__overview-target {
  color: var(--clr-grey-500);
  margin-bottom: 0;
}

.pot__overview-target span {
  font-weight: bold;
}

.pot__overview-total-saved {
  margin-top: 0;
  margin-bottom: var(--spacing-200);
}

.pot__overview-total-saved span {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}

.pot__overview-progress {
  background-color: var(--clr-beige-100);
  width: 100%;
  height: 8px;
  border-radius: 4px;
}

.pot__overview-progress-bar {
  width: var(--width);
  background-color: var(--theme);
  height: 8px;
  border-radius: 4px;
}
</style>

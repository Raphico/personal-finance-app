<script setup>
import BaseCard from "@/components/BaseCard.vue";
import BaseCardTitle from "@/components/BaseCardTitle.vue";
import CategoryTheme from "@/components/CategoryTheme.vue";
import EditDeletePotAction from "./EditDeletePotAction.vue";
import BaseButton from "@/components/BaseButton.vue";
import { formatCurrency } from "@/utils/helpers";
import { computed } from "vue";
import EditPotModal from "./EditPotModal.vue";
import { ref } from "vue";
import DeletePotModal from "./DeletePotModal.vue";
import AddToPotModal from "./AddToPotModal.vue";

const props = defineProps({
  pot: {
    type: Object,
    required: true,
  },
});

const showEditModal = ref(false);
const showDeleteModal = ref(false);

const getTotalSavedPercentage = computed(() =>
  Math.floor((props.pot.totalSaved / props.pot.target) * 100)
);
</script>

<template>
  <BaseCard class="pot-card">
    <BaseCardTitle class="text-preset-2">
      <CategoryTheme :theme="pot.theme" />
      {{ pot.name }}
    </BaseCardTitle>
    <EditDeletePotAction
      @edit="showEditModal = true"
      @delete="showDeleteModal = true"
      class="edit-delete-action"
    />
    <div class="pot-overview">
      <p class="total-saved text-preset-1">
        <span class="text-preset-4-regular">total saved</span>
        {{ formatCurrency(pot.totalSaved) }}
      </p>
      <div class="progress">
        <div
          class="progress-bar"
          :style="`--width: ${getTotalSavedPercentage}%; --theme: var(--clr-${pot.theme});`"
        ></div>
      </div>
      <p class="target text-preset-5-regular">
        <span>{{ getTotalSavedPercentage }}%</span>
        Target of {{ formatCurrency(pot.target) }}
      </p>
    </div>
    <AddToPotModal :pot="pot" />
    <BaseButton variant="secondary">withdraw</BaseButton>

    <EditPotModal :pot="pot" v-model="showEditModal" />
    <DeletePotModal :pot="pot" v-model="showDeleteModal" />
  </BaseCard>
</template>

<style scoped>
.pot-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--spacing-400) var(--spacing-200);
}

.pot-card h2 {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  text-wrap: nowrap;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.pot-overview {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
}

.edit-delete-action {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  justify-self: end;
}

.total-saved,
.target {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.target {
  color: var(--clr-grey-500);
  margin-bottom: 0;
}

.target span {
  font-weight: bold;
}

.total-saved {
  margin-top: 0;
  margin-bottom: var(--spacing-200);
}

.total-saved span {
  color: var(--clr-grey-500);
  text-transform: capitalize;
}

.progress {
  background-color: var(--clr-beige-100);
  width: 100%;
  height: 8px;
  border-radius: 4px;
}

.progress-bar {
  width: var(--width);
  background-color: var(--theme);
  height: 8px;
  border-radius: 4px;
}
</style>

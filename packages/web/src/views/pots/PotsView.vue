<script setup>
import PageHeader from "@/components/PageHeader.vue";
import AddNewPotModal from "./components/AddNewPotModal.vue";
import PotList from "./components/PotList.vue";
import { useHead } from "@unhead/vue";
import { useToast } from "vue-toast-notification";
import { useQuery } from "@tanstack/vue-query";
import { pots } from "@/api/pots";
import { watch } from "vue";
import { usePotsStore } from "@/stores/pots";
import { QUERY_KEYS } from "@/constants";

useHead({
  title: "Pots - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app pots page",
    },
  ],
});

const { setAlreadyUsedThemes } = usePotsStore();
const toast = useToast();
const {
  isPending,
  data: potList,
  error,
} = useQuery({
  queryKey: QUERY_KEYS.pots,
  queryFn: fetchPots,
});

watch(error, (value) => {
  toast.error(value.message, {
    position: "top",
  });
});

watch(potList, () => {
  if (potList.value) {
    setAlreadyUsedThemes(potList.value.map((pot) => pot.theme));
  }
});

async function fetchPots() {
  const response = await pots.getList();
  return response.data.pots;
}
</script>

<template>
  <div class="pots">
    <header>
      <PageHeader class="pots__header">Pots</PageHeader>
      <AddNewPotModal />
    </header>

    <div v-if="isPending" class="pots__loading-container">
      <div class="pots__loading-item animate-pulse" role="status"></div>
      <div class="pots__loading-item animate-pulse" role="status"></div>
      <div class="pots__loading-item animate-pulse" role="status"></div>
      <div class="pots__loading-item animate-pulse" role="status"></div>
    </div>
    <PotList v-else :pots="potList ?? []" />
  </div>
</template>

<style scoped>
.pots {
  display: grid;
  gap: var(--spacing-400);
}

.pots header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pots__loading-container {
  display: grid;
  gap: var(--spacing-200);
}

.pots__loading-item {
  width: 100%;
  height: 295px;
  border-radius: 8px;
  background-color: var(--clr-white);
}

@media (min-width: 1024px) {
  .pots__loading-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

.pots__header {
  margin: 0;
}
</style>

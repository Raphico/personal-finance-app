<script setup>
import PageHeader from "@/components/PageHeader.vue";
import AddNewPotModal from "./components/AddNewPotModal.vue";
import PotList from "./components/PotList.vue";
import { useHead } from "@unhead/vue";

useHead({
  title: "Pots - Personal Finance App",
  meta: [
    {
      name: "description",
      content: "Personal finance app pots page",
    },
  ],
});

const pots = [
  {
    id: 1,
    name: "savings",
    target: 2000,
    totalSaved: 159,
    theme: "green",
  },
  {
    id: 2,
    name: "concert ticket",
    target: 150,
    totalSaved: 110,
    theme: "blue",
  },
  {
    id: 3,
    name: "gift",
    target: 60,
    totalSaved: 40,
    theme: "purple",
  },
  {
    id: 4,
    name: "new laptop",
    target: 1000,
    totalSaved: 10,
    theme: "navy",
  },
  {
    id: 5,
    name: "holiday",
    target: 1440,
    totalSaved: 531,
    theme: "yellow",
  },
];
</script>

<template>
  <div class="pots-container">
    <header>
      <PageHeader>Pots</PageHeader>
      <AddNewPotModal />
    </header>

    <div class="content">
      <PotList :pots="pots" />
    </div>
  </div>
</template>

<style scoped>
.pots-container {
  display: grid;
  gap: var(--spacing-400);
}

.pots-container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}
</style>

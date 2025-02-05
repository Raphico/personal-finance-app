<script setup>
import PageHeader from "@/components/PageHeader.vue";
import AddNewPotModal from "./components/AddNewPotModal.vue";
</script>

<template>
  <div class="pots-container">
    <header>
      <PageHeader>Pots</PageHeader>
      <AddNewPotModal />
    </header>
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

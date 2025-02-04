<script setup>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import IconFilterMobile from "@/components/Icons/IconFilterMobile.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import IconSortMobile from "@/components/Icons/IconSortMobile.vue";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
</script>

<template>
  <div class="filter-container">
    <div class="search-container">
      <BaseInput
        aria-label="transaction name"
        placeholder="Search transaction"
      />
      <IconSearch />
    </div>
    <BaseSelect
      id="sort-select"
      :button-variant="width <= 540 ? 'ghost' : 'outline'"
      :size="width <= 540 ? 'icon' : 'sm'"
      :options="[
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
        { label: 'highest', value: 'highest' },
        { label: 'lowest', value: 'lowest' },
      ]"
      @select="(value) => console.log(value)"
    >
      <IconSortMobile />
      <span>sort</span>
    </BaseSelect>

    <BaseSelect
      id="filter-select"
      :button-variant="width <= 540 ? 'ghost' : 'outline'"
      :size="width <= 540 ? 'icon' : 'sm'"
      :options="[
        { label: 'health', value: 'health' },
        { label: 'general', value: 'general' },
      ]"
      @select="(value) => console.log(value)"
    >
      <IconFilterMobile />
      <span>filter</span>
    </BaseSelect>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-150);
}

.filter-container > :nth-child(2) {
  margin-left: auto;
}
.search-container {
  position: relative;
}

.search-container svg {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 30;
}

.search-container input {
  padding-right: var(--spacing-400);
}

@media (max-width: 540px) {
  #filter-select span,
  #sort-select span {
    display: none;
  }

  .search-container input {
    width: 215px;
  }
}
</style>

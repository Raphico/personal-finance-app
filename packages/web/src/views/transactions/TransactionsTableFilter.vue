<script setup>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import IconFilterMobile from "@/components/Icons/IconFilterMobile.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import IconSortMobile from "@/components/Icons/IconSortMobile.vue";
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 540);
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
      :button-variant="isMobile ? 'ghost' : 'outline'"
      :size="isMobile ? 'icon' : 'sm'"
      :options="[
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
        { label: 'highest', value: 'highest' },
        { label: 'lowest', value: 'lowest' },
      ]"
      @select="(value) => console.log(value)"
    >
      <template v-if="!isMobile">
        <span>sort</span>
      </template>
      <template v-if="isMobile" #icon>
        <IconFilterMobile />
      </template>
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
      <template v-if="!isMobile">
        <span>category</span>
      </template>
      <template v-if="isMobile" #icon>
        <IconSortMobile />
      </template>
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
  .search-container input {
    width: 215px;
  }
}
</style>

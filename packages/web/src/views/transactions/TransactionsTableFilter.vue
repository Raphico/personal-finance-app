<script setup>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import IconFilterMobile from "@/components/Icons/IconFilterMobile.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import IconSortMobile from "@/components/Icons/IconSortMobile.vue";
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
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

    <div>
      <span id="sortLabel" class="label text-preset-4-regular">Sort by</span>
      >
      <BaseSelect
        id="sort-select"
        aria-labelledby="sortLabel"
        :variant="isMobile ? 'ghost' : 'outline'"
        :size="isMobile ? 'icon' : 'md'"
        :options="[
          { label: 'latest', value: 'latest' },
          { label: 'oldest', value: 'oldest' },
          { label: 'highest', value: 'highest' },
          { label: 'lowest', value: 'lowest' },
        ]"
        @select="(value) => console.log(value)"
      >
        <template v-if="isMobile" #icon>
          <IconSortMobile />
        </template>
        <template v-if="isMobile" #currentValue>{{ null }}</template>
      </BaseSelect>
    </div>

    <div>
      <span id="filterLabel" class="label text-preset-4-regular">Category</span>
      <BaseSelect
        id="filter-select"
        aria-labelledby="filterLabel"
        :variant="isMobile ? 'ghost' : 'outline'"
        :size="isMobile ? 'icon' : 'md'"
        :options="[
          { label: 'all transactions', value: 'all transactions' },
          { label: 'health', value: 'health' },
          { label: 'general', value: 'general' },
        ]"
        @select="(value) => console.log(value)"
      >
        <template v-if="isMobile" #icon>
          <IconFilterMobile />
        </template>
        <template v-if="isMobile" #currentValue>{{ null }}</template>
      </BaseSelect>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-300);
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

.label {
  color: var(--clr-grey-500);
  margin-right: var(--spacing-100);
}

.search-container input {
  padding-right: var(--spacing-400);
}

@media (max-width: 768px) {
  .search-container input {
    width: 215px;
  }

  .filter-container {
    gap: 0;
  }
}
</style>

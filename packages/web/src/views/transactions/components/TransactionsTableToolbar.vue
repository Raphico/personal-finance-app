<script setup>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import IconFilterMobile from "@/components/Icons/IconFilterMobile.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import IconSortMobile from "@/components/Icons/IconSortMobile.vue";
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const props = defineProps({
  table: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
  },
});

const sortOptions = [
  { label: "latest", value: "latest" },
  { label: "oldest", value: "oldest" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
  { label: "highest", value: "highest" },
  { label: "lowest", value: "lowest" },
];

function handleSort(value) {
  if (value === "a-z") {
    props.table.setSorting([{ id: "name", desc: false }]);
  } else if (value === "z-a") {
    props.table.setSorting([{ id: "name", desc: true }]);
  } else if (value === "latest") {
    props.table.setSorting([{ id: "date", desc: true }]);
  } else if (value === "oldest") {
    props.table.setSorting([{ id: "date", desc: false }]);
  } else if (value === "highest") {
    props.table.setSorting([{ id: "amount", desc: true }]);
  } else if (value === "lowest") {
    props.table.setSorting([{ id: "amount", desc: false }]);
  }
}

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);
</script>

<template>
  <div class="toolbar">
    <div class="toolbar__search">
      <BaseInput
        name="transactionName"
        aria-label="transaction name"
        :model-value="table.getColumn('name')?.getFilterValue() ?? ''"
        placeholder="Search transaction"
        @input="table.getColumn('name')?.setFilterValue($event.target.value)"
      />
      <IconSearch />
    </div>

    <div class="toolbar__filter-sort">
      <span id="sortLabel" class="toolbar__label text-preset-4-regular"
        >Sort by</span
      >
      <BaseSelect
        id="sort-select"
        aria-labelledby="sortLabel"
        :variant="isMobile ? 'ghost' : 'outline'"
        :size="isMobile ? 'icon' : 'md'"
        :options="sortOptions"
        @select="(value) => handleSort(value)"
      >
        <template v-if="isMobile" #icon>
          <IconSortMobile />
        </template>
        <template v-if="isMobile" #currentValue>{{ null }}</template>
      </BaseSelect>
    </div>

    <div>
      <span id="filterLabel" class="toolbar__label text-preset-4-regular"
        >Category</span
      >
      <BaseSelect
        id="filter-select"
        aria-labelledby="filterLabel"
        :variant="isMobile ? 'ghost' : 'outline'"
        :size="isMobile ? 'icon' : 'md'"
        :options="[
          { label: 'all transactions', value: 'all' },
          ...categories.map((category) => ({
            label: category,
            value: category,
          })),
        ]"
        @select="
          (value) => {
            table
              .getColumn('category')
              ?.setFilterValue(value === 'all' ? undefined : value);
          }
        "
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
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-300);
}

.toolbar__filter-sort {
  margin-left: auto;
}

.toolbar__search {
  position: relative;
}

.toolbar__search svg {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 30;
}

.toolbar__label {
  color: var(--clr-grey-500);
  margin-right: var(--spacing-100);
}

.toolbar__search input {
  padding-right: var(--spacing-400);
}

@media (max-width: 768px) {
  .toolbar__search input {
    width: 215px;
  }

  .toolbar__label {
    display: none;
  }

  .toolbar {
    gap: 0;
  }
}
</style>

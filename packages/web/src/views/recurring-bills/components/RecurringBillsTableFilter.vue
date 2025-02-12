<script setup>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import IconSortMobile from "@/components/Icons/IconSortMobile.vue";
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

const props = defineProps({
  table: {
    type: Object,
    required: true,
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

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

function handleSort(value) {
  if (value === "a-z") {
    props.table.setSorting([{ id: "title", desc: false }]);
  } else if (value === "z-a") {
    props.table.setSorting([{ id: "title", desc: true }]);
  } else if (value === "latest") {
    props.table.setSorting([{ id: "dueDate", desc: true }]);
  } else if (value === "oldest") {
    props.table.setSorting([{ id: "dueDate", desc: false }]);
  } else if (value === "highest") {
    props.table.setSorting([{ id: "amount", desc: true }]);
  } else if (value === "lowest") {
    props.table.setSorting([{ id: "amount", desc: false }]);
  }
}
</script>

<template>
  <div class="filter">
    <div class="filter__search">
      <BaseInput
        aria-label="bill name"
        :model-value="table.getColumn('title')?.getFilterValue() ?? ''"
        placeholder="Search bill"
        @input="table.getColumn('title')?.setFilterValue($event.target.value)"
      />
      <IconSearch />
    </div>

    <div class="filter__sort">
      <span id="sortLabel" class="filter__sort-label text-preset-4-regular">
        Sort by
      </span>
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
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-300);
}

.filter__sort {
  margin-left: auto;
}

.filter__search {
  position: relative;
}

.filter__search svg {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 30;
}

.filter__search input {
  padding-right: var(--spacing-400);
}

.filter__sort-label {
  color: var(--clr-grey-500);
  margin-right: var(--spacing-100);
}

@media (max-width: 768px) {
  .filter__search input {
    width: 215px;
  }

  .filter__sort-label {
    display: none;
  }
}
</style>

<script setup>
import BaseDropdown from "@/components/BaseDropdown.vue";
import BaseDropdownItem from "@/components/BaseDropdownItem.vue";
import IconEllipsis from "@/components/Icons/IconEllipsis.vue";
import MarkAsVoidModal from "./MarkAsVoidModal.vue";
import { ref } from "vue";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

const showMarkAsVoidModal = ref(false);
</script>

<template>
  <BaseDropdown>
    <template #dropdownTrigger>
      <IconEllipsis class="icon" />
      <span class="sr-only">transaction actions</span>
    </template>
    <template #dropdownContent="slotProps">
      <BaseDropdownItem
        @click="
          () => {
            showMarkAsVoidModal = true;
            slotProps.closeDropdown();
          }
        "
        class="void-transaction text-preset-4-regular"
      >
        Mark as void
      </BaseDropdownItem>
    </template>
  </BaseDropdown>

  <MarkAsVoidModal v-model="showMarkAsVoidModal" :transaction-id="row.id" />
</template>

<style scoped>
.icon {
  color: var(--clr-grey-500);
}

@media (max-width: 540px) {
  .icon {
    transform: rotate(90deg);
  }
}
</style>

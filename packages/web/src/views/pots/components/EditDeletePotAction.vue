<script setup>
import BaseDropdown from "@/components/BaseDropdown.vue";
import BaseDropdownItem from "@/components/BaseDropdownItem.vue";
import IconEllipsis from "@/components/Icons/IconEllipsis.vue";

defineEmits(["edit", "delete"]);
</script>

<template>
  <BaseDropdown>
    <template #dropdownTrigger>
      <IconEllipsis class="icon" />
      <span class="sr-only">pot actions</span>
    </template>
    <template #dropdownContent="slotProps">
      <BaseDropdownItem
        @click="
          () => {
            $emit('edit');
            slotProps.closeDropdown();
          }
        "
        class="edit-pot text-preset-4-regular"
      >
        edit pot
      </BaseDropdownItem>
      <BaseDropdownItem
        @click="
          () => {
            $emit('delete');
            slotProps.closeDropdown();
          }
        "
        class="delete-pot text-preset-4-regular"
      >
        delete pot
      </BaseDropdownItem>
    </template>
  </BaseDropdown>
</template>

<style scoped>
.delete-pot {
  color: var(--clr-red);
}

.icon {
  color: var(--clr-grey-300);
}
</style>

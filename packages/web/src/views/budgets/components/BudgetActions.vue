<script setup>
import BaseDropdown from "@/components/BaseDropdown.vue";
import BaseDropdownItem from "@/components/BaseDropdownItem.vue";
import IconEllipsis from "@/components/Icons/IconEllipsis.vue";
</script>

<template>
  <BaseDropdown>
    <template #dropdownTrigger>
      <IconEllipsis class="icon" />
      <span class="sr-only">budget actions</span>
    </template>
    <template #dropdownContent>
      <BaseDropdownItem class="edit-budget text-preset-4-regular">
        edit budget
      </BaseDropdownItem>
      <BaseDropdownItem class="delete-budget text-preset-4-regular">
        delete budget
      </BaseDropdownItem>
    </template>
  </BaseDropdown>
</template>

<style scoped>
.delete-budget {
  color: var(--clr-red);
}

.icon {
  color: var(--clr-grey-300);
}
</style>

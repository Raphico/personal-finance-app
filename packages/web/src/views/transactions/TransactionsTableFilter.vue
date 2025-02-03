<script setup>
import BaseSelect from "@/components/BaseSelect.vue";
import IconFilterMobile from "@/components/Icons/IconFilterMobile.vue";
import IconSortMobile from "@/components/Icons/IconSortMobile.vue";
</script>

<template>
  <div class="filter-container">
    <BaseSelect
      :options="[
        { label: 'latest', value: 'latest' },
        { label: 'oldest', value: 'oldest' },
        { label: 'highest', value: 'highest' },
        { label: 'lowest', value: 'lowest' },
      ]"
      @select="(value) => console.log(value)"
    >
      <IconSortMobile />
      sort
    </BaseSelect>

    <BaseSelect
      :options="[
        { label: 'health', value: 'health' },
        { label: 'general', value: 'general' },
      ]"
      @select="(value) => console.log(value)"
    >
      <IconFilterMobile />
      filter
    </BaseSelect>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  justify-content: end;
  gap: var(--spacing-100);
}
</style>

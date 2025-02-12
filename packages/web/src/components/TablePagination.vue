<script setup>
import BaseButton from "@/components/BaseButton.vue";
import IconCaretLeft from "@/components/Icons/IconCaretLeft.vue";
import IconCaretRight from "@/components/Icons/IconCaretRight.vue";

defineProps({
  table: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="pagination">
    <BaseButton
      variant="outline"
      @click="() => table.previousPage()"
      :disabled="!table.getCanPreviousPage()"
    >
      <IconCaretLeft />
      <span>prev</span>
    </BaseButton>

    <p class="text-preset-4-bold" aria-live="polite" aria-atomic="true">
      Page {{ table.getState().pagination.pageIndex + 1 }} of
      {{ table.getPageCount() }}
    </p>

    <BaseButton
      variant="outline"
      @click="() => table.nextPage()"
      :disabled="!table.getCanNextPage()"
    >
      <span>next</span>
      <IconCaretRight />
    </BaseButton>
  </div>
</template>

<style scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.pagination button svg {
  color: var(--clr-grey-500);
}

@media (max-width: 540px) {
  .pagination button {
    height: 35px;
  }
  .pagination button span {
    display: none;
  }
}
</style>

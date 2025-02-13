<script setup>
import MarkAsVoidModal from "./MarkAsVoidModal.vue";
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import IconCloseModal from "@/components/Icons/IconCloseModal.vue";

defineProps({
  row: {
    type: Object,
    required: true,
  },
});

const showMarkAsVoidModal = ref(false);
</script>

<template>
  <BaseButton
    size="icon"
    variant="ghost"
    @click="showMarkAsVoidModal = true"
    class="void-button"
  >
    <IconCloseModal class="void-button__icon" />
  </BaseButton>

  <MarkAsVoidModal
    v-model="showMarkAsVoidModal"
    @done="showMarkAsVoidModal = false"
    :transaction-id="row.original.id"
  />
</template>

<style scoped>
.void-button__icon {
  width: 18px;
  height: 18px;
  color: var(--clr-grey-500);
}

.void-button {
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.void-button:hover {
  background-color: transparent;
  color: var(--clr-grey-900);
}
</style>

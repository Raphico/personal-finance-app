<script setup>
import { generateId } from "@/utils/helpers";
import BaseButton from "./BaseButton.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

defineProps({
  buttonSize: {
    type: String,
    default: "icon",
  },
  buttonVariant: {
    type: String,
    default: "ghost",
  },
});

const isOpen = ref(false);
const dropdownId = generateId({ prefix: "dropdown", length: 4 });
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const closeDropdown = () => {
  isOpen.value = false;
};
const openDropdown = () => {
  isOpen.value = true;
};

onClickOutside(dropdownRef, closeDropdown);
</script>

<template>
  <div class="dropdown-container" ref="dropdownRef">
    <BaseButton
      :id="`trigger-${dropdownId}`"
      class="dropdown-trigger"
      :size="buttonSize"
      :variant="buttonVariant"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      :aria-controls="dropdownId"
      @click="toggleDropdown"
      @keydown.esc="closeDropdown"
      @keydown.down.prevent="openDropdown"
      tabindex="0"
    >
      <slot name="dropdownTrigger"></slot>
    </BaseButton>

    <Transition name="slide">
      <div
        v-show="isOpen"
        class="dropdown-content"
        role="menu"
        :id="dropdownId"
        aria-orientation="vertical"
        :aria-labelledby="`trigger-${dropdownId}`"
        tabindex="-1"
      >
        <slot name="dropdownContent" :closeDropdown="closeDropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-container {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 20;
  border-radius: 8px;
  background-color: var(--clr-white);
  padding: var(--spacing-150) var(--spacing-250);
  margin-top: var(--spacing-50);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--clr-grey-200);
  max-height: 200px;
  max-width: 140px;
  overflow-y: auto;
}

.dropdown-content::-webkit-scrollbar {
  width: 7px;
}
.dropdown-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}
.dropdown-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 25px;
}

.dropdown-content > * {
  text-wrap: nowrap;
}

.dropdown-content > * + * {
  border-top: 1px solid var(--clr-grey-200);
  padding-top: var(--spacing-100);
}

.dropdown-content > :not(:last-child) {
  padding-bottom: var(--spacing-100);
}

.slide-enter-active,
.slide-leave-active {
  transition: all var(--transition-duration) var(--transition-easing);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

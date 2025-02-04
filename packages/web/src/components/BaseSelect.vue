<script setup>
import BaseButton from "./BaseButton.vue";
import { ref } from "vue";
import { generateId } from "@/utils/helpers";
import { onClickOutside } from "@vueuse/core";

const { options } = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (value) =>
      value.every((opt) => "label" in opt && "value" in opt),
  },
  buttonSize: {
    type: String,
    default: "sm",
  },
  buttonVariant: {
    type: String,
    default: "outline",
  },
});

const emits = defineEmits(["select"]);

const showDropdown = ref(false);
const target = ref(null);
const selectedIndex = ref(-1);
const dropdownId = generateId({ length: 4 });

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const closeDropdown = () => {
  showDropdown.value = false;
};
const openDropdown = () => {
  showDropdown.value = true;
};

onClickOutside(target, closeDropdown);

function updateSelectedOption(index) {
  selectedIndex.value = index;
  closeDropdown();
  emits("select", options[index].value);
}

async function handleKeyNavigation(event) {
  if (!showDropdown.value) return;

  const optionsLength = options.length;
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      selectedIndex.value = (selectedIndex.value + 1) % optionsLength;
      emits("select", options[selectedIndex.value].value);
      break;
    case "ArrowUp":
      event.preventDefault();
      selectedIndex.value =
        (selectedIndex.value - 1 + optionsLength) % optionsLength;
      emits("select", options[selectedIndex.value].value);
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      if (selectedIndex.value >= 0) {
        updateSelectedOption(selectedIndex.value);
      }
      break;
    default:
      return;
  }
}
</script>

<template>
  <div class="select-container" ref="target" role="group">
    <BaseButton
      :id="`select-trigger-${dropdownId}`"
      :variant="buttonVariant"
      :size="buttonSize"
      @keydown="handleKeyNavigation"
      role="combobox"
      :aria-expanded="showDropdown"
      :aria-controls="dropdownId"
      @click="toggleDropdown"
      @keydown.esc="closeDropdown"
      @keydown.down.prevent="openDropdown"
      aria-haspopup="listbox"
      class="select-trigger"
      tabindex="0"
    >
      <slot />
    </BaseButton>

    <Transition name="slide">
      <ul
        v-show="showDropdown"
        :id="`select-dropdown-${dropdownId}`"
        role="listbox"
        class="select-dropdown"
        tabindex="-1"
        aria-labelledby="select-trigger"
      >
        <!-- eslint-disable-next-line vuejs-accessibility/interactive-supports-focus -->
        <li
          v-for="(option, index) in options"
          :id="`${dropdownId}-${option.value}-${index}`"
          role="option"
          :key="option.value"
          :aria-selected="selectedIndex == index"
          :data-selected="selectedIndex == index"
          @click="() => updateSelectedOption(index)"
          @keydown.enter="() => updateSelectedOption(index)"
          @keydown.space="() => updateSelectedOption(index)"
          class="text-preset-4-regular"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.select-container {
  position: relative;
  display: inline-block;
}

.select-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 20;
  border-radius: 8px;
  background-color: var(--clr-white);
  list-style: none;
  padding: var(--spacing-150) var(--spacing-250);
  margin-top: var(--spacing-50);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--clr-grey-200);
  max-height: 200px;
  width: 94px;
  overflow-y: auto;
}

.select-dropdown::-webkit-scrollbar {
  width: 7px;
}
.select-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 25px;
}
.select-dropdown::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 25px;
}
.select-dropdown li {
  cursor: pointer;
  padding-bottom: var(--spacing-150);
  text-transform: capitalize;
  transition: color var(--transition-duration) var(--transition-easing);
}

.select-dropdown li:last-child {
  padding-bottom: 0;
}

.select-dropdown > * + * {
  border-top: 1px solid var(--clr-grey-200);
  padding-top: var(--spacing-150);
}

.select-dropdown li[data-selected="true"] {
  font-weight: bold;
}

.select-dropdown li:is(:hover, :focus) {
  color: var(--clr-grey-500);
}

.select-trigger {
  gap: var(--spacing-100);
  border-color: var(--clr-grey-200);
  padding: var(--spacing-100);
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

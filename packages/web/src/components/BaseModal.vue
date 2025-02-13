<script setup>
import { ref, nextTick, computed } from "vue";
import { generateId } from "@/utils/helpers";
import BaseButton from "./BaseButton.vue";
import IconCloseModal from "./Icons/IconCloseModal.vue";
import PageHeader from "./PageHeader.vue";

const model = defineModel({ default: false });

defineOptions({
  inheritAttrs: false,
});

defineProps({
  showTrigger: {
    type: Boolean,
    default: true,
  },
});

const isOpen = computed({
  get() {
    return model.value;
  },
  set(value) {
    model.value = value;
  },
});
const modalRef = ref(null);
const modalId = generateId({ prefix: "modal", length: 4 });

const openModal = async () => {
  isOpen.value = true;
  await nextTick();
  // Move focus to the dialog container for accessibility
  if (modalRef.value) {
    modalRef.value.focus();
  }
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <BaseButton
    v-if="showTrigger"
    size="default"
    @click="openModal"
    variant="primary"
    v-bind="$attrs"
  >
    <slot name="modalTrigger"></slot>
  </BaseButton>

  <transition name="backdrop-fade">
    <div
      v-if="isOpen"
      class="modal-backdrop"
      @click="closeModal"
      aria-hidden="true"
    ></div>
  </transition>

  <transition name="modal-fade">
    <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
    <div
      v-if="isOpen"
      :id="modalId"
      ref="modalRef"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
      class="custom-dialog"
      @keydown.esc.prevent="closeModal"
      tabindex="-1"
    >
      <div class="modal-content">
        <header>
          <PageHeader id="modalTitle">
            <slot name="modalTitle"></slot>
          </PageHeader>
          <BaseButton
            size="icon"
            variant="ghost"
            class="close-modal"
            @click="closeModal"
          >
            <IconCloseModal />
            <span class="sr-only">Close modal</span>
          </BaseButton>
          <p
            class="modal-description text-preset-4-regular"
            id="modalDescription"
          >
            <slot name="modalDescription"></slot>
          </p>
        </header>
        <main>
          <slot name="modalBody" :closeModal="closeModal"></slot>
        </main>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.custom-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  gap: var(--spacing-200);
  border-radius: 12px;
  background-color: var(--clr-white);
  z-index: 1000;
  box-shadow: var(--box-shadow);
  padding: var(--spacing-300);
  width: 90%;
  max-width: 560px;
  outline: none;
}

.custom-dialog header {
  position: relative;
}

#modalTitle {
  text-transform: capitalize;
  max-width: 400px;
  text-align: left;
}

#modalDescription {
  text-align: left;
}

.close-modal {
  position: absolute;
  top: 0;
  right: 0;
  transition: color var(--transition-duration) var(--transition-easing);
}

.close-modal:hover {
  background-color: transparent;
  color: var(--clr-grey-900);
}

#modalDescription,
.close-modal {
  color: var(--clr-grey-500);
}

@media (max-width: 768px) {
  #modalTitle {
    font-size: var(--fs-500);
    margin-bottom: var(--spacing-250);
  }
  .close-modal {
    top: -10px;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active,
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity var(--transition-duration) var(--transition-easing);
}
.modal-fade-enter-from,
.modal-fade-leave-to,
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}
</style>

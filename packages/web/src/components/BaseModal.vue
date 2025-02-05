<script setup>
import { ref, nextTick } from "vue";
import { generateId } from "@/utils/helpers";
import BaseButton from "./BaseButton.vue";
import IconCloseModal from "./Icons/IconCloseModal.vue";
import PageHeader from "./PageHeader.vue";

defineProps({
  buttonSize: {
    type: String,
    default: "default",
  },
  buttonVariant: {
    type: String,
    default: "primary",
  },
});

const modalRef = ref(null);
const isOpen = ref(false);
const modalId = generateId({ prefix: "modal", length: 4 });

const openModal = async () => {
  isOpen.value = true;
  // Wait until DOM updates so the dialog is rendered before calling showModal()
  await nextTick();
  modalRef.value.showModal();
};

const closeModal = () => {
  if (modalRef.value) {
    modalRef.value.close();
  }
  isOpen.value = false;
};
</script>

<template>
  <BaseButton :size="buttonSize" @click="openModal" :variant="buttonVariant">
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
    <dialog
      v-if="isOpen"
      :id="modalId"
      ref="modalRef"
      aria-modal="true"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
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
            <span class="sr-only">close modal</span>
          </BaseButton>
          <p
            class="modal-description text-preset-4-regular"
            id="modalDescription"
          >
            <slot name="modalDescription"></slot>
          </p>
        </header>
        <main>
          <slot name="modalBody"></slot>
        </main>
      </div>
    </dialog>
  </transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

::backdrop {
  background: transparent;
}

:modal {
  display: grid;
  gap: var(--spacing-200);
  border-radius: 12px;
  background-color: var(--clr-white);
  border: none;
  box-shadow: var(--box-shadow);
  padding: var(--spacing-300);
  width: 90%;
  max-width: 560px;
}

:modal header {
  position: relative;
}

#modalTitle {
  text-transform: capitalize;
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

import { defineStore } from "pinia";
import { ref } from "vue";

export const usePotsStore = defineStore("pots", () => {
  let alreadyUsedThemes = ref([]);

  function setAlreadyUsedThemes(themes) {
    alreadyUsedThemes.value = themes;
  }

  return {
    alreadyUsedThemes,
    setAlreadyUsedThemes,
  };
});

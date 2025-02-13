import { defineStore } from "pinia";
import { ref } from "vue";

export const useBudgetsStore = defineStore("budgets", () => {
  let alreadyUsedThemes = ref([]);
  let alreadyUsedCategories = ref([]);

  function setAlreadyUsedThemes(themes) {
    alreadyUsedThemes.value = themes;
  }

  function setAlreadyUsedCategories(categories) {
    alreadyUsedCategories.value = categories;
  }

  return {
    alreadyUsedThemes,
    alreadyUsedCategories,
    setAlreadyUsedThemes,
    setAlreadyUsedCategories,
  };
});

import { reactive } from "vue";
import cloneDeep from "lodash.clonedeep";

export function useForm(initialValues) {
  const form = reactive({
    fields: cloneDeep(initialValues),
    error: {},

    reset() {
      this.fields = cloneDeep(initialValues);
    },
    setError(error) {
      this.error = error;
    },
    clearError() {
      this.error = {};
    },
  });

  return form;
}

import { getError } from "@/utils/helpers";
import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import { reactive, watch } from "vue";

export function useForm(fields) {
  let defaults = fields;

  const form = reactive({
    fields: cloneDeep(fields),
    error: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    isDirty: false,
    async submit(submitFn, hooks = {}) {
      if (this.isLoading) return;

      const _hooks = {
        onBefore: async () => {
          this.clearError();
          this.isLoading = true;
          this.isError = false;
          this.isSuccess = false;

          if (hooks.onBefore) {
            await hooks.onBefore();
          }
        },
        onSuccess: async (response) => {
          this.isError = false;
          this.isSuccess = true;

          if (hooks.onSuccess) {
            await hooks.onSuccess(response);
          }

          defaults = cloneDeep(this.fields);
        },
        onError: async (error) => {
          this.isError = true;
          this.isSuccess = false;

          this.setError(getError(error));

          if (hooks.onError) {
            await hooks.onError(error);
          }
        },
        onComplete: async () => {
          this.isLoading = false;

          if (hooks.onComplete) {
            await hooks.onComplete();
          }
        },
      };

      await _hooks.onBefore();

      try {
        const response = await submitFn(this.fields);

        await _hooks.onSuccess(response);
      } catch (error) {
        await _hooks.onError(error);
      } finally {
        await _hooks.onComplete();
      }
    },
    reset(...fields) {
      const defaultsClone = cloneDeep(defaults);

      if (fields.length == 0) {
        this.fields = defaultsClone;
        return;
      }

      fields.forEach((field) => {
        if (defaults[field] !== undefined) {
          this.fields[field] = defaultsClone[field];
        }
      });
    },
    clearError(...fields) {
      if (fields.length == 0) {
        this.error = {};
        return;
      }

      fields.forEach((field) => delete this.error[field]);
    },
    setError(error) {
      (this.error = {
        ...this.error,
        ...error,
      }),
        (this.isError = Object.keys(this.error).length > 0);
    },
  });

  watch(
    form.fields,
    () => {
      form.isDirty = !isEqual(form.fields, defaults);
    },
    { immediate: true }
  );

  return form;
}

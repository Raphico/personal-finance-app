<script setup>
import { computed } from "vue";

const { size } = defineProps({
  size: {
    type: String,
    validator(value) {
      return ["small", "large"].includes(value);
    },
  },
});

const getImgWidth = computed(() => (size == "small" ? "14" : "122"));
</script>

<template>
  <img
    :src="`/src/assets/svg/logo-${size}.svg`"
    alt="Personal finance app logo"
    :width="getImgWidth"
    height="22"
  />
</template>

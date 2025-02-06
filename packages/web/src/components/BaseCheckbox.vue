<script setup>
const model = defineModel();
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
  <input type="checkbox" v-model="model" />
</template>

<style scoped>
[type="checkbox"] {
  height: 16px;
  width: 16px;
}
</style>

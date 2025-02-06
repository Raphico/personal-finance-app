<script setup>
const model = defineModel();
</script>

<template>
  <VueDatePicker v-model="model" utc :enable-time-picker="false" />
</template>

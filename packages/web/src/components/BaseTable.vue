<template>
  <div class="table-container">
    <table>
      <slot />
    </table>
  </div>
</template>

<style scoped>
.table-container {
  position: relative;
  width: 100%;
  overflow: auto;
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
}
</style>

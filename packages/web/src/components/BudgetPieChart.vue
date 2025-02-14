<script setup>
import { formatCurrency } from "@/utils/helpers";
import { VisSingleContainer, VisDonut } from "@unovis/vue";

const props = defineProps({
  totalExpense: {
    type: Number,
    required: true,
  },
  totalMaximumSpend: {
    type: Number,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  colors: {
    type: Array,
  },
});

const value = (d) => d;
const color = (d, i) => props.colors[i];
</script>

<template>
  <VisSingleContainer :data="data">
    <VisDonut
      :arcWidth="38"
      :centralLabel="formatCurrency(totalExpense)"
      :centralSubLabel="`of ${formatCurrency(totalMaximumSpend)} limit`"
      :value="value"
      :color="color"
    />
  </VisSingleContainer>
</template>

<style></style>

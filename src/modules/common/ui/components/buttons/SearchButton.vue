<template>
  <q-btn
    :label="label"
    icon="search"
    color="info"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Buscar'
  }
});
</script>
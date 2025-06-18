<template>
  <q-btn
    :label="label"
    icon="delete"
    color="negative"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Eliminar'
  }
});
</script>
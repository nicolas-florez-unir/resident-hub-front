<template>
  <q-btn
    :label="label"
    icon="edit"
    color="warning"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Editar'
  }
});
</script>
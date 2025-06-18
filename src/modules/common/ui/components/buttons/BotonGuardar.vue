<template>
  <q-btn
    :label="label"
    icon="save"
    color="primary"
    type="submit"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Guardar'
  }
});
</script>
<template>
  <div class="text-center q-mt-xl">
    <q-icon name="error" size="100px" class="text-negative" />
    <h1 class="text-h4 q-mt-md">Oops! Something went wrong</h1>
    <p class="text-subtitle2 q-mt-sm">An unexpected error has occurred. Please try again later.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UnknownErrorPage',
});
</script>

<style scoped>
h1 {
  font-weight: bold;
}
</style>

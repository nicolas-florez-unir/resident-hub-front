<template>
  <q-layout view="lHh Lpr lFf">
    <router-view />
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { applicationStorage } from './boot/application-storage';

const $q = useQuasar();

$q.dark.set(applicationStorage.getItem('theme') === 'dark');
</script>

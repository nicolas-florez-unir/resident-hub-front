<!-- filepath: src/views/DocumentosAdministrativos.vue -->
<template>
  <q-page class="q-pa-md bg-primary text-white">
    <q-card class="q-pa-lg">
      <q-form>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-select
              v-model="tipoDocumento"
              :options="tiposDocumento"
              label="Tipo de documento"
              outlined
              dense
              class="bg-white text-black"
            />
          </div>
          <div class="col-12 col-md-5">
            <q-input
              v-model="descripcion"
              label="Descripción"
              type="textarea"
              outlined
              dense
              class="bg-white text-black"
              :rows="3"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-uploader
              v-model="archivo"
              label="Adjuntar archivo"
              accept="*"
              color="primary"
              text-color="black"
              class="full-width"
            />
          </div>
        </div>
        <div class="q-mt-md flex justify-end">
          <q-btn color="secondary" label="Registrar" @click="registrar" class="q-mr-sm" />
          <q-btn color="accent" label="Limpiar" flat @click="limpiar" />
        </div>
      </q-form>
    </q-card>
    <q-card class="q-mt-lg">
      <q-table
        flat
        bordered      
        title="Documentos Administrativos"
        :rows="rows"
        :columns="columns"
        row-key="id"
        filter
        class="bg-white text-black"
      />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tipoDocumento = ref(null)
const tiposDocumento = [
  'Reglamento interno',
  'Políticas de seguridad',
  'Actas de reuniones'
]
const descripcion = ref('')
const archivo = ref(null)
const rows = ref([])
const columns = [
  { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'center' as const },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'center' as const },
  { name: 'archivo', label: 'Archivo', field: 'archivo', align: 'center' as const }
]
function registrar() {}
function limpiar() {}
</script>

<style scoped>
.bg-primary {
  background-color: var(--q-primary);
}
</style>
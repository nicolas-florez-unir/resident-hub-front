<!-- filepath: src/views/VisualizarPQRS.vue -->
<template>
  <q-page class="q-pa-md bg-primary text-white">
    <q-card class="q-pa-lg">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-3">
          <q-input
            v-model="propietario"
            label="Propietario"
            outlined
            dense
            class="bg-white text-black"
            readonly
          />
        </div>
        <div class="col-12 col-md-3">
          <q-input
            v-model="asunto"
            label="Asunto"
            outlined
            dense
            class="bg-white text-black"
            readonly
          />
        </div>
        <div class="col-12 col-md-3">
          <q-input
            v-model="solicitud"
            label="Solicitud"
            type="textarea"
            outlined
            dense
            class="bg-white text-black"
            readonly
            :rows="3"
          />
        </div>
        <div class="col-12 col-md-3">
          <q-btn
            v-if="documento"
            color="secondary"
            label="Descargar documento"
            :href="documento"
            target="_blank"
            icon="download"
            class="q-mb-sm"
          />
          <q-chip v-else color="grey-5" text-color="black">Sin documento</q-chip>
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-12">
          <q-input
            v-model="respuesta"
            label="Respuesta"
            type="textarea"
            outlined
            dense
            class="bg-white text-black"
            :rows="3"
          />
        </div>
      </div>
      <div class="q-mt-md flex justify-end">
        <q-btn color="secondary" label="Responder" @click="responder" class="q-mr-sm" />
        <q-btn color="accent" label="Limpiar" flat @click="limpiar" />
      </div>
    </q-card>
    <q-card class="q-mt-lg">
      <q-table
        title="PQRS"
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
const propietario = ref('Juan Pérez')
const asunto = ref('Solicitud de mantenimiento')
const solicitud = ref('Se solicita mantenimiento en el ascensor del edificio.')
const documento = ref(null) // o una URL si existe
const respuesta = ref('')
const rows = ref([])
const columns = [
  { name: 'propietario', label: 'Propietario', field: 'propietario', align: "left" as const },
  { name: 'asunto', label: 'Asunto', field: 'asunto', align: "left" as const },
  { name: 'solicitud', label: 'Solicitud', field: 'solicitud', align: "left" as const },
  { name: 'respuesta', label: 'Respuesta', field: 'respuesta', align: "left" as const }
]
function responder() {}
function limpiar() {}
</script>
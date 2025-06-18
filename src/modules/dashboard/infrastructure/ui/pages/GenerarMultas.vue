<!-- filepath: src/views/GenerarMultas.vue -->
<template>
  <q-page class="q-pa-md bg-primary text-white">
    <q-card class="q-pa-lg">
      <q-form>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3">
            <q-select
              v-model="tipoMulta"
              :options="tiposMulta"
              label="Tipo de multa"
              outlined
              dense
              class="bg-white text-black"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-select
              v-model="propietario"
              :options="propietarios"
              label="Propietario"
              outlined
              dense
              class="bg-white text-black"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-input
              v-model="fecha"
              label="Fecha de generación"
              mask="####-##-##"
              outlined
              dense
              class="bg-white text-black"
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer" @click="showDate = true" />
              </template>
            </q-input>
            <q-popup-proxy v-model="showDate" transition-show="scale" transition-hide="scale">
              <q-date v-model="fecha" mask="YYYY-MM-DD" color="primary" />
            </q-popup-proxy>
          </div>
          <div class="col-12 col-md-3">
            <q-input
              v-model="observacion"
              label="Observación/Motivo"
              type="textarea"
              outlined
              dense
              class="bg-white text-black"
              :rows="3"
            />
          </div>
        </div>
        <div class="q-mt-md flex justify-end">
          <q-btn color="secondary" label="Generar" @click="generar" class="q-mr-sm" />
          <q-btn color="accent" label="Limpiar" flat @click="limpiar" />
        </div>
      </q-form>
    </q-card>
    <q-card class="q-mt-lg">
      <q-table
        title="Multas"
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
const tipoMulta = ref(null)
const tiposMulta = [
  'Incumplimiento de reglamento',
  'No pago de administración'
]
const propietario = ref(null)
const propietarios = [
   { label: 'Juan Pérez', value: 1 }
]
const fecha = ref('')
const showDate = ref(false)
const observacion = ref('')
const rows = ref([])
const columns=[
  { name: 'tipo', label: 'Tipo', field: 'tipo', align: "center" as const },
  { name: 'propietario', label: 'Propietario', field: 'propietario', align:"center" as const },
  { name: 'fecha', label: 'Fecha', field: 'fecha', align: "center" as const },
  { name: 'observacion', label: 'Observación', field: 'observacion', align: "center" as const }
]
function generar() {}
function limpiar() {}
</script>
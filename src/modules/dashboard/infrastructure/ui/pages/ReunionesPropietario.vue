<template>
  <q-page class="custom-page q-pa-lg reuniones-bg">
    <div class="titulo-reuniones text-center q-mb-lg">
      Lista de reuniones y eventos
    </div>
    <q-card class="q-mx-auto reuniones-card">
      <q-card-section class="q-pa-none">
        <q-table
          :rows="reuniones"
          :columns="columns"
          row-key="id"
          flat
          class="reuniones-table"
          hide-bottom
        >
          <template v-slot:header="props">
            <tr>
              <th
                v-for="col in props.cols"
                :key="col.name"
                :class="['q-pa-md', 'text-center', 'header-custom']"
              >
                {{ col.label }}
              </th>
            </tr>
          </template>
          <template v-slot:body-cell-confirmar="props">
            <td class="q-pa-md text-center">
              <q-radio
                v-model="asistencias[props.row.id]"
                :val="true"
                color="primary"
                :label="'Sí'"
                dense
              />
              <q-radio
                v-model="asistencias[props.row.id]"
                :val="false"
                color="negative"
                :label="'No'"
                dense
                class="q-ml-md"
              />
            </td>
          </template>
          <template v-slot:body-cell-motivo="props">
            <td class="q-pa-md text-center">{{ props.row.motivo }}</td>
          </template>
          <template v-slot:body-cell-fecha="props">
            <td class="q-pa-md text-center">{{ props.row.fecha }}</td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <div class="q-mt-lg text-center">
      <q-btn color="primary" label="Cargar" @click="cargarAsistencias" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { QTableColumn } from 'quasar';

const reuniones = [
  { id: 1, motivo: 'Asamblea General Ordinaria', fecha: '2025-06-20' },
  { id: 2, motivo: 'Reunión Extraordinaria', fecha: '2025-06-30' },
  { id: 3, motivo: 'Junta de Propietarios', fecha: '2025-07-05' }
];

const columns: QTableColumn[] = [
  {
    name: 'confirmar',
    label: 'Confirmar asistencia',
    field: 'confirmar',
    align: 'center',
    sortable: false
  },
  {
    name: 'motivo',
    label: 'Motivo reunión',
    field: 'motivo',
    align: 'center',
    sortable: false
  },
  {
    name: 'fecha',
    label: 'Fecha',
    field: 'fecha',
    align: 'center',
    sortable: false
  }
];

const asistencias = ref<Record<number, boolean | null>>({
  1: null,
  2: null,
  3: null
});

function cargarAsistencias() {
  console.log('Asistencias:', asistencias.value);
}
</script>

<style scoped lang="scss">
// Colores y variables similares a PerfilPropietario
$primary-color: #0b2c47 !default;
$surface-color: #ffffff !default;
$border-color-dark: #0b2c47 !default;

.reuniones-bg {
  background: #1565c0;
  min-height: 100vh;
}
.titulo-reuniones {
  font-size: 2.2rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.5px;
}
.reuniones-card {
  max-width: 700px;
  margin-top: 40px;
  background: $surface-color;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  border: 4px solid $primary-color;
}
.reuniones-table {
  background: #fff;
  border-radius: 8px;
  border: 2px solid $primary-color;
  overflow: hidden;
}
.q-table__container {
  border-radius: 8px;
}
.q-table thead tr {
  background: #ececec;
}
.q-table th, .q-table td {
  border: 1px solid $primary-color;
  text-align: center;
}
.q-table th,
.header-custom {
  color: #263238;
  font-weight: bold;
  font-size: 1.15rem;
  background: #ececec;
}
.q-table td {
  background: #fff;
  font-size: 0.98rem;
}
</style>
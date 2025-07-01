<template>
  <q-page class="custom-page q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <!-- Formulario para responder PQRS -->
      <div class="col-12 col-md-6 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">Registrar Respuesta PQRS</div>
            <div class="q-gutter-md">
              <!-- Propietario -->
              <div class="row items-center">
                <div class="col-5 text-bold label">Propietario:</div>
                <div class="col-7">
                  <q-input
                    v-model="propietario"
                    outlined
                    dense
                    class="input"
                    readonly
                  />
                </div>
              </div>
              <!-- Asunto -->
              <div class="row items-center q-mt-md">
                <div class="col-5  text-bold label">Asunto:</div>
                <div class="col-7">
                  <q-input
                    v-model="asunto"
                    outlined
                    dense
                    class="input"
                    readonly
                  />
                </div>
              </div>
              <!-- Solicitud -->
              <div class="row items-center q-mt-md">
                <div class="col-5  text-bold label">Solicitud:</div>
                <div class="col-7">
                  <q-input
                    v-model="solicitud"
                    type="textarea"
                    rows="3"
                    outlined
                    dense
                    class="input"
                    readonly
                  />
                </div>
              </div>
              <!-- Documento Adjunto -->
              <div class="row items-center q-mt-md">
                <div class="col-5  text-bold label">Documento:</div>
                <div class="col-7">
                  <q-btn
                    v-if="documento"
                    label="Descargar Documento"
                    color="primary"
                    icon="download"
                    :href="documento"
                    target="_blank"
                  />
                  <q-chip v-else color="grey-5" text-color="black">Sin documento</q-chip>
                </div>
              </div>
              <!-- Respuesta -->
              <div class="row items-center q-mt-md">
                <div class="col-5  text-bold label">Respuesta:</div>
                <div class="col-7">
                  <q-input
                    v-model="respuesta"
                    type="textarea"
                    rows="3"
                    outlined
                    dense
                    class="input"
                  />
                </div>
              </div>
            </div>
            <!-- Botón Guardar -->
            <div class="q-mt-lg row justify-center">
              <q-btn label="Guardar" color="primary" icon="save" @click="guardarRespuesta" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tabla de PQRS -->
      <div class="col-12 col-md-10 traza-container">
        <q-card class="traza-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg traza-title">Listado de PQRS</div>
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="id"
              class="traza-table"
            />
            <!-- Botones de Acciones -->
            <div class="q-mt-md row justify-end">
              <q-btn label="Editar" flat color="warning" icon="edit" @click="editarPqrs" class="q-mr-sm" />
              <q-btn label="Eliminar" flat color="negative" icon="delete" @click="eliminarPqrs" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const propietario = ref('Juan Pérez')
const asunto = ref('Solicitud general')
const solicitud = ref('Detalles de la solicitud...')
const documento = ref(null) // URL para descargar documento o null
const respuesta = ref('')

const rows = ref([
  { propietario: 'Juan Pérez', asunto: 'Solicitud 1', solicitud: 'Detalles', respuesta: 'Pendiente' }
])

const columns = [
  { name: 'propietario', label: 'Propietario', field: 'propietario', align: 'center' as const },
  { name: 'asunto', label: 'Asunto', field: 'asunto', align: 'center' as const },
  { name: 'solicitud', label: 'Solicitud', field: 'solicitud', align: 'center' as const },
  { name: 'respuesta', label: 'Respuesta', field: 'respuesta', align: 'center' as const }
]

function guardarRespuesta() {
  console.log('Guardando respuesta...')
}

function editarPqrs() {
  console.log('Editando PQRS...')
}

function eliminarPqrs() {
  console.log('Eliminando PQRS...')
}
</script>

<style scoped lang="scss">
// Fondo general de la vista
.custom-page {
  background: var(--background-color-view);
  min-height: 100vh;
  padding: 20px; // Espacio interno del contenedor principal
}

// Contenedor del formulario
.form-container {
  max-width: 800px; // Aumentamos el ancho de la sección de formulario
  width: 100%;
  
}

// Contenedor de trazabilidad
.traza-container {
  margin: 20px auto; // Centra el contenedor y agrega espaciado vertical
  
  width: calc(100% - 40px); // Evita que se desborde horizontalmente
  padding: 10px; // Espacio interno en el contenedor
  box-sizing: border-box; // Incluye padding y borde en el ancho
  
}

// Tarjeta del formulario
.form-card {
  background: var(--background-color);
  border: 2px solid var(--border-color-dark);
  border-radius: 8px;
  width: 100%;
}

// Tarjeta de trazabilidad
.traza-card {
  background: var(--background-color);
  border: 2px solid var(--border-color-dark);
  border-radius: 8px;
  width: 100%;
  margin-left: 20px;

}

/* Botones */
.q-btn {
  border-radius: 5px;
}

// Encabezado de la tabla
.traza-table th {
  background: var(--accent-color);
  color: #fff;
}

// Título de trazabilidad
.traza-title {
  color: var(--text-primary);
}
</style>

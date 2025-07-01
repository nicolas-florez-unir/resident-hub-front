<template>
  <q-page class="custom-page q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <!-- Formulario -->
      <div class="col-12 col-md-10 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">Agendar Reuniones</div>
            <q-form>
              <div class="q-gutter-lg">
                <div class="row items-center">
                  <div class="col-4  text-bold label">Tipo de Evento:</div>
                  <div class="col-8">
                    <q-select
                      v-model="tipoEvento"
                      :options="tiposEvento"
                      label="Selecciona una opción"
                      outlined
                      dense
                      class="input"
                    />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-4  text-bold  label">Motivo:</div>
                  <div class="col-8">
                    <q-input v-model="motivo" label="Motivo" outlined dense class="input" />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-4  text-bold label">Fecha:</div>
                  <div class="col-8">
                    <q-input v-model="fecha" outlined dense mask="####-##-##" class="input">
                      <template #append>
                        <q-icon name="event" @click="showDate = true" />
                      </template>
                    </q-input>
                    <q-popup-proxy v-model="showDate">
                      <q-date v-model="fecha" color="primary" />
                    </q-popup-proxy>
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-4  text-bold label">Observación:</div>
                  <div class="col-8">
                    <q-input v-model="observacion" type="textarea" outlined dense class="input" />
                  </div>
                </div>
              </div>
            </q-form>
            <!-- Botones para Agendar o Limpiar -->
            <!-- Guardar -->
            <div class="q-mt-lg row justify-center">
              <q-btn label="Guardar" color="primary" icon="save" @click="guardarMulta" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tabla de Reuniones -->
      <div class="col-12 col-md-10 traza-container">
        <q-card class="traza-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg traza-title">Reuniones Agendadas</div>
            <q-table
              title="Reuniones"
              :rows="rows"
              :columns="columns"
              row-key="id"
              class="traza-table"
            />
            <!-- Botones al Lado de la Tabla -->
            <div class="q-mt-md row justify-end">
              <q-btn class="q-mr-sm" flat color="warning" label="Editar" icon="edit" />
              <q-btn label="Eliminar" flat color="negative" icon="delete" />
            </div>            
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tipoEvento = ref(null)
const tiposEvento = ['Reunión', 'Junta', 'Asamblea', 'Evento social']
const motivo = ref('')
const fecha = ref('')
const showDate = ref(false)
const observacion = ref('')
const rows = ref([])
const columns = [
  { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'center' as const },
  { name: 'motivo', label: 'Motivo', field: 'motivo', align: 'center' as const },
  { name: 'fecha', label: 'Fecha', field: 'fecha', align: 'center' as const },
  { name: 'observacion', label: 'Observación', field: 'observacion', align: 'center' as const }
]


function guardarMulta() {
  console.log('Guardando multa...')
}
</script>

<style scoped lang="scss">
.custom-page {
  background: var(--background-color-view); /* Fondo claro */
  min-height: 100vh;
  padding: 20px;
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

/* Tabla */
.traza-table th {
  background: var(--accent-color);/* Azul primario */
  color: white;
}

.traza-title {
  color: var(--text-primary);
}
</style>

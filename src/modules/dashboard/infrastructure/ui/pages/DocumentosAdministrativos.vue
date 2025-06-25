<template>
  <q-page class="custom-page q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <!-- Formulario para Registrar Documento -->
      <div class="col-12 col-md-6 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">Registrar Documento Administrativo</div>
            <q-form>
              <div class="q-gutter-lg">
                <!-- Tipo de Documento -->
                <div class="row items-center">
                  <div class="col-5 label">Tipo de Documento:</div>
                  <div class="col-7">
                    <q-select
                      v-model="tipoDocumento"
                      :options="tiposDocumento"
                      label="Selecciona un tipo"
                      outlined
                      dense
                      class="input"
                    />
                  </div>
                </div>
                <!-- Descripción -->
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Descripción:</div>
                  <div class="col-7">
                    <q-input
                      v-model="descripcion"
                      type="textarea"
                      rows="3"
                      outlined
                      dense
                      placeholder="Añade una descripción"
                      class="input"
                    />
                  </div>
                </div>
                <!-- Archivo Adjunto -->
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Archivo:</div>
                  <div class="col-7">
                    <q-uploader
                      v-model="archivo"
                      label="Adjuntar archivo"
                      accept="*"
                      color="primary"
                      class="input full-width"
                    />
                  </div>
                </div>
              </div>
              <!-- Botón Guardar -->
              <div class="q-mt-lg row justify-center">
                <BotonGuardar label="Guardar" icon="save" @click="registrar" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tabla de Documentos -->
      <div class="col-12 col-md-10 traza-container">
        <q-card class="traza-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg traza-title">Lista de Documentos Administrativos</div>
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="id"
              class="traza-table"
            >
              <template #top>
                <div class="row full-width items-center q-pa-sm">
                  <div class="col">
                    <q-input
                      v-model="search"
                      outlined
                      dense
                      rounded
                      class="input bg-grey-1"
                      placeholder="Buscar por columna"
                      debounce="300"
                      prepend-inner-icon="search"
                    />
                  </div>
                </div>
              </template>    
             </q-table>         
            <!-- Botones de Acciones -->
            <div  class="row q-mt-md botones-inferiores">
              <BotonEditar label="Editar"   icon="edit" @click="editarDocumento" class="q-mr-sm" />
              <BotonEliminar label="Eliminar"  icon="delete" @click="eliminarDocumento" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import BotonEditar from 'src/modules/common/ui/components/buttons/EditButton.vue';
import BotonEliminar from 'src/modules/common/ui/components/buttons/DeleteButton.vue';

const search = ref('')

const tipoDocumento = ref(null)
const tiposDocumento = [
  'Reglamento interno',
  'Políticas de seguridad',
  'Actas de reuniones'
]
const descripcion = ref('')
const archivo = ref(null)

const rows = ref([
  { tipo: 'Reglamento interno', descripcion: 'Reglamento actualizado', archivo: 'reglamento.pdf' }
])

const columns = [
  { name: 'tipo', label: 'Tipo de Documento', field: 'tipo', align: 'center' as const },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'center' as const },
  { name: 'archivo', label: 'Archivo', field: 'archivo', align: 'center' as const }
]

function registrar() {
  console.log('Registrando documento...')
}

function editarDocumento() {
  console.log('Editando documento...')
}

function eliminarDocumento() {
  console.log('Eliminando documento...')
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

.botones-inferiores {
  margin-top: 20px;
  margin-inline: 20px; // Espacio horizontal
  display: flex;
  justify-content: flex-end; // Alinear botones a la derecha
  
}
</style>

<template>
  <q-page class="custom-page q-pa-lg documentos-bg">
    <div class="column items-center q-gutter-xl">
      <!-- Sección Formulario -->
      <div class="col-12 col-md-5 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">Formulario</div>
            <div class="q-gutter-md">
              <div class="row items-center">
                <div class="col-5 text-left text-subtitle1 text-bold label">Tipo de Documento:</div>
                <div class="col-7">
                  <q-select
                    v-model="tipoDocumento"
                    :options="[
                      'Ruido excesivo',
                      'Mal manejo de residuos',
                      'Daños a zonas comunes'
                    ]"
                    outlined
                    dense
                    label="Selecciona un tipo"
                    class="input"
                  />
                </div>
              </div>
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-bold label">Descripción:</div>
                <div class="col-7">
                  <q-input
                    v-model="descripcion"
                    type="textarea"
                    outlined
                    dense
                    placeholder="Describe la infracción"
                    class="input"
                  />
                </div>
              </div>
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-bold label">Adjuntar archivo (opcional):</div>
                <div class="col-7">
                  <div class="drop-area flex flex-center column">
                    <q-icon name="add" size="48px" color="primary" />
                    <div class="q-mt-sm">Suelta los archivos aquí...</div>
                  </div>
                  <q-btn
                    class="q-mt-md"
                    label="Subir"
                    color="primary"
                    @click="subirDocumento"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- Sección Trazabilidad -->
      <div class="col-12 col-md-6 traza-container">
        <q-card class="traza-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg traza-title">Trazabilidad</div>
            <div class="q-pa-none">
              <table class="traza-table">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Fecha de Carga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ruido excesivo</td>
                    <td>Emitir ruidos molestos fuera del horario permitido o en niveles elevados</td>
                    <td>Pendiente</td>
                  </tr>
                  <tr>
                    <td>Mal manejo de residuos</td>
                    <td>Disposición inadecuada de basura o reciclaje</td>
                    <td>02/02/2025</td>
                  </tr>
                  <tr>
                    <td>Daños a zonas comunes</td>
                    <td>Mascotas sin correa, sin limpieza o causando molestias</td>
                    <td>02/02/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tipoDocumento = ref('')
const descripcion = ref('')

function subirDocumento() {
  // Lógica para subir el documento
  console.log('Subiendo documento...')
}
</script>

<style lang="scss" scoped>
// Paleta personalizada
$primary-color: #0b2c47 !default;
$secondary-color: #145da0 !default;
$accent-color: #29a3ff !default;
$background-color: #f8f9fa !default;
$background-color-cards: #29a3ff !default;
$background-color-view: #29a3ff !default;
$surface-color: #ffffff !default;
$text-primary: #1c1c1c !default;
$text-secondary: #555555 !default;
$border-color: #d0d0d0 !default;
$border-color-dark: #0b2c47 !default;

// Fondo general de la vista
.custom-page {
  background: $background-color-view;
  min-height: 100vh;
}

// Formulario
.form-container {
  width: 100%;
  max-width: 600px;
}

.form-card {
  background: $surface-color;
  border: 4px solid $primary-color;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 0 8px;
}

.form-title {
  color: $primary-color;
}

.label {
  color: $text-primary;
}

.input {
  .q-field__control {
    background: $background-color;
    border-radius: 8px;
    border: 1px solid $border-color;
    color: $text-primary;
  }
  .q-field__label {
    color: $secondary-color;
  }
}

// Área de drop de archivos
.drop-area {
  border: 2px var(--accent-color);
  background: var(--accent-color);
  color: $primary-color;
  padding: 24px 0;
  border-radius: 8px;
  transition: border-color 0.2s;
  &:hover {
    border-color: $primary-color;
    background: var(--background-color-hover);
  }
}

// Botón primario personalizado
.q-btn--primary {
  background: $primary-color;
  color: #fff;
}

// Trazabilidad
.traza-container {
  width: 100%;
  max-width: 800px;
}

.traza-card {
  background: $surface-color;
  border: 4px solid $primary-color;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 0 8px;
}

.traza-title {
  color: $primary-color;
}

.traza-table {
  width: 100%;
  border-collapse: collapse;
  th, td {
    color: $text-primary;
    border: 1px solid $border-color-dark;
    background: $surface-color;
    padding: 8px;
    text-align: left;
  }
  th {
    background: $background-color-cards;
    color: $primary-color;
    font-weight: bold;
  }
}
</style>
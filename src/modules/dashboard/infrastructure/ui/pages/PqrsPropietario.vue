<template>
  <q-page class="pqrs-bg q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <div class="col-12 col-md-6" style="width: 100%; max-width: 600px;">
        <q-card class="pqrs-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg">Envia tu PQRS</div>
            <div class="q-gutter-md">
              <div class="row items-center">
                <div class="col-5 text-left text-subtitle1 text-bold">Tipo de Solicitud:</div>
                <div class="col-7">
                  <q-select
                    v-model="tipoSolicitud"
                    :options="tiposPQRS"
                    outlined
                    dense
                    class="pqrs-input"
                    emit-value
                    map-options
                    placeholder="Selecciona el tipo"
                  />
                </div>
              </div>
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-bold">Asunto:</div>
                <div class="col-7">
                  <q-input
                    v-model="asunto"
                    outlined
                    dense
                    placeholder="Solicitud de poda de árboles"
                    class="pqrs-input"
                  />
                </div>
              </div>
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-bold">Descripción:</div>
                <div class="col-7">
                  <q-input
                    v-model="descripcion"
                    type="textarea"
                    outlined
                    dense
                    placeholder="Escribe tu solicitud en detalle"
                    class="pqrs-input"
                  />
                </div>
              </div>
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-bold">Adjuntar archivo (opcional):</div>
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tiposPQRS = [
  { label: 'Petición', value: 'peticion' },
  { label: 'Queja', value: 'queja' },
  { label: 'Reclamo', value: 'reclamo' },
  { label: 'Sugerencia', value: 'sugerencia' }
]

const tipoSolicitud = ref('')
const asunto = ref('')
const descripcion = ref('')

function subirDocumento() {
  // Lógica para subir el documento
  console.log('Subiendo documento...')
}
</script>

<style lang="scss" scoped>
// Paleta personalizada
$primary-color: #0b2c47 !default;      // Azul oscuro principal
$secondary-color: #145da0 !default;    // Azul medio
$accent-color: #29a3ff !default;       // Azul claro/acento
$background-color: #f8f9fa !default;   // Fondo claro 
$background-color-cards: #29a3ff !default; // Fondo de paneles o tarjetas
$background-color-view: #29a3ff !default; // Fondo de vistas
$surface-color: #ffffff !default;      // Paneles y tarjetas
$text-primary: #1c1c1c !default;       // Texto principal
$text-secondary: #555555 !default;     // Texto secundario
$border-color: #d0d0d0 !default;       // Bordes suaves
$border-color-dark: #0b2c47 !default;  // Bordes oscuros

.pqrs-bg {
  background: $background-color-view;
  min-height: 100vh;
}

.pqrs-card {
  background: $surface-color;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 40px 32px 32px 32px;
  border: 4px solid $primary-color;
}

.text-h5, .text-bold {
  color: $primary-color;
}

.text-subtitle1 {
  color: $secondary-color;
}

.pqrs-value {
  font-size: 1.1rem;
  color: $text-primary;
}

.pqrs-input {
  width: 100%;
}

.drop-area {
  border: 2px dashed $accent-color;
  background: lighten($accent-color, 38%);
  color: $primary-color;
  padding: 24px 0;
  border-radius: 8px;
  transition: border-color 0.2s;
  &:hover {
    border-color: $primary-color;
    background: lighten($accent-color, 30%);
  }
}

.q-btn--primary {
  background: $primary-color !important;
  color: #fff !important;
  border: none !important;
}
</style>
<template>
  <q-page class="pqrs-bg q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <div class="col-12 col-md-6" style="width: 100%; max-width: 600px">
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
                <div class="col-5 text-left text-subtitle1 text-bold">
                  Adjuntar archivo (opcional):
                </div>
                <div class="col-7">
                  <div class="drop-area flex flex-center column">
                    <q-icon name="add" size="48px" color="primary" />
                    <div class="q-mt-sm">Suelta los archivos aquí...</div>
                  </div>
                  <q-btn class="q-mt-md" label="Subir" color="primary" @click="subirDocumento" />
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
import { ref } from 'vue';

const tiposPQRS = [
  { label: 'Petición', value: 'peticion' },
  { label: 'Queja', value: 'queja' },
  { label: 'Reclamo', value: 'reclamo' },
  { label: 'Sugerencia', value: 'sugerencia' },
];

const tipoSolicitud = ref('');
const asunto = ref('');
const descripcion = ref('');

function subirDocumento() {
  // Lógica para subir el documento
  console.log('Subiendo documento...');
}
</script>

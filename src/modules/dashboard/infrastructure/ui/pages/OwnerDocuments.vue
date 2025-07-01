<template>
  <q-page class="custom-page q-pa-lg documentos-bg">
    <div class="column items-center q-gutter-xl">
      <!-- Sección Formulario -->
      <div class="col-12 col-md-5" style="width: 100%; max-width: 600px">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg">Formulario</div>
            <div class="q-gutter-md">
              <div class="row items-center">
                <div class="col-5 text-left text-subtitle1 text-bold">Tipo de Documento:</div>
                <div class="col-7">
                  <q-select
                    v-model="tipoDocumento"
                    :options="[
                      'Recibo agua',
                      'Recibo Energía',
                      'Recibo Administración',
                      'Recibo del Gas',
                    ]"
                    outlined
                    dense
                    label="Selecciona un tipo"
                  />
                </div>
              </div>
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-subtitle1 text-bold">Período a pagar:</div>
                <div class="col-7">
                  <q-date v-model="periodo" mask="DD/MM/YYYY" minimal />
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
      <!-- Sección Trazabilidad -->
      <div class="col-12 col-md-6" style="width: 100%; max-width: 800px">
        <q-card class="traza-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg">Trazabilidad</div>
            <div class="q-pa-none">
              <table class="traza-table" style="width: 100%; border-collapse: collapse">
                <thead>
                  <tr>
                    <th>Documento</th>
                    <th>Fecha de Carga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Recibo agua</td>
                    <td>01/01/2025</td>
                  </tr>
                  <tr>
                    <td>Recibo Energía</td>
                    <td>02/02/2025</td>
                  </tr>
                  <tr>
                    <td>Recibo Administración</td>
                    <td>02/02/2025</td>
                  </tr>
                  <tr>
                    <td>Recibo del Gas</td>
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
import { ref } from 'vue';

const tipoDocumento = ref('');
const periodo = ref('');

function subirDocumento() {
  // Aquí irá la lógica de subida
  console.log('Subiendo documento...', {
    tipo: tipoDocumento.value,
    periodo: periodo.value,
  });
}
</script>

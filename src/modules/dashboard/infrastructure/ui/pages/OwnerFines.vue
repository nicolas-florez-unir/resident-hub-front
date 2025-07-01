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
                    :options="['Ruido excesivo', 'Mal manejo de residuos', 'Daños a zonas comunes']"
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
                <div class="col-5 text-left text-subtitle1 text-bold label">
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
                    <td>
                      Emitir ruidos molestos fuera del horario permitido o en niveles elevados
                    </td>
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
import { ref } from 'vue';

const tipoDocumento = ref('');
const descripcion = ref('');

function subirDocumento() {
  // Lógica para subir el documento
  console.log('Subiendo documento...');
}
</script>

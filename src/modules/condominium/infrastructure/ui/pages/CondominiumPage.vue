<template>
  <q-page class="custom-page q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <!-- Formulario del Condominio -->
      <div class="col-12 col-md-6 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">Información del Condominio</div>
            <q-form class="q-gutter-md" @submit.prevent="onSubmit">
              <!-- Nombre del Condominio -->
              <div class="row items-center">
                <div class="col-5 label">Nombre:</div>
                <div class="col-7">
                  <q-input
                    v-model="name"
                    outlined
                    dense
                    class="input"
                    placeholder="Nombre del condominio"
                  />
                </div>
              </div>
              <!-- Dirección del Condominio -->
              <div class="row items-center q-mt-md">
                <div class="col-5 label">Dirección:</div>
                <div class="col-7">
                  <q-input
                    v-model="address"
                    outlined
                    dense
                    class="input"
                    placeholder="Dirección del condominio"
                  />
                </div>
              </div>
              <!-- Actualizar Logo -->
              <div class="row items-center q-mt-md">
                <div class="col-5 label">Logo:</div>
                <div class="col-7">
                  <q-uploader
                    v-model="newLogo"
                    label="Subir logo"
                    accept="image/*"
                    class="input"
                  />
                </div>
              </div>
              <!-- Botón Guardar -->
              <div class="row justify-center q-mt-lg">
                <BotonGuardar label="Guardar" type="submit" class="q-mr-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { applicationContainer } from 'src/boot';
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import { UpdateCondominiumLogoUseCase } from 'condominium/application/use-cases';

const useCase = applicationContainer.getFromContainer(UpdateCondominiumLogoUseCase);
const $q = useQuasar();

const name = ref('');
const address = ref('');
const newLogo = ref<File | null>(null);

const onSubmit = async () => {
  try {
    if (newLogo.value) {
      await useCase.execute(newLogo.value);
      $q.dialog({
        title: 'Logo Actualizado',
        message:
          'El logo del condominio se ha actualizado correctamente. Recarga tu navegador para ver los cambios.',
        persistent: true,
      });
    }
    $q.notify({
      type: 'positive',
      message: '¡Logo subido exitosamente!',
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      type: 'negative',
      message: 'Error al subir el logo.',
    });
  }
};
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

// Tarjeta del formulario
.form-card {
  background: var(--background-color);
  border: 2px solid var(--border-color-dark);
  border-radius: 8px;
  width: 100%;
}

/* Botones */
.q-btn {
  border-radius: 5px;
}

// Título de trazabilidad
.traza-title {
  color: var(--text-primary);
}
</style>

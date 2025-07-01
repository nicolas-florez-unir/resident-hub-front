<template>
  <q-page>
    <!-- Formulario del Condominio -->
    <q-card square>
      <q-card-section>
        <div class="text-h5 text-bold q-mb-lg form-title">Información del Condominio</div>
        <q-form class="q-gutter-md" @submit="onSubmit">
          <!-- Nombre del Condominio -->
          <div class="row items-center">
            <div class="col-5 label">Nombre:</div>
            <div class="col-7">
              <q-input v-model="name" filled placeholder="Nombre del condominio" />
            </div>
          </div>
          <!-- Dirección del Condominio -->
          <div class="row items-center q-mt-md">
            <div class="col-5 label">Dirección:</div>
            <div class="col-7">
              <q-input
                v-model="address"
                filled
                class="input"
                placeholder="Dirección del condominio"
              />
            </div>
          </div>
          <!-- Actualizar Logo -->
          <div class="row items-center q-mt-md">
            <div class="col-5 label">Logo:</div>
            <div class="col-7">
              <q-uploader v-model="newLogo" label="Subir logo" accept="image/*" class="input" />
            </div>
          </div>
          <!-- Botón Guardar -->
          <div class="row justify-center q-mt-lg">
            <q-btn
              type="submit"
              color="primary"
              label="Actualizar Información"
              class="q-mr-sm"
              icon="save"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { applicationContainer } from 'src/boot';
import {
  GetCondominiumInfoUseCase,
  UpdateCondominiumLogoUseCase,
} from 'condominium/application/use-cases';

const updateLogoUseCase = applicationContainer.getFromContainer(UpdateCondominiumLogoUseCase);
const getInfoUseCase = applicationContainer.getFromContainer(GetCondominiumInfoUseCase);
const $q = useQuasar();

const name = ref('');
const address = ref('');
const newLogo = ref<File | null>(null);

onMounted(() => fetchCondominiumInfo());

async function fetchCondominiumInfo() {
  $q.loading.show({
    message: 'Cargando información del condominio...',
  });
  try {
    const info = await getInfoUseCase.execute();
    name.value = info.name;
    address.value = info.address;
  } catch (error) {
    console.error('Error fetching condominium info:', error);
    $q.notify({
      type: 'negative',
      message: 'Error al cargar la información del condominio.',
    });
  } finally {
    $q.loading.hide();
  }
}

const onSubmit = async () => {
  try {
    if (newLogo.value) {
      await updateLogoUseCase.execute(newLogo.value);
      $q.dialog({
        title: 'Logo Actualizado',
        message:
          'El logo del condominio se ha actualizado correctamente. Recarga tu navegador para ver los cambios.',
        persistent: true,
      });
    }
    $q.notify({
      type: 'positive',
      message: 'Cambios guardados correctamente.',
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      type: 'negative',
      message: 'Error al guardar cambios.',
    });
  }
};
</script>

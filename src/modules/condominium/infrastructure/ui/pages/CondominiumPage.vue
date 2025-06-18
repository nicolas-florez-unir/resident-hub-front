<template>
  <q-page class="q-pa-md">
    <div class="text-h3 q-mb-md">Condominio</div>
    <q-separator spaced />
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-input v-model="name" filled label="Name" type="text" />
      <q-input v-model="address" filled label="Address" type="text" />
      <q-card-actions align="right">
          <BotonGuardar />
      </q-card-actions>
    </q-form>
  </q-page>
</template>
<script lang="ts" setup>
import { applicationContainer } from 'src/boot';
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import { UpdateCondominiumLogoUseCase } from 'condominium/application/use-cases';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

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
          'Parece que has actualizado el logo del condominio. Recuerda recargar el navegador para ver los cambios.',
        persistent: true,
      });
    }
    $q.notify({
      type: 'positive',
      message: 'Logo uploaded successfully!',
    });
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
};
</script>

<style scoped>
.btn-edit-logo {
  top: 6px;
  right: 6px;
}
</style>

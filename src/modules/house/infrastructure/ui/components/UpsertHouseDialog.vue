<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-form @submit="upsertHouse">
        <q-card-section class="text-h6">
          {{ action === 'create' ? 'Crear Propiedad' : 'Editar Propiedad' }}
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            v-model="houseNumber"
            label="No. Unidad Residencial"
            :rules="[(val: string) => !!val || 'El correo es requerido']"
          />
          <q-select
            filled
            v-model="houseOwnerSelect.selected"
            :options="houseOwnerSelect.options"
            label="Propietario"
            emit-value
            map-options
            :rules="[(val: string) => !!val || 'El propietario es requerido']"
            :loading="isLoading"
          />
        </q-card-section>

        <!-- actions section -->
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            :loading="isLoading"
            color="green"
            :label="action == 'create' ? 'Crear' : 'Actualizar'"
            type="submit"
          />
          <q-btn :loading="isLoading" color="primary" label="Cancelar" @click="onDialogCancel" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import type { QSelectOption } from 'quasar';
import { applicationContainer } from 'src/boot';
import { GetHouseOwnersUseCase } from '../../../../house-owners/application/use-cases/get-house-owners.use-case';
import { CreateHouseUseCase } from 'src/modules/house/application/use-cases/create-house.use-case';
import { UpdateHouseUseCase } from 'src/modules/house/application/use-cases/update-house.use-case';

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const getHouseOwnersUseCase = applicationContainer.getFromContainer(GetHouseOwnersUseCase);
const createHouseUseCase = applicationContainer.getFromContainer(CreateHouseUseCase);
const updateHouseUseCase = applicationContainer.getFromContainer(UpdateHouseUseCase);

const props = defineProps<{
  action: 'create' | 'edit';
  house?: {
    id: number;
    houseNumber: string;
    owner: { id: number; email: string };
  };
}>();

const isLoading = ref(false);
const houseNumber = ref<string>(props.house?.houseNumber || '');
const houseOwnerSelect = ref<{
  selected: number | null;
  options: QSelectOption<number>[];
}>({
  selected: props.house?.owner.id || null,
  options: [],
});

defineEmits([...useDialogPluginComponent.emits]);

onMounted(() => void loadHouseOwners());

async function loadHouseOwners() {
  isLoading.value = true;
  try {
    const houseOwners = await getHouseOwnersUseCase.handle();
    houseOwnerSelect.value.options = houseOwners.map((owner) => ({
      label: `${owner.getFirstName()} ${owner.getLastName()}`,
      value: owner.getId(),
    }));
  } catch (error) {
    console.error('Error loading house owners:', error);
  } finally {
    isLoading.value = false;
  }
}

function upsertHouse() {
  if (props.action === 'create') {
    void createHouse();
  } else if (props.action === 'edit' && props.house) {
    void updateHouse();
  }
}

async function createHouse() {
  if (!houseNumber.value || !houseOwnerSelect.value.selected) {
    console.error('House number and owner must be selected');
    return;
  }

  isLoading.value = true;
  await createHouseUseCase.execute(houseNumber.value, houseOwnerSelect.value.selected);
  isLoading.value = false;
  onDialogOK();
}

async function updateHouse() {
  if (!props.house?.id) return;
  isLoading.value = true;
  await updateHouseUseCase.execute(
    props.house.id,
    houseNumber.value || props.house.houseNumber,
    houseOwnerSelect.value.selected || props.house.owner.id,
  );
  isLoading.value = false;
  onDialogOK();
}
</script>

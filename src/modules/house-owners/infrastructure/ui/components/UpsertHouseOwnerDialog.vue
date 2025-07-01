<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin">
      <q-form @submit="upsertHouseOwner">
        <q-card-section class="text-h6">
          {{ action === 'create' ? 'Crear Propietario' : 'Editar Propietario' }}
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            v-model="houseOwner.email"
            label="Correo Electrónico"
            type="email"
            :rules="[(val: string) => !!val || 'El correo es requerido']"
          />
          <q-input
            filled
            v-model="houseOwner.firstName"
            label="Nombre"
            :rules="[(val: string) => !!val || 'El nombre es requerido']"
          />
          <q-input
            filled
            v-model="houseOwner.lastName"
            label="Apellido"
            :rules="[(val: string) => !!val || 'El apellido es requerido']"
          />
          <q-input
            filled
            v-model="houseOwner.phone"
            label="Teléfono"
            type="tel"
            :rules="[(val: string) => !!val || 'El teléfono es requerido']"
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
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { applicationContainer } from 'src/boot';
import { CreateHouseOwnersUseCase } from '../../../application/use-cases/create-house-owner.use-case';
import { UpdateHouseOwnersUseCase } from '../../../application/use-cases/update-house-owner.use-case';

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const props = defineProps<{
  action: 'create' | 'edit';
  houseOwner?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}>();

const createHouseOwnerUseCase = applicationContainer.getFromContainer(CreateHouseOwnersUseCase);
const updateHouseOwnerUseCase = applicationContainer.getFromContainer(UpdateHouseOwnersUseCase);

const isLoading = ref(false);
const houseOwner = ref({
  email: props.houseOwner?.email || '',
  firstName: props.houseOwner?.firstName || '',
  lastName: props.houseOwner?.lastName || '',
  phone: props.houseOwner?.phone || '',
});

defineEmits([...useDialogPluginComponent.emits]);

async function upsertHouseOwner() {
  if (props.action === 'create') {
    await createUser();
  } else if (props.action === 'edit' && props.houseOwner) {
    await updateUser();
  }
}

async function createUser() {
  isLoading.value = true;
  await createHouseOwnerUseCase.handle({
    email: houseOwner.value.email,
    firstName: houseOwner.value.firstName,
    lastName: houseOwner.value.lastName,
    phone: houseOwner.value.phone,
  });
  isLoading.value = false;
  onDialogOK();
}

async function updateUser() {
  if (!props.houseOwner?.id) return;
  isLoading.value = true;
  await updateHouseOwnerUseCase.handle({
    id: props.houseOwner.id,
    email: houseOwner.value.email,
    firstName: houseOwner.value.firstName,
    lastName: houseOwner.value.lastName,
    phone: houseOwner.value.phone,
  });
  isLoading.value = false;
  onDialogOK();
}
</script>

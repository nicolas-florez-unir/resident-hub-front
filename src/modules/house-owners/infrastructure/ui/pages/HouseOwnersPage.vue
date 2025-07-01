<template>
  <q-table square flat :rows="tableOptions.rows" :columns="tableOptions.columns" row-key="email">
    <template v-slot:top>
      <div class="col-2 q-table__title">Propietarios</div>
      <q-space />
      <q-btn
        color="primary"
        icon-right="add"
        label="Agregar"
        @click="() => openHouseOwnerDialog('create')"
      />
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          color="primary"
          icon="edit"
          flat
          dense
          rounded
          @click="() => openHouseOwnerDialog('edit', props.row)"
        />
        <q-btn
          color="negative"
          icon="delete"
          flat
          dense
          rounded
          @click="() => openDeleteHouseOwnerModal(props.row.id, props.row.email)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { GetHouseOwnersUseCase } from '../../../application/use-cases/get-house-owners.use-case';
import { applicationContainer } from 'src/boot';
import { useQuasar } from 'quasar';
import type { QTableProps } from 'quasar';
import UpsertHouseOwnerDialog from '../components/UpsertHouseOwnerDialog.vue';
import { DeleteHouseOwnerUseCase } from '../../../application/use-cases/delete-house-owner.use-case';

const $q = useQuasar();
const getHouseOwnersUseCase = applicationContainer.getFromContainer(GetHouseOwnersUseCase);
const deleteHouseOwnerUseCase = applicationContainer.getFromContainer(DeleteHouseOwnerUseCase);
const tableOptions = ref<QTableProps>({
  columns: [
    { name: 'email', label: 'Correo', field: 'email', align: 'left' },
    { name: 'firstName', label: 'Nombre', field: 'firstName', align: 'left' },
    { name: 'lastName', label: 'Apellido', field: 'lastName', align: 'left' },
    { name: 'phone', label: 'Teléfono', field: 'phone', align: 'left' },
    { name: 'actions', label: 'Acciones', field: 'actions', align: 'center', sortable: false },
  ],
  rows: [],
});

onMounted(() => loadHouseOwners());

async function loadHouseOwners() {
  $q.loading.show({
    message: 'Cargando propietarios...',
  });
  try {
    const houseOwners = await getHouseOwnersUseCase.handle();

    tableOptions.value.rows = houseOwners.map((owner) => ({
      id: owner.getId(),
      email: owner.getEmail(),
      firstName: owner.getFirstName(),
      lastName: owner.getLastName(),
      phone: owner.getPhone(),
    }));
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al cargar propietarios: ' + (error as Error).message,
    });
  } finally {
    $q.loading.hide();
  }
}

function openHouseOwnerDialog(action: 'create' | 'edit', houseOwner?: Record<string, object>) {
  $q.dialog({
    component: UpsertHouseOwnerDialog,
    componentProps: {
      action,
      houseOwner,
    },
    persistent: true,
  }).onOk(() => void loadHouseOwners());
}

function openDeleteHouseOwnerModal(id: number, email: string) {
  $q.dialog({
    title: 'Eliminar propietario',
    message: `¿Estás seguro de que deseas eliminar al propietario con correo ${email}?`,
    ok: {
      label: 'Sí, eliminar',
      color: 'negative',
    },
    cancel: {
      label: 'Cancelar',
      color: 'primary',
    },
    persistent: true,
  }).onOk(() => void deleteHouseOwnerModal(id));
}

async function deleteHouseOwnerModal(id: number) {
  $q.loading.show({
    message: 'Eliminando propietario...',
  });

  try {
    await deleteHouseOwnerUseCase.handle(id);
    $q.notify({
      type: 'positive',
      message: 'Propietario eliminado correctamente.',
    });
    void loadHouseOwners();
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al eliminar propietario: ' + (error as Error).message,
    });
  } finally {
    $q.loading.hide();
  }
}
</script>

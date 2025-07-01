<template>
  <q-table square flat :rows="tableOptions.rows" :columns="tableOptions.columns" row-key="email">
    <template v-slot:top>
      <div class="col-2 q-table__title">Propiedades</div>
      <q-space />
      <q-btn
        color="primary"
        icon-right="add"
        label="Agregar"
        @click="() => openHouseDialog('create')"
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
          @click="() => openHouseDialog('edit', props.row)"
        />
        <q-btn
          color="negative"
          icon="delete"
          flat
          dense
          rounded
          @click="() => openDeleteHouseOwnerModal(props.row.id, props.row.houseNumber)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import type { QTableProps } from 'quasar';
import { applicationContainer } from 'src/boot';
import { GetHousesByCondominiumUseCase } from '../../../application/use-cases/get-houses-by-condominium.use-case';
import UpsertHouseDialog from '../components/UpsertHouseDialog.vue';
import { DeleteHouseUseCase } from 'src/modules/house/application/use-cases/delete-house.use-case';

const getHousesByCondominiumUseCase = applicationContainer.getFromContainer(
  GetHousesByCondominiumUseCase,
);
const deleteHouseUseCase = applicationContainer.getFromContainer(DeleteHouseUseCase);
const $q = useQuasar();
const tableOptions = ref<QTableProps>({
  columns: [
    { name: 'houseNumber', label: 'No. Unidad Residencial', field: 'houseNumber', align: 'left' },
    {
      name: 'owner',
      label: 'Propietario',
      field: (row) => row.owner.email,
      align: 'left',
    },
    { name: 'actions', label: 'Acciones', field: 'actions', align: 'center', sortable: false },
  ],
  rows: [],
});

onMounted(() => loadHouses());

async function loadHouses() {
  $q.loading.show({
    message: 'Cargando propietarios...',
  });
  try {
    const houses = await getHousesByCondominiumUseCase.execute();
    tableOptions.value.rows = houses.map((house) => ({
      id: house.id,
      houseNumber: house.houseNumber,
      owner: house.owner,
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

function openHouseDialog(action: 'create' | 'edit', house?: Record<string, object>) {
  $q.dialog({
    component: UpsertHouseDialog,
    componentProps: {
      action,
      house,
    },
    persistent: true,
  }).onOk(() => void loadHouses());
}

function openDeleteHouseOwnerModal(id: number, houseNumber: string) {
  $q.dialog({
    title: 'Eliminar propietario',
    message: `¿Estás seguro de que deseas eliminar la propiedad ${houseNumber}?`,
    ok: {
      label: 'Sí, eliminar',
      color: 'negative',
    },
    cancel: {
      label: 'Cancelar',
      color: 'primary',
    },
    persistent: true,
  }).onOk(() => void deleteHouse(id));
}

async function deleteHouse(id: number) {
  $q.loading.show({
    message: 'Eliminando propietario...',
  });

  try {
    await deleteHouseUseCase.execute(id);
    void loadHouses();
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

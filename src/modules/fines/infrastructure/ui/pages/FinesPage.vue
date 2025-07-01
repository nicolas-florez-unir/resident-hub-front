<template>
  <q-table square flat :rows="tableOptions.rows" :columns="tableOptions.columns" row-key="email">
    <template v-slot:top>
      <div class="col-2 q-table__title">Multas</div>
      <q-space />
      <q-btn
        color="primary"
        icon-right="add"
        label="Agregar"
        @click="() => openUpsertFineDialog('create')"
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
          @click="() => openUpsertFineDialog('edit', props.row)"
        />
        <q-btn
          color="negative"
          icon="delete"
          flat
          dense
          rounded
          @click="
            () => openDeleteFineModal(props.row.id, props.row.type, props.row.house.houseNumber)
          "
        />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { applicationContainer } from 'src/boot';
import { useQuasar } from 'quasar';
import type { QTableProps } from 'quasar';
import { GetFinesUseCase } from '../../../application/use-cases/get-fines.use-case';
import UpsertFineDialog from '../components/UpsertFineDialog.vue';
import { format as dateFormat } from 'date-fns';
import { FineStatus } from 'src/modules/fines/domain/enums/fine-status.enum';
import { FineType } from 'src/modules/fines/domain/enums/fine-type.enum';
import { DeleteFineUseCase } from '../../../application/use-cases/delete-fine.use-case';

const $q = useQuasar();
const getFinesUseCase = applicationContainer.getFromContainer(GetFinesUseCase);
const deleteFineUseCase = applicationContainer.getFromContainer(DeleteFineUseCase);

const tableOptions = ref<QTableProps>({
  columns: [
    {
      name: 'type',
      label: 'Tipo',
      field: 'type',
      align: 'left',
      format: (val) => translateType(val),
    },
    { name: 'house', label: 'Casa', field: (row) => row.house.houseNumber, align: 'left' },
    { name: 'owner', label: 'Propietario', field: (row) => row.house.owner.email, align: 'left' },
    {
      name: 'issuedDate',
      label: 'Fecha de emisión',
      field: 'issuedDate',
      format: (val) => dateFormat(val, 'yyyy/MM/dd'),
      align: 'left',
    },
    { name: 'currency', label: 'Moneda', field: 'currency', align: 'left' },
    { name: 'amount', label: 'Monto', field: 'amount', align: 'left' },
    {
      name: 'status',
      label: 'Estado',
      field: 'status',
      align: 'left',
      format: (val) => translateStatus(val),
    },
    { name: 'reason', label: 'Observación', field: 'reason', align: 'left' },
    {
      name: 'actions',
      label: 'Acciones',
      align: 'center',
      field: 'actions',
      sortable: false,
    },
  ],
  rows: [],
});

onMounted(() => loadFines());

async function loadFines() {
  $q.loading.show({
    message: 'Cargando multas...',
  });
  try {
    const fines = await getFinesUseCase.handle();

    tableOptions.value.rows = fines.map((fine) => ({
      id: fine.getId(),
      type: fine.getTypeFine(),
      issuedDate: fine.getIssuedDate(),
      house: fine.getHouse(),
      currency: fine.getCurrency(),
      amount: fine.getAmount(),
      status: fine.getStatus(),
      reason: fine.getReason(),
    }));
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al cargar multas: ' + (error as Error).message,
    });
  } finally {
    $q.loading.hide();
  }
}

function openUpsertFineDialog(action: 'create' | 'edit', fine?: Record<string, object>) {
  $q.dialog({
    component: UpsertFineDialog,
    componentProps: {
      action,
      fine,
    },
    persistent: true,
    ok: {
      label: 'Guardar',
      color: 'primary',
    },
    cancel: {
      label: 'Cancelar',
      color: 'negative',
    },
  }).onOk(() => void loadFines());
}

function openDeleteFineModal(id: number, type: FineType, house: string) {
  $q.dialog({
    title: 'Eliminar Multa',
    message: `¿Estás seguro de que deseas eliminar la multa de la casa ${house} por ${translateType(type)}?`,
    ok: {
      label: 'Sí, eliminar',
      color: 'negative',
    },
    cancel: {
      label: 'Cancelar',
      color: 'primary',
    },
    persistent: true,
  }).onOk(() => void deleteFine(id));
}

async function deleteFine(id: number) {
  $q.loading.show({
    message: 'Eliminando multa...',
  });

  try {
    await deleteFineUseCase.handle(id);
    $q.notify({
      type: 'positive',
      message: 'Multa eliminada correctamente.',
    });
    void loadFines();
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error al eliminar multa: ' + (error as Error).message,
    });
  } finally {
    $q.loading.hide();
  }
}

function translateStatus(status: FineStatus): string {
  switch (status) {
    case FineStatus.PENDING:
      return 'Pendiente';
    case FineStatus.PAID:
      return 'Pagada';
    case FineStatus.APPEALED:
      return 'Apelada';
    default:
      return status;
  }
}

function translateType(type: FineType): string {
  switch (type) {
    case FineType.LATE_PAYMENT:
      return 'Pago tardío';
    case FineType.NON_COMPLIANCE:
      return 'Incumplimiento';
    default:
      return type;
  }
}
</script>

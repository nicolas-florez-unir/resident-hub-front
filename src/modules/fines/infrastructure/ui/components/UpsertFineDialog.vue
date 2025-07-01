<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw">
      <q-form @submit="upsertFine">
        <q-card-section class="text-h6">
          {{ action === 'create' ? 'Crear Multa' : 'Editar Multa' }}
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <q-select
              class="col-12 col-sm-6"
              filled
              v-model="typeSelect.selected"
              :options="typeSelect.options"
              label="Tipo"
              emit-value
              map-options
              :rules="[(val: string) => !!val || 'Tipo es requerido']"
            />
            <q-select
              class="col-12 col-sm-6"
              filled
              v-model="houseOwnerSelect.selected"
              :options="houseOwnerSelect.options"
              label="Propiedad"
              emit-value
              map-options
              :rules="[(val: string) => !!val || 'La Propiedad es requerido']"
              :loading="isLoading"
            />
          </div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col-12 col-sm-6"
              filled
              v-model="issuedDate"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="issuedDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select
              class="col-12 col-sm-6"
              filled
              v-model="currencySelect.selected"
              :options="currencySelect.options"
              label="Moneda"
              emit-value
              map-options
              :rules="[(val: string) => !!val || 'Moneda es requerido']"
            />
          </div>
          <div class="row q-col-gutter-sm">
            <q-input
              class="col-12 col-sm-6"
              filled
              v-model="amount"
              label="Monto"
              type="number"
              :rules="[(val) => (!!val && val >= 0) || 'Monto debe ser un número positivo']"
            />
            <q-select
              class="col-12 col-sm-6"
              filled
              v-model="statusSelect.selected"
              :options="statusSelect.options"
              label="Estado de la multa"
              emit-value
              map-options
              :rules="[(val: string) => !!val || 'Status es requerido']"
            />
          </div>
          <q-input
            v-model="reason"
            class="col-12 col-sm-6"
            label="Observación"
            filled
            type="textarea"
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
import { format } from 'date-fns';
import { applicationContainer } from 'src/boot';
import { GetHousesByCondominiumUseCase } from 'src/modules/house/application/use-cases/get-houses-by-condominium.use-case';
import { FineType } from 'src/modules/fines/domain/enums/fine-type.enum';
import { Currency } from 'src/modules/fines/domain/enums/currency.enum';
import { FineStatus } from 'src/modules/fines/domain/enums/fine-status.enum';
import { CreateFineUseCase } from '../../../application/use-cases/create-fine.use-case';
import { UpdateFineUseCase } from '../../../application/use-cases/update-fine.use-case';

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const getHousesByCondominiumUseCase = applicationContainer.getFromContainer(
  GetHousesByCondominiumUseCase,
);
const createFineUseCase = applicationContainer.getFromContainer(CreateFineUseCase);
const updateFineUseCase = applicationContainer.getFromContainer(UpdateFineUseCase);

const props = defineProps<{
  action: 'create' | 'edit';
  fine?: {
    id: number;
    type: FineType;
    issuedDate: Date;
    house: { id: number; houseNumber: string; owner: { id: number; email: string } };
    currency: Currency;
    amount: number;
    status: FineStatus;
    reason: string;
  };
}>();
const isLoading = ref(false);
const houseOwnerSelect = ref<{
  selected: number | null;
  options: QSelectOption<number>[];
}>({
  selected: props.fine?.house.owner.id || null,
  options: [],
});
const typeSelect = ref<{
  selected: FineType | null;
  options: QSelectOption<FineType>[];
}>({
  options: [
    {
      value: FineType.LATE_PAYMENT,
      label: 'Pago tardío',
    },
    {
      value: FineType.NON_COMPLIANCE,
      label: 'Incumplimiento',
    },
  ],
  selected: props.fine?.type || null,
});
const currencySelect = ref<{
  selected: Currency | null;
  options: QSelectOption<Currency>[];
}>({
  options: [
    { value: Currency.USD, label: 'Dólar estadounidense' },
    { value: Currency.EUR, label: 'Euro' },
    { value: Currency.COP, label: 'Peso colombiano' },
  ],
  selected: props.fine?.currency || null,
});
const statusSelect = ref<{
  selected: FineStatus | null;
  options: QSelectOption<FineStatus>[];
}>({
  options: [
    { value: FineStatus.PENDING, label: 'Pendiente' },
    { value: FineStatus.PAID, label: 'Pagada' },
    { value: FineStatus.APPEALED, label: 'Apelada' },
  ],
  selected: props.fine?.status || FineStatus.PENDING,
});
const amount = ref<number>(props.fine?.amount || 0);
const issuedDate = ref<string>(format(props.fine?.issuedDate || new Date(), 'yyyy/MM/dd'));
const reason = ref<string>(props.fine?.reason || '');

defineEmits([...useDialogPluginComponent.emits]);

onMounted(() => void loadHouses());

async function loadHouses() {
  isLoading.value = true;
  try {
    // const houseOwners = await getHouseOwnersUseCase.handle();
    const houses = await getHousesByCondominiumUseCase.execute();
    houseOwnerSelect.value.options = houses.map((house) => ({
      label: house.getHouseNumber(),
      value: house.getId(),
    }));
  } catch (error) {
    console.error('Error loading house owners:', error);
  } finally {
    isLoading.value = false;
  }
}

function upsertFine() {
  if (props.action === 'create') {
    void createFine();
  } else if (props.action === 'edit' && props.fine) {
    void updateFine();
  }
}

async function createFine() {
  isLoading.value = true;
  await createFineUseCase.execute({
    type: typeSelect.value.selected || FineType.LATE_PAYMENT,
    issuedDate: new Date(issuedDate.value),
    houseId: houseOwnerSelect.value.selected || 0,
    currency: currencySelect.value.selected || Currency.USD,
    amount: amount.value || 0,
    status: statusSelect.value.selected || FineStatus.PENDING,
    reason: reason.value,
  });
  isLoading.value = false;
  onDialogOK();
}

async function updateFine() {
  if (!props.fine?.id) return;
  isLoading.value = true;
  await updateFineUseCase.execute({
    id: props.fine.id,
    type: typeSelect.value.selected || FineType.LATE_PAYMENT,
    issuedDate: new Date(issuedDate.value),
    houseId: houseOwnerSelect.value.selected || 0,
    currency: currencySelect.value.selected || Currency.USD,
    amount: parseInt(amount.value.toString()) || 0,
    status: statusSelect.value.selected || FineStatus.PENDING,
    reason: reason.value,
  });
  isLoading.value = false;
  onDialogOK();
}
</script>

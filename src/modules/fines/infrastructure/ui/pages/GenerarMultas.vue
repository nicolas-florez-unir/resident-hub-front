<template>
  <q-page class="custom-page q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <!-- Formulario -->
      <div class="col-12 col-md-6 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">Generar Multas</div>

            <div class="q-gutter-md">
              <!-- Clase de Multa -->
              <div class="row items-center">
                <div class="col-5 text-left text-bold label">Clase de Multa:</div>
                <div class="col-7">
                  <q-select
                    v-model="form.tipoMulta"
                    :options="['Incumplimiento', 'Pago atrasado']"
                    label="Clase"
                    filled
                    dense
                  />
                </div>
              </div>

              <!-- Propietario -->
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-bold label">Propietario:</div>
                <div class="col-7">
                  <q-select
                    v-model="form.propietario"
                    :options="propietariosOptions"
                    label="Selecciona propietario"
                    filled
                    dense
                    emit-value
                    map-options
                  />
                </div>
              </div>

              <!-- Fecha de Generación -->
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-bold label">Fecha de Generación:</div>
                <div class="col-7">
                  <q-input
                    v-model="form.fecha"
                    mask="####-##-##"
                    filled  
                    dense
                    placeholder="Selecciona una fecha"
                  >
                    <template #append>
                      <q-icon name="event" color="primary" class="cursor-pointer" @click="showDate = true" />
                    </template>
                  </q-input>
                    <q-popup-proxy v-model="showDate" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.fecha" mask="YYYY-MM-DD" color="primary" />
                    </q-popup-proxy>
                </div>
              </div>

              <!-- Monto -->
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-bold label">Monto:</div>
                <div class="col-7">
                  <q-input
                    v-model="form.monto"
                    filled
                    dense
                    type="number"
                    placeholder="Ingresa el monto de la multa"
                  />
                </div>
              </div>

              <!-- Estado -->
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-bold label">Estado:</div>
                <div class="col-7">
                  <q-select
                    v-model="form.estado"
                    :options="['Active', 'Inactive']"
                    label="Selecciona un estado"
                    filled
                    dense
                  />
                </div>
              </div>

              <!-- Observación -->
              <div class="row items-center q-mt-md">
                <div class="col-5 text-left text-bold label">Observación:</div>
                <div class="col-7">
                  <q-input
                    v-model="form.observacion"
                    type="textarea"
                    filled
                    dense
                    placeholder="Motivo de la multa"
                  />
                </div>
              </div>
            </div>

            <!-- Botón Guardar -->
            <div class="q-mt-lg row justify-center">
              <BotonGuardar 
               label="Guardar" 
               type="submit"  
               :disabled ="!form.tipoMulta || !form.propietario || !form.fecha || !form.monto"
               @click="saveFine" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Trazabilidad -->
      <div class="col-12 col-md-10 traza-container">
        <q-card class="traza-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg traza-title">Listado de Multas</div>
            <q-table
              :rows="filteredFines"
              :columns="columns"
              row-key="id"
              class="traza-table"
              @row-click="handleRowClick"
            >
              <template #top>
                <div class="row full-width items-center q-pa-sm">
                  <div class="col">
                    <q-input
                      v-model="search"
                      outlined
                      dense
                      rounded
                      class="input bg-grey-1"
                      placeholder="Buscar en multas"
                      debounce="300"
                      prepend-inner-icon="search"
                    />
                  </div>
                </div>
              </template>
            </q-table>
            <div class="row q-mt-md botones-inferiores">
              <BotonEditar   
                label="Editar" 
                :disable="!selectedFine" 
                @click="selectedFine && editFine(selectedFine)" 
                class="q-mr-sm"
                />
              <BotonEliminar   
                label="Eliminar" 
                :disable="!selectedFine" @click="deleteFine" 
                />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { applicationContainer } from 'src/boot';
import { ReadFineUseCase, CreateFineUseCase, UpdateFineUseCase, DeleteFineUseCase } from 'src/modules/fines/application/use-cases';
import { CreateFineDto, UpdateFineDto, DeleteFineDto } from 'src/modules/fines/domain/dtos';
import type { FineDto } from 'src/modules/fines/domain/dtos';
import { ReadUserUseCase } from 'src/modules/user/application/use-cases/read-user.use-case';
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import BotonEditar from 'src/modules/common/ui/components/buttons/EditButton.vue';
import BotonEliminar from 'src/modules/common/ui/components/buttons/DeleteButton.vue';

const $q = useQuasar();
const readFineUseCase = applicationContainer.getFromContainer(ReadFineUseCase);
const createFineUseCase = applicationContainer.getFromContainer(CreateFineUseCase);
const updateFineUseCase = applicationContainer.getFromContainer(UpdateFineUseCase);
const deleteFineUseCase = applicationContainer.getFromContainer(DeleteFineUseCase);
const readOwnerUseCase = applicationContainer.getFromContainer(ReadUserUseCase);
const showDate = ref(false);

const fines = ref<FineDto[]>([]);
const selectedFine = ref<FineDto | null>(null);
const search = ref('');
const propietarios = ref<{ id: number; nombre: string }[]>([]); // Lista de propietarios

const columns = [
  { name: 'tipoMulta', label: 'Clase de Multa', field: 'tipoMulta', sortable: true },
  { name: 'propietario', label: 'Propietario', field: 'propietario', sortable: true },
  { name: 'fecha', label: 'Fecha', field: 'fecha', sortable: true },
  { name: 'monto', label: 'Monto', field: 'monto', sortable: true },
  { name: 'estado', label: 'Estado', field: 'estado', sortable: true },
  { name: 'observacion', label: 'Observación', field: 'observacion', sortable: false },
];

const form = reactive({
  id: '', 
  tipoMulta: '',
  propietario: '',
  fecha: '',
  monto: 0,
  estado: 'Active',
  observacion: '',
});

const propietariosOptions = computed(() =>
  propietarios.value.map((p) => ({ label: p.nombre, value: String(p.id) }))
);

// Cargar listado de multas.
const loadFines = async () => {
  $q.loading.show({ message: 'Cargando multas...' });
  try {
    // Leer propietarios
    propietarios.value = []; // Limpiar la lista de propietarios antes de cargar
    const ownerResult = await readOwnerUseCase.handle();
    propietarios.value = ownerResult.map(owner => ({
      id: owner.getId(),
      nombre: owner.getFullName(),
    }));

    // Cargar multas
    const fineResult = await readFineUseCase.handle();
    fines.value = fineResult.map(fine => {
      const propietario = propietarios.value.find(p => p.id === parseInt(fine.getUserId()));
      return {
        id: fine.getId(),
        typeFine: fine.getTypeFine(), // Clase de multa
        userId: fine.getUserId(), // Mantener el `userId` original
        createdAt: new Date(fine.getCreatedAt()), // Mantener el objeto Date
        amount: fine.getAmount(),
        description: fine.getDescription(),
        status: fine.getStatus(),
        propietario: propietario ? propietario.nombre : 'Desconocido', // Mostrar el nombre del propietario
        fecha: fine.getCreatedAt().toISOString().split('T')[0], // Fecha formateada
      };
    });

  } catch (error) {
    $q.notify({ type: 'negative', message: 'Error al cargar multas.' });
    console.error(error);
  } finally {
    $q.loading.hide();
  }
};


onMounted(() => {
  void loadFines();
});


// Guardar (crear o actualizar) multas.
const saveFine = async () => {
  if (!form.tipoMulta || !form.propietario || !form.fecha || !form.monto) {
    $q.notify({ type: 'negative', message: 'Complete todos los campos obligatorios.' });
    return;
  }

  try {
    $q.loading.show();

    // Buscar el propietario por nombre o valor seleccionado en el formulario
    const propietarioSeleccionado = propietarios.value.find(
      propietario => String(propietario.id) === form.propietario
    );

    if (!propietarioSeleccionado) {
      $q.notify({ type: 'negative', message: 'Propietario no válido seleccionado.' });
      return;
    }


    if (form.id && form.id !== '') { 
      await updateFineUseCase.handle(
        new UpdateFineDto(
          form.id,
          form.tipoMulta,
          propietarioSeleccionado.id,
          form.monto,
          form.observacion,
          'pending',
          new Date(form.fecha)
        )
      );
      $q.notify({ type: 'positive', message: 'Multa actualizada correctamente.' });
    } else {
      await createFineUseCase.handle(
        new CreateFineDto(
          form.id,
          form.tipoMulta,
          propietarioSeleccionado.id,
          form.monto,
          form.observacion,
          'Active',
          new Date(form.fecha)
        )
      );
      $q.notify({ type: 'positive', message: 'Multa registrada correctamente.' });
    }
    await loadFines();
    resetForm();
  } catch  {
    $q.notify({ type: 'negative', message: 'Error al guardar la multa.' });
  } finally {
    $q.loading.hide();
  }
};

// Editar (llenar el formulario con datos de la multa seleccionada).
const editFine = (fine: FineDto) => {
  if (!fine) return;

  selectedFine.value = fine;
  Object.assign(form, fine);
   
};

// Eliminar multa seleccionada.
const deleteFine = async () => {
  if (!selectedFine.value) {
    $q.notify({ type: 'warning', message: 'Seleccione una multa para eliminar.' });
    return;
  }

  const confirm = window.confirm(`¿Está seguro que desea eliminar la multa ${selectedFine.value.id}?`);
  if (!confirm) return;

  try {
    $q.loading.show();
    await deleteFineUseCase.handle(new DeleteFineDto(selectedFine.value.id));
    $q.notify({ type: 'positive', message: 'Multa eliminada correctamente.' });
    await loadFines();
    resetForm();
  } catch {
    $q.notify({ type: 'negative', message: 'Error al eliminar la multa.' });
  } finally {
    $q.loading.hide();
  }
};

// Resetear el formulario (crear o editar).
const resetForm = () => {
  Object.assign(form, {
    id: '', // línea 210 corregida: mantener como string para consistencia
    tipoMulta: '',
    propietario: '',
    fecha: '',
    monto: 0,
    estado: 'Active',
    observacion: '',
  });
  selectedFine.value = null;
};

// Filtro de multas basado en búsqueda.
const filteredFines = computed(() => {
  if (!search.value) return fines.value;
  return fines.value.filter(fine =>
    Object.values(fine).some(val =>
      String(val).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});

function handleRowClick(_evt: Event, row: FineDto) {
  selectedFine.value = row;
}
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

// Contenedor de trazabilidad
.traza-container {
  margin: 20px auto; // Centra el contenedor y agrega espaciado vertical
  
  width: calc(100% - 40px); // Evita que se desborde horizontalmente
  padding: 10px; // Espacio interno en el contenedor
  box-sizing: border-box; // Incluye padding y borde en el ancho
  
}

// Tarjeta del formulario
.form-card {
  background: var(--background-color);
  border: 2px solid var(--border-color-dark);
  border-radius: 8px;
  width: 100%;
}

// Tarjeta de trazabilidad
.traza-card {
  background: var(--background-color);
  border: 2px solid var(--border-color-dark);
  border-radius: 8px;
  width: 100%;
  margin-left: 20px;

}

// Encabezado de la tabla
.traza-table th {
  background: var(--accent-color);
  color: #fff;
}

// Título de trazabilidad
.traza-title {
  color: var(--text-primary);
}

// Estilos para botones posicionados debajo de la tabla
.botones-inferiores {
  margin-top: 20px;
  margin-inline: 20px; // Espacio horizontal
  display: flex;
  justify-content: flex-end; // Alinear botones a la derecha
  
}
</style>



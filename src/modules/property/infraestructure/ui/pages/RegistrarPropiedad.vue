<template>
  <q-page class="custom-page q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <!-- Formulario -->
      <div class="col-12 col-md-6 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">
              Registro de Propiedad
            </div>
            <q-form @submit.prevent="saveProperty">
              <div class="q-gutter-md">
                <!-- No. Unidad Residencial -->
                <div class="row items-center">
                  <div class="col-5 label">No. Unidad Residencial:</div>
                  <div class="col-7">
                    <q-input
                      v-model="form.noUnidad"
                      outlined
                      dense
                      class="input"
                      :rules="[val => !!val || 'Campo requerido']"
                      error-message="Campo obligatorio"
                    />
                  </div>
                </div>
                <!-- Propietario -->
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Propietario:</div>
                  <div class="col-7">
                    <q-select
                      v-model="form.propietario"
                      :options="propietariosOptions"
                      color="primary"
                      outlined
                      dense
                      map-options
                      class="input"
                      emit-value
                      :rules="[val => !!val || 'Campo requerido']"
                    />
                  </div>
                </div>
                <!-- Características -->
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Características:</div>
                  <div class="col-7">
                    <q-input
                      v-model="form.memo"
                      type="textarea"
                      rows="3"
                      outlined
                      dense
                      class="input"
                      placeholder="Características de la propiedad"
                    />
                  </div>
                </div>
              </div>
              <!-- Guardar y Limpiar -->
                <div class="row justify-center q-mt-lg ">
                  <BotonGuardar
                    label="Guardar"
                    type="submit"
                    class="q-mr-sm"
                    :disabled="!form.noUnidad || !form.propietario"
                    @click="saveProperty"
                  />
                </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tabla -->
      <div class="col-12 col-md-10 traza-container">
        <q-card class="traza-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg traza-title">
              Propiedades Registradas
            </div>
            <q-table
              :rows="filteredProperties"
              :columns="columns"
              row-key="id"
              class="traza-table"
              :filter="search"
              @row-click="handleRowClick"
            >
              <template #top>
                <div class="row full-width items-center q-pa-sm">
                  <div class="col">
                    <q-input
                      v-model="search"
                      outlined
                      dense
                      class="input bg-grey-1"
                      placeholder="Buscar propiedad"
                      debounce="300"
                    />
                  </div>
                </div>
              </template>
            </q-table>
              <div class="row q-mt-md botones-inferiores">
                <BotonEditar
                  label="Editar"
                  :disabled="!selectedProperty"
                  @click="loadForEdit"
                  class="q-mr-sm"
                />
                <BotonEliminar
                  label="Eliminar"
                  :disabled="!selectedProperty"
                  @click="deleteProperty"
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
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import BotonEditar from 'src/modules/common/ui/components/buttons/EditButton.vue';
import BotonEliminar from 'src/modules/common/ui/components/buttons/DeleteButton.vue';
import { ReadPropertyUseCase, CreatePropertyUseCase, DeletePropertyUseCase, UpdatePropertyUseCase } from 'src/modules/property/application/use-cases';
import { ReadUserUseCase } from 'src/modules/user/application/use-cases/read-user.use-case';
import { CreatePropertyDto, DeletePropertyDto, UpdatePropertyDto } from 'src/modules/property/domain/dtos';
import type { PropertyDto } from 'src/modules/property/domain/dtos';

const $q = useQuasar();
const readPropertyUseCase = applicationContainer.getFromContainer(ReadPropertyUseCase);
const createPropertyUseCase = applicationContainer.getFromContainer(CreatePropertyUseCase);
const deletePropertyUseCase = applicationContainer.getFromContainer(DeletePropertyUseCase);
const readOwnerUseCase = applicationContainer.getFromContainer(ReadUserUseCase);
const updatePropertyUseCase = applicationContainer.getFromContainer(UpdatePropertyUseCase);

const isSubmitted = ref(false);

const propiedades = ref<PropertyDto[]>([]);
const propietarios = ref<{ id: number; nombre: string }[]>([]);
const selectedProperty = ref<PropertyDto | null>(null);
const search = ref('');

interface PropertyForm {
  id: number
  noUnidad: string
  propietario: string
  memo: string
}

const form = reactive<PropertyForm>({
  id: 0,
  noUnidad: '',
  propietario: '',
  memo: ''
});

const propietariosOptions = computed(() =>
  propietarios.value.map(p => ({ label: p.nombre, value: String(p.id) }))
);

// Carga de datos
const loadData = async () => {
  $q.loading.show({ message: 'Cargando propiedades...' });

  try {
    // Cargar propietarios
    const ownerResult = await readOwnerUseCase.handle();
    propietarios.value = ownerResult.map(owner => ({
      id: owner.getId(),
      nombre: owner.getFullName(),
    }));

    // Cargar propiedades    
    const propertyResult = await readPropertyUseCase.handle();
    propiedades.value = propertyResult.map(property => {
      const propietarioId = parseInt(property.getPropietario() || '0', 20);
      const propietario = propietarios.value.find(p => p.id === propietarioId);
      return {
        id: property.getId(),
        noUnidad: property.getNoUnidad(),
        propietario: propietario ? propietario.nombre : 'Desconocido',
        memo: property.getMemo() || '',
      };
    });
  } catch {
    $q.notify({ type: 'negative', message: 'Error cargando datos.' });
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  void loadData();
});

const saveProperty = async () => {
  isSubmitted.value = true;
  if (!form.noUnidad || !form.propietario) {
    $q.notify({ type: 'negative', message: 'Debe completar los campos obligatorios.' });
    return;
  }
  try {
    $q.loading.show();
    if (form.id && form.id !== 0) {
      await updatePropertyUseCase.handle(
        new UpdatePropertyDto(form.id, form.noUnidad, form.propietario, form.memo)
      );
      $q.notify({ type: 'positive', message: 'Propiedad actualizada correctamente.' });
    } else {
      await createPropertyUseCase.handle(
        new CreatePropertyDto(0, form.noUnidad, form.propietario, form.memo)
      );
      $q.notify({ type: 'positive', message: 'Propiedad registrada correctamente.' });
    }
    await loadData();
    resetForm();
  } catch (error) {
    const err = error as Error;
    $q.notify({ type: 'negative', message: 'Error al guardar la propiedad: ' + err.message });
  } finally {
    $q.loading.hide();
  }
};

const deleteProperty = async () => {
  if (!selectedProperty.value) return;
  const confirm = window.confirm(`¿Eliminar propiedad "${selectedProperty.value.noUnidad}"?`);
  if (!confirm) return;
  try {
    $q.loading.show();
    await deletePropertyUseCase.handle(new DeletePropertyDto(selectedProperty.value.id));
    $q.notify({ type: 'positive', message: 'Propiedad eliminada correctamente.' });
    await loadData();
    resetForm();
  } catch (error) {
    const err = error as Error;
    $q.notify({ type: 'negative', message: 'Error eliminando la propiedad: ' + err.message });
  } finally {
    $q.loading.hide();
  }
};

const loadForEdit = () => {
  if (selectedProperty.value) {
    Object.assign(form, { ...selectedProperty.value });
  }
};

const resetForm = () => {
  form.id = 0;
  form.noUnidad = '';
  form.propietario = '';
  form.memo = '';
  isSubmitted.value = false;
  selectedProperty.value = null;
};

const filteredProperties = computed(() => {
  if (!search.value) return propiedades.value;
  return propiedades.value.filter(property =>
    Object.values(property).some(val =>
      String(val).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});

const columns = [
  { name: 'noUnidad', label: 'No Unidad', field: 'noUnidad', sortable: true },
  { name: 'propietario', label: 'Propietario', field: 'propietario', sortable: true },
  { name: 'memo', label: 'Características', field: 'memo', sortable: false },
];

const handleRowClick = (_evt: Event, row: PropertyDto) => {
  selectedProperty.value = row;
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
<template>
  <q-page class="q-pa-md">
    <div class="col-12 col-md-10 col-lg-8">
      <q-card
        flat
        bordered
        class="row items-center no-shadow full-width full-height q-px-md q-py-sm"
      >
        <q-item-section avatar>
          <q-avatar color="blue">
            {{ form.id ? form.id.toString().charAt(0) : 'P' }}
          </q-avatar>
        </q-item-section>
        <div class="col overflow-hidden">
          <div class="text-h5 ellipsis">Gestión de Propiedades</div>
          <div class="text-grey-6 text-h6 ellipsis">Registro y administración</div>
        </div>
      </q-card>

      <!-- Formulario -->
      <q-form @submit="onSubmit" class="q-mt-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="form.noUnidad" filled label="No Unidad Residencial" />
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="form.propietario"
              :options="propietarios.map(p => ({ label: p.nombre, value: p.id }))"
              filled
              label="Seleccione Propietario"
            />
          </div>
          <div class="col-12">
            <q-input v-model="form.memo" filled label="Características" type="textarea" />
          </div>
        </div>

        <q-card-actions>
          <BotonGuardar />
        </q-card-actions>
      </q-form>

      <!-- Tabla -->
      <div class="q-mt-md">
        <q-table
          flat
          bordered
          :rows="filteredProperties"
          :columns="columns"
          row-key="id"
          @row-click="handleRowClick"
          class="full-width"
        >
          <template v-slot:top>
            <q-input
              v-model="search"
              debounce="300"
              filled
              placeholder="Buscar propiedades"
              class="q-mb-md"
            />
          </template>
        </q-table>

        <!-- Botones de Acciones -->
        <q-btn
          outline
          color="primary"
          label="Editar"
          icon="edit"
          class="q-mt-md"
          :disable="!selectedProperty"
          @click="loadForEdit"
        />
        <q-btn
          outline
          color="negative"
          label="Eliminar"
          icon="delete"
          class="q-mt-md"
          :disable="!selectedProperty"
          @click="deleteProperty"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { applicationContainer } from 'src/boot';
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import { ReadPropertyUseCase, CreatePropertyUseCase, DeletePropertyUseCase } from 'src/modules/property/application/use-cases';
import { ReadUserUseCase } from 'src/modules/user/application/use-cases/read-user.use-case';
import { CreatePropertyDto, DeletePropertyDto } from 'src/modules/property/domain/dtos';

interface Propiedad {
  id: number;
  noUnidad: string;
  propietario: string;
  memo: string;
}

const $q = useQuasar();
const readPropertyUseCase = applicationContainer.getFromContainer(ReadPropertyUseCase);
const createPropertyUseCase = applicationContainer.getFromContainer(CreatePropertyUseCase);
const deletePropertyUseCase = applicationContainer.getFromContainer(DeletePropertyUseCase);
const readOwnerUseCase = applicationContainer.getFromContainer(ReadUserUseCase);

const propiedades = ref<Propiedad[]>([]);
const propietarios = ref<{ id: number; nombre: string }[]>([]); // Lista de propietarios desde el caso de uso
const selectedProperty = ref<Propiedad | null>(null);
const search = ref('');

const form = reactive<Partial<Propiedad>>({
  id: 0,
  noUnidad: '',
  propietario: '',
  memo: '',
});

// Cargar datos al montar

// Carga de datos
const loadData = async () => {
  $q.loading.show({ message: 'Cargando datos...' });

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

// Guardar propiedad
const onSubmit = async () => {
  if (!form.noUnidad || !form.propietario) {
    $q.notify({ type: 'negative', message: 'Todos los campos son obligatorios.' });
    return;
  }

  try {
    $q.loading.show({ message: 'Guardando propiedad...' });

    await createPropertyUseCase.handle(
      new CreatePropertyDto(
        form.id ?? 0,
        form.noUnidad,
        String(form.propietario),
        form.memo || ''
      )
    );

    await loadData(); // Recargar datos
    $q.notify({ type: 'positive', message: 'Propiedad guardada correctamente.' });
    resetForm();
  } catch {
    $q.notify({ type: 'negative', message: 'Error al guardar la propiedad.' });
  } finally {
    $q.loading.hide();
  }
};

// Eliminar Propiedad
const deleteProperty = async () => {
  if (!selectedProperty.value) return;

  const confirmDelete = confirm(`¿Está seguro que desea eliminar la propiedad "${selectedProperty.value.noUnidad}"?`);
  if (!confirmDelete) return;

  try {
    $q.loading.show({ message: 'Eliminando propiedad...' });

    await deletePropertyUseCase.handle(new DeletePropertyDto(selectedProperty.value.id));

    await loadData(); // Recargar datos
    $q.notify({ type: 'positive', message: 'Propiedad eliminada correctamente.' });
  } catch {
    $q.notify({ type: 'negative', message: 'Error al eliminar la propiedad.' });
  } finally {
    $q.loading.hide();
  }
};

// Manejo del formulario
const loadForEdit = () => {
  if (selectedProperty.value) Object.assign(form, selectedProperty.value);
};

const resetForm = () => {
  form.id = 0;
  form.noUnidad = '';
  form.propietario = '';
  form.memo = '';
};

// Tabla
const filteredProperties = computed(() => 
  propiedades.value.filter(property =>
    Object.values(property).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    )
  )
);

const columns = [
  { name: 'noUnidad', label: 'No Unidad', field: 'noUnidad', sortable: true },
  { name: 'propietario', label: 'Propietario', field: 'propietario', sortable: true },
  { name: 'memo', label: 'Características', field: 'memo', sortable: false },
];

const handleRowClick = (evt: Event, row: Propiedad) => {
  selectedProperty.value = row;
};

</script>

<style scoped>
.selected {
  background-color: var(--q-color-primary-light);
  color: var(--q-color-primary);
}
</style>

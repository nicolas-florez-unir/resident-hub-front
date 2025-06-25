<template>
  <q-page class="custom-page q-pa-lg">
    <div class="column items-center q-gutter-xl">
      <!-- Formulario -->
      <div class="col-12 col-md-6 form-container">
        <q-card class="form-card">
          <q-card-section>
            <div class="text-h5 text-bold text-center q-mb-lg form-title">
              Registro de Propietario
            </div>
            <q-form>
              <div class="q-gutter-md">
                <div class="row items-center">
                  <div class="col-5 label">Nombre:</div>
                  <div class="col-7">
                    <q-input filled dense  v-model="form.firstName" label="Nombre"  />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Apellido:</div>
                  <div class="col-7">
                    <q-input filled dense  v-model="form.lastName" label="Apellido"  />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Email:</div>
                  <div class="col-7">
                    <q-input filled dense  v-model="form.email" label="Email" type="email"  />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Teléfono:</div>
                  <div class="col-7">
                    <q-input filled dense  v-model="form.phone" label="Teléfono" type="tel" />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Contraseña:</div>
                  <div class="col-7">
                    <q-input filled dense  v-model="form.password" label="Contraseña" type="password"  />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Tipo de Identificación:</div>
                  <div class="col-7">
                    <q-input filled dense  v-model="form.tipoDeIdentificacion" label="Tipo de Identificación"  />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Número de Identificación:</div>
                  <div class="col-7">
                    <q-input filled dense  v-model="form.numeroDeIdentificacion" label="Número de Identificación" type="number"  />
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div class="col-5 label">Rol:</div>
                  <div class="col-7">
                    <q-select
                      filled
                      dense                      
                      v-model="form.role"
                      :options="userRoleOptions"
                      label="Seleccione el Rol"
                      class="input"
                      emit-value
                      map-options
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-center q-mt-lg">
                <BotonGuardar 
                class="q-mr-sm" 
                type="submit"
                :disable="!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.tipoDeIdentificacion || !form.numeroDeIdentificacion"
                @click="saveUser"
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
              Propietarios Registrados
            </div>
            <q-table
              :rows="filteredUsers"
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
                      placeholder="Buscar por columna"
                      debounce="300"
                      prepend-inner-icon="search"
                    />
                  </div>
                </div>
              </template>
              <template v-slot:body-cell="props">
                <q-td
                  :props="props"
                  :class="{ selected: props.row === selectedUser }"
                  style="transition: background 0.2s;"
                >
                  {{ props.value }}
                </q-td>
              </template>
            </q-table>
            <div class="row q-mt-md botones-inferiores">
              <BotonEditar
                label="Editar"                                                
                :disable="!selectedUser"
                @click="loadUserForEditing(selectedUser)"
                class="q-mr-sm"
              />
              <BotonEliminar
                label="Eliminar"                                                
                :disable="!selectedUser"
                @click="confirmAndDeleteUser(selectedUser)"
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
import { useAuthStore } from 'common/infrastructure/stores/auth.store';
import { UpdateUserUseCase } from 'user/application/use-cases';
import { DeleteUserUseCase } from 'user/application/use-cases/delete-user.use-case';
import { ReadUserUseCase } from 'user/application/use-cases/read-user.use-case';
import { CreateUserUseCase } from 'user/application/use-cases/create-user.use-case';
import { UpdateUserDto } from 'src/modules/user/domain/dtos/update-user.dto';
import { DeleteUserDto } from 'src/modules/user/domain/dtos/delete-user.dto';
import { CreateUserDto } from 'src/modules/user/domain/dtos/create-user.dto';
import type { UserDto } from 'src/modules/user/domain/dtos';
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import BotonEditar from 'src/modules/common/ui/components/buttons/EditButton.vue';
import BotonEliminar from 'src/modules/common/ui/components/buttons/DeleteButton.vue';
// Cambiado: import type { UserEntity } from 'user/domain/entities/user.entity';
import { UserRole } from 'user/domain/enums';

const $q = useQuasar();
const authStore = useAuthStore();
const updateUserUseCase = applicationContainer.getFromContainer(UpdateUserUseCase);
const deleteUserUseCase = applicationContainer.getFromContainer(DeleteUserUseCase);
const readUserUseCase   = applicationContainer.getFromContainer(ReadUserUseCase);
const createUserUseCase = applicationContainer.getFromContainer(CreateUserUseCase);
const users = ref<UserDto[]>([]); // Usuarios cargados
const selectedUser = ref<UserDto | null>(null); // Usuario seleccionado
const search = ref(''); // Campo de búsqueda

const form = reactive({
  id:  0, // ID del usuario, 0 si es nuevo
  email: '',
  firstName: '',
  lastName: '',
  phone: 0,
  role: '',
  password: '',
  tipoDeIdentificacion: '',
  numeroDeIdentificacion: 0,
});

const userRoleOptions = Object.entries(UserRole).map(([key, value]) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
  value
}));

const saveUser = async () => {
  $q.loading.show({
    message: form.id ? 'Actualizando datos...' : 'Creando usuario...',
  });

  try {
    let userResult;
    if (form.id && form.id !== 0) {
      // Actualizar usuario existente
      userResult = await updateUserUseCase.handle(
        new UpdateUserDto(
          form.id,
          form.email,
          form.firstName,
          form.lastName,
          form.phone,
          form.role,
          form.password,
          form.tipoDeIdentificacion,
          form.numeroDeIdentificacion,
        ),
      );
      $q.notify({
        type: 'positive',
        message: 'Datos actualizados correctamente',
        position: 'bottom-right',
      });
    } else {
      // Crear nuevo usuario
      userResult = await createUserUseCase.handle(
        new CreateUserDto(
          form.id,
          form.email,
          form.firstName,
          form.lastName,
          form.phone,
          form.role,
          form.password,
          form.tipoDeIdentificacion,
          form.numeroDeIdentificacion,
        ),
      );
      $q.notify({
        type: 'positive',
        message: 'Usuario creado correctamente',
        position: 'bottom-right',
      });
    }

    authStore.login(userResult, authStore.accessToken);

  } catch (error) {
    const err = error as Error;
    $q.notify({
      type: 'negative',
      message: 'Error al guardar los datos. Por favor, inténtelo de nuevo: ' + err.message,
      position: 'bottom-right',
    });
  } finally {
    $q.loading.hide();
  }
};

// Filtrar usuarios dinámicamente
const filteredUsers = computed(() =>
  users.value.filter((user) =>
    Object.keys(user).some((key) =>
      String(user[key as keyof UserDto])
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
  )
);

// Generar columnas dinámicamente
/*const columns = computed(() => {
  const userSample = users.value[0] ?? {};
  return Object.keys(userSample).map((key) => ({
    name: key,
    required: true,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    align: 'left' as const,
    field: key,
    sortable: true,
  }));
});*/


// Definir columnas de la tabla de forma estática
const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' as const, sortable: true },
  { name: 'firstName', label: 'Nombre', field: 'firstName', align: 'center' as const, sortable: true },
  { name: 'lastName', label: 'Apellido', field: 'lastName', align: 'center' as const, sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'center' as const, sortable: true },
  { name: 'phone', label: 'Teléfono', field: 'phone', align: 'center' as const, sortable: true },
  { name: 'role', label: 'Rol', field: 'role', align: 'center' as const, sortable: true },
  { name: 'tipoDeIdentificacion', label: 'Tipo de Identificación', field: 'tipoDeIdentificacion', align: 'center' as const, sortable: true },
  { name: 'numeroDeIdentificacion', label: 'Número de Identificación', field: 'numeroDeIdentificacion', align: 'center' as const, sortable: true },
];


// Manejar selección de filas
const handleRowClick = (evt: Event, row: UserDto) => {
  selectedUser.value = row;
};

// Llenar datos del formulario desde el usuario seleccionado
const loadUserForEditing = (user: UserDto | null) => {
  if (!user) return;
  form.firstName = user.firstName;
  form.lastName = user.lastName;
  form.email = user.email;
  form.phone = user.phone;
  form.role = user.role;
  form.tipoDeIdentificacion = user.tipoDeIdentificacion;
  form.numeroDeIdentificacion = user.numeroDeIdentificacion;
  form.id = user.id;
};

// Confirmar y eliminar un usuario
const confirmAndDeleteUser = async (user: UserDto | null) => {
  if (!user) return;

  const confirmed = confirm(`¿Estás seguro de eliminar el usuario con ID ${user.id}?`);
  if (confirmed) {
    try {
      await deleteUserUseCase.handle(
        new DeleteUserDto(user.id)
      );
      users.value = users.value.filter((u) => u.id !== user.id);
      $q.notify({ type: 'positive', message: 'Usuario eliminado correctamente' });
    } catch {
      $q.notify({ type: 'negative', message: 'Error al eliminar usuario' });
    }
  }
};

// Cargar usuarios al montar el componente
onMounted(async () => {
  $q.loading.show({ message: 'Cargando Usuarios...' });
  try {
    const result = await readUserUseCase.handle();
    
    users.value = result.map(user => ({
      id: user.getId(),
      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      phone: user.getPhone(),
      role: user.getRole(),
      password: user.getPassword(),
      tipoDeIdentificacion: user.getTipoDeIdentificacion(),
      numeroDeIdentificacion: user.getNumeroDeIdentificacion(),
    }));
  } catch (error) {
    const err = error as Error;
    $q.notify({
      type: 'negative',
      message: `Error al cargar usuarios: ${err.message}`,
      position: 'bottom-right',
    });
  }
  finally {
    $q.loading.hide();
  }
});

</script>


<style scoped lang="scss">

// Fondo general de la vista
.custom-page {
  background: var(--background-color-view);
  min-height: 100vh;
  padding: 20px;
}

// Contenedor del formulario
.form-container {
  max-width: 800px;
  width: 100%;
}

// Tarjeta del formulario
.form-card {
  background: var(--surface-color);
  border: 2px solid var(--border-color-dark);
  border-radius: var(--card-radius, 8px);
  width: 100%;
  box-shadow: 0 2px 8px 0 rgba(60,60,60,0.04);
}

// Tarjeta de la tabla
.traza-card {
  background: var(--surface-color);
  border: 2px solid var(--border-color-dark);
  border-radius: var(--card-radius, 8px);
  width: 100%;
  margin-left: 20px;
  box-shadow: 0 2px 8px 0 rgba(60,60,60,0.04);
}

// Encabezado de la tabla
.traza-table th {
  background: var(--accent-color);
  color: var(--surface-color);
  font-weight: 600;
  border-top-left-radius: var(--card-radius, 8px);
  border-top-right-radius: var(--card-radius, 8px);
}

// Título de la tabla
.traza-title {
  color: var(--text-primary);
}

// Inputs
.input {

  background: var(--background-color, #f8f9fa);
}

// Etiquetas del formulario
.label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 1rem;
  padding-right: 8px;
  text-align: right;
}

// Fila seleccionada en la tabla
.selected {
  background-color: var(--background-color-hover) !important;
  color: var(--accent-color) !important;
  border-radius: var(--border-radius, 8px);
}

// Botones debajo de la tabla
.botones-inferiores {
  margin-top: 20px;
  margin-inline: 20px; // Espacio horizontal
  display: flex;
  justify-content: flex-end; // Alinear botones a la derecha
  
}
</style>
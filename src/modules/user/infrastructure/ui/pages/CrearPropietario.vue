<template>
  <q-page class="q-pa-md">
    <div class="col-12 col-md-10 col-lg-8">      
      <q-card
        flat
        bordered
        class="row items-center no-shadow full-width full-height q-px-md q-py-sm"
      >
        <q-item-section avatar>
          <q-avatar color="orange">
            {{ authStore.user?.getFullName().charAt(0) }}
          </q-avatar>
        </q-item-section>
        <div class="col overflow-hidden">
          <div class="text-h5 ellipsis">{{ authStore.user?.getFullName() }}</div>
          <div class="text-grey-6 text-h6 ellipsis">
            {{ UserRoleMapper.toString(authStore.user!.getRole()) }}
          </div>
        </div>
      </q-card>

      <q-form @submit="onSubmit" class="q-mt-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.firstName" label="Nombre" />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.lastName" label="Apellido" />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.email" label="Email" type="email" />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.phone" label="Teléfono" type="tel" />
          </div>
          <div class="col-12 col-md-6">
            <q-input filled v-model="form.password" label="Contraseña" type="password" />
          </div>    
          <div class="col-12 col-md-6">
             <q-input filled v-model="form.tipoDeIdentificacion" label="Tipo de Identificación" />
          </div>         
          <div class="col-12 col-md-6">
             <q-input filled v-model="form.numeroDeIdentificacion" label="Número de Identificación" type="number" />
          </div>          
        </div>

        <q-card-actions right as const>
          <BotonGuardar />
        </q-card-actions>
      </q-form>

      <!-- Tabla de usuarios -->
      <div class="q-mt-md">
        <q-table
          flat
          bordered
          :rows="filteredUsers"
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
              placeholder="Buscar por columna"
              class="q-mb-md"
            />
          </template>

          <!-- Resaltar fila seleccionada -->
          <template v-slot:body-cell="props">
            <q-td
              :props="props"
              :class="{ selected: props.row === selectedUser }"
            >
              {{ props.value }}
            </q-td>
          </template>
        </q-table>

        <!-- Acciones -->
        <q-btn
          outline
          color="primary"
          label="Editar usuario"
          icon="edit"
          class="q-mt-md"
          :disable="!selectedUser"
          @click="loadUserForEditing(selectedUser as UserEntity | null)"
        />
        <q-btn
          outline
          color="negative"
          label="Eliminar usuario"
          icon="delete"
          class="q-mt-md"
          :disable="!selectedUser"
          @click="confirmAndDeleteUser(selectedUser as UserEntity | null)"
        />
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
import { UpdateUserDto } from 'user/domain/dtos/update-user.dto';
import { DeleteUserDto } from 'src/modules/user/domain/dtos/delete-user.dto';
import { UserRoleMapper } from '../../mappers/user-role.mapper';
import BotonGuardar from 'src/modules/common/ui/components/buttons/BotonGuardar.vue';
import type { UserEntity } from 'user/domain/entities/user.entity';
import { UserRole } from 'user/domain/enums';


const $q = useQuasar();
const authStore = useAuthStore();
const updateUserUseCase = applicationContainer.getFromContainer(UpdateUserUseCase);
const deleteUserUseCase = applicationContainer.getFromContainer(DeleteUserUseCase);
const readUserUseCase   = applicationContainer.getFromContainer(ReadUserUseCase);
const users = ref<UserEntity[]>([]); // Usuarios cargados
const selectedUser = ref<UserEntity | null>(null); // Usuario seleccionado
const search = ref(''); // Campo de búsqueda
// Repositorio de usuarios

const form = reactive({
  email: authStore.user?.getEmail(),
  firstName: authStore.user?.getFirstName(),
  lastName: authStore.user?.getLastName(),
  phone: authStore.user?.getPhone(),
  role: authStore.user?.getRole(),
  password: authStore.user?.getPassword(),
  tipoDeIdentificacion: authStore.user?.getTipoDeIdentificacion(),
  numeroDeIdentificacion: authStore.user?.getNumeroDeIdentificacion(),
});


const onSubmit = async () => {
  $q.loading.show({
    message: 'Actualizando datos...',
  });

  try {
    const updatedUser = await updateUserUseCase.handle(
      new UpdateUserDto(
          authStore.user?.getId() ?? 0,
          form.email ?? '',
          form.firstName ?? '',
          form.lastName ?? '',
          form.phone ?? '',
          form.role ?? '',
          form.password ?? '',
          form.tipoDeIdentificacion ?? '',
          form.numeroDeIdentificacion ?? 0, 
      ),
    );

    authStore.login(updatedUser, authStore.accessToken);

    $q.notify({
      type: 'positive',
      message: 'Datos actualizados correctamente',
      position: 'bottom-right',
    });
  } catch (error) {
    const err = error as Error;
    $q.notify({
      type: 'negative',
      message: 'Error al actualizar los datos. Por favor, inténtelo de nuevo:'+err.message,
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
      String(user[key as keyof UserEntity])
        .toLowerCase()
        .includes(search.value.toLowerCase())
    )
  )
);

// Generar columnas dinámicamente
const columns = computed(() => {
  // Validar si hay elementos en users.value
  const userSample = users.value[0] ?? {}; // Usar un objeto vacío como fallback

  return Object.keys(userSample).map((key) => ({
    name: key,
    required: true,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    align: 'left' as const,
    field: key,
    sortable: true,
  }));
});

// Manejar selección de filas
const handleRowClick = (evt: Event, row: UserEntity) => {
  selectedUser.value = row;
};

// Llenar datos del formulario desde el usuario seleccionado
const loadUserForEditing = (user: UserEntity | null) => {
  if (!user) return;
  form.firstName = user.getFirstName();
  form.lastName = user.getLastName();
  form.email = user.getEmail();
  form.phone = user.getPhone();
  form.role = user.getRole();
  form.tipoDeIdentificacion = user.getTipoDeIdentificacion();
  form.numeroDeIdentificacion = user.getNumeroDeIdentificacion();
};


// Confirmar y eliminar un usuario
const confirmAndDeleteUser = async (user: UserEntity | null) => {
  if (!user) return;

  const confirmed = confirm(`¿Estás seguro de eliminar el usuario con ID ${user.getId()}?`);
  if (confirmed) {
    try {
      await deleteUserUseCase.handle(
        new DeleteUserDto(user.getId())
      );
      users.value = users.value.filter((u) => u.getId() !== user.getId());
      $q.notify({ type: 'positive', message: 'Usuario eliminado correctamente' });
    } catch {
      $q.notify({ type: 'negative', message: 'Error al eliminar usuario' });
    }
  }
};


// Datos de ejemplo para la tabla de prueba se debe quitar cuando se vaya a hacer el despliegue
const mockUsers = [
  {
    getId: () => 1,
    getEmail: () => "usuario@prueba.com",
    getFirstName: () => "Usuario",
    getLastName: () => "Prueba",
    getPhone: () => "123456789",
    getRole: () => UserRole.Administrator,
    getPassword: () => "password123",    
    getTipoDeIdentificacion: () => "Cédula",
    getNumeroDeIdentificacion: () => 123456789,    
  },
  {
    getId: () => 2,
    getEmail: () => "otro@prueba.com",
    getFirstName: () => "Otro",
    getLastName: () => "Usuario",
    getPhone: () => "987654321",
    getRole: () => UserRole.HouseOwner,
    getPassword: () => "password456",    
    getTipoDeIdentificacion: () => "Pasaporte",
    getNumeroDeIdentificacion: () => 987654321,    
  }
] as unknown as UserEntity[];;

// Cargar usuarios al montar el componente
onMounted(async () => {
  try {
    const result = await readUserUseCase.handle();
    users.value = result;
    // Si no hay usuarios reales, usa los mock
    if (!users.value.length) {
      users.value = mockUsers;
    }
  } catch (error) {
    // Si hay error cargando usuarios reales, usa los mock
    users.value = mockUsers;
    const err = error as Error;
    $q.notify({
      type: 'negative',
      message: `Error al cargar usuarios: ${err.message}`,
      position: 'bottom-right',
    });
  }
});

</script>
<style scoped>
.selected {
  background-color: var(--q-color-primary-light);
  color: var(--q-color-primary);
}
</style>
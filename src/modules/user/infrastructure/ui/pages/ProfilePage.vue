<template>
  <q-page class="q-pa-md">
    <div class="col-12 col-md-10 col-lg-8">
      <div class="text-h3 q-mb-md">Mi perfil</div>
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
        </div>

        <q-card-actions align="right">
          <q-btn label="Guardar" icon="save" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useQuasar } from 'quasar';
import { applicationContainer } from 'src/boot';
import { useAuthStore } from 'common/infrastructure/stores/auth.store';
import { UpdateUserUseCase } from 'user/application/use-cases';
import { UpdateUserDto } from 'user/domain/dtos';
import { UserRoleMapper } from '../../mappers/user-role.mapper';

const $q = useQuasar();
const authStore = useAuthStore();
const updateUserUseCase = applicationContainer.getFromContainer(UpdateUserUseCase);

const form = reactive({
  email: authStore.user?.getEmail(),
  firstName: authStore.user?.getFirstName(),
  lastName: authStore.user?.getLastName(),
  phone: authStore.user?.getPhone(),
  role: authStore.user?.getRole(),
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
      ),
    );

    authStore.login(updatedUser, authStore.accessToken);

    $q.notify({
      type: 'positive',
      message: 'Datos actualizados correctamente',
      position: 'bottom-right',
    });
  } catch (error) {
    console.log(error);
  } finally {
    $q.loading.hide();
  }
};
</script>

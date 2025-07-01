<template>
  <!-- Contenedor principal con fondo oscuro, ocupando toda la pantalla -->
  <div class="fullscreen q-pa-xl flex flex-center">
    <!-- Contenedor con dos columnas (izquierda: características, derecha: formulario) -->
    <div
      class="container row items-start justify-center q-col-gutter-xl"
      style="max-width: 1200px; width: 100%"
    >
      <!-- Columna Izquierda: Descripción de producto/servicio -->
      <div class="col-12 col-md-6 q-mb-md">
        <div class="text-h4 q-mb-md">ResidentHub</div>

        <!-- Lista de características -->
        <q-list separator class="rounded-borders">
          <q-item>
            <q-item-section>
              <div class="text-subtitle1 text-bold">Sistema en la nube</div>
              <div class="text-body2">
                Accede a tu información desde cualquier lugar y en cualquier momento, con la
                seguridad y confiabilidad de un sistema en la nube.
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-subtitle1 text-bold">Soporte de pagos</div>
              <div class="text-body2">
                Maneja los soporte de pagos de tu comunidad de forma rápida y sencilla, con una
                interfaz intuitiva y fácil de usar.
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-subtitle1 text-bold">Administración de multas</div>
              <div class="text-body2">
                Administra las multas de tu comunidad de manera eficiente, con herramientas que
                facilitan el seguimiento y la gestión de sanciones.
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <div class="text-subtitle1 text-bold">Administración de viviendas</div>
              <div class="text-body2">
                Lleva un control detallado de las viviendas de tu comunidad, con información
                actualizada y accesible para todos los administradores.
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Columna Derecha: Formulario de Inicio de Sesión -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-lg">
          <!-- Sección de cabecera con título -->
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="text-h5 q-mb-lg">Inicia sesión</div>
              <q-input
                v-model="form.email"
                label="Email"
                type="email"
                outlined
                :rules="[
                  (val) => !!val || 'Email es requerido',
                  (val) => /.+@.+\..+/.test(val) || 'Email inválido',
                ]"
                lazy-rules
              />
              <q-input
                v-model="form.password"
                label="Contraseña"
                outlined
                type="password"
                :rules="[(val) => !!val || 'Contraseña es requerida']"
                lazy-rules
              />
              <div class="row justify-end">
                <q-btn type="reset" label="Reset" color="secondary" flat />
                <q-btn type="submit" label="Login" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { PrivateRoutesName } from 'router/private-routes';
import { applicationContainer } from 'src/boot/application-container';
import { LoginUseCase } from 'auth/login/application/use-cases';
import { useAuthStore } from 'common/infrastructure/stores/auth.store';
import { UserRole } from 'user/domain/enums';
import { UnauthorizedException } from '../../../domain/exceptions';

const navigationRoles = {
  [UserRole.Administrator]: PrivateRoutesName.Admin,
  [UserRole.HouseOwner]: PrivateRoutesName.OwnerHomePage,
};

const router = useRouter();
const store = useAuthStore();
const $q = useQuasar();
const errorMessage = ref('');

const loginUseCase = applicationContainer.getFromContainer(LoginUseCase);

const form = reactive({
  email: '',
  password: '',
});

const onSubmit = async () => {
  $q.loading.show();
  errorMessage.value = '';
  try {
    const { user, accessToken } = await loginUseCase.handle(form.email, form.password);
    store.login(user, accessToken);

    // Redirigir al usuario según su rol
    const userRole = user.getRole();
    const redirectRoute = navigationRoles[userRole] || 'unknown-error';
    await router.replace({ name: redirectRoute });
  } catch (error) {
    if (error instanceof UnauthorizedException) {
      $q.notify({
        type: 'negative',
        message: 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.',
      });
      return;
    }

    $q.notify({
      type: 'negative',
      message: 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.',
    });
  } finally {
    $q.loading.hide();
  }
};
</script>

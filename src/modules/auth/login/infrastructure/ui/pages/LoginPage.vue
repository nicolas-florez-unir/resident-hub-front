<template>
  <q-layout view="lHh Lpr lFf">      
    <q-page-container>
    <q-page class="custom-page flex flex-center">
      <div class="login-tittle"> <h1 class="login-tittle-h1">ResidentHub</h1> </div>"
      <q-card class="login-card">
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="welcome-text text-center">Bienvenido</div>
            <q-input class="input-text" v-model="form.email" label="Email" type="email" outlined />
            <q-input class="input-text" v-model="form.password" label="Password" outlined type="password" />
            <div v-if="errorMessage" class="text-negative q-mb-md">{{ errorMessage }}</div>
            <div class="row justify-end">
              <q-btn type="submit" label="Login" class="login-btn" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { applicationContainer } from 'src/boot/application-container';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { LoginUseCase } from 'auth/login/application/use-cases';
import { useAuthStore } from 'common/infrastructure/stores/auth.store';
import { UserRole } from 'user/domain/enums';
import { ref } from 'vue';

const router = useRouter();
const store = useAuthStore();
const $q = useQuasar();
const errorMessage = ref("");
import { PrivateRoutesName } from 'router/private-routes';

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
    if (user.getRole() === UserRole.Administrator) {
      await router.replace({ name: PrivateRoutesName.PageInicioAdmin });
    } else if (user.getRole() === UserRole.HouseOwner) {
      await router.replace({ name: PrivateRoutesName.PageInicioPropietario });
    } else {
      await router.replace({ name: PrivateRoutesName.PageInicioAdmin });
    }
  } catch (error: unknown) {
    // Validación sencilla y segura
    let status = undefined;
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as { response?: { status?: number } }).response === 'object' &&
      (error as { response?: { status?: number } }).response?.status
    ) {
      status = (error as { response: { status: number } }).response.status;
    }
    if (status === 401) {
      errorMessage.value = 'Login o contraseña incorrectos.';
    } else {
      errorMessage.value = 'Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
    }
    console.error('Login error:', error);
  } finally {
    $q.loading.hide();
  }
};


</script>

<style scoped>
.custom-page {
  background-color: var(--background-color);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-title {
  margin-bottom: 20px;
  text-align: center;
}
.login-title-h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: bold;
}
.login-card {
  background-color: var(--background-color-cards);
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color-dark);
}
.welcome-text {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
.login-btn {
  background-color: var(--primary-color);
  color: #fff;
  width: 100%;
}
.login-btn:hover {
  background-color: var(--secondary-color);
}
.input-text :deep(.q-field__control){
  background-color: var(--background-color)!important;

  transition: box-shadow 0.2s, border-color 0.2s, background-color 0.2s;
  border-radius: 6px;
  border: 1px solid var(--border-color, #e0e0e0);
  box-shadow: none;
}
.input-text :deep(.q-field__control:hover),
.input-text :deep(.q-field__control:focus-within) {
  box-shadow: 0 0 0 2px var(--primary-color, #1976d2);
  border-color: var(--primary-color, #1976d2);
  background-color: var(--background-color) !important;
}
.input-text :deep(input) {
  background: transparent !important;
  color: var(--text-primary);
  box-shadow: none;
}

@media (max-width: 600px) {
  .login-card {
    width: 90%;
  }
}
</style>
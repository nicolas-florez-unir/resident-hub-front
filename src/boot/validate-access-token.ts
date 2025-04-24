import { defineBoot } from '#q-app/wrappers';
import { ValidateAccessToken } from 'src/modules/auth/login/application/use-cases';
import { applicationContainer } from './application-container';
import { useAuthStore } from 'src/modules/common/infrastructure/stores/auth.store';
import { applicationStorage } from './application-storage';

export default defineBoot(async ({ router }) => {
  if (applicationStorage.getItem('accessToken') === null) {
    await router.replace({ name: 'login' });
    return;
  }

  const authStore = useAuthStore();
  const useCase = applicationContainer.getFromContainer(ValidateAccessToken);
  try {
    const data = await useCase.handle();
    authStore.login(data.user, data.accessToken);
  } catch {
    console.log('Error validation access token');
    authStore.logout();
    await router.replace({ name: 'login' });
  }
});

import { applicationContainer } from 'src/boot';
import { Router } from 'src/router';
import { RefreshAccessTokenUseCase } from 'src/modules/auth/login/application/use-cases/refresh-access-token.use-case';
import { useAuthStore } from '../../../infrastructure/stores/auth.store';

export async function handleRefreshTokenFlow(): Promise<string | null> {
  const authStore = useAuthStore();
  const refreshAccessTokenUseCase =
    applicationContainer.getFromContainer(RefreshAccessTokenUseCase);

  try {
    const { accessToken, user } = await refreshAccessTokenUseCase.handle();
    authStore.login(user, accessToken);
    return accessToken;
  } catch {
    authStore.logout();
    await Router.replace({ name: 'login' });
    return null;
  }
}

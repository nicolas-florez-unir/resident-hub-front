import { defineStore } from 'pinia';
import { applicationStorage } from 'src/boot';
import type { UserEntity } from 'src/modules/user/domain/entities';

type StoreState = {
  isAuthenticated: boolean | null;
  user: UserEntity | null;
  accessToken: string;
};

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      accessToken: '',
      user: null,
      isAuthenticated: false,
    }) as StoreState,

  actions: {
    login(newUser: UserEntity, newToken: string) {
      this.isAuthenticated = true;
      this.user = newUser;
      this.accessToken = newToken;
      applicationStorage.setItem('accessToken', newToken);
    },

    logout(): void {
      this.isAuthenticated = false;
      this.user = null;
      this.accessToken = '';
      applicationStorage.removeItem('accessToken');
    },
  },
});

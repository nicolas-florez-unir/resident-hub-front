<template>
  <q-layout view="lHh Lpr lff">
    <home-header @menu-click="toggleLeftDrawer" />

    <q-drawer elevated v-model="leftDrawerOpen" show-if-above :width="300" :breakpoint="800">
      <q-scroll-area style="height: calc(100% - 80px); margin-bottom: 80px">
        <q-list class="flex column q-pa-md" style="gap: 12px">
          <q-img
            src="/banner.png"
            spinner-color="white"
            class="company-icon full-width full-height rounded-borders shadow-2"
            fit="cover"
          />
          <q-item
            clickable
            v-ripple
            v-for="item in filteredOptions"
            :key="item.route"
            :to="{ name: item.route }"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section> {{ item.label }} </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" color="red" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="absolute-bottom" style="height: 80px">
        <q-separator />
        <q-card class="row items-center no-shadow full-width full-height q-px-md">
          <q-item-section avatar>
            <q-avatar color="orange">
              {{ authStore.user?.getFullName().charAt(0) }}
            </q-avatar>
          </q-item-section>
          <div class="col overflow-hidden">
            <div class="text-weight-bold ellipsis">{{ authStore.user?.getFullName() }}</div>
            <div class="text-grey-6 text-subtitle2 ellipsis">{{ authStore.user?.getEmail() }}</div>
          </div>
          <q-space />
        </q-card>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'common/infrastructure/stores/auth.store';
import { PublicRoutesName } from 'router/auth-routes';
import { PrivateRoutesName } from 'router/private-routes';
import { UserRole } from 'user/domain/enums';
import HomeHeader from '../components/HomeHeader.vue';

const options = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    route: PrivateRoutesName.Dashboard,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'person',
    label: 'Perfil',
    route: PrivateRoutesName.Profile,
  },
  {
    icon: 'room_preferences',
    label: 'Condominio',
    route: PrivateRoutesName.Condominium,
    roles: [UserRole.Administrator],
  },
];

const leftDrawerOpen = ref(true);
const authStore = useAuthStore();
const $router = useRouter();

const filteredOptions = options.filter((option) => {
  if (!authStore.user) return false;

  if (option.roles) {
    return option.roles.includes(authStore.user.getRole());
  }

  return true;
});

$router.replace({ name: filteredOptions[0]?.route }).catch(() => {});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  authStore.logout();
  $router.push(PublicRoutesName.Login).catch(() => {});
}
</script>

<style lang="css" scoped>
.body--dark .q-item.q-router-link--active,
.q-item--active {
  background-color: var(--q-primary);
  color: white;
}

.body--light .q-item.q-router-link--active,
.q-item--active {
  background-color: var(--q-primary);
  color: white;
}

.q-drawer-container .q-drawer .q-list .q-item {
  border-radius: 12px;
}

.company-icon {
  height: 80px !important;
}
</style>

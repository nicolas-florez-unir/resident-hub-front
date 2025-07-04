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
            v-for="item in filteredOptions.filter((opt) => !!opt.route)"
            :key="item.route ?? item.label"
            clickable
            v-ripple
            :to="{ name: item.route }"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section> {{ item.label }} </q-item-section>
          </q-item>

          <q-item
            v-if="filteredOptions.some((opt) => opt.action === 'logout')"
            clickable
            v-ripple
            @click="logout"
            key="logout"
          >
            <q-item-section avatar>
              <q-icon name="logout" color="red" />
            </q-item-section>
            <q-item-section> Cerrar sesión </q-item-section>
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
  //Opciones del administrador
  {
    icon: 'home',
    label: 'Inicio',
    route: PrivateRoutesName.Admin,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'apartment',
    label: 'Condominio',
    route: PrivateRoutesName.CondominiumPage,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'person_add',
    label: 'Gestión de propietarios',
    route: PrivateRoutesName.CreateOwner,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'home_work',
    label: 'Administrar propiedades',
    route: PrivateRoutesName.RegisterProperty,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'gavel',
    label: 'Generar multas',
    route: PrivateRoutesName.GenerateFines,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'description',
    label: 'Documentos administrativos',
    route: PrivateRoutesName.AdministrativeDocuments,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'question_answer',
    label: 'Visualizar PQRS',
    route: PrivateRoutesName.ViewRequests,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'event',
    label: 'Agendar Reuniones',
    route: PrivateRoutesName.ScheduleMeetings,
    roles: [UserRole.Administrator],
  },

  //Opciones del propietario
  {
    icon: 'home',
    label: 'Inicio',
    route: PrivateRoutesName.OwnerHomePage,
    roles: [UserRole.HouseOwner],
  },

  {
    icon: 'person',
    label: 'Perfil',
    route: PrivateRoutesName.OwnerProfile,
    roles: [UserRole.HouseOwner],
  },

  {
    icon: 'description',
    label: 'Documentos',
    route: PrivateRoutesName.OwnerDocuments,
    roles: [UserRole.HouseOwner],
  },

  {
    icon: 'gavel',
    label: 'Multas',
    route: PrivateRoutesName.OwnerFines,
    roles: [UserRole.HouseOwner],
  },

  {
    icon: 'event',
    label: 'Reuniones',
    route: PrivateRoutesName.OwnerMeetings,
    roles: [UserRole.HouseOwner],
  },

  {
    icon: 'question_answer',
    label: 'PQRS',
    route: PrivateRoutesName.OwnerRequests,
    roles: [UserRole.HouseOwner],
  },

  //Opcion cumún para todos los usuarios
  {
    icon: 'logout',
    label: 'Cerrar sesión',
    action: 'logout',
    color: 'red',
    roles: [UserRole.Administrator, UserRole.HouseOwner],
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

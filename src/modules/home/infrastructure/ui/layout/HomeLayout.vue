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
          v-for="item in filteredOptions.filter(opt => !!opt.route)"
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
          v-if="filteredOptions.some(opt => opt.action === 'logout')"
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
    label: 'Inicio Admin',
    route: PrivateRoutesName.PageInicioAdmin,
    roles: [UserRole.Administrator],
  },    
  {
    icon: 'person_add',
    label: 'Creación de propietarios',
    route: PrivateRoutesName.CrearPropietario,
    roles: [UserRole.Administrator],    
  },
  {
    icon: 'home_work',
    label: 'Registrar propiedades',
    route: PrivateRoutesName.RegistrarPropiedad,
    roles: [UserRole.Administrator],    
  },
  {
    icon: 'description',
    label: 'Documentos administrativos',
    route: PrivateRoutesName.DocumentosAdministrativos,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'gavel',
    label: 'Generar multas',
    route: PrivateRoutesName.GenerarMultas,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'question_answer',
    label: 'Visualizar PQRS',
    route: PrivateRoutesName.VisualizarPQRS,
    roles: [UserRole.Administrator],
  },
  {
    icon: 'event',
    label: 'Agendar Reuniones',
    route: PrivateRoutesName.AgendarReuniones,
    roles: [UserRole.Administrator],
  },

  //Opciones del propietario
  {
    icon: 'home',
    label: 'Home / Inicio',
    route: PrivateRoutesName.PageInicioPropietario,
    roles: [UserRole.HouseOwner],
  },    

  {
    icon: 'person',
    label: 'Perfil',
    route: PrivateRoutesName.PerfilPropietario,
    roles: [UserRole.HouseOwner],
  },    
  
  {
    icon: 'description',
    label: 'Documentos',
    route: PrivateRoutesName.DocumentosPropietario,
    roles: [UserRole.HouseOwner],
  },    
  
  {
    icon: 'gavel',
    label: 'Multas',
    route: PrivateRoutesName.MultasPropietario,
    roles: [UserRole.HouseOwner],
  },    
  
  {
    icon: 'event',
    label: 'Reuniones',
    route: PrivateRoutesName.ReunionesPropietario,
    roles: [UserRole.HouseOwner],
  },    
  
  {
    icon: 'question_answer',
    label: 'PQRS',
    route: PrivateRoutesName.PQRSPropietario,
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


// Simulación de un usuario autenticado para pruebas - OJO SE DEBE QUITAR ESTE FRAGMENTO AL DESPLEJAR LA PAGINA
authStore.user = {
  getId: () => 1, // Devuelve un ID simulado
  getEmail: () => "usuario@prueba.com", // Correo simulado
  getFirstName: () => "Usuario", // Nombre simulado
  getLastName: () => "Prueba", // Apellido simulado
  getPhone: () => "123456789", // Teléfono simulado
  getRole: () => UserRole.HouseOwner, // Cambia entre HouseOwner y Administrator
  getFullName: function () {
    return `${this.getFirstName()} ${this.getLastName()}`; // Construcción del nombre completo
  },
};
// Simulación de un usuario autenticado para pruebas - OJO SE DEBE QUITAR ESTE FRAGMENTO AL DESPLEJAR LA PAGINA

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

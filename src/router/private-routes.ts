import type { RouteRecordRaw } from 'vue-router';
import HomeLayout from 'src/modules/home/infrastructure/ui/layout/HomeLayout.vue';
import PageInicioAdmin from 'src/modules/dashboard/infrastructure/ui/pages/PageInicioAdmin.vue';
import CrearPropietario from 'src/modules/user/infrastructure/ui/pages/CrearPropietario.vue';
import RegistrarPropiedad from 'src/modules/property/infraestructure/ui/pages/RegistrarPropiedad.vue';
import DocumentosAdministrativos from 'src/modules/dashboard/infrastructure/ui/pages/DocumentosAdministrativos.vue';
import GenerarMultas  from 'src/modules/fines/infrastructure/ui/pages/GenerarMultas.vue';
import VisualizarPQRS from 'src/modules/dashboard/infrastructure/ui/pages/VisualizarPQRS.vue';
import AgendarReuniones from 'src/modules/dashboard/infrastructure/ui/pages/AgendarReuniones.vue';

//Rutas del propietario
import PageInicioPropietario from 'src/modules/dashboard/infrastructure/ui/pages/PageInicioPropietario.vue';
import PerfilPropietario from 'src/modules/dashboard/infrastructure/ui/pages/PerfilPropietario.vue';
import DocumentosPropietario from 'src/modules/dashboard/infrastructure/ui/pages/DocumentosPropietario.vue';
import MultasPropietario from 'src/modules/dashboard/infrastructure/ui/pages/MultasPropietario.vue';
import PQRSPropietario from 'src/modules/dashboard/infrastructure/ui/pages/PqrsPropietario.vue';
import ReunionesPropietario from 'src/modules/dashboard/infrastructure/ui/pages/ReunionesPropietario.vue';
import CondominiumPage from 'src/modules/condominium/infrastructure/ui/pages/CondominiumPage.vue';



export enum PrivateRoutesName {
  //Vistas del propietario
  PageInicioPropietario = 'PageInicioPropietario',
  PerfilPropietario = 'PerfilPropietario',
  DocumentosPropietario = 'DocumentosPropietario',
  MultasPropietario = 'MultasPropietario',
  ReunionesPropietario = 'ReunionesPropietario',
  PQRSPropietario = 'PQRSPropietario',
  //Vistas del administrador
  PageInicioAdmin = 'PageInicioAdmin',  
  CrearPropietario = 'CrearPropietario',
  RegistrarPropiedad = 'RegistrarPropiedad',
  DocumentosAdministrativos = 'DocumentosAdministrativos',
  GenerarMultas = 'GenerarMultas',
  VisualizarPQRS = 'VisualizarPQRS',
  AgendarReuniones = 'AgendarReuniones',
  CondominiumPage = 'CondominiumPage',
}

const privateRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: HomeLayout,
    children: [
      { path: '', redirect: { name: PrivateRoutesName.PageInicioAdmin } },
      { path: 'inicio-admin', name: PrivateRoutesName.PageInicioAdmin, component: PageInicioAdmin },
      { path: 'crear-propietario', name: PrivateRoutesName.CrearPropietario, component: CrearPropietario },
      { path: 'registrar-propiedad', name: PrivateRoutesName.RegistrarPropiedad, component: RegistrarPropiedad },
      { path: 'documentos-administrativos', name: PrivateRoutesName.DocumentosAdministrativos, component: DocumentosAdministrativos },
      { path: 'generar-multas', name: PrivateRoutesName.GenerarMultas, component: GenerarMultas },
      { path: 'visualizar-pqrs', name: PrivateRoutesName.VisualizarPQRS, component: VisualizarPQRS }, //esta
      { path: 'agendar-reuniones', name: PrivateRoutesName.AgendarReuniones, component: AgendarReuniones },//esta
      { path: 'gestionar-condominio', name: PrivateRoutesName.CondominiumPage, component: CondominiumPage }, //esta
      //Rutas del propietario
      { path: 'inicio-propietario', name: PrivateRoutesName.PageInicioPropietario, component: PageInicioPropietario },      
      { path: 'perfil-propietario', name: PrivateRoutesName.PerfilPropietario, component: PerfilPropietario },
      { path: 'documentos-propietario', name: PrivateRoutesName.DocumentosPropietario, component: DocumentosPropietario },
      { path: 'multas-propietario', name: PrivateRoutesName.MultasPropietario, component: MultasPropietario },
      { path: 'reuniones-propietario', name: PrivateRoutesName.ReunionesPropietario, component: ReunionesPropietario },
      { path: 'pqrs-propietario', name: PrivateRoutesName.PQRSPropietario, component: PQRSPropietario },
    ],
  },
];

export default privateRoutes;

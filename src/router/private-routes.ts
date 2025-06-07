import type { RouteRecordRaw } from 'vue-router';
import HomeLayout from 'src/modules/home/infrastructure/ui/layout/HomeLayout.vue';
import PageInicioAdmin from 'src/modules/dashboard/infrastructure/ui/pages/PageInicioAdmin.vue';
import PageInicioPropietario from 'src/modules/dashboard/infrastructure/ui/pages/PageInicioPropietario.vue';
import CrearPropietario from 'src/modules/dashboard/infrastructure/ui/pages/CrearPropietario.vue';
import RegistrarPropiedad from 'src/modules/dashboard/infrastructure/ui/pages/RegistrarPropiedad.vue';
import DocumentosAdministrativos from 'src/modules/dashboard/infrastructure/ui/pages/DocumentosAdministrativos.vue';
import GenerarMultas from 'src/modules/dashboard/infrastructure/ui/pages/GenerarMultas.vue';
import VisualizarPQRS from 'src/modules/dashboard/infrastructure/ui/pages/VisualizarPQRS.vue';
import AgendarReuniones from 'src/modules/dashboard/infrastructure/ui/pages/AgendarReuniones.vue';



export enum PrivateRoutesName {
  PageInicioAdmin = 'PageInicioAdmin',
  PageInicioPropietario = 'PageInicioPropietario',
  CrearPropietario = 'CrearPropietario',
  RegistrarPropiedad = 'RegistrarPropiedad',
  DocumentosAdministrativos = 'DocumentosAdministrativos',
  GenerarMultas = 'GenerarMultas',
  VisualizarPQRS = 'VisualizarPQRS',
  AgendarReuniones = 'AgendarReuniones',
}

const privateRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: HomeLayout,
    children: [
      { path: '', redirect: { name: PrivateRoutesName.PageInicioAdmin } },
      { path: 'inicio-admin', name: PrivateRoutesName.PageInicioAdmin, component: PageInicioAdmin },
      { path: 'inicio-propietario', name: PrivateRoutesName.PageInicioPropietario, component: PageInicioPropietario },
      { path: 'crear-propietario', name: PrivateRoutesName.CrearPropietario, component: CrearPropietario },
      { path: 'registrar-propiedad', name: PrivateRoutesName.RegistrarPropiedad, component: RegistrarPropiedad },
      { path: 'documentos-administrativos', name: PrivateRoutesName.DocumentosAdministrativos, component: DocumentosAdministrativos },
      { path: 'generar-multas', name: PrivateRoutesName.GenerarMultas, component: GenerarMultas },
      { path: 'visualizar-pqrs', name: PrivateRoutesName.VisualizarPQRS, component: VisualizarPQRS },
      { path: 'agendar-reuniones', name: PrivateRoutesName.AgendarReuniones, component: AgendarReuniones },
    ],
  },
];

export default privateRoutes;

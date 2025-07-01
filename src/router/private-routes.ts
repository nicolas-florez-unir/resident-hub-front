import type { RouteRecordRaw } from 'vue-router';
import HomeLayout from 'src/modules/home/infrastructure/ui/layout/HomeLayout.vue';
import PageAdmin from 'src/modules/dashboard/infrastructure/ui/pages/PageAdmin.vue';
import AdministrativeDocuments from 'src/modules/dashboard/infrastructure/ui/pages/AdministrativeDocuments.vue';
import ViewRequests from 'src/modules/dashboard/infrastructure/ui/pages/ViewRequests.vue';
import ScheduleMeetings from 'src/modules/dashboard/infrastructure/ui/pages/ScheduleMeetings.vue';

//Rutas del propietario
import OwnerHomePage from 'src/modules/dashboard/infrastructure/ui/pages/OwnerHomePage.vue';
import OwnerProfile from 'src/modules/dashboard/infrastructure/ui/pages/OwnerProfile.vue';
import OwnerDocuments from 'src/modules/dashboard/infrastructure/ui/pages/OwnerDocuments.vue';
import OwnerFines from 'src/modules/dashboard/infrastructure/ui/pages/OwnerFines.vue';
import OwnerRequests from 'src/modules/dashboard/infrastructure/ui/pages/OwnerRequests.vue';
import OwnerMeetings from 'src/modules/dashboard/infrastructure/ui/pages/OwnerMeetings.vue';
import CondominiumPage from 'src/modules/condominium/infrastructure/ui/pages/CondominiumPage.vue';
import HouseOwnersPage from 'src/modules/house-owners/infrastructure/ui/pages/HouseOwnersPage.vue';
import HousesPages from 'src/modules/house/infrastructure/ui/pages/HousesPages.vue';
import { UserRole } from 'src/modules/user/domain/enums';
import FinesPage from 'src/modules/fines/infrastructure/ui/pages/FinesPage.vue';

export enum PrivateRoutesName {
  //Vistas del propietario
  OwnerHomePage = 'OwnerHomePage',
  OwnerProfile = 'OwnerProfile',
  OwnerDocuments = 'OwnerDocuments',
  OwnerFines = 'OwnerFines',
  OwnerMeetings = 'OwnerMeetings',
  OwnerRequests = 'OwnerRequests',
  //Vistas del administrador
  Admin = 'Admin',
  CreateOwner = 'CreateOwner',
  RegisterProperty = 'RegisterProperty',
  AdministrativeDocuments = 'AdministrativeDocuments',
  GenerateFines = 'GenerateFines',
  ViewRequests = 'ViewRequests',
  ScheduleMeetings = 'ScheduleMeetings',
  CondominiumPage = 'CondominiumPage',
}

const privateRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {
        path: '',
        redirect: { name: PrivateRoutesName.Admin },
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'admin',
        name: PrivateRoutesName.Admin,
        component: PageAdmin,
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'house-owner',
        name: PrivateRoutesName.CreateOwner,
        component: HouseOwnersPage,
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'house',
        name: PrivateRoutesName.RegisterProperty,
        component: HousesPages,
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'documents',
        name: PrivateRoutesName.AdministrativeDocuments,
        component: AdministrativeDocuments,
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'fines',
        name: PrivateRoutesName.GenerateFines,
        component: FinesPage,
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'pqrs',
        name: PrivateRoutesName.ViewRequests,
        component: ViewRequests,
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'meets',
        name: PrivateRoutesName.ScheduleMeetings,
        component: ScheduleMeetings,
        meta: { roles: [UserRole.Administrator] },
      },
      {
        path: 'condominium',
        name: PrivateRoutesName.CondominiumPage,
        component: CondominiumPage,
        meta: { roles: [UserRole.Administrator] },
      },

      //Rutas del propietario
      {
        path: 'owner',
        name: PrivateRoutesName.OwnerHomePage,
        component: OwnerHomePage,
        meta: { roles: [UserRole.HouseOwner] },
      },
      {
        path: 'profile',
        name: PrivateRoutesName.OwnerProfile,
        component: OwnerProfile,
        meta: { roles: [UserRole.HouseOwner] },
      },
      {
        path: 'owner-documents',
        name: PrivateRoutesName.OwnerDocuments,
        component: OwnerDocuments,
        meta: { roles: [UserRole.HouseOwner] },
      },
      {
        path: 'owner-fins',
        name: PrivateRoutesName.OwnerFines,
        component: OwnerFines,
        meta: { roles: [UserRole.HouseOwner] },
      },
      {
        path: 'owner-meetings',
        name: PrivateRoutesName.OwnerMeetings,
        component: OwnerMeetings,
        meta: { roles: [UserRole.HouseOwner] },
      },
      {
        path: 'owner-requests',
        name: PrivateRoutesName.OwnerRequests,
        component: OwnerRequests,
        meta: { roles: [UserRole.HouseOwner] },
      },
    ],
  },
];

export default privateRoutes;

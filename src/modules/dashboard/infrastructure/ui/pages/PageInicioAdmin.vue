<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-xl q-mt-lg justify-center">
      <!-- Gestión de propiedades -->
      <q-card class="my-card flex flex-center" @click="$router.push({ name: 'RegistrarPropiedad' })" bordered flat>
        <q-card-section class="full-width flex flex-center column">
          <q-icon name="home_work" size="48px" color="primary" />
          <div class="text-h6 q-mt-md text-center">Gestión de propiedades</div>
          <div class="text-subtitle2 q-mt-xs text-center">
            Administra, registra y edita las propiedades del condominio de manera sencilla.
          </div>
        </q-card-section>
      </q-card>

      <!-- Generar Multas -->
      <q-card class="my-card flex flex-center" @click="$router.push({ name: 'GenerarMultas' })" bordered flat>
        <q-card-section class="full-width flex flex-center column">
          <q-icon name="gavel" size="48px" color="accent" />
          <div class="text-h6 q-mt-md text-center">Generar Multas</div>
          <div class="text-subtitle2 q-mt-xs text-center">
            Crea y gestiona multas para los propietarios que incumplan las normas.
          </div>
        </q-card-section>
      </q-card>

      <!-- Gestión de documentos -->
      <q-card class="my-card flex flex-center" @click="$router.push({ name: 'DocumentosAdministrativos' })" bordered flat>
        <q-card-section class="full-width flex flex-center column">
          <q-icon name="description" size="48px" color="secondary" />
          <div class="text-h6 q-mt-md text-center">Gestión de documentos</div>
          <div class="text-subtitle2 q-mt-xs text-center">
            Sube, organiza y comparte documentos administrativos importantes.
          </div>
        </q-card-section>
      </q-card>

      <!-- Agendar Reuniones -->
      <q-card class="my-card flex flex-center" @click="$router.push({ name: 'AgendarReuniones' })" bordered flat>
        <q-card-section class="full-width flex flex-center column">
          <q-icon name="event" size="48px" color="info" />
          <div class="text-h6 q-mt-md text-center">Agendar Reuniones</div>
          <div class="text-subtitle2 q-mt-xs text-center">
            Programa y notifica reuniones para los propietarios y la administración.
          </div>
        </q-card-section>
      </q-card>

      <!-- Gestionar Propietarios -->
      <q-card class="my-card flex flex-center" @click="$router.push({ name: 'CrearPropietario' })" bordered flat>
        <q-card-section class="full-width flex flex-center column">
          <q-icon name="people" size="48px" color="positive" />
          <div class="text-h6 q-mt-md text-center">Gestionar Propietarios</div>
          <div class="text-subtitle2 q-mt-xs text-center">
            Registra, edita y administra la información de los propietarios.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// ...existing code if needed...
</script>

<style scoped>
.row.q-gutter-xl {
  gap: 32px 40px; /* Espacio horizontal y vertical entre tarjetas */
  flex-wrap: wrap;
}
.my-card {
  width: 270px;
  min-height: 250px;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-card:hover {
  box-shadow: 0 4px 16px var(--q-primary);
  border-color: var(--q-primary);
}
</style>
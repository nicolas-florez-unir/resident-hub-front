<template>
  <q-page class="q-pa-lg page-inicio-propietario">
    <div class="row q-col-gutter-xl justify-center">
      <!-- Panel 1: Gestión de recibos de servicios públicos -->
      <div class="col-xs-12 col-sm-4">
        <q-card class="q-pa-md shadow-2 custom-card">
          <div class="column items-center">
            <q-icon name="receipt_long" size="56px" color="primary" class="q-mb-md custom-icon" />
            <div class="text-h6 text-center card-title">Gestión de recibos de servicios públicos</div>
            <div class="text-subtitle2 text-center q-mt-sm card-desc">
              Administra fácilmente tus recibos de agua, luz, gas y otros servicios esenciales. Este módulo centraliza los pagos mensuales, permitiéndote consultar historiales, verificar el estado de tus facturas y mantener un control claro y seguro sobre tus obligaciones como residente.
            </div>
          </div>
        </q-card>
      </div>
      <!-- Panel 2: Multas y reuniones -->
      <div class="col-xs-12 col-sm-4">
        <q-card class="q-pa-md shadow-2 custom-card">
          <div class="column items-center">
            <q-icon name="gavel" size="56px" color="primary" class="q-mb-md custom-icon" />
            <div class="text-h6 text-center card-title">Multas y reuniones</div>
            <div class="text-subtitle2 text-center q-mt-sm card-desc">
              Consulta las multas asociadas a tu vivienda y mantente al tanto de las reuniones comunitarias. Aquí podrás visualizar tus sanciones vigentes, revisar el historial, así como confirmar tu participación y recibir notificaciones importantes de la administración del conjunto.
            </div>
          </div>
        </q-card>
      </div>
      <!-- Panel 3: PQRS -->
      <div class="col-xs-12 col-sm-4">
        <q-card class="q-pa-md shadow-2 custom-card">
          <div class="column items-center">
            <q-icon name="question_answer" size="56px" color="primary" class="q-mb-md custom-icon" />
            <div class="text-h6 text-center card-title">PQRS</div>
            <div class="text-subtitle2 text-center q-mt-sm card-desc">
              Comunícate de forma efectiva con la administración. En este espacio puedes registrar tus solicitudes o inconformidades, hacer seguimiento a su estado y contribuir con sugerencias para el mejoramiento continuo de la convivencia en el condominio.
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
// Paleta personalizada
$primary-color: #0b2c47 !default;
$secondary-color: #145da0 !default;
$accent-color: #29a3ff !default;
$background-color: #f8f9fa !default;
$background-color-cards: #29a3ff !default;
$background-color-view: #29a3ff !default;
$surface-color: #ffffff !default;
$text-primary: #1c1c1c !default;
$text-secondary: #555555 !default;
$border-color: #d0d0d0 !default;
$border-color-dark: #0b2c47 !default;

.page-inicio-propietario {
  background: $background-color-view;
  min-height: 100vh;
}

.custom-card {
  background: $surface-color;
  border: 4px solid $primary-color; // Cambiado para igualar el estilo de PerfilPropietario
  border-radius: 16px;
  transition: box-shadow 0.2s;
  box-shadow: 0 4px 24px 0 rgba(11,44,71,0.08);
}

.card-title {
  color: $primary-color;
  font-weight: 700;
}

.card-desc {
  color: $text-secondary;
}

// Elimina el fondo de los iconos y unifica el color
.custom-icon {
  background: transparent !important;
  color: $primary-color !important;
  border-radius: 0;
  padding: 0;
}
</style>
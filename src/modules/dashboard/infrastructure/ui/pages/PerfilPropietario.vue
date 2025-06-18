<template>
  <div class="perfil-propietario-bg">
    <div class="perfil-container">
      <!-- Sección 1: Información del Propietario -->
      <div class="perfil-header">
        <div class="foto-perfil">
          <svg class="icono-usuario" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="32" fill="#e0e7ef"/>
            <circle cx="32" cy="26" r="14" fill="#b0b8c9"/>
            <ellipse cx="32" cy="50" rx="18" ry="10" fill="#b0b8c9"/>
          </svg>
        </div>
      </div>
      <div class="perfil-detalles">
        <div class="detalle-row">
          <span class="detalle-label">Nombre:</span>
          <span class="detalle-valor">Juan Sebastian Tellez Montes</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Tipo de identificación:</span>
          <span class="detalle-valor">Cédula de ciudadanía</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Número de identificación:</span>
          <span class="detalle-valor">1003309474</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Correo electrónico:</span>
          <span class="detalle-valor">tellezjuanmontes@gmail.com</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Celular:</span>
          <span class="detalle-valor">+57 3135012814</span>
        </div>
      </div>

      <!-- Separador -->
      <hr class="perfil-separador" />

      <!-- Sección 2: Información de la Propiedad -->
      <div class="propiedad-titulo">Información de la propiedad</div>
      <div class="perfil-detalles">
        <div class="detalle-row">
          <span class="detalle-label">Código de vivienda:</span>
          <span class="detalle-valor">T2-204</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Torre o bloque:</span>
          <span class="detalle-valor">Torre 2</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Metros cuadrados:</span>
          <span class="detalle-valor">78 m²</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Número de residentes:</span>
          <span class="detalle-valor">3</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Observaciones administrativas:</span>
          <span class="detalle-valor">Solicitud para remodelación en abril entramite </span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Fecha de registro:</span>
          <span class="detalle-valor">12/01/2023</span>
        </div>
        <div class="detalle-row">
          <span class="detalle-label">Estado de la propiedad:</span>
          <span class="detalle-valor">Activa</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
// Paleta personalizada
$primary-color: #0b2c47 !default;      // Azul oscuro principal
$secondary-color: #145da0 !default;    // Azul medio
$accent-color: #29a3ff !default;       // Azul claro/acento
$background-color: #f8f9fa !default;   // Fondo claro 
$background-color-cards: #29a3ff !default; // Fondo de paneles o tarjetas
$background-color-view: #29a3ff !default; // Fondo de vistas
$surface-color: #ffffff !default;      // Paneles y tarjetas
$text-primary: #1c1c1c !default;       // Texto principal
$text-secondary: #555555 !default;     // Texto secundario
$border-color: #d0d0d0 !default;       // Bordes suaves
$border-color-dark: #0b2c47 !default;  // Bordes oscuros

.perfil-propietario-bg {
  min-height: 100vh;
  background: $background-color-view;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
}

.perfil-container {
  background: $surface-color;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 40px 48px 32px 48px;
  width: 100%;
  max-width: 700px;
  border: 4px solid $primary-color;
}

.perfil-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
}

.foto-perfil {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  overflow: hidden;
  border: none;
}

.icono-usuario {
  width: 96px;
  height: 96px;
}

.foto-texto {
  font-size: 1rem;
  color: $primary-color;
  font-weight: 600;
  text-align: center;
}

.perfil-detalles {
  margin-bottom: 18px;
}

.detalle-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.detalle-label {
  font-weight: bold;
  color: $primary-color;
  min-width: 140px;
}

.detalle-valor {
  color: $text-primary;
  text-align: right;
  flex: 1;
  margin-left: 16px;
  word-break: break-word;
}

.perfil-separador {
  border: none;
  border-top: 2px solid $primary-color;
  margin: 24px 0 18px 0;
}

.propiedad-titulo {
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: $primary-color;
  margin-bottom: 18px;
}
</style>
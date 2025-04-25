FROM node:22-alpine AS builder

WORKDIR /app

# Copiar package.json, package-lock.json y el archivo de configuración de Quasar
COPY . .

# Instalar dependencias (el postinstall debería funcionar correctamente al detectar quasar.config.js)
RUN npm ci --legacy-peer-deps

# Adicionar Quasar CLI para realizar la build
RUN npm install -g @quasar/cli 

# Copiar el resto del código
COPY . .

COPY .env.build /app/.env

# Construir la aplicación
RUN npm run build

RUN npm prune --omit=dev

FROM caddy:2-alpine

WORKDIR /usr/share/caddy

COPY --from=builder /app/dist/spa .

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

# --- Stage 1: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This target is for development. Production build is in the next stage.
# The actual build command (`npm run build`) is run by the production stage.

# --- Stage 2: Production ---
FROM nginx:1.27-alpine
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app /app
WORKDIR /app
RUN npm run build
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
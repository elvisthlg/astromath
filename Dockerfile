FROM node:20-alpine AS base
WORKDIR /app

# Stage 1: Build
FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM base AS runtime
COPY --from=build /app/dist ./dist
# We need node_modules for the adapter to run specific things, or just the standalone script?
# Standalone mode usually bundles dependencies, but let's copy node_modules to be safe OR use the standalone entry
# Astro's standalone 'server' output usually needs the dependencies.
# Let's reinstall production deps.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]

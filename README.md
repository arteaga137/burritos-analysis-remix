# Burritos Analysis Remix

Dashboard React/Vite basado en el prototipo `Dashboard del Grupo.html`.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Docker

```bash
docker compose up -d --build
```

La app queda disponible en `http://127.0.0.1:8080/`.

Para parar el contenedor:

```bash
docker compose down
```

## GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` compila la app con Vite y publica `dist` en GitHub Pages cuando hay push a `main`.

La URL seguirá este formato:

```text
https://arteaga137.github.io/burritos-analysis-remix/
```

## Estructura

- `src/App.jsx`: componentes de la interfaz, tabs, panel de perfil y red de relaciones.
- `src/data.js`: miembros, relaciones, posiciones del grafo y ajustes iniciales.
- `src/index.css`: estilos globales, responsive y animaciones.
- `Dockerfile`: build multi-stage de Vite y runtime Nginx.
- `docker-compose.yml`: servicio local publicado en el puerto `8080`.

El servidor de desarrollo de Vite se levanta por defecto en `http://127.0.0.1:5173/`.

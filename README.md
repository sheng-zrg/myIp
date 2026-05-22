# Mi IP Pública

Aplicación web que muestra tu dirección IP pública junto con información de ubicación y red.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Funcionalidades

- Muestra la IP pública en tiempo real
- Información de geolocalización: ciudad, región, país
- Proveedor de internet (ISP)
- Tipo de conexión (IPv4 / IPv6)
- Botón para copiar la IP al portapapeles
- Diseño responsive (desktop y móvil)
- Tema oscuro con interfaz limpia

## Capturas

![Dashboard](https://placehold.co/800x450/0f172a/e2e8f0?text=Mi+IP+P%C3%BAblica+Dashboard)

## Stack Tecnológico

- **Framework:** React 18
- **Build tool:** Vite
- **Estilos:** Tailwind CSS v4
- **API:** [ipapi.co](https://ipapi.co) (gratuito, sin API key)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Producción

```bash
npm run build
npm run preview
```

## Estructura del Proyecto

```
├── src/
│   ├── App.jsx              — Componente principal
│   ├── api/
│   │   └── ip.js            — Llamada a la API de ipapi.co
│   ├── components/
│   │   ├── Card.jsx          — Tarjeta reutilizable
│   │   └── ErrorBanner.jsx   — Banner de error con reintentar
│   ├── index.css             — Estilos base con Tailwind
│   └── main.jsx              — Punto de entrada
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Licencia

MIT

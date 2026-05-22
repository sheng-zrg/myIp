# Plan de Implementación: Mi IP Pública Dashboard

## 1. Configuración del Proyecto
- [ ] Inicializar proyecto React 18 con Vite.
- [ ] Instalar dependencias necesarias.
- [ ] Instalar e inicializar Tailwind CSS.
- [ ] Configurar los archivos de Tailwind (`tailwind.config.js` y `index.css`).

## 2. Estructura de Archivos
- [ ] Crear carpeta `src/api`.
- [ ] Crear archivo `src/api/ip.js`.
- [ ] Crear carpeta `src/components`.
- [ ] Crear archivo `src/components/Card.jsx`.
- [ ] Crear archivo `src/components/ErrorBanner.jsx`.

## 3. Implementación de API
- [ ] Implementar la función `fetchIP()` en `src/api/ip.js` para hacer GET a `https://ipwho.is/json`.
- [ ] Configurar timeout de 10 segundos para la petición `fetch`.
- [ ] Agregar manejo de errores en caso de fallo de red o del servicio (graceful degradation).

## 4. Desarrollo de Componentes UI
- [ ] Desarrollar `Card.jsx`: Un componente reutilizable que reciba título y contenido/children.
- [ ] Desarrollar `ErrorBanner.jsx`: Componente para mostrar mensajes de error junto con un botón de reintentar.
- [ ] Implementar la funcionalidad "Copiar al portapapeles" para la tarjeta de la IP principal.

## 5. Implementación de la Vista Principal (`App.jsx`)
- [ ] Configurar los estados del componente: `data` (datos de IP), `loading` (booleano) y `error` (mensaje de error).
- [ ] Implementar el hook `useEffect` para llamar a `fetchIP()` en la primera carga.
- [ ] Diseñar el Header con el título centrado "Mi IP Pública".
- [ ] Implementar la interfaz para el estado de carga (mostrar un spinner).
- [ ] Implementar la interfaz de error utilizando `ErrorBanner.jsx`.
- [ ] Construir la cuadrícula (Grid) para mostrar los datos:
  - Diseño Desktop: Grid de 2 columnas, con la tarjeta de la IP principal abarcando el ancho completo y el resto en tarjetas más pequeñas.
  - Diseño Móvil: Diseño en 1 columna, con las tarjetas apiladas verticalmente.
- [ ] Integrar los datos en las tarjetas correspondientes: IP pública, Ciudad, Región, País, ISP/Organización, Tipo (IPv4/IPv6).

## 6. Pruebas y Revisión
- [ ] Comprobar que el diseño es responsive (Desktop, Tablet, Móvil).
- [ ] Probar la funcionalidad de copiar IP al portapapeles.
- [ ] Simular fallos en la red para verificar que el timeout de 10s y la pantalla de error/reintento funcionen.
- [ ] Limpiar código y preparar la aplicación para producción.

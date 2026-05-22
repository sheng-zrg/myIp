# Diseño: Mi IP Pública Dashboard

## Resumen
Aplicación web responsive que muestra la IP pública del usuario junto con información de ubicación y red.

## Stack Tecnológico
- **Framework:** React 18
- **Build tool:** Vite
- **Estilos:** Tailwind CSS
- **API:** ipwho.is (gratuito, sin API key, devuelve IP + ubicación + ISP en una sola respuesta)

## Arquitectura

### Flujo de datos
1. Al cargar, `App.jsx` llama a `fetchIP()` en `src/api/ip.js`
2. `fetchIP()` hace GET a `https://ipwho.is/json`
3. Los datos se renderizan en tarjetas informativas
4. Si falla, se muestra mensaje de error con botón de reintentar

### Estructura de archivos
```
src/
  App.jsx           — Componente principal
  api/ip.js         — Función fetchIP() para llamar al API
  components/
    Card.jsx         — Tarjeta reutilizable con título + contenido
    ErrorBanner.jsx  — Banner de error
```

### UI
- **Desktop:** Grid de 2 columnas. Tarjeta grande de IP (ancho completo) + tarjetas pequeñas de ubicación, país, ISP, tipo IP.
- **Móvil:** Una columna, tarjetas apiladas verticalmente.
- **Header:** Título "Mi IP Pública" centrado.
- **Interacción:** Botón de copiar en la tarjeta de IP principal.
- **Estados:** Cargando (spinner), éxito (datos), error (mensaje + botón reintentar).

### Datos mostrados
- IP pública (grande, con botón copiar)
- Ciudad
- Región
- País
- ISP / Organización
- Tipo IPv4 / IPv6

### Manejo de errores
- Timeout de 10s en la petición fetch
- Mensaje visible al usuario con botón de reintentar
- Graceful degradation si ipwho.is falla

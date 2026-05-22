# Mi IP Pública Dashboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive web app that displays the user's public IP address along with location and network details.

**Architecture:** Single-page React app with Vite + Tailwind CSS. Fetches data from ipwho.is (free, no API key). Renders data into reusable card components with responsive grid layout.

**Tech Stack:** React 18, Vite, Tailwind CSS

---

### Task 1: Scaffold Project with Vite + React + Tailwind

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/index.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "my-public-ip",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Create tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 4: Create postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Create index.html**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi IP Pública</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
}
```

- [ ] **Step 7: Create src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 8: Install dependencies**

Run: `npm install && npm install -D vite @vitejs/plugin-react tailwindcss autoprefixer`

- [ ] **Step 9: Verify scaffold works**

Run: `npm run dev`
Expected: Vite starts on http://localhost:5173, page shows "Mi IP Pública" (no data yet but no errors).

---

### Task 2: Create API Layer

**Files:**
- Create: `src/api/ip.js`

- [ ] **Step 1: Create the API fetch function**

```js
const API_URL = 'https://ipwho.is/json'
const TIMEOUT_MS = 10000

async function fetchIP() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(API_URL, {
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success || !data.ip) {
      throw new Error('API response invalid')
    }

    return {
      ip: data.ip,
      type: data.type,
      city: data.city || 'N/A',
      region: data.region || 'N/A',
      country: data.country || 'N/A',
      isp: data.org || 'N/A',
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('La petición tardó demasiado. Inténtalo de nuevo.')
    }
    throw new Error(error.message || 'No se pudo obtener la IP pública.')
  } finally {
    clearTimeout(timeout)
  }
}

export { fetchIP }
```

- [ ] **Step 2: Verify the API function**

Run: `node -e "import('./src/api/ip.js').then(m => m.fetchIP()).then(d => console.log(d)).catch(e => console.error(e))"`
Expected: Logs the IP info object (or error if no network).

---

### Task 3: Create Card Component

**Files:**
- Create: `src/components/Card.jsx`

- [ ] **Step 1: Create the Card component**

```jsx
export default function Card({ title, children, large }) {
  return (
    <div
      className={`
        ${large ? 'col-span-full' : ''}
        bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700
        transition-transform duration-200 hover:scale-[1.01]
      `}
    >
      <h2 className="text-sm font-medium uppercase tracking-wider text-slate-400 mb-2">
        {title}
      </h2>
      <div className="text-lg font-semibold text-white">
        {children}
      </div>
    </div>
  )
}
```

---

### Task 4: Create ErrorBanner Component

**Files:**
- Create: `src/components/ErrorBanner.jsx`

- [ ] **Step 1: Create the ErrorBanner component**

```jsx
export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 text-center">
      <p className="text-red-300 mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
      >
        Reintentar
      </button>
    </div>
  )
}
```

---

### Task 5: Create App Component

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Create the App component**

```jsx
import { useState, useEffect } from 'react'
import { fetchIP } from './api/ip.js'
import Card from './components/Card.jsx'
import ErrorBanner from './components/ErrorBanner.jsx'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchIP()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCopy = async () => {
    if (!data?.ip) return
    try {
      await navigator.clipboard.writeText(data.ip)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = data.ip
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400">Obteniendo tu IP...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ErrorBanner message={error} onRetry={loadData} />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Mi IP Pública</h1>
          <p className="text-slate-400 mt-1">Información de tu conexión a internet</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="IP Pública" large>
            <div className="flex items-center justify-between gap-4">
              <span className="text-2xl sm:text-3xl font-mono text-cyan-400">{data.ip}</span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                title="Copiar IP"
              >
                Copiar
              </button>
            </div>
          </Card>

          <Card title="Tipo de IP">
            <span className="text-indigo-400">{data.type?.toUpperCase()}</span>
          </Card>

          <Card title="Ciudad">
            <span>{data.city}</span>
          </Card>

          <Card title="Región">
            <span>{data.region}</span>
          </Card>

          <Card title="País">
            <span>{data.country}</span>
          </Card>

          <Card title="ISP">
            <span className="text-sm">{data.isp}</span>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
```

---

### Task 6: Verify the Application

**Files:**
- No file changes

- [ ] **Step 1: Run the dev server**

Run: `npm run dev`
Expected: Vite starts, page loads with loading spinner, then shows IP dashboard.

- [ ] **Step 2: Verify desktop layout**

Visit http://localhost:5173 in browser.
Expected: Grid layout with IP card spanning full width, other cards in 2-3 column grid. Data populated from ipwho.is API.

- [ ] **Step 3: Verify mobile layout**

Use browser DevTools to switch to mobile viewport (iPhone SE or similar).
Expected: Cards stack vertically, IP card still full width, copy button visible.

- [ ] **Step 4: Test copy button**

Click "Copiar" on the IP card.
Expected: IP copied to clipboard (no error).

- [ ] **Step 5: Test error handling**

Temporarily change API URL to `https://invalid-url-12345.com/json` in `src/api/ip.js`, reload.
Expected: Error banner with retry button appears.

- [ ] **Step 6: Restore API URL and verify build**

Restore the correct API URL. Then run:
Run: `npm run build`
Expected: Build succeeds, output in `dist/` directory.

---

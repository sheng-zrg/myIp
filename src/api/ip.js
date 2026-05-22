const API_URL = 'https://ipinfo.io/json'
const TIMEOUT_MS = 10000

function detectType(ip) {
  return ip.includes(':') ? 'IPv6' : 'IPv4'
}

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

    return {
      ip: data.ip || 'N/A',
      type: detectType(data.ip),
      city: data.city || 'N/A',
      region: data.region || 'N/A',
      country: data.country_name || data.country || 'N/A',
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

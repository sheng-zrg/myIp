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

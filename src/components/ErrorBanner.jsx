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

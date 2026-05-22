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

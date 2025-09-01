export function Alert({ type='info', children }) {
  const colors = {
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    error: 'bg-rose-50 text-rose-700 ring-rose-200',
    info: 'bg-sky-50 text-sky-700 ring-sky-200'
  };
  return <div className={`mt-4 rounded-xl px-4 py-3 ring-1 ${colors[type]}`}>{children}</div>;
}

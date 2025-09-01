export function Card({ className='', children }) {
  return <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>{children}</div>;
}
export function CardHeader({ className='', children }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>;
}
export function CardContent({ className='', children }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}

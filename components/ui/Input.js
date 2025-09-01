export default function Input({ className='', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand/50 ${className}`}
      {...props}
    />
  );
}

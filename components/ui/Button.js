export default function Button({ className='', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-brand text-white hover:brightness-110 transition ${className}`}
      {...props}
    />
  );
}

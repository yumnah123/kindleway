export function Table({ children }) { return <table className="w-full border-separate border-spacing-0">{children}</table>; }
export function THead({ children }) { return <thead className="bg-slate-50">{children}</thead>; }
export function TH({ children }) { return <th className="text-left text-sm font-semibold text-slate-700 px-4 py-3 border-b border-slate-200">{children}</th>; }
export function TR({ children }) { return <tr className="hover:bg-slate-50">{children}</tr>; }
export function TD({ children }) { return <td className="px-4 py-3 border-b border-slate-200 text-sm">{children}</td>; }

import { useEffect, useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Table, THead, TH, TR, TD } from './ui/Table';

export default function AdminTable({ password }) {
  const [rows, setRows] = useState([]);
  const [minNetAssets, setMinNetAssets] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const q = new URLSearchParams();
    if (minNetAssets) q.set('minNetAssets', minNetAssets);
    if (fromDate) q.set('fromDate', fromDate);
    if (toDate) q.set('toDate', toDate);
    const res = await fetch('/api/admin/logs?' + q.toString(), { headers: { 'x-admin-pass': password }});
    const data = await res.json();
    setLoading(false);
    if (res.ok) setRows(data.rows);
    else alert(data.error || 'Failed to load');
  };

  useEffect(() => { load(); }, []);

  const exportCsv = async () => {
    const q = new URLSearchParams();
    if (minNetAssets) q.set('minNetAssets', minNetAssets);
    if (fromDate) q.set('fromDate', fromDate);
    if (toDate) q.set('toDate', toDate);
    const res = await fetch('/api/admin/export?' + q.toString(), { headers: { 'x-admin-pass': password }});
    if (!res.ok) {
      const d = await res.json().catch(()=>({}));
      alert(d.error || 'Export failed');
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'zakat_logs.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2>Filters</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <Input type="number" placeholder="Min Net Assets" value={minNetAssets} onChange={e=>setMinNetAssets(e.target.value)} />
            <Input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} />
            <Input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} />
            <Button onClick={load} className="md:col-span-1">Refresh</Button>
            <Button onClick={exportCsv} className="md:col-span-1">Export CSV</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><h2>All Zakat Records</h2></CardHeader>
        <CardContent>
          {rows.length ? (
            <Table>
              <THead>
                <TR>
                  <TH>Date</TH><TH>Net Assets</TH><TH>Zakat</TH><TH>Submitted By</TH>
                </TR>
              </THead>
              <tbody>
                {rows.map((r, i) => (
                  <TR key={i}>
                    <TD>{new Date(r.created).toLocaleString()}</TD>
                    <TD>{r.net_assets}</TD>
                    <TD>{r.zakaat}</TD>
                    <TD>{r.submitted_by}</TD>
                  </TR>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="flex items-center justify-center py-10">
              <img src="/images/empty.svg" alt="No records" className="h-28 opacity-80" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

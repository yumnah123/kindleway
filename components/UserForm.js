import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import Input from './ui/Input';
import { Card, CardHeader, CardContent } from './ui/Card';
import { Alert } from './ui/Alert';
import { Wallet, Landmark, Banknote, Building2, Gem, HandCoins } from 'lucide-react';

const fields = [
  { key: 'gold', label: 'Gold (PKR)', icon: Gem },
  { key: 'silver', label: 'Silver (PKR)', icon: Gem },
  { key: 'cash', label: 'Cash (PKR)', icon: Banknote },
  { key: 'bank', label: 'Bank (PKR)', icon: Landmark },
  { key: 'business', label: 'Business (PKR)', icon: Building2 },
  { key: 'investments', label: 'Investments (PKR)', icon: Wallet },
  { key: 'property', label: 'Property (PKR)', icon: Building2 },
  { key: 'other', label: 'Other Assets (PKR)', icon: HandCoins },
  { key: 'liabilities', label: 'Liabilities (PKR)', icon: HandCoins },
];

export default function UserForm() {
  const [values, setValues] = useState(Object.fromEntries(fields.map(f => [f.key, ''])));
  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const numbers = useMemo(() => {
    const obj = {};
    for (const f of fields) obj[f.key] = parseFloat(values[f.key]) || 0;
    return obj;
  }, [values]);

  const totalAssets = numbers.gold + numbers.silver + numbers.cash + numbers.bank + numbers.business + numbers.investments + numbers.property + numbers.other;
  const netAssets = Math.max(0, totalAssets - numbers.liabilities);
  const zakaat = +(netAssets * 0.025).toFixed(2);

  const onChange = (k, v) => setValues((prev) => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setStatus(null);
    try {
      const res = await fetch('/api/zakat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...numbers })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setSuccess(`Saved! Net Assets: PKR ${data.net_assets}, Zakat: PKR ${data.zakaat}`);
      setValues(Object.fromEntries(fields.map(f => [f.key, ''])));
    } catch (err) {
      setStatus(err.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8 overflow-hidden rounded-2xl">
        <img src="/images/hero.svg" alt="Zakat" className="w-full h-48 md:h-64 object-cover" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2>Zakat Calculator & Submission</h2>
            <p className="text-slate-500 mt-1">Enter your assets and liabilities below.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(({ key, label, icon:Icon }) => (
                  <label key={key} className="space-y-1">
                    <span className="text-sm text-slate-600 flex items-center gap-2"><Icon className="h-4 w-4" /> {label}</span>
                    <Input type="number" step="0.01" placeholder="0" value={values[key]} onChange={e => onChange(key, e.target.value)} />
                  </label>
                ))}
              </div>
              <Button type="submit" disabled={loading} className="mt-2">{loading ? 'Saving…' : 'Submit'}</Button>
            </form>
            {success && <Alert type="success">{success}</Alert>}
            {status && <Alert type="error">{status}</Alert>}
          </CardContent>
        </Card>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader><h2>Summary</h2></CardHeader>
            <CardContent>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between"><span>Total Assets</span><span className="font-semibold">PKR {totalAssets.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Net Assets</span><span className="font-semibold">PKR {netAssets.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Zakat (2.5%)</span><span className="font-semibold">PKR {zakaat.toFixed(2)}</span></div>
              </div>
              <p className="text-xs text-slate-500 mt-3">Zakat is calculated as 2.5% of net assets.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

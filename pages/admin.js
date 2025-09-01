import { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
const AdminTable = dynamic(() => import('../components/AdminTable'), { ssr: false });

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  return (
    <>
      <Head>
        <title>Admin Dashboard — Zakat</title>
        <link rel="icon" href="/images/logo.svg" />
      </Head>
      <div className="container py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {!ok ? (
            <>
              <div className="hidden md:block">
                <img src="/images/hero.svg" alt="Admin" className="rounded-2xl shadow-sm ring-1 ring-slate-200" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
                <h1 className="mb-2">Admin Login</h1>
                <p className="text-slate-500 mb-4">Enter the admin password to access the dashboard.</p>
                <div className="flex gap-3">
                  <Input type="password" placeholder="Admin password" value={password} onChange={e=>setPassword(e.target.value)} />
                  <Button onClick={()=>setOk(true)}>Enter</Button>
                </div>
                <p className="text-xs text-slate-500 mt-3">Default is <b>123</b> (or set <code>ADMIN_PASSWORD</code> env).</p>
              </div>
            </>
          ) : (
            <div className="md:col-span-2"><AdminTable password={password} /></div>
          )}
        </div>
      </div>
    </>
  );
}

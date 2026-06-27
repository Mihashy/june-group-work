import { useEffect, useState } from 'react';
import { Sun, Newspaper, CheckCircle, Clock } from 'lucide-react';
import Task from "./Task";


export default function App() {
  const [time, setTime] = useState(new Date());
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Good Morning!</h1>
        <p className="mt-2 flex items-center gap-2 text-slate-500">
          <Clock size={18} />
          {time.toLocaleTimeString()}
        </p>
      </header>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Sun className="text-amber-500" /> Weather
            </h2>
          </div>
          <div className="py-4 text-center">
            <div className="mb-1 text-4xl font-bold">24°C</div>
            <p className="text-slate-500">Sunny Day</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Newspaper className="text-blue-500" /> Top Stories
            </h2>
          </div>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="border-b border-slate-50 pb-2 text-sm text-slate-600 last:border-0">
                Loading some interesting news...
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle className="text-emerald-500" /> Today's Task
            </h2>
          </div>

        <Task/>
        </section>
      </main>
    </div>
  );
}

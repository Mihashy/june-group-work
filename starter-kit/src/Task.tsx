import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const list = [
    '水を一杯飲もう',
    '授業に出席しよう',
    '早く起きよう',
    '健康的なものを食べよう',
    '5人に挨拶しよう',
    '５分筋トレをしよう',
    '机の上を片づける',
];

export default function Task() {
    const [result1, setResult1] = useState('');
    const [result2, setResult2] = useState('');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

    useEffect(() => {
        const today = new Date();
        const f_seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const index1 = f_seed % list.length;
        let index2 = Math.floor(f_seed / list.length) % list.length;
        if (index1 === index2)
            index2 = (index2 + 1) % list.length;
        setResult1(list[index1]);
        setResult2(list[index2]);
    }, []);

    return (
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" checked={checked1} onChange={() => setChecked1(!checked1)} disabled={checked1} />
                    <span className={checked1 ? 'line-through text-slate-400' : ''}>{result1}</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" checked={checked2} onChange={() => setChecked2(!checked2)} disabled={checked2} />
                    <span className={checked2 ? 'line-through text-slate-400' : ''}>{result2}</span>
                </label>
            </div>
        </section>
    );
}

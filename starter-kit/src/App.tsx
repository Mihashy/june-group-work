import { useEffect, useState } from 'react';
import { Sun, Newspaper, CheckCircle, Clock } from 'lucide-react';
import Task from "./Task";

import { OmikuziAI } from "./OmikuziAI";
import { FortuneDisplay } from "./FortuneDisplay";


export default function App() {
  const [time, setTime] = useState(new Date());
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const [news, setNews] = useState([]);
  const [newsError, setNewsError] = useState(false);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  useEffect(() => {
  const getNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );

      const data = await response.json();
      console.log("NewsAPI:", response.status, data);

      if (!response.ok) {
        throw new Error(data.message || "ニュースを取得できませんでした");
      }

      setNews(data.articles ?? []);
    } catch (error) {
      console.error("ニュース取得エラー:", error);
      setNewsError(true);
    } finally {
      setIsNewsLoading(false);
    }
  };

  getNews();
}, []);

  //おみくじ結果を持つ変数、およびそれの値を管理する関数
  const [fortune, setFortune] = useState("");
  //ローディング画面を表示すべきか否かを判断する
  const [isLoading, setIsLoading] = useState(false); 
  //おみくじのボタンの関数
  const omikuziClick = async () => {
    //ローディング画面表示開始
    setIsLoading( true );

    //OmikuziAI.tsx内のOmikuziAI関数を呼び出してAI生成の文章を取得
    const result = await OmikuziAI();
    //fortuneに突っ込む
    setFortune( result );

    //ローディング画面終了
    setIsLoading( false );
  }

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
            {newsError && (
              <li className="text-sm text-red-500">
                ニュースを取得できませんでした。
              </li>
            )}

            {isNewsLoading && (
              <li className="text-sm text-slate-500">
                ニュースを読み込み中...
              </li>
            )}

            {!isNewsLoading && !newsError && news.length === 0 && (
              <li className="text-sm text-slate-500">
                ニュースが見つかりませんでした。
              </li>
            )}                  

            {news.map((article) => (
              <li
                key={article.url}
                className="text-sm text-slate-600 border-b border-slate-50 pb-2 last:border-0"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                  >
                  {article.title}
                </a>
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

        <section className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <button
            onClick={omikuziClick}
            className="px-5 py-2 mb-4 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600"
          >
            今日の運勢を占う
          </button>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1">
              <FortuneDisplay
                fortuneText={fortune ?? ""}
                loadingState={isLoading}
              />
            </div>

            <img
              className="w-full md:w-56 h-48 md:h-auto object-cover rounded-2xl shadow-sm"
              src="/占い師.jpg"
              alt="占い師"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

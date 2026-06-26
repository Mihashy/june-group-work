import React from 'react';
import { Sun, Newspaper, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

import { OmikuziAI } from "./OmikuziAI";
import { FortuneDisplay } from "./FortuneDisplay";

function App() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const [news, setNews] = React.useState([]);
  const [newsError, setNewsError] = React.useState(false);

  React.useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=jp&pageSize=3&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("ニュースを取得できませんでした");
        }

        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error(error);
        setNewsError(true);
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
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Good Morning!</h1>
        <p className="text-slate-500 flex items-center gap-2">
          <Clock size={18} />
          {time.toLocaleTimeString()}
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Weather Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Sun className="text-amber-500" /> Weather
            </h2>
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold mb-1">24°C</div>
            <p className="text-slate-500">Sunny Day</p>
          </div>
        </section>

        {/* News Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Newspaper className="text-blue-500" /> Top Stories
            </h2>
          </div>
          <ul className="space-y-3">
            {newsError && (
    <li className="text-sm text-red-500">
      ニュースを取得できませんでした。
    </li>
  )}

  {!newsError && news.length === 0 && (
    <li className="text-sm text-slate-500">
      ニュースを読み込み中...
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

        {/* Tasks Widget Placeholder */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <CheckCircle className="text-emerald-500" /> Today's Task
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded border-slate-300" />
              <span>Drink 1 glass of water</span>
            </label>
          </div>
        </section>

        <section>
          <button onClick = { omikuziClick }>
            今日の運勢を占う
          </button>

          <FortuneDisplay 
          fortuneText = { fortune ?? "" }
          loadingState = { isLoading }
          />
        </section>
      </main>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        &copy; 2026 Morning Dashboard Workshop - Built with React
      </footer>
    </div>
  );
}

export default App;

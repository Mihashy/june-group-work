import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.VITE_GEMINI_API_KEY
});

export async function OmikuziAI() {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: 'ユーザーの今日の運勢を占ってください。貴方の返答をいくつかのストリングに機械的に分割しますので、返答に関しては、*で囲まれた内部および*の文字そのものを書き換える形で、次の形式を厳守するようお願いします。*の中には項目名は一切含めず、占いの結果（本文や単語）のみを出力してください。*大吉や大凶など* *恋愛運の本文* *金運の本文* *健康運の本文* *カラー名* *アイテム名* *今日の一言の本文*',
  });

  return response.text ?? "生成もしくは受け取りのエラー";
}

/*
ウェブページ表示時
    fortuneという変数が作られ、またuseState関数によって値の更新と共に画面を更新するよう設定する
    setFortuneという関数が作られ、fortune変数の値を変える(これによって値の変更がおこり、ページが再レンダリングされる)
    (ここまでreactが自動でやってくれる)
    fortune変数がFortuneDisplayコンポーネントに渡され、FortuneDisplayはこの変数をもとに見た目を作成

ボタンクリック時
    ボタンクリックによって、このボタンとonClick時に呼ばれる関数として結びつけられたApp.tsx内の関数(今回はomikuziClick)が呼ばれる
    omikuziClick内でOmikuziAIを呼び出す。
    呼び出されたOmikuziAIがGeminiにおみくじ生成を依頼、返ってきた文章をリターン
    setFortuneを呼び出し、OmikuziAIからリターンされた文章をfortuneに突っ込む
    値の変更によってページが再レンダリング(App.tsxを再読み込み)
    FortuneDisplayが新たなfortune関数とともに再構築
*/
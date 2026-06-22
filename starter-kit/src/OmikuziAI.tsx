import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export async function OmikuziAI() {
  console.log(import.meta.env.VITE_GEMINI_API_KEY);

  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: 'ユーザーの今日の運勢を占い、以下の【出力フォーマット】を**厳守**して出力してください。# 守るべきルール- 項目名（「恋愛運」など）や、アスタリスク（*）などの記号は一切出力に含めないでください。- パイプライン（|）のみを区切り文字として使用し、改行はせず1行で出力してください。# 出力フォーマット[運勢の勢い]|[恋愛運の本文]|[金運の本文]|[健康運の本文]|[カラー名]|[アイテム名]|[今日の一言の本文]# 出力例（この形式の通りに出力してください）大吉|素晴らしいエネルギーに満ちあふれています。|直感を信じて行動すると良いでしょう。|心身ともに充実した一日です。|ゴールド|お気に入りの靴|自信を持って一歩前へ踏み出してみてください。',
  })
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
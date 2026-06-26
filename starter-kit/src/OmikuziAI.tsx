import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export async function OmikuziAI() {
  console.log(import.meta.env.VITE_GEMINI_API_KEY);

  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: 'ユーザーの今日の運勢を占ってください。ターゲットは「だらだらして朝の活力を失ってしまった、現状を打破したい大学生」です。クスッと笑えて、読んだ瞬間にベッドから飛び起きたくなるような、ユーモアとポジティブなエネルギーに満ちた言葉遣いで、以下の【出力フォーマット】を厳守して出力してください。# 守るべきルール- 項目名（「総合運」など）や、アスタリスク（*）などの記号、ハッシュタグ、不要なスペースは一切出力に含めないでください。- パイプライン（|）のみを区切り文字として使用し、改行はせず1行で出力してください。- 説教くさくならず、大学生の日常に寄り添った具体的かつコミカルな内容にしてください。# 出力フォーマット[総合運]|[学業運]|[対人運]|[金運]|[今日の最初の一歩]|[今日の一言]# 出力例（この形式の通りに1行で出力してください）最高潮！エネルギーが満ちあふれています。|教授の雑談がテストに出るレベルで冴え渡っています。|意外な人からお菓子を恵まれるなど、愛され度が急上昇中。|無駄遣いを防げる運気。コンビニの誘惑をスルーできます。|まずはスマホを置いて、思い切り背伸びをして深呼吸。|だらだらした自分を責めるな！ここから巻き返せばオールOK！'})
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
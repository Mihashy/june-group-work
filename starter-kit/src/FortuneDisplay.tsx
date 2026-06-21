type DisplayProps = {
    fortuneText: string;
}

export function FortuneDisplay( { fortuneText } : DisplayProps ) {
    //*大吉や大凶など* *恋愛運の本文* *金運の本文* *健康運の本文* *カラー名* *アイテム名* *今日の一言の本文*
    if( fortuneText.length == 0 ) {
        return( <p></p> );
    }
    
    let index;
    //総合運
    index = fortuneText.indexOf(" ");
    const totalL = fortuneText.slice( index );
    //恋愛運
    index = fortuneText.indexOf(" ", ++ index );
    const loveL = fortuneText.slice( index );
    //金運
    index = fortuneText.indexOf(" ", ++ index );
    const moneyL = fortuneText.slice( index );
    //健康運
    index = fortuneText.indexOf(" ", ++ index );
    const healthL = fortuneText.slice( index );
    //ラッキーカラー
    index = fortuneText.indexOf(" ", ++ index );
    const colorL = fortuneText.slice( index );
    //ラッキーアイテム
    index = fortuneText.indexOf(" ", ++ index );
    const itemL = fortuneText.slice( index );
    //今日の一言
    index = fortuneText.indexOf(" ", ++ index ); 
    const quoteL = fortuneText.slice( index );
    
    const result = totalL + "<br>" + loveL + "<br>" + moneyL + "<br>" + healthL + "<br>" + colorL + "<br>" + itemL + "<br>" + quoteL;
    
    return (
        <p> { result } </p>
    );
}
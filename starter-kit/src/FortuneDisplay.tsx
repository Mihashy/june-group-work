type DisplayProps = {
    fortuneText: string;
    loadingState: boolean;
}

export function FortuneDisplay( { fortuneText, loadingState } : DisplayProps ) {
    //ローディング中ならローディング中って表示する
    if( loadingState ) {
        return( <p>ローディング中...</p>)
    }

    //*大吉や大凶など* *恋愛運の本文* *金運の本文* *健康運の本文* *カラー名* *アイテム名* *今日の一言の本文*
    if( fortuneText.length == 0 ) {
        return( <p></p> );
    }

    //[総合運]|[学業運]|[対人運]|[金運]|[今日の最初の一歩]|[今日の一言]
    let index = 0;
    let indexE = 0;
    let luckN = ["総合運", "学業運", "対人運", "金運", "今日の最初の一歩", "本日の一言"]
    let result = [];
    for( let i = 0; i < luckN.length; i ++ ) {
        index = indexE;
        indexE = fortuneText.indexOf( "|", index + 1 );
        //最初
        if( i == 0 ) result.push( <p>{ luckN[i] }： { fortuneText.slice( 0, indexE ) } </p> );
        //中間
        else if( indexE != -1 ) result.push( <p>{ luckN[i] }： { fortuneText.slice( index + 1, indexE ) } </p> );
        //最後
        else result.push( <p>{ luckN[i] }： { fortuneText.slice( index + 1 ) }</p> )
    }
    
    return (
        <> { result } </>
    );
}
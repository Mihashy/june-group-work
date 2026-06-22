type DisplayProps = {
    fortuneText: string;
}

export function FortuneDisplay( { fortuneText } : DisplayProps ) {
    //*大吉や大凶など* *恋愛運の本文* *金運の本文* *健康運の本文* *カラー名* *アイテム名* *今日の一言の本文*
    if( fortuneText.length == 0 ) {
        return( <p></p> );
    }

    //総合運、恋愛運、金運、健康運、カラー、アイテム、一言
    let index = 0;
    let indexE = 0;
    let luckN = ["総合運", "恋愛運", "金運", "健康運", "ラッキーカラー", "ラッキーアイテム", "本日の一言"]
    let result = [];
    for( let i = 0; i < 7; i ++ ) {
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
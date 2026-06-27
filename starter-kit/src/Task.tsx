    import seedrandom from 'seedrandom';
    
    
    function Task() {

    const list = [
    '水を一杯飲もう',
    '授業に出席しよう',
    '早く起きよう',
    '健康的なものを食べよう',
    '5人に挨拶しよう'
    ];

    const rng = seedrandom('');

        setResult1(list[index1]);
        setResult2(list[index2]);
    }

        <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" onChange={selectRandom} />
                <span>今日の目標をランダムに2つ選ぶ</span>
            </label>

            <div className="mt-4 space-y-2">
                {result1 && <p>🎯 目標1: {result1}</p>}
                {result2 && <p>🎯 目標2: {result2}</p>}
            </div>
    }
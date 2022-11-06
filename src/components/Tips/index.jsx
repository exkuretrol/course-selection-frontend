const Tips = () => {
    const tips = [
        '若要查詢老師的課表，只需說出「某某 (教授/老師)的課表」即可。',
        '例如：我想找星期三下午桃園校區的選修課',
        '某某老師的微積分。',
        '尋找020304節資工系的必修',
        '畢業班的課程',
        '一句話中所提到的課程和老師的次數都只能一次。'
    ];
    return (
        <>
            {
                tips.map((tip, i) => (
                    Tip(tip, i)
                ))
            }
        </>
    )
}

const Tip = (tip, i) => {
    return (
        <div className="relative w-full h-full">
            <div className="static text-slate-900/50 " key={i}>
                <p className="absolute bottom-0 left-5">{tip}</p>
            </div>
        </div>
    )
}

export default Tips;
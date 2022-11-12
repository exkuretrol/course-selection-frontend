import React from "react";

function Home() {
    return (
        <>
            <header className="py-4 sm:py-6 md:py-8 text-sky-900 leading-10">
                <span className="text-2xl sm:text-3xl md:text-4xl box-decoration-clone bg-gradient-to-br from-indigo-600 to-pink-500 px-2 text-white tracking-widest">
                    銘傳大學
                    <br />
                    語音選課系統
                </span>
                <div className="grid grid-rows-2 grid-cols-3 gap-8 mb-8">
                    <p className="col-span-2">
                        歡迎您進入銘傳大學語音檢索課程系統，此系統只需用語音輸入的方式，即可找到課程資訊以及老師的課表，在使用的過程中我們也會引導您如何去使用我們的系統。將您在查詢時所花費的時間大幅減少，並且迅速地取得您想要的資訊，這便是我們製作這網站的初衷。請按下方的「開始選課」按鈕進入語音輸入頁面進行查詢。
                    </p>
                    <div />
                    <div />
                    <div />
                </div>
                <div className="flex justify-center mb-8">
                    <a className="blue-button" href="/query">
                        開始選課
                    </a>
                </div>
                <div className="text-gray-900 text-lg leading-8">
                    <ul className="list-inside list-disc marker:text-sky-300">
                        <li>運用簡單的圖示引導使用者使用檢索系統。</li>
                        <li>不需鍵盤、滑鼠，只需語音即可輸入查詢條件。</li>
                        <li>提供當前個人課表匯入的功能，用於記錄選課。</li>
                        <li>
                            可決定將查詢結果顯示部分所要的資訊。 (如:
                            只顯示該科目的代號或班級代號等等。)
                        </li>
                        <li>能將查詢到的課程資訊選擇是否加入到課表中。</li>
                        <li>匯出選完的個人課表。</li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Home;

import React from "react";
import { ChangeEvent, useState, useRef } from "react";

const Import = () => {
    return (
        <>
            <h1>Import</h1>
            <ul>
                <li>
                    第一步: 先將您的個人課表儲存成CSV或HTML的檔案格式。
                    <br />
                    儲存方法: 到您的學生資訊系統 點擊「選課」
                    選擇「選課期間個人課程查詢」 在您的課表上方會有這個選擇方塊
                    將最右邊欄位中的Pdf換成Csv或Html格式 最後按下就能完成儲存。
                </li>
                <li>
                    第二步:
                    點擊下方的「打開課表檔案」按鈕，選擇您儲存好並符合格式的課表。
                </li>
                <li>第三步: 前往選課。</li>
            </ul>
        </>
    );
};

const FileInput = () => {
    const [file, setFile] = useState<File>();
    const inputRef = useRef<HTMLInputElement | null>(null);
}

export default Import;

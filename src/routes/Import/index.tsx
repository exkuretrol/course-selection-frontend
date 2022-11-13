import React from "react";
import { ChangeEvent, useState } from "react";

type TableType = {
    columns: string[],
    data: string[],
    index: number[]
}

const Import = () => {
    const [table, setTable] = useState<TableType | undefined>(undefined);

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
            <FileInput setTable={setTable}/>
        </>
    );
};

type Props = {
    setTable: React.Dispatch<React.SetStateAction<TableType | undefined>>
}
const FileInput = ({setTable}: Props) => {

    const [file, setFile] = useState<File | null>(null);
    const [isFilePicked, setIsFilePicked] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.item(0)!);
        setIsFilePicked(true);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("File", file!);

        fetch("http://localhost:5000/api/uploadcirriculum", {
            method: "post",
            body: formData,
        })
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("請上傳正確的格式");
            })
            .then((result) => {
                const table = JSON.parse(result["tbl"]);
                setTable(table);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <input type="file" name="file" id="" onChange={handleChange} />
            {isFilePicked ? (
                <>
                    <ul>
                        <li>{file?.name}</li>
                        <li>{file?.size}</li>
                        <li>{file?.lastModified}</li>
                        <li>{file?.type}</li>
                    </ul>
                    <div>
                        <button
                            type="submit"
                            className="blue-button"
                            onClick={handleSubmit}
                        >
                            送出
                        </button>
                    </div>
                </>
            ) : (
                <p>select a file</p>
            )}
        </div>
    );
};

export default Import;

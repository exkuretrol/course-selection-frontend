import React, { useEffect, useMemo, useRef } from "react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Cirrculum from "../../components/Curriculum";
import HoverVideoPlayer from "react-hover-video-player";

type TableType = {
    columns: string[];
    data: string[][];
    index: number[];
};

const Import = () => {
    const [table, setTable] = useState<TableType | undefined>(undefined);

    const navigate = useNavigate();
    const toQuery = () => {
        navigate("/query", { state: table });
    };

    const toQueryWithoutCirriculum = () => {
        navigate("/query");
    };
    const tooltips: JSX.Element[] | undefined = useMemo(() => {
        return [];
    }, []);

    useEffect(() => {
        ReactTooltip.rebuild();
    }, [tooltips]);

    return (
        <>
            <h1 className="text-3xl font-medium mb-4">匯入課表頁面</h1>
            <p>在此頁面你可以選擇上傳您的課表，或是選擇略過此步驟。</p>
            <h3>第一步：先將您的個人課表儲存成 HTML 檔案格式。</h3>
            <HoverVideoPlayer
                className="max-w-4xl mx-auto ring-1 ring-slate-500"
                style={{ display: "block" }}
                videoSrc={process.env.PUBLIC_URL + "/images/save-as-html.mp4"}
                pausedOverlay={
                    <img
                        src={
                            process.env.PUBLIC_URL + "/images/save-as-html.png"
                        }
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                }
                loadingOverlay={
                    <div className="loading-overlay">
                        <div className="loading-spinner" />
                    </div>
                }
            />

            <h3>儲存方法</h3>
            <p>
                進入學生資訊系統後，選擇「上課課程表」進入個人課表頁面。接著在有著清單課表的頁面，點擊「右鍵」→「另存新檔」。
            </p>
            <h3>
                第二步：點擊下方的「打開課表檔案」按鈕，選擇您儲存好並符合格式的課表。
            </h3>
            <HoverVideoPlayer
                className="max-w-4xl mx-auto ring-1 ring-slate-500"
                style={{ display: "block" }}
                videoSrc={
                    process.env.PUBLIC_URL + "/images/upload-cirriculum.mp4"
                }
                pausedOverlay={
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            "/images/upload-cirriculum.mp4"
                        }
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                }
                loadingOverlay={
                    <div className="loading-overlay">
                        <div className="loading-spinner" />
                    </div>
                }
            />
            <h3>第三步：前往選課。</h3>
            <FileInput table={table} setTable={setTable} />
            {table !== undefined ? (
                <>
                    <Cirrculum
                        table={table.data}
                        addTable={undefined}
                        tooltips={tooltips}
                    />
                    <button className="blue-button" onClick={toQuery}>
                        下一步
                    </button>
                </>
            ) : (
                <button
                    className="blue-button"
                    onClick={toQueryWithoutCirriculum}
                >
                    略過此步驟
                </button>
            )}
        </>
    );
};

type Props = {
    table: TableType | undefined;
    setTable: React.Dispatch<React.SetStateAction<TableType | undefined>>;
};
const FileInput = ({ table, setTable }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
    const inputRef = useRef(null);

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
                const tbl = result["tbl"];
                setTable(tbl);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <button
                className="blue-button"
                onClick={() => {
                    document.getElementById("input_file")?.click();
                }}
            >
                選擇檔案...
            </button>
            <input
            ref={inputRef}
                className="hidden"
                type="file"
                name="file"
                id="input_file"
                accept=".html, .htm"
                onChange={handleChange}
            />
            {isFilePicked ? (
                <>
                    <p>檔案名稱：{file?.name}</p>
                    <button className="blue-button" onClick={()=>{
                        setFile(null);
                        setIsFilePicked(false);
                    }}>重設</button>
                </>
            ) : (
                <>
                    <p>請選擇一個包含課表的 html 檔案上傳</p>
                </>
            )}

            {table === undefined ? (
                <div>
                    <div>
                        <button
                            type="submit"
                            className="blue-button"
                            onClick={handleSubmit}
                            disabled={!isFilePicked}
                        >
                            上傳課表
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Import;

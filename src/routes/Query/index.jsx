import React, { useState, createContext } from "react";
import NerResult from "../../components/NerResult";
import QueryResult from "../../components/QueryResult";
import ReactSwitch from "react-switch";
import RecordBtn from "../../components/Recorder";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NerContext = createContext(null);

const Query = () => {
    const [checked, setCheck] = useState(true);
    const [nerData, setNerData] = useState(null);
    const [sentence, setSentence] = useState("");
    const [jsonTable, setJsonTable] = useState({
        columns: Array(),
        data: Array(),
        index: Array(),
    });
    const [course, setCourse] = useState(Array());
    const [step, setStep] = useState(1);
    // TODO: 判斷有無麥克風權限，沒有 = 0
    // 0: 初始化
    // 1: 開始選課
    // 2: 添加條件 / 選擇課程
    //   - 添加條件: 語音可以添加艘群條件
    //   - 選擇課程: 使用滑鼠選擇課程
    // 3: 完成選課
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    // console.log(jsonTable);
    const tips = [
        "若要查詢老師的課表，只需說出「某某 (教授/老師)的課表」即可。",
        "例如：我想找星期三下午桃園校區的選修課",
        "某某老師的微積分。",
        "尋找020304節資工系的必修",
        "畢業班的課程",
        "一句話中所提到的課程和老師的次數都只能一次。",
    ];
    useEffect(() => {
        console.log(course);
    }, [course]);

    const navigate = useNavigate();
    const toExport = () => {
        navigate("/export", { state: { course: course } });
    };

    return (
        <>
            <ReactSwitch
                checked={checked}
                onChange={() => setCheck(!checked)}
            />
            <NerContext.Provider
                value={[
                    nerData,
                    setNerData,
                    sentence,
                    setSentence,
                    jsonTable,
                    setJsonTable,
                ]}
            >
                <div className="mt-16 grid grid-rows-2 grid-cols-3 place-items-center p-4 sm:p-6 md:p-8">
                    {/* <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute bottom-20 left-24 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[1]}</div>
                        </div>
                    </div> */}
                    <div></div>
                    {/* <div></div>
                    <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute w-60 bottom-12 left-5 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[0]}</div>
                        </div>
                    </div> */}
                    <RecordBtn
                        nerData={nerData}
                        setNerData={setNerData}
                        sentence={sentence}
                        setSentence={setSentence}
                        jsonTable={jsonTable}
                        setJsonTable={setJsonTable}
                    />
                    <div></div>
                    <div></div>
                    <div className="relative w-96 h-full">
                        <div className="text-slate-700 text-xl tracking-wider leading-8 bg-gray-50 mt-16 px-8 py-4 rounded-full ring-1 ring-slate-500/10">
                            {checked ? (
                                <NerResult
                                    sentence={sentence}
                                    result={nerData}
                                />
                            ) : (
                                sentence
                            )}
                        </div>
                    </div>
                    <div>
                        {course.length === 0 ? (
                            <></>
                        ) : (
                            <button
                                className="blue-button"
                                onClick={() => {
                                    toExport();
                                }}
                            >
                                送出
                            </button>
                        )}
                    </div>
                    {/* <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute bottom-36 right-16 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[2]}</div>
                        </div>
                    </div>
                    <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute bottom-12 left-5 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[3]}</div>
                        </div>
                    </div>
                    <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute bottom-0 left-5 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[4]}</div>
                        </div>
                    </div>
                    <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute bottom-20 left-5 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[5]}</div>
                        </div>
                    </div> */}

                    {/* <Tips /> */}
                </div>
                <div className="flex flex-col">
                    <QueryResult
                        {...jsonTable}
                        course={course}
                        setCourse={setCourse}
                    />
                </div>
            </NerContext.Provider>
        </>
    );
};

export default Query;

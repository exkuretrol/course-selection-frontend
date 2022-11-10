import { FaMicrophone } from "react-icons/fa";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import NerResult from "../../components/NerResult";
import QueryResult from "../../components/QueryResult";
import ReactSwitch from "react-switch";

const NerContext = createContext(null);

const Query = () => {
    const [checked, setCheck] = useState(false);
    const handleChange = _ => {
        setCheck(!checked);
    }

    const [NerData, setNerData] = useState(null);
    const [sentence, setSentence] = useState("");
    const [jsonTable, setJsonTable] = useState({columns: Array(), data: Array()});
    // console.log(jsonTable);
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
            <ReactSwitch checked={checked} onChange={handleChange}/>
            <NerContext.Provider value={[NerData, setNerData, sentence, setSentence, jsonTable, setJsonTable]}>
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
                    <RecordBtn />
                    <div></div>
                    <div></div>
                    <div className="relative w-96 h-full">
                        <div className="text-slate-700 text-xl tracking-wider leading-8 bg-gray-50 mt-16 px-8 py-4 rounded-full ring-1 ring-slate-500/10">
                            { checked ? <NerResult sentence={sentence} result={NerData} /> : sentence}
                        </div>
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
                    <QueryResult {...jsonTable}/>
                </div>
            </NerContext.Provider>
        </>
    )
}

const RecordBtn = () => {
    const [NerData, setNerData, sentence, setSentence, jsonTable, setJsonTable] = useContext(NerContext);
    // TODO: tooltips, hover display right tool top

    // const [transcript, setTranscript] = useState('');
    const [isrecording, setRecording] = useState(false);

    // TODO: use MediaDevices without package
    const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

    const handleListenEvent = () => {
        if (isrecording) return;
        console.log('started');
        setRecording(!isrecording);
        startRecording();
    }

    const handleStopListenEvent = () => {
        if (!isrecording) return;
        console.log('stopped');
        setRecording(!isrecording);
        stopRecording();
    }

    useEffect(() => {
        uploadSoundData(mediaBlobUrl)
    }, [mediaBlobUrl]);

    const uploadSoundData = async (blobUrl) => {
        // const formData = new FormData();
        // let blob = await fetch(blobUrl)
        //     .then(res => res.blob())
        // formData.append("audio_data", blob, new Date().getTime() + ".ogg");

        // await fetch('http://localhost:4000/api/recognize', {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // setSentence(JSON.parse(data).text)
        setSentence("資工系星期四下午的必修");
        sendToNER(sentence);
        // })
        // .catch(e => console.log(e));
    }

    const sendToNER = async (text) => {
        // const res = { "result": [[{ "word": "玉璽", "tag": "PEOPLE", "idx": [0, 2] }, { "word": "機器學習", "tag": "SUBJECT", "idx": [5, 9] }, { "word": "桃園校區", "tag": "CAMPUS", "idx": [9, 13] }, { "word": "選修", "tag": "CATEGORY", "idx": [13, 15] }, { "word": "必修", "tag": "CATEGORY", "idx": [15, 17] }, { "word": "星期一", "tag": "TIME", "idx": [17, 20] }, { "word": "大學部", "tag": "EDUCATION", "idx": [20, 23] }, { "word": "一年級", "tag": "GRADE", "idx": [23, 26] }]] };
        // setNerData(res['result'][0]);
        await fetch('http://localhost:5000/api/ner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ "multiple": false, "text": text})
            body: JSON.stringify({ "multiple": false, "text": sentence})
        }).then((response) => response.json())
            .then((data) => {
                setNerData(data['result'][0]);
                setJsonTable(JSON.parse(data['tbl']));
                console.log('Success:', NerData);
                console.log('Success:', jsonTable);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <button onMouseDown={handleListenEvent} onMouseUp={handleStopListenEvent} onMouseOut={handleStopListenEvent} className="group bg-sky-300 p-4 sm:p-6 md:p-8 rounded-full hover:bg-sky-400 hover:ring-offset-8 hover:ring-2 hover:ring-sky-300/40">
                <FaMicrophone className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 fill-sky-900 group-hover:fill-white" />
            </button>
        </>
    )
}

export default Query;
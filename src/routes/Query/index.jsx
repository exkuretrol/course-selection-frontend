import { FaMicrophone } from "react-icons/fa";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import NerResult from "../../components/NerResult";

const NerContext = createContext(null);

const Query = () => {
    const [NerData, setNerData] = useState([]);
    const [sentence, setSentence] = useState("");
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
            <NerContext.Provider value={[NerData, setNerData, sentence, setSentence]}>
                <div className="mt-16 grid grid-rows-3 grid-cols-3 place-items-center p-4 sm:p-6 md:p-8">
                    <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute bottom-20 left-24 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[1]}</div>
                        </div>
                    </div>
                    <RecordBtn />
                    <div></div>
                    <div className="relative w-full h-full">
                        <div className="static text-slate-900/50 ">
                            <div className="absolute w-60 bottom-12 left-5 p-2 bg-white shadow-md rounded text-gray-500 ring-1 ring-gray-300/30">{tips[0]}</div>
                        </div>
                    </div>
                    <div className="relative w-96 h-full">
                        <div className="text-slate-700 text-lg tracking-wider leading-8 bg-gray-50 mt-16 px-8 py-4 rounded-full ring-1 ring-slate-500/10">
                            <NerResult sentence={sentence} result={NerData} />
                            {/* 我想要找
                            <NerTag name="資料探勘" tag="SUBJECT" /> */}
                        </div>
                    </div>
                    <div className="relative w-full h-full">
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
                    </div>

                    {/* <Tips /> */}
                </div>
                <div className="flex flex-col">
                    <QueryResult />
                </div>
                <div>
                    <DevConsole />
                </div>
            </NerContext.Provider>
        </>
    )
}

const RecordBtn = () => {
    const [NerData, setNerData, sentence, setSentence] = useContext(NerContext);
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
        setSentence("玉璽老師的機器學習桃園校區選修必修星期一大學部一年級");
        sendToNER(sentence);
        // })
        // .catch(e => console.log(e));
    }

    const sendToNER = async (text) => {
        const res = { "result": [[{ "word": "玉璽", "tag": "PEOPLE", "idx": [0, 2] }, { "word": "機器學習", "tag": "SUBJECT", "idx": [5, 9] }, { "word": "桃園校區", "tag": "CAMPUS", "idx": [9, 13] }, { "word": "選修", "tag": "CATEGORY", "idx": [13, 15] }, { "word": "必修", "tag": "CATEGORY", "idx": [15, 17] }, { "word": "星期一", "tag": "TIME", "idx": [17, 20] }, { "word": "大學部", "tag": "EDUCATION", "idx": [20, 23] }, { "word": "一年級", "tag": "GRADE", "idx": [23, 26] }]] };

        // await fetch('http://localhost:5000/api/ner', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     // body: JSON.stringify({ "multiple": false, "text": text})
        //     body: JSON.stringify({ "multiple": false, "text": sentence})
        // }).then((response) => response.json())
        //     .then((data) => {
        //         setNerData(data['result'][0]);
        //         console.log('Success:', NerData);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        setNerData(res['result'][0]);
    }

    return (
        <>
            <button onMouseDown={handleListenEvent} onMouseUp={handleStopListenEvent} onMouseOut={handleStopListenEvent} className="group bg-sky-300 p-4 sm:p-6 md:p-8 rounded-full hover:bg-sky-400 hover:ring-offset-8 hover:ring-2 hover:ring-sky-300/40">
                <FaMicrophone className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 fill-sky-900 group-hover:fill-white" />
            </button>
        </>
    )
}

const DevConsole = () => { }

const QueryResult = (table) => {
    const json_table = table || JSON.parse("{\"columns\":[\"No.\",\"\\u5236\\u5225\",\"\\u79d1\\u76ee\\u4ee3\\u865f\",\"\\u79d1\\u76ee\\u540d\\u7a31\",\"\\u79d1\\u76ee\\u540d\\u7a31\\u6ce8\\u97f3\",\"\\u73ed\\u7d1a\\u4ee3\\u865f\",\"\\u73ed\\u7d1a\\u540d\\u7a31\",\"\\u4efb\\u8ab2\\u6559\\u5e2b\",\"\\u4efb\\u8ab2\\u6559\\u5e2b\\u6ce8\\u97f3\",\"\\u8001\\u5e2b\\u7c21\\u7a31\",\"\\u8001\\u5e2b\\u7c21\\u7a31\\u6ce8\\u97f3\",\"\\u4e0a\\u8ab2\\u65e5\\u671f\\uff0f\\u7bc0\\u6b21\",\"\\u5e74\\u7d1a\",\"\\u6559\\u5ba4\",\"\\u6821\\u5340\",\"\\u9078\\u5225\",\"\\u5b78\\u5206\",\"\\u985e\\u5225\",\"\\u7562\\u696d\\u73ed\",\"\\u5b78\\u671f\\u6578\",\"\\u8aaa\\u660e\",\"\\u5be6\\u7fd2\\u8ab2\"],\"index\":[0,1,2,3,4,5,6,7,8,9],\"data\":[[3764,\"\\u5927\\u5b78\\u90e8\",\"00121\",\"\\u9ad4\\u80b2\\u58f9\",\"\\u310a\\u3127 \\u3129 \\u3127\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u6b50\\u6b63\\u8070\",\"\\u3121 \\u3113\\u3125 \\u3118\\u3128\\u3125\",\"\\u6b63\\u8070\",\"\\u3113\\u3125 \\u3118\\u3128\\u3125\",\"\\u4e000506\",1,\"\\u9ad4\\u80b2\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",0,\"\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"\",\"\\u5426\"],[3765,\"\\u5927\\u5b78\\u90e8\",\"00911\",\"\\u4eba\\u5de5\\u667a\\u6167\\u6982\\u8ad6\",\"\\u3116\\u3123 \\u310d\\u3128\\u3125 \\u3113 \\u310f\\u3128\\u311f \\u310d\\u311e \\u310c\\u3128\\u3123\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u9ad8\\u5de7\\u6c76\",\"\\u310d\\u3120 \\u3111\\u3127\\u3120 \\u3128\\u3123\",\"\\u5de7\\u6c76\",\"\\u3111\\u3127\\u3120 \\u3128\\u3123\",\"\\u56db0809\",1,\"S405\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",2,\"\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"\",\"\\u5426\"],[3766,\"\\u5927\\u5b78\\u90e8\",\"00997\",\"\\u73ed\\u6703\",\"\\u3105\\u3122 \\u310f\\u3128\\u311f\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u8449\\u751f\\u6b63\",\"\\u3127\\u311d \\u3115\\u3125 \\u3113\\u3125\",\"\\u751f\\u6b63\",\"\\u3115\\u3125 \\u3113\\u3125\",\"\\u4e0901\",1,\"S106\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",0,\"\",\"N\",\"\\u5168\\u5b78\\u5e74\",\"\",\"\\u5426\"],[3767,\"\\u5927\\u5b78\\u90e8\",\"00999\",\"\\u9031\\u6703\",\"\\u3113\\u3121 \\u310f\\u3128\\u311f\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\",\"\",\"\",\"\",\"\\u4e9405\",1,\"\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",0,\"\",\"N\",\"\\u5168\\u5b78\\u5e74\",\"\",\"\\u5426\"],[3768,\"\\u5927\\u5b78\\u90e8\",\"01108\",\"\\u61c9\\u7528\\u82f1\\u6587\\u4e00\",\"\\u3127\\u3125 \\u3129\\u3125 \\u3127\\u3125 \\u3128\\u3123 \\u3127\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u5171\\u540c\\u6307\\u5c0e\",\"\\u310d\\u3128\\u3125 \\u310a\\u3128\\u3125 \\u3113 \\u3109\\u3120\",\"\",\"\",\"\\u56db05\",1,\"\\u7db2\\u4fee\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",0,\"\\u7db2\\u8def\\u6559\\u5b78\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"1.\\u6b63\\u8ab2\\uff1a\\u5229\\u7528\\u7dda\\u4e0aMoodle\\u5e73\\u53f0\\uff0c\\u81ea\\u884c\\u6536\\u770b\\u5b78\\u7fd2\\u5167\\u5bb9\\u4e4b\\u65b9\\u5f0f\\u9032\\u884c\\u30022.\\u5be6\\u7fd2\\u8ab2\\uff1a\\u4f9d\\u7167\\u8ab2\\u8868\\u6392\\u5b9a\\u6642\\u9593\\u6559\\u5ba4\\uff0c\\u6bcf\\u9031\\u56fa\\u5b9a\\u4e0a\\u8ab2\\u30023.\\u9762\\u6388\\uff1a\\u5be6\\u7fd2\\u8ab2\\u6642\\u9593\\u65bd\\u884c\\u3002\",\"\\u5426\"],[3769,\"\\u5927\\u5b78\\u90e8\",\"16109\",\"\\u591a\\u5a92\\u9ad4\\u5c0e\\u8ad6\",\"\\u3109\\u3128\\u311b \\u3107\\u311f \\u310a\\u3127 \\u3109\\u3120 \\u310c\\u3128\\u3123\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u9673\\u60e0\\u60e0\",\"\\u3114\\u3123 \\u310f\\u3128\\u311f \\u310f\\u3128\\u311f\",\"\\u60e0\\u60e0\",\"\\u310f\\u3128\\u311f \\u310f\\u3128\\u311f\",\"\\u4e09060708\",1,\"S301\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",3,\"\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"\",\"\\u5426\"],[3770,\"\\u5927\\u5b78\\u90e8\",\"16111\",\"\\u7a0b\\u5f0f\\u8a2d\\u8a08\\u4e00\",\"\\u3114\\u3125 \\u3115 \\u3115\\u311c \\u3110\\u3127 \\u3127\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u8449\\u6b63\\u8056\",\"\\u3127\\u311d \\u3113\\u3125 \\u3115\\u3125\",\"\\u6b63\\u8056\",\"\\u3113\\u3125 \\u3115\\u3125\",\"\\u4e94020304\",1,\"S301\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",3,\"\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"\",\"\\u5426\"],[3771,\"\\u5927\\u5b78\\u90e8\",\"16116\",\"\\u8cc7\\u8a0a\\u6982\\u8ad6\",\"\\u3117 \\u3112\\u3129\\u3123 \\u310d\\u311e \\u310c\\u3128\\u3123\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u5171\\u540c\\u6307\\u5c0e\",\"\\u310d\\u3128\\u3125 \\u310a\\u3128\\u3125 \\u3113 \\u3109\\u3120\",\"\",\"\",\"\\u56db07\",1,\"S104\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",1,\"\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"\",\"\\u5426\"],[3772,\"\\u5927\\u5b78\\u90e8\",\"16123\",\"\\u50b3\\u64ad\\u6982\\u8ad6\",\"\\u3114\\u3128\\u3122 \\u3105\\u311b \\u310d\\u311e \\u310c\\u3128\\u3123\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u674e\\u5b87\\u6607\",\"\\u310c\\u3127 \\u3129 \\u3115\\u3125\",\"\\u5b87\\u6607\",\"\\u3129 \\u3115\\u3125\",\"\\u4e8c020304\",1,\"S107\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",3,\"\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"\",\"\\u5426\"],[3773,\"\\u5927\\u5b78\\u90e8\",\"16124\",\"\\u5fae\\u7a4d\\u5206\\u4e00\",\"\\u3128\\u311f \\u3110\\u3127 \\u3108\\u3123 \\u3127\",\"16101\",\"\\u8cc7\\u50b3\\u4e00\\u7532\",\"\\u674e\\u6b0a\\u660e\",\"\\u310c\\u3127 \\u3111\\u3129\\u3122 \\u3107\\u3127\\u3125\",\"\\u6b0a\\u660e\",\"\\u3111\\u3129\\u3122 \\u3107\\u3127\\u3125\",\"\\u4e8c060708\",1,\"EE311\",\"\\u6843\\u5712\",\"\\u5fc5\\u4fee\",3,\"\",\"N\",\"\\u4e0a\\u5b78\\u671f\",\"\",\"\\u5426\"]]}");

    const TableHeader = (columns) => {
        const ths = columns.map(col => (<th>{col}</th>));
        return (
            <thead>
                <tr>{ths}</tr>
            </thead>
        )
    }

    const TableBody = (rows) => {
        const trs = rows.map(row => {
            const tds = row.map(td => (<td>{td}</td>));
            return (
                <tr>{tds}</tr>
            );
        });
        return (
            <tbody>
                {trs}
            </tbody>
        );
    }

    const Table = () => {
        const picked_columns = [
            'No.',
            '科目名稱',
            '科目代號',
            '班級名稱',
            '班級代號',
            '任課教師',
            '上課日期／節次',
            '年級',
            '教室',
            '校區',
        ];
        const picked_index = picked_columns.map(col => json_table["columns"].indexOf(col)) 
        const picked_table = json_table["data"].map(row => (
            picked_index.map(i => row[i])
        ));
        

        return (
            <table className="query-result-table mx-16 overflow-x-auto">
                {TableHeader(picked_columns)}
                {TableBody(picked_table)}
            </table>
        )
    }

    return (
        <>
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                檢索結果
                <p className="mt-1 text-sm font-normal text-gray-500">透過語音搜尋出來的結果可以接續著以「選擇第 n 堂課」加選課程。或是直接再以語音輸入重新搜尋課程。</p>
            </caption>
            {Table()}
        </>
    )
}



export default Query;
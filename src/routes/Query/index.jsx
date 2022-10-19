import { FaMicrophone } from "react-icons/fa";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

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
                            <NerResult sentence={sentence} result={NerData}/>
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
                setSentence("桃園校區早上的遊歷老師的墊子電路");
                sendToNER(sentence);
            // })
            // .catch(e => console.log(e));
    }

    const sendToNER = async (text) => {
        await fetch('http://localhost:5000/api/ner', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ "multiple": false, "text": text})
            body: JSON.stringify({ "multiple": false, "text": sentence})
        }).then((response) => response.json())
            .then((data) => {
                setNerData(data['result'][0]);
                console.log('Success:', NerData);
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

const DevConsole = () => { }

const QueryResult = () => {
    const json_table = {

    }
    return (
        <>
            <table className="query-result-table mx-16 overflow-x-auto">
                <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                    檢索結果
                    <p className="mt-1 text-sm font-normal text-gray-500">透過語音搜尋出來的結果可以接續著以「選擇第 n 堂課」加選課程。或是直接再以語音輸入重新搜尋課程。</p>
                </caption>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>科目名稱</th>
                        <th>科目代號</th>
                        <th>班級名稱</th>
                        <th>班級代號 </th>
                        <th>任課教師</th>
                        <th>上課日期／節次</th>
                        <th>年級</th>
                        <th>教室</th>
                        <th>校區</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>應用英文一</td>
                        <td>1108</td>
                        <td>電通一甲</td>
                        <td>5101</td>
                        <td>林怡君</td>
                        <td>一06</td>
                        <td>1</td>
                        <td>CC403</td>
                        <td>桃園</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>應用英文一</td>
                        <td>1108</td>
                        <td>電通一甲</td>
                        <td>5102</td>
                        <td>王力英</td>
                        <td>一06</td>
                        <td>1</td>
                        <td>CC406</td>
                        <td>桃園</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>計算機概論 </td>
                        <td>5113</td>
                        <td>電通一乙</td>
                        <td>5102</td>
                        <td>林佩穎</td>
                        <td>一0708</td>
                        <td>1</td>
                        <td>S302</td>
                        <td>桃園</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>計算機概論</td>
                        <td>13109</td>
                        <td>資管一乙</td>
                        <td>13102</td>
                        <td>邱觀彥</td>
                        <td>一0506</td>
                        <td>1</td>
                        <td>CC604</td>
                        <td>桃園</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

// const Tips = () => {
//     const tips = [
//         '若要查詢老師的課表，只需說出「某某 (教授/老師)的課表」即可。',
//         '例如：我想找星期三下午桃園校區的選修課',
//         '某某老師的微積分。',
//         '尋找020304節資工系的必修',
//         '畢業班的課程',
//         '一句話中所提到的課程和老師的次數都只能一次。'
//     ];

//     return (
//         <>
//             {
//                 tips.map((tip, i) => (
//                     Tip(tip, i)
//                 ))
//             }
//         </>
//     )
// }

// const Tip = (tip, i) => {
//     return (
//         <div className="relative w-full h-full">
//             <div className="static text-slate-900/50 " key={i}>
//                 <p className="absolute bottom-0 left-5">{tip}</p>
//             </div>
//         </div>
//     )
// }

const NerResult = ({ sentence, result}) => {
    const tags = result;
    if (tags === undefined) return;
    const sen = sentence;
    const sen_arr = Array.from(sen);

    let new_arr = Array()

    for(let i = 0; i < tags.length; i++)
    {
        let idx = tags[i].idx
        let pre = []
        if (i === 0) pre = Array(idx[0]).fill(false);
        else pre = Array(idx[0] - tags[i - 1].idx[1]).fill(false);
        pre.push(true);
        new_arr = new_arr.concat(pre);	

        let post = Array(idx[1] - idx[0] - 1 ).fill(undefined)
        new_arr = new_arr.concat(post);
    }
    
        
    let counter = -1;
    let tags_result = new_arr.map((el, i) => {
        if (el === undefined) return;
        if (el) {
            counter = counter + 1;
            return <NerTag name={tags[counter].word} tag={tags[counter].tag} />;
        }
        else return <>{sen_arr[i]}</>
    })

    return (
        <>
            {tags_result}
        </>
    )
}

const NerTag = ({ name, tag }) => {
    const tags = {
        "SUBJECT": "sky",
        "TIME": "yellow",
        "PEOPLE": "orange",
        "DEPARTMENT": "amber",
        "CATEGORY": "lime",
        "GRADE": "green",
        "CAMPUS": "cyan",
        "CURRICULUM": "indigo",
        "CREDIT": "purple",
        "SEMESTER": "pink",
        "EDUCATION": "rose",
        "INTERNSHIP": "violet",
        "GRADUATE": "teal",
        "CLASS": "emerald",
    }
    const color = tags[tag];
    const classA = `bg-${color}-100 text-${color}-800 rounded px-1 py-0.5`;
    const classB = `text-xs select-none bg-${color}-500 text-${color}-100 rounded font-semibold px-0.5 ml-1`;
    return (
        <>
            <span className={classA}>{name}<span className={classB}>{tag}</span></span>
        </>
    )
}

export default Query;
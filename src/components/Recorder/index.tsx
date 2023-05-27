import React from "react";
import { useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder-2";


type NerResultType = [{ word: string; tag: string; idx: number[] }];
type JsonTableType = {
    columns: string[];
    data: [(string | number)[]];
    index: number[];
};

type Props = {
    setNerData: React.Dispatch<React.SetStateAction<NerResultType | null>>;
    sentence: string;
    setSentence: React.Dispatch<React.SetStateAction<string>>;
    setJsonTable: React.Dispatch<React.SetStateAction<JsonTableType>>;
};

const RecordBtn = ({ setNerData, setSentence, sentence, setJsonTable }: Props) => {
    const { status, startRecording, stopRecording } = useReactMediaRecorder({
        audio: true,
        onStop: (blobUrl, blob) => uploadSoundData(blob),
        askPermissionOnMount: true,
    });
    useEffect(() => {
        const text = JSON.stringify({ "multiple": false, "text": sentence})
        NER(text);
    }, [sentence]) // eslint-disable-line react-hooks/exhaustive-deps

    const uploadSoundData = async (blob: Blob) => {
        const formData = new FormData()
        formData.append("audio_data", blob, new Date().getTime() + ".ogg");
        await fetch('http://localhost:3001/api/recognize', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const recognized_text = JSON.parse(data).text
                console.log('辨識完成的文字：', recognized_text);
                setSentence(recognized_text)
            })
            .catch(e => console.log(e));
        // const sen = "何組鳳老師的課";
        // const sen = "都防系的選修課";
        // const sen = "統資系大三的必修課";
        // const sen = "日文"
        // setSentence(sen);
    };

    const NER = async (text: string) => {
        await fetch("http://localhost:5000/api/ner", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: text,
        })
            .then(async (res) => {
                if (res.ok) return res.json();
                else console.log(await res.json());
                throw Error("SQL語法錯誤");
            })
            .then((data2) => {
                const ner_result = data2["result"][0];
                const query_json_table = data2["tbl"];
                setNerData(ner_result);
                setJsonTable(query_json_table);
                console.log(ner_result);
                console.log(query_json_table);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className="flex flex-col">
                <p className="px-4 py-2 bg-yellow-800 text-yellow-100 mb-4 rounded-sm text-center">
                    {status}
                </p>
                <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseOut={stopRecording}
                    className="group bg-sky-300 p-4 sm:p-6 md:p-8 rounded-full hover:bg-sky-400 hover:ring-offset-8 hover:ring-2 hover:ring-sky-300/40"
                >
                    <FaMicrophone className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 fill-sky-900 group-hover:fill-white" />
                </button>
            </div>
        </>
    );
};

export default RecordBtn;

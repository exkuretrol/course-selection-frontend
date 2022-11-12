import { FaMicrophone } from "react-icons/fa";
import { useReactMediaRecorder } from "react-media-recorder";
const RecordBtn = ({
    nerData,
    setNerData,
    sentence,
    setSentence,
    jsonTable,
    setJsonTable,
}) => {
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({
            audio: true,
            onStop: (blobUrl, blob) => uploadSoundData(blob),
            askPermissionOnMount: true,
        });

    const uploadSoundData = async (blob) => {
        const formData = new FormData();
        formData.append("audio_data", blob, new Date().getTime() + ".ogg");

        // await fetch('http://localhost:4000/api/recognize', {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(async data => {
        //         const recognized_text = JSON.parse(data).text
        //         console.log('辨識完成的文字：', recognized_text);
        //         setSentence(recognized_text)
        //         const text = JSON.stringify({ "multiple": false, "text": recognized_text })
        //         console.log('送給 NER 的 json', text)
        //         return text
        //     })
        //     .then(text => {
        //         // if (text['text'] !== '你好')
        //         //     NER(text)
        //         // const sen = "資工系禮拜一的選修課";
        //         const sen = "資工系李玉璽老師的選修課";
        //         const text1 = JSON.stringify({ "multiple": false, "text": sen})
        //         setSentence(sen)
        //         NER(text1)
        //     })
        //     .catch(e => console.log(e));
        // const sen = "資工系禮拜一的選修課";
        const sen = "資工系李玉璽老師的選修課";
        const text1 = JSON.stringify({ multiple: false, text: sen });
        setSentence(sen);
        NER(text1);
    };

    const NER = async (text) => {
        await fetch("http://localhost:5000/api/ner", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: text,
        })
            .then((res) => res.json())
            .then((data2) => {
                const ner_result = data2["result"][0];
                const query_json_table = JSON.parse(data2["tbl"] || null);

                setNerData(ner_result);
                setJsonTable(query_json_table);
                console.log(ner_result);
                console.log(query_json_table);
            })
            .catch((error) => {
                console.error("Error:", error);
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

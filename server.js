import "dotenv/config";
import express from "express";
import { SpeechClient } from "@google-cloud/speech";
import multer from "multer";
import cors from "cors";
import { readFileSync } from 'fs';
import { tmpdir } from "os";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const tmp_dir = tmpdir()
const storage = multer.diskStorage({
    destination: tmp_dir,
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post(
    "/api/recognize",
    upload.single("audio_data"),
    async function (req, res) {
        const client = new SpeechClient();
        const filename = req.file.path;

        const config = {
            encoding: "OGG_OPUS",
            sampleRateHertz: 48000,
            languageCode: "zh-TW",
        };

        const audio = {
            content: readFileSync(filename).toString("base64"),
        };

        const conf = {
            config: config,
            audio: audio,
        };

        const [operation] = await client.longRunningRecognize(conf);

        const [response] = await operation.promise();
        const transcription = response.results
            .map((result) => result.alternatives[0].transcript)
            .join("\n");
        const text = { text: transcription };

        res.json(JSON.stringify(text));
    }
);

const port = process.env.SPEECH_PORT
app.listen(port, () => {
    console.log(`Express server listening on port: ${port}...`);
});

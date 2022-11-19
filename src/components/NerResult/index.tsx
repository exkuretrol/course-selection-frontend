import React from "react";

type Props = {
    sentence: string;
    result: [{ word: string; tag: string; idx: number[] }];
};

const NerResult = ({ sentence, result }: Props) => {
    const tags = result;
    if (tags === undefined) return <></>;
    const sen = sentence;
    const sen_arr = Array.from(sen);

    type IndexArray = (boolean | undefined)[];
    let new_arr: IndexArray = [];

    for (let i = 0; i < tags.length; i++) {
        let idx = tags[i].idx;
        let pre: IndexArray = [];
        if (i === 0) pre = Array(idx[0]).fill(false);
        else pre = Array(idx[0] - tags[i - 1].idx[1]).fill(false);
        pre.push(true);
        new_arr = new_arr.concat(pre);

        let post = Array(idx[1] - idx[0] - 1).fill(undefined);
        new_arr = new_arr.concat(post);
    }

    let tail = Array(sen_arr.length - tags[tags.length - 1].idx[1]).fill(false);
    new_arr = new_arr.concat(tail);

    let counter = -1;

    let tags_result = new_arr.map((el, i) => {
        if (el) {
            counter = counter + 1;
            return (
                <NerTag
                    key={i}
                    name={tags[counter].word}
                    tag={tags[counter].tag}
                />
            );
        } else if (el === undefined) {
            return null;
        } else return <span key={i}>{sen_arr[i]}</span>;
    });

    return <>{tags_result}</>;
};

type NerTagProps = {
    name: string;
    tag: string;
};

const NerTag = ({ name, tag }: NerTagProps) => {
    const tags = {
        SUBJECT: "sky",
        TIME: "yellow",
        PEOPLE: "orange",
        DEPARTMENT: "amber",
        CATEGORY: "lime",
        GRADE: "green",
        CAMPUS: "cyan",
        CURRICULUM: "indigo",
        CREDIT: "purple",
        SEMESTER: "pink",
        EDUCATION: "rose",
        INTERNSHIP: "violet",
        GRADUATE: "teal",
        CLASS: "emerald",
    };
    const color: string = tags[tag as keyof typeof tags];
    const classA = `bg-${color}-100 text-${color}-800 rounded px-1 py-0.5 mx-1`;
    const classB = `text-xs select-none bg-${color}-500 text-${color}-100 rounded font-semibold px-0.5 ml-1`;
    return (
        <>
            <span className={classA}>
                {name}
                <span className={classB}>{tag}</span>
            </span>
        </>
    );
};

export default NerResult;

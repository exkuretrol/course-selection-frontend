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

export default NerResult;
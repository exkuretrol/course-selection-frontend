import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Cirrculum from "../../components/Curriculum";

type TableType = {
    columns: string[];
    data: string[][];
    index: number[];
};

interface LocationStateProps {
    course: Set<number>;
    table: TableType;
}

const Export = () => {
    const location = useLocation();
    const myState: LocationStateProps = location.state! as LocationStateProps;
    const course_list = Array.from(myState.course);
    const Cirriculum = myState.table;
    const [res, setRes] = useState<string[][]>();
    console.log(myState);

    const tooltips: JSX.Element[] | undefined = useMemo(() => {
        return [];
    }, []);

    // const tblRef = useRef<string[][]>();

    fetch("http://localhost:5000/api/queryById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courses: course_list }),
    })
        .then(async (res) => {
            if (res.ok) return await res.json();
            throw new Error("SQL 語法錯誤");
        })
        .then((data) => {
            const Day = new Map<string, number>([
                ["一", 0],
                ["二", 1],
                ["三", 2],
                ["四", 3],
                ["五", 4],
                ["六", 5],
                ["日", 6],
            ]);
            const tbl = data["tbl"]["data"].map((course: string[]) => {
                const TimeStr = course[11];
                const TimeSeq = TimeStr.substring(1, TimeStr.length).match(
                    /(..)/g
                ) as string[];
                const start = TimeSeq[0] as string;
                const end = TimeSeq[TimeSeq.length - 1] as string;

                return [
                    course[2],
                    course[3],
                    course[5],
                    course[15],
                    course[13],
                    `${course[16]}`,
                    course[15] === "必修" ? "Y" : "N",
                    `${
                        (Day.get(course[11].substring(0, 1)) as number) + 1
                    }`,
                    start,
                    end,
                ];
            });
            setRes(tbl)
        })
        .catch((err) => {
            console.error(err);
        });
    return (
        <>
            <Cirrculum
                table={Cirriculum?.data}
                addTable={undefined}
                tooltips={tooltips}
            />
            <Cirrculum
                table={undefined}
                addTable={res}
                tooltips={tooltips}
            />
        </>
    );
};


// type Props = {
//     course_list: number[];
//     // setJsonTable: React.Dispatch<React.SetStateAction<JsonTableType>>
// };

// const FetchInfomation = ({ course_list }: Props) => {
//     const [res, setRes] = useState<string[][]>([[]])
//     return (
//         <></>
//         // <Cirrculum
//         //     table={undefined}
//         //     addTable={res}
//         //     tooltips={undefined}
//         // />
//     )
// };

export default Export;

import React, { useEffect } from "react";
import ReactTooltip from "react-tooltip";

type Props = {
    table: string[][] | undefined;
    addTable: string[][] | undefined;
    tooltips: JSX.Element[] | undefined;
};

const Cirrculum = ({ table, addTable, tooltips }: Props) => {
    console.log("table", table, "addTable", addTable);
    useEffect(() => {
        ReactTooltip.rebuild();
    }, [tooltips]);

    if (table !== undefined && addTable !== undefined)
        table = table.concat(addTable);
    if (table === undefined && addTable === undefined) return <></>;
    if (addTable !== undefined && table === undefined) table = addTable;
    if (table === undefined) return <></>;

    const columns = [
        "科目代號",
        "科目名稱",
        "班級代號",
        "選別",
        "教室",
        "學分",
        "是否正課",
        "星期",
        "起節次",
        "終節次",
    ];

    const Day = new Map<string, number>([
        ["一", 0],
        ["二", 1],
        ["三", 2],
        ["四", 3],
        ["五", 4],
        ["六", 5],
        ["日", 6],
    ]);

    const Time = new Map<string, number>([
        ["01", 0],
        ["02", 1],
        ["03", 2],
        ["04", 3],
        ["20", 4],
        ["05", 5],
        ["06", 6],
        ["07", 7],
        ["08", 8],
        ["09", 9],
        ["30", 10],
        ["40", 11],
        ["50", 12],
        ["60", 13],
        ["70", 14],
    ]);

    type TableBodyProps = {
        Day: Map<string, number>;
        Time: Map<string, number>;
        CourseTable: CourseTableType;
    };

    type CourseTableType = {
        [k: string]: number | string;
    }[];

    const TableBody = ({ Day, Time, CourseTable }: TableBodyProps) => {
        const colorList = [
            "neutral",
            "red",
            "orange",
            "amber",
            "yellow",
            "lime",
            "green",
            "emerald",
            "teal",
            "cyan",
            "sky",
            "blue",
            "indigo",
            "violet",
            "purple",
            "fuchsia",
            "pink",
            "rose",
        ].sort(() => (Math.random() > 0.5 ? 1 : -1));
        const s = new Set(
            CourseTable.map((course) => course.科目代號 as number)
        );

        const m = new Map(
            Array.from(s).map((color, i) => [color, colorList[i]])
        );

        const disableTable = CourseTable.map((course) => {
            return Array((course.節次長 as number) - 1)
                .fill(null)
                .map(
                    (element, index) => index + ((course.起節次 as number) + 1)
                )
                .map((el) => [course.星期, el]);
        }).flat();

        return Array.from(Time.keys()).map((row, ind) => {
            const tds = Array.from(Day.keys()).map((col, iind) => {
                for (let course of CourseTable) {
                    if (course.星期 === iind + 1 && course.起節次 === ind) {
                        const c = m.get(course.科目代號 as number);
                        const c_class = `bg-${c}-300 subject h-${
                            12 * (course.節次長 as number)
                        }`;
                        tooltips?.push(
                            <ReactTooltip
                                id={
                                    (course.是否正課 as string) === "Y"
                                        ? (course.科目代號 as string)
                                        : course.科目代號 + "實習"
                                }
                                type="dark"
                            >
                                <div className="not-prose">
                                    <h3>{course.科目名稱}</h3>
                                    <ul>
                                        <li>科目代號：{course.科目代號}</li>
                                        <li>班級代號：{course.班級代號}</li>
                                        <li>上課教室：{course.教室}</li>
                                    </ul>
                                </div>
                            </ReactTooltip>
                        );
                        return (
                            <>
                                <td
                                    key={iind}
                                    data-tip
                                    data-for={
                                        (course.是否正課 as string) === "Y"
                                            ? (course.科目代號 as string)
                                            : course.科目代號 + "實習"
                                    }
                                    className={c_class}
                                    rowSpan={course.節次長 as number}
                                >
                                    {course.是否正課 === "Y"
                                        ? course.科目名稱
                                        : course.科目名稱 + "實習"}
                                </td>
                            </>
                        );
                    }
                }
                for (let course of disableTable) {
                    if (course[0] === iind + 1 && course[1] === ind)
                        return <td hidden key={iind}></td>;
                }
                return <td key={iind} className="subject h-12"></td>;
            });
            return (
                <tr key={ind}>
                    <td>{row}</td>
                    {tds}
                </tr>
            );
        });
    };

    const timeTable = table.map((row) => {
        return Object.fromEntries(
            columns.map((col, iind) => {
                return [col, row[iind]];
            })
        );
    });

    const CourseTable: CourseTableType = timeTable.map((course) => {
        const course_start = Time.get(course.起節次) as number;
        const course_stop = Time.get(course.終節次) as number;
        const course_length = course_stop! - course_start! + 1;
        return {
            ...course,
            星期: parseInt(course.星期),
            起節次: course_start,
            終節次: course_stop,
            節次長: course_length,
        };
    });

    return (
        <div className="prose">
            <table className="table-auto course-table">
                <thead>
                    <tr>
                        <td></td>
                        <td>一</td>
                        <td>二</td>
                        <td>三</td>
                        <td>四</td>
                        <td>五</td>
                        <td>六</td>
                        <td>日</td>
                    </tr>
                </thead>
                <tbody>{TableBody({ Day, Time, CourseTable })}</tbody>
            </table>
            {tooltips}
        </div>
    );
};

export default Cirrculum;

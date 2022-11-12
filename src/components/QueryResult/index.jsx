const QueryResult = ({ columns, data, course, setCourse }) => {
    if (Object.is(data, undefined)) {
        return (
            <>
                <div className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                    檢索結果
                    <p className="mt-1 text-sm font-normal text-gray-500">
                        （說明文字）透過語音搜尋出來的結果可以接續著以「選擇第 n
                        堂課」加選課程。或是直接再以語音輸入重新搜尋課程。
                    </p>
                </div>
            </>
        );
    }

    const TableHeader = (columns) => {
        const ths = columns.map((col, i) => <th key={i}>{col}</th>);
        return (
            <thead>
                <tr>{ths}</tr>
            </thead>
        );
    };

    const TableBody = (rows) => {
        const trs = rows.map((row, i) => {
            const tds = row.map((td, ii) => {
                return <td key={ii}>{td}</td>;
            });
            return (
                <tr
                    key={i}
                    onClick={() => {
                        setCourse(new Set([...course, data[i][0]]));
                        // this.setState({active: !this.state.active})
                    }}
                >
                    {tds}
                </tr>
            );
        });
        return <tbody>{trs}</tbody>;
    };

    const Table = () => {
        const picked_columns = [
            // 'No.',
            "科目名稱",
            "科目代號",
            // '班級名稱',
            // '班級代號',
            "任課教師",
            "上課日期／節次",
            "年級",
            "選別",
            "教室",
            "校區",
        ];

        const picked_index = picked_columns.map((col) => columns.indexOf(col));
        const picked_table = data.map((row) => picked_index.map((i) => row[i]));

        return (
            <table className="query-result-table mx-16 overflow-x-auto">
                {TableHeader(picked_columns)}
                {TableBody(picked_table)}
            </table>
        );
    };

    return (
        <>
            <div className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                檢索結果
                <p className="mt-1 text-sm font-normal text-gray-500">
                    （說明文字）透過語音搜尋出來的結果可以接續著以「選擇第 n
                    堂課」加選課程。或是直接再以語音輸入重新搜尋課程。
                </p>
            </div>
            {Table()}
        </>
    );
};

export default QueryResult;

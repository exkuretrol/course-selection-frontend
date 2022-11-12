import { useLocation } from "react-router-dom";
import Cirrculum from "../../components/Curriculum";

const Export = () => {
    // const [jsonTable, setJsonTable] = useState([]);
    const location = useLocation();
    const course_list = Array.from(location.state.course);

    // useEffect(() => {
    //     console.log(jsonTable);
    // }, [jsonTable])

    return (
        <>
            <Cirrculum />
            {/* <FetchInfomation courses={course_list} /> */}
        </>
    );
};

const FetchInfomation = ({ courses }) => {
    const getTable = async () => {
        await fetch("http://localhost:5000/api/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courses: courses }),
        })
            .then((res) => res.json())
            .then((data) => {
                const response_data = JSON.parse(data["tbl"] || null);
                // setJsonTable(response_data)
            });
    };

    getTable();

    return (
        <ul>
            {courses.map((el, i) => (
                <li key={i}>{el}</li>
            ))}
        </ul>
    );
};

export default Export;

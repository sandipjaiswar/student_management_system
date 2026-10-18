import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Students() {
    const [students, setStudents] = useState([]);

    const deleteStudent = async (id) => {
        await fetch(
            `/api/students/${id}`,
            {
                method: "DELETE",
            }
        );

        setStudents(
            students.filter((student) => student._id !== id)
        );
    };

    const fetchStudents = async () => {
        try {
            const response = await fetch(
                "/api/students"
            );

            const data = await response.json();

            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Students</h1>

            {students.map((student) => (
                <div className="student-card" key={student._id}>
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <p>{student.course}</p>
                    <div className="actions">
                        <Link to={`/edit/${student._id}`}>
                            Edit
                        </Link>
                        <button onClick={() => deleteStudent(student._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default Students;
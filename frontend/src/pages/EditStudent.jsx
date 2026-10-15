import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${id}`
      );

      const data = await response.json();

      setFormData({
        name: data.name || "",
        email: data.email || "",
        course: data.course || "",
      });
    } catch (error) {
      console.error("Failed to load student", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>

      <form  className="student-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
        />

        <button type="submit">
          Update Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
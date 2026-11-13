
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const fetchStudents = async () => {
    const response = await fetch("http://localhost:5000/students");
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, course })
    });

    if (response.ok) {
      alert("Student added successfully!");
      setName("");
      setEmail("");
      setCourse("");
      fetchStudents();
    } else {
      alert("Unable to add student");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Student Management System</h1>

      <form onSubmit={addStudent}>
        <input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>

      {students.map((student) => (
        <div key={student.id}>
          <p>
            {student.name} | {student.email} | {student.course}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;


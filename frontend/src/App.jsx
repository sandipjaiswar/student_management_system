import { Routes, Route, Link } from "react-router-dom";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <div className="container">
      <h1>Student Management System</h1>

      <nav className="nav">
        <Link to="/">Students</Link>
        <Link to="/add">Add Student</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
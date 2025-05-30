import { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "./EditalModal";
import axiosInstance from "../../api/axiosInstance";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axiosInstance.get("/courses")
    setCourses(res.data);
  };

  const handleCreate = async () => {
    if (!name) return;
    await axios.post("/courses", { name }, {
      headers: { Authorization: token }
    });
    setName("");
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/courses/${id}`, {
      headers: { Authorization: token }
    });
    fetchCourses();
  };

  const openEdit = (course) => {
    setEditingId(course.id);
    setEditName(course.name);
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:8080/courses/${editingId}`, { name: editName }, {
      headers: { Authorization: token }
    });
    setEditingId(null);
    fetchCourses();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cursos</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Nome do curso"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">
        Adicionar
      </button>

      <ul className="mt-4">
        {courses.map(course => (
          <li key={course.id} className="flex justify-between items-center mb-2">
            <span>{course.name}</span>
            <div className="space-x-2">
              <button onClick={() => openEdit(course)} className="text-yellow-500">Editar</button>
              <button onClick={() => handleDelete(course.id)} className="text-red-500">Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      <EditModal
        isOpen={editingId !== null}
        onClose={() => setEditingId(null)}
        onSave={handleEditSave}
        value={editName}
        setValue={setEditName}
      />
    </div>
  );
}

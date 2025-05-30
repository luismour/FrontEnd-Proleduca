import { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "./EditalModal";

export default function Institutions() {
  const [institutions, setInstitutions] = useState([]);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    const res = await axios.get("http://localhost:8080/institutions", {
      headers: { Authorization: token }
    });
    setInstitutions(res.data);
  };

  const handleCreate = async () => {
    if (!name) return;
    await axios.post("http://localhost:8080/institutions", { name }, {
      headers: { Authorization: token }
    });
    setName("");
    fetchInstitutions();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/institutions/${id}`, {
      headers: { Authorization: token }
    });
    fetchInstitutions();
  };

  const openEdit = (institution) => {
    setEditingId(institution.id);
    setEditName(institution.name);
  };

  const handleEditSave = async () => {
    await axios.put(`http://localhost:8080/institutions/${editingId}`, { name: editName }, {
      headers: { Authorization: token }
    });
    setEditingId(null);
    fetchInstitutions();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Instituições</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Nome da instituição"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
        Adicionar
      </button>

      <ul className="mt-4">
        {institutions.map(inst => (
          <li key={inst.id} className="flex justify-between items-center mb-2">
            <span>{inst.name}</span>
            <div className="space-x-2">
              <button onClick={() => openEdit(inst)} className="text-yellow-500">Editar</button>
              <button onClick={() => handleDelete(inst.id)} className="text-red-500">Excluir</button>
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

import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/users", {
      headers: { Authorization: token }
    });
    setUsers(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id} className="mb-2">
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

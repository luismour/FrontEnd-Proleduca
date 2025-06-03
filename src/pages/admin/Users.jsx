// src/pages/admin/Users.jsx
import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; //

// --- Ícones ---
const PlusIcon = () => ( /* ...código do ícone... */ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
<path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
</svg>);
const EditIcon = () => ( /* ...código do ícone... */ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
</svg>);
const TrashIcon = () => ( /* ...código do ícone... */ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
<path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25V4.075c.827-.05 1.66-.075 2.5-.075Z" clipRule="evenodd" />
</svg>);
const SearchIcon = () => ( /* ...código do ícone... */ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
<path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
</svg>);
const NoUsersIcon = () => ( /* ...código do ícone... */ <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0zM17.25 15H21m-3.75-3.75H21m-3.75-3.75H21" />
</svg>);


export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/customers"); // Rota correta para buscar
      setAllUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Falha ao carregar usuários. Tente novamente mais tarde.");
      setAllUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário? Esta ação é PERMANENTE.")) {
      setIsLoading(true); 
      setError(null);
      try {
        await axiosInstance.delete(`/customers/${userId}`); 
        alert("Usuário excluído com sucesso!");
        fetchUsers(); 
      } catch (err) {
        console.error("Erro ao excluir usuário:", err.response?.data || err.message);
        const apiError = err.response?.data?.message || "Falha ao excluir usuário.";
        setError(apiError);
        alert(apiError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) {
      return allUsers;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    const searchTermDigits = searchTerm.replace(/\D/g, ''); 
    return allUsers.filter(user => {
      const nameMatch = user.fullName ? user.fullName.toLowerCase().includes(lowerSearchTerm) : false;
      const emailMatch = user.email ? user.email.toLowerCase().includes(lowerSearchTerm) : false; // Adicionada verificação se user.email existe
      const cpfMatch = user.cpf ? user.cpf.replace(/\D/g, '').includes(searchTermDigits) : false;
      
      return nameMatch || emailMatch || cpfMatch;
    });
  }, [allUsers, searchTerm]);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Gerenciar Usuários
        </h1>
        {/* Adicionar Link para novo usuário se existir a rota e o formulário UserForm.jsx */}
        {/* <Link
          to="/admin/users/new"
          className="btn btn-primary inline-flex items-center w-full sm:w-auto justify-center"
        >
          <PlusIcon />
          Adicionar Usuário
        </Link> */}
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="relative max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar por Nome, Email ou CPF do usuário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 w-full"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {isLoading && filteredUsers.length === 0 && <p className="p-8 text-center text-gray-500">Carregando usuários...</p>}
        {!isLoading && filteredUsers.length === 0 && !error && (
          <div className="p-8 text-center text-gray-500">
            <NoUsersIcon />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {searchTerm ? "Nenhum usuário encontrado." : "Nenhum usuário cadastrado"}
            </h3>
            {/* {!searchTerm && <p className="mt-1 text-sm text-gray-500">Comece adicionando um novo usuário.</p>} */}
          </div>
        )}
        
        {filteredUsers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="th-admin">ID</th>
                  <th className="th-admin">Nome / Email</th>
                  <th className="th-admin hidden md:table-cell">CPF</th>
                  <th className="th-admin hidden sm:table-cell">Status</th>
                  <th className="th-admin hidden lg:table-cell">Roles</th>
                  <th className="th-admin text-right pr-6">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="td-admin font-mono text-xs">{user.id}</td>
                    <td className="td-admin font-medium text-gray-900">
                        {user.fullName || user.email || "N/A"}
                        {user.fullName && user.email && <span className="block text-xs text-gray-500">{user.email}</span>}
                    </td>
                    <td className="td-admin hidden md:table-cell">{user.cpf || <span className="italic text-gray-400">N/A</span>}</td>
                    <td className="td-admin hidden sm:table-cell">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.status ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="td-admin hidden lg:table-cell">
                        {user.roles && user.roles.length > 0 
                            ? user.roles.map(role => typeof role === 'object' ? role.type : role).join(', ') 
                            : <span className="italic text-gray-400">Nenhuma</span>
                        }
                    </td>
                    <td className="td-admin text-right pr-6 space-x-1 sm:space-x-3 whitespace-nowrap">
                      <button 
                        // onClick={() => navigate(`/admin/users/edit/${user.id}`)} // Descomente se UserForm.jsx existir
                        className="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
                        title="Editar Usuário"
                        disabled={isLoading} // Ou um loading específico para a ação
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                        title="Excluir Usuário"
                        disabled={isLoading}
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
         {filteredUsers.length > 0 && <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">Exibindo {filteredUsers.length} de {allUsers.length} usuário(s)</div>}
      </div>
    </div>
  );
}
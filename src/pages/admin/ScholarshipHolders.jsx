// src/pages/admin/ScholarshipHolders.jsx
import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; //


const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>
);
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M2.695 14.763l-1.262 3.154a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.885L17.5 5.5a2.121 2.121 0 0 0-3-3L3.58 13.42a4 4 0 0 0-.885 1.343Z" />
    </svg>
);
const TrashIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25V4.075c.827-.05 1.66-.075 2.5-.075Z" clipRule="evenodd" />
</svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
  </svg>
);

const NoScholarshipHoldersIcon = () => (
    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 4.5-7.5-4.5" />
    </svg>
);


export default function ScholarshipHolders() {
  const [allBolsistas, setAllBolsistas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBolsistas();
  }, []);

  const fetchBolsistas = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/scholarship-holders"); // Endpoint GET para listar bolsistas
      setAllBolsistas(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar bolsistas:", err);
      setError("Falha ao carregar bolsistas. Tente novamente mais tarde.");
      setAllBolsistas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (bolsistaId) => {
    if (window.confirm("Tem certeza que deseja excluir este bolsista? Esta ação pode afetar inscrições associadas e não pode ser desfeita.")) {
      setIsLoading(true); 
      setError(null);
      try {
        await axiosInstance.delete(`/scholarship-holders/${bolsistaId}`); // Endpoint DELETE
        alert("Bolsista excluído com sucesso!");
        fetchBolsistas();
      } catch (err) {
        console.error("Erro ao excluir bolsista:", err.response?.data || err.message);
        const apiError = err.response?.data?.message || "Falha ao excluir bolsista.";
        setError(apiError);
        alert(apiError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredBolsistas = useMemo(() => {
    if (!searchTerm.trim()) {
      return allBolsistas;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    const searchTermDigits = searchTerm.replace(/\D/g, '');

    return allBolsistas.filter(bolsista => {
      const fullNameMatch = bolsista.fullName && bolsista.fullName.toLowerCase().includes(lowerSearchTerm);
      // Verifica o CPF do bolsista e também o CPF do customer associado, se existir e for útil na busca
      const bolsistaCpfMatch = bolsista.cpf && bolsista.cpf.replace(/\D/g, '').includes(searchTermDigits);
      const customerCpfMatch = bolsista.customers?.cpf && bolsista.customers.cpf.replace(/\D/g, '').includes(searchTermDigits);
      
      return fullNameMatch || bolsistaCpfMatch || customerCpfMatch;
    });
  }, [allBolsistas, searchTerm]);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Gerenciar Bolsistas
        </h1>
        <Link
          to="/admin/scholarship-holders/new" // Rota para o formulário de adicionar
          className="btn btn-primary inline-flex items-center w-full sm:w-auto justify-center"
        >
          <PlusIcon />
          Adicionar Bolsista
        </Link>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="relative max-w-lg"> {/* Limita a largura da barra de busca */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar por Nome ou CPF do Bolsista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 w-full" // Usa classe global .form-input
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {isLoading && filteredBolsistas.length === 0 && <p className="p-8 text-center text-gray-500">Carregando bolsistas...</p>}
        {!isLoading && filteredBolsistas.length === 0 && !error && (
          <div className="p-8 text-center text-gray-500">
            <NoScholarshipHoldersIcon />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {searchTerm ? "Nenhum bolsista encontrado." : "Nenhum bolsista cadastrado"}
            </h3>
            {!searchTerm && <p className="mt-1 text-sm text-gray-500">Comece adicionando um novo bolsista.</p>}
          </div>
        )}
        
        {filteredBolsistas.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="th-admin">Nome Completo</th>
                  <th className="th-admin hidden md:table-cell">CPF (Bolsista)</th>
                  <th className="th-admin hidden sm:table-cell">Email (Cliente)</th>
                  <th className="th-admin hidden lg:table-cell">Necessidades</th>
                  <th className="th-admin text-right pr-6">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBolsistas.map(bolsista => (
                  <tr key={bolsista.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="td-admin font-medium text-gray-900">{bolsista.fullName || <span className="italic text-gray-400">Não informado</span>}</td>
                    <td className="td-admin hidden md:table-cell">{bolsista.cpf || <span className="italic text-gray-400">Não informado</span>}</td>
                    <td className="td-admin hidden sm:table-cell">{bolsista.customers?.email || <span className="italic text-gray-400">Não associado</span>}</td>
                    <td className="td-admin hidden lg:table-cell">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${bolsista.needs ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                        {bolsista.needs ? 'Sim' : 'Não'}
                      </span>
                    </td>
                    <td className="td-admin text-right pr-6 space-x-1 sm:space-x-3 whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/admin/scholarship-holders/edit/${bolsista.id}`)} 
                        className="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
                        title="Editar Bolsista"
                        disabled={isLoading}
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => handleDelete(bolsista.id)} 
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                        title="Excluir Bolsista"
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
         {filteredBolsistas.length > 0 && <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">Exibindo {filteredBolsistas.length} de {allBolsistas.length} bolsista(s)</div>}
      </div>
    </div>
  );
}


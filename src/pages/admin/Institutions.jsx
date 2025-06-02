
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axiosInstance from "../../api/axiosInstance"; 


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


export default function Institutions() {
  const [institutions, setInstitutions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/institutions");
      setInstitutions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar instituições:", err);
      setError("Falha ao carregar instituições. Tente novamente mais tarde.");
      setInstitutions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta instituição? Esta ação não pode ser desfeita.")) {

      setIsLoading(true); 
      setError(null);
      try {
        await axiosInstance.delete(`/institutions/${id}`);
        alert("Instituição excluída com sucesso!");
        fetchInstitutions(); 
      } catch (err) {
        console.error("Erro ao excluir instituição:", err.response?.data || err.message);
        const apiError = err.response?.data?.message || `Falha ao excluir instituição.`;
        setError(apiError);
        alert(apiError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Instituições Cadastradas
        </h1>
        <Link
          to="/admin/institutions/new"
          className="btn btn-primary inline-flex items-center w-full sm:w-auto justify-center" 
        >
          <PlusIcon />
          Adicionar Instituição
        </Link>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {isLoading && institutions.length === 0 && <p className="p-8 text-center text-gray-500">Carregando instituições...</p>}
        {!isLoading && institutions.length === 0 && !error && (
          <div className="p-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma instituição cadastrada</h3>
            <p className="mt-1 text-sm text-gray-500">Comece adicionando uma nova instituição.</p>
          </div>
        )}
        
        {institutions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="th-admin">Nome</th>
                  <th className="th-admin hidden md:table-cell">Tipo</th>
                  <th className="th-admin hidden sm:table-cell">Cidade/UF</th>
                  <th className="th-admin">Status</th>
                  <th className="th-admin text-right pr-6">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {institutions.map(inst => (
                  <tr key={inst.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="td-admin font-medium text-gray-900">{inst.name}</td>
                    <td className="td-admin hidden md:table-cell">{inst.type}</td>
                    <td className="td-admin hidden sm:table-cell">{inst.city} / {inst.state}</td>
                    <td className="td-admin">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${inst.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {inst.status ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td className="td-admin text-right pr-6 space-x-1 sm:space-x-3 whitespace-nowrap">
                      <button 
                        onClick={() => navigate(`/admin/institutions/edit/${inst.id}`)} 
                        className="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-md transition-colors"
                        title="Editar"
                        disabled={isLoading}
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => handleDelete(inst.id)} 
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                        title="Excluir"
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
         {institutions.length > 0 && <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">Total de instituições: {institutions.length}</div>}
      </div>
    </div>
  );
}


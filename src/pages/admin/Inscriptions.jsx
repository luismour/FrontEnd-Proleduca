// src/pages/admin/Inscriptions.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Adicionado useNavigate
import axiosInstance from "../../api/axiosInstance";

// --- Ícones ---
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
);
const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
);
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-500">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16ZM9.555 5.168A.75.75 0 008 5.75v5.188l-2.44-2.439a.75.75 0 10-1.06 1.061l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.061l-2.44 2.439V5.75a.75.75 0 00-.75-.582Z" clipRule="evenodd" />
    </svg>
);
const ArchiveBoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-500">
        <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h11A1.5 1.5 0 0 1 17 3.5v10.25a.75.75 0 0 1-1.5 0V6.25H4.5v7.5a.75.75 0 0 1-1.5 0V3.5Z" />
        <path d="M3.5 15.5A1.5 1.5 0 0 1 5 14h10a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 15 18H5a1.5 1.5 0 0 1-1.5-1.5v-1Z" />
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25V4.075c.827-.05 1.66-.075 2.5-.075Z" clipRule="evenodd" />
    </svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.18l.82-1.425a1.651 1.651 0 0 1 1.518-.888h1.908a1.651 1.651 0 0 1 1.518.888l.82 1.425a1.651 1.651 0 0 1 0 1.18l-.82 1.425a1.651 1.651 0 0 1-1.518.888H2.998a1.651 1.651 0 0 1-1.518-.888l-.819-1.425ZM6.25 10a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd" />
    </svg>
);


const StatusBar = ({ status }) => {
    let progressColor = 'bg-gray-400'; 
    let bgColor = 'bg-gray-200';   
    let textColor = 'text-gray-700';
    let widthPercent = '0%'; 
    let IconComponent = ArchiveBoxIcon;
    let statusLabel = status || "Desconhecido";

    if (status) {
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === 'confirmado' || lowerStatus === 'ativo') {
            progressColor = 'bg-green-500';
            textColor = 'text-green-700';
            widthPercent = '100%';
            IconComponent = CheckCircleIcon;
            statusLabel = "Confirmado";
        } else if (lowerStatus === 'pendente') {
            progressColor = 'bg-yellow-400';
            textColor = 'text-yellow-700';
            widthPercent = '50%'; 
            IconComponent = ClockIcon;
            statusLabel = "Pendente";
        } else if (lowerStatus === 'cancelado') {
            progressColor = 'bg-red-500';
            textColor = 'text-red-700';
            widthPercent = '100%'; 
            IconComponent = XCircleIcon;
            statusLabel = "Cancelado";
        }
    }
    
    return (
        <div className="flex flex-col items-start w-full">
            <div className="flex items-center mb-1">
                <IconComponent />
                <span className={`ml-2 text-sm font-medium ${textColor}`}>{statusLabel}</span>
            </div>
            <div className={`h-2 w-full rounded-full ${bgColor} overflow-hidden`}>
                <div 
                    className={`h-2 rounded-full ${progressColor} transition-all duration-500 ease-out`}
                    style={{ width: widthPercent }}
                ></div>
            </div>
        </div>
    );
};


export default function Inscriptions() {
  const [inscriptions, setInscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const possibleStatuses = ["Pendente", "Confirmado", "Cancelado"]; 

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const fetchInscriptions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get("/registrations"); 
      setInscriptions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar inscrições:", err);
      setError("Falha ao carregar inscrições. Tente novamente mais tarde.");
      setInscriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (inscriptionId, newStatus) => {
    const originalInscriptions = [...inscriptions];
    setInscriptions(prevInscriptions =>
      prevInscriptions.map(insc =>
        insc.id === inscriptionId ? { ...insc, status: newStatus, _isUpdating: true } : insc
      )
    );
    try {
      await axiosInstance.put(`/registrations/${inscriptionId}`, { status: newStatus }); 
      setInscriptions(prevInscriptions =>
        prevInscriptions.map(insc =>
          insc.id === inscriptionId ? { ...insc, _isUpdating: false } : insc
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err.response?.data || err.message);
      const apiError = err.response?.data?.message || "Falha ao atualizar status da inscrição.";
      setError(apiError);
      alert(apiError);
      setInscriptions(originalInscriptions);
    }
  };

  const handleDeleteInscription = async (inscriptionId) => {
    if (window.confirm("Tem certeza que deseja excluir esta inscrição? Esta ação não pode ser desfeita.")) {
        setIsLoading(true); // Pode-se usar um loading mais granular se preferir
        setError(null);
        try {
            await axiosInstance.delete(`/registrations/${inscriptionId}`); // Confirme este endpoint
            alert("Inscrição excluída com sucesso!");
            fetchInscriptions(); // Re-fetch para atualizar a lista
        } catch (err) {
            console.error("Erro ao excluir inscrição:", err.response?.data || err.message);
            const apiError = err.response?.data?.message || "Falha ao excluir inscrição.";
            setError(apiError);
            alert(apiError);
        } finally {
            setIsLoading(false);
        }
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const parts = dateString.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Gerenciar Inscrições
        </h1>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {isLoading && inscriptions.length === 0 && <p className="p-8 text-center text-gray-500">Carregando inscrições...</p>}
        {!isLoading && inscriptions.length === 0 && !error && (
          <div className="p-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma inscrição encontrada</h3>
          </div>
        )}
        
        {inscriptions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="th-admin">ID</th>
                  <th className="th-admin">Bolsista</th>
                  <th className="th-admin hidden sm:table-cell">CPF Bolsista</th>
                  <th className="th-admin hidden md:table-cell">Curso</th>
                  <th className="th-admin hidden lg:table-cell">Instituição</th>
                  <th className="th-admin hidden xl:table-cell">Data</th>
                  <th className="th-admin px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Status</th>
                  <th className="th-admin text-center">Alterar Status</th>
                  <th className="th-admin text-right pr-6">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inscriptions.map(insc => (
                  <tr key={insc.id} className={`hover:bg-gray-50 transition-colors duration-150 ${insc._isUpdating ? 'opacity-50' : ''}`}>
                    <td className="td-admin font-mono text-xs">
                        <Link to={`/admin/inscriptions/${insc.id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                            {insc.id}
                        </Link>
                    </td>
                    <td className="td-admin font-medium text-gray-900 truncate max-w-xs">
                        <Link to={`/admin/inscriptions/${insc.id}`} className="hover:underline">
                            {insc.scholarshipHolders?.fullName || "N/A"}
                        </Link>
                    </td>
                    <td className="td-admin hidden sm:table-cell">{insc.scholarshipHolders?.cpf || "N/A"}</td>
                    <td className="td-admin hidden md:table-cell truncate max-w-xs">{insc.courses?.name || "N/A"}</td>
                    <td className="td-admin hidden lg:table-cell truncate max-w-xs">{insc.courses?.institutions?.name || "N/A"}</td>
                    <td className="td-admin hidden xl:table-cell">{formatDate(insc.registrationDate)}</td>
                    <td className="td-admin px-6 py-4 whitespace-nowrap">
                        <StatusBar status={insc.status} />
                    </td>
                    <td className="td-admin text-center px-6 py-4 whitespace-nowrap">
                      <select
                        value={insc.status}
                        onChange={(e) => handleStatusChange(insc.id, e.target.value)}
                        className="form-select text-sm py-1 px-2 w-full max-w-[160px] mx-auto"
                        disabled={insc._isUpdating}
                      >
                        {possibleStatuses.map(statusOpt => (
                          <option key={statusOpt} value={statusOpt.toLowerCase() === 'ativo' ? 'Confirmado' : statusOpt}>{statusOpt}</option>
                        ))}
                      </select>
                    </td>
                    <td className="td-admin text-right pr-6 space-x-1 sm:space-x-3 whitespace-nowrap">
                        <button 
                            onClick={() => navigate(`/admin/inscriptions/${insc.id}`)} 
                            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
                            title="Ver Detalhes"
                        >
                            <EyeIcon />
                        </button>
                        <button 
                            onClick={() => handleDeleteInscription(insc.id)} 
                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors"
                            title="Excluir Inscrição"
                            disabled={insc._isUpdating || isLoading}
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
         {inscriptions.length > 0 && <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">Total de inscrições: {inscriptions.length}</div>}
      </div>
    </div>
  );
}
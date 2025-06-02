// src/pages/MyOportunities.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import LoadingSpinner from '../components/LoadingSpinner';
import Footer from '../components/Footer';

const defaultLogo = 'https://via.placeholder.com/100/E0E0E0/9E9E9E?text=Logo';

const StatusBadge = ({ status }) => {
  let bgColor, textColor, textDisplay;
  const normalizedStatus = status ? status.toLowerCase() : 'desconhecido';

  switch (normalizedStatus) {
    case 'ativo': // Status vindo da API
    case 'pendente': // Status para exibição
      textDisplay = 'Pendente';
      bgColor = 'bg-yellow-100 dark:bg-yellow-700';
      textColor = 'text-yellow-700 dark:text-yellow-100';
      break;
    case 'cancelado':
      textDisplay = 'Cancelada';
      bgColor = 'bg-red-100 dark:bg-red-700';
      textColor = 'text-red-700 dark:text-red-100';
      break;
    case 'aprovado': // Status que pode vir da API
    case 'rejeitado': // Status que pode vir da API
      textDisplay = 'Concluída'; // Status unificado para exibição
      bgColor = 'bg-green-100 dark:bg-green-700';
      textColor = 'text-green-700 dark:text-green-100';
      break;
    default:
      textDisplay = status || 'Desconhecido';
      bgColor = 'bg-gray-100 dark:bg-gray-700';
      textColor = 'text-gray-700 dark:text-gray-100';
  }

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {textDisplay}
    </span>
  );
};


export default function MyOportunities() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // user.id é o customerId

  const [loggedInCustomerCpf, setLoggedInCustomerCpf] = useState(null);

  const fetchRegistrations = useCallback(async () => {
    if (!user || !user.id) {
      setError("Usuário não autenticado.");
      setLoading(false);
      if (window.location.pathname !== "/login") navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Usando a rota /registrations/:id onde :id é o customerId (user.id)
      // Esta rota, conforme seu log, retorna um objeto único.
      // Se a rota para listar TODAS as inscrições de um usuário for diferente, ajuste aqui.
      // Por exemplo, se for /registrations/user/${user.id}, use essa.
      const response = await axiosInstance.get(`/registrations/${user.id}`); 
      console.log("API Response Data (esperando objeto ou array):", response.data);

      let sourceArray = []; 

      if (Array.isArray(response.data)) {
        // Caso 1: A API retorna um array (ideal para uma lista)
        sourceArray = response.data;
      } else if (response.data && typeof response.data === 'object' && response.data !== null && response.data.id !== undefined && response.data.scholarshipHolders !== undefined) {
        // Caso 2: A API retorna um ÚNICO objeto de inscrição (conforme seu log recente)
        sourceArray = [response.data]; // Envolve o objeto em um array
        console.log("API retornou um objeto único, tratando como array de um item:", sourceArray);
      } else if (response.data && Array.isArray(response.data.content)) { 
        // Caso 3: A API retorna um objeto de paginação (precaução)
        sourceArray = response.data.content;
        console.log("API retornou estrutura paginada, usando 'content':", sourceArray);
      } else {
        // Caso 4: Resposta inesperada ou vazia que não se encaixa nos padrões acima
        console.warn("Resposta da API para inscrições não é um array ou objeto de inscrição único esperado. Data:", response.data);
        sourceArray = []; // Trata como nenhuma inscrição para evitar erro no .map
      }

      let currentCustomerCpf = loggedInCustomerCpf;

      if (!currentCustomerCpf && sourceArray.length > 0) {
        const firstReg = sourceArray[0];
        if (firstReg.scholarshipHolders && 
            firstReg.scholarshipHolders.customers && 
            firstReg.scholarshipHolders.customers.id === user.id && 
            firstReg.scholarshipHolders.customers.cpf) {
          currentCustomerCpf = firstReg.scholarshipHolders.customers.cpf.replace(/[^\d]/g, '');
          setLoggedInCustomerCpf(currentCustomerCpf);
        } else {
          console.warn("Não foi possível extrair o CPF do cliente logado dos dados da inscrição (primeiro item).");
        }
      }

      if (!currentCustomerCpf && sourceArray.length > 0) { // Se ainda não conseguiu o CPF do cliente
         console.warn("CPF do cliente logado não pôde ser determinado. A diferenciação 'Dependente' pode não ser precisa.");
      }

      const processedRegistrations = sourceArray.map(reg => {
        const scholarshipHolder = reg.scholarshipHolders || {};
        const scholarshipHolderCpfClean = scholarshipHolder.cpf ? scholarshipHolder.cpf.replace(/[^\d]/g, '') : null;
        // Usa currentCustomerCpf (que pode ser null se não encontrado)
        const isOwnScholarship = currentCustomerCpf && scholarshipHolderCpfClean === currentCustomerCpf;
        
        return {
          ...reg,
          beneficiaryName: scholarshipHolder.fullName || 'Beneficiário não informado',
          isOwnScholarship: isOwnScholarship,
          scholarshipHolderId: scholarshipHolder.id,
          course: reg.courses || {}, 
          institution: reg.courses?.institutions || {}
        };
      }).sort((a, b) => {
        if (a.status === 'Cancelado' && b.status !== 'Cancelado') return 1;
        if (a.status !== 'Cancelado' && b.status === 'Cancelado') return -1;
        return new Date(b.registrationDate) - new Date(a.registrationDate);
      });

      setRegistrations(processedRegistrations);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar inscrições:", err);
      if (err.response && err.response.status === 404) {
        setError("Nenhuma inscrição encontrada para este usuário.");
        setRegistrations([]); 
      } else {
        setError(err.response?.data?.message || "Não foi possível carregar suas inscrições.");
      }
    } finally {
      setLoading(false);
    }
  }, [user, navigate, loggedInCustomerCpf]);

  useEffect(() => {
    if (user && user.id) {
        fetchRegistrations();
    } else if (!user && !loading) {
        if (window.location.pathname !== "/login") navigate("/login");
    }
  }, [user, navigate, fetchRegistrations]);


  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm("Você tem certeza que deseja cancelar sua inscrição nesta bolsa?")) {
      return;
    }
    try {
      const registrationToUpdate = registrations.find(reg => reg.id === registrationId);
      if (!registrationToUpdate) {
        alert("Erro: Inscrição não encontrada para atualização.");
        return;
      }

      const payload = {
        status: 'Cancelado',
        registrationDate: registrationToUpdate.registrationDate, // Manter outros campos se a API exigir
        scholarshipHolderId: registrationToUpdate.scholarshipHolderId,
        courseId: registrationToUpdate.course?.id,
        // Verifique se sua API precisa de mais algum campo para o PUT em /registrations/:registrationId
      };

      await axiosInstance.put(`/registrations/${registrationId}`, payload);
      alert("Inscrição cancelada com sucesso!");
      fetchRegistrations(); 
    } catch (err) {
      console.error("Erro ao cancelar inscrição:", err.response?.data || err.message);
      alert(`Erro ao cancelar inscrição: ${err.response?.data?.message || 'Ocorreu um erro.'}`);
    }
  };
  
  if (loading && registrations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <LoadingSpinner size="h-12 w-12" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Minhas Bolsas
          </h1>
          <p className="mt-3 text-md sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Acompanhe aqui todas as bolsas de estudo às quais você se candidatou. Gerencie suas inscrições e fique por dentro do progresso de cada uma.
          </p>
        </div>

        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
            <button onClick={fetchRegistrations} className="mt-4 btn btn-primary">Tentar Novamente</button>
          </div>
        )}
        {!loading && !error && registrations.length === 0 && ( 
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Você ainda não possui bolsas ou inscrições associadas à sua conta.</p>
            <button onClick={() => navigate('/')} className="mt-4 btn btn-primary">
              Ver Oportunidades
            </button>
          </div>
        )}

        {!loading && !error && registrations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {registrations.map((registration) => {
              const course = registration.course; 
              const institution = registration.institution;
              const location = [institution.city, institution.state].filter(Boolean).join(', ') || 'Não informada';

              return (
                <div 
                  key={registration.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-start space-x-4 mb-4">
                      <img 
                        src={institution.urlImage || defaultLogo}
                        alt={`Logo ${institution.name || 'da instituição'}`}
                        className="w-16 h-16 rounded-md object-contain flex-shrink-0 border border-gray-200 dark:border-gray-700" 
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                          {institution.name || 'Nome da Instituição Não Informado'}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{location}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-md font-medium text-blue-600 dark:text-blue-400 mb-1">
                      Curso: {course.name || 'Nome da Bolsa Não Informado'}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Beneficiário: <span className="font-medium">{registration.beneficiaryName}</span>
                      {!registration.isOwnScholarship && loggedInCustomerCpf && (
                        <span className="text-xs text-gray-500 dark:text-gray-400"> (Dependente)</span>
                      )}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status da Inscrição:</p>
                      <StatusBadge status={registration.status} />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Data da Inscrição: {registration.registrationDate ? new Date(registration.registrationDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                      <button 
                        onClick={() => navigate(`/bolsa/${course.id}`)} // Navega para detalhes do curso/bolsa
                        className="w-full sm:w-auto btn btn-secondary text-sm py-2 px-4"
                        disabled={!course.id}
                      >
                        Ver Detalhes
                      </button>
                      {registration.status && registration.status.toLowerCase() !== 'cancelado' && (
                        <button 
                          onClick={() => handleCancelRegistration(registration.id)}
                          className="w-full sm:w-auto btn btn-danger text-sm py-2 px-4" // Adicione a classe .btn-danger aos seus estilos globais se necessário
                        >
                          Cancelar Inscrição
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
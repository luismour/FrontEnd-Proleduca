// src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; //

// --- Ícones de Exemplo (Heroicons) ---
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const InstitutionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V5.63M21 12v-2.25" />
    </svg>
);
const CourseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);
const InscriptionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
// *** ADICIONADO ClockIcon AQUI ***
const ClockIcon = () => ( 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-500"> {/* Ajustado tamanho para w-8 h-8 */}
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
    </svg>
);
// --- Fim dos Ícones ---

// Componente de Card para Estatísticas
const StatCard = ({ title, value, icon, linkTo, isLoading }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        {isLoading ? (
            <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-md mt-1"></div>
        ) : (
            <p className="text-3xl font-semibold text-gray-800 mt-1">{value}</p>
        )}
      </div>
      <div className="p-3 bg-gray-100 rounded-full">
        {icon}
      </div>
    </div>
    {linkTo && !isLoading && (
      <div className="mt-4">
        <Link to={linkTo} className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Ver todos &rarr;
        </Link>
      </div>
    )}
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    totalCourses: 0,
    totalScholarshipHolders: 0,
    totalInscriptions: 0,
    pendingInscriptions: 0,
  });
  const [recentInscriptions, setRecentInscriptions] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingRecents, setIsLoadingRecents] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoadingStats(true);
      setIsLoadingRecents(true);
      setError(null);
      try {
        const institutionsRes = await axiosInstance.get("/institutions");
        const coursesRes = await axiosInstance.get("/courses");
        const scholarshipHoldersRes = await axiosInstance.get("/scholarship-holders");
        const inscriptionsRes = await axiosInstance.get("/registrations");

        const totalInstitutions = Array.isArray(institutionsRes.data) ? institutionsRes.data.length : 0;
        const totalCourses = Array.isArray(coursesRes.data) ? coursesRes.data.length : 0;
        const totalScholarshipHolders = Array.isArray(scholarshipHoldersRes.data) ? scholarshipHoldersRes.data.length : 0;
        
        const inscriptionsData = Array.isArray(inscriptionsRes.data) ? inscriptionsRes.data : [];
        const totalInscriptions = inscriptionsData.length;
        const pendingInscriptions = inscriptionsData.filter(insc => insc.status && insc.status.toLowerCase() === 'pendente').length;

        setStats({
          totalInstitutions,
          totalCourses,
          totalScholarshipHolders,
          totalInscriptions,
          pendingInscriptions,
        });

        setRecentInscriptions(inscriptionsData.slice(0, 5));

      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError("Não foi possível carregar os dados do dashboard.");
      } finally {
        setIsLoadingStats(false);
        setIsLoadingRecents(false);
      }
    };

    fetchDashboardData();
  }, []);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const parts = dateString.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema Edupass.</p>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
          <p className="font-bold">Erro ao Carregar Dashboard</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <StatCard title="Instituições" value={stats.totalInstitutions} icon={<InstitutionIcon />} linkTo="/admin/institutions" isLoading={isLoadingStats} />
        <StatCard title="Cursos" value={stats.totalCourses} icon={<CourseIcon />} linkTo="/admin/courses" isLoading={isLoadingStats} />
        <StatCard title="Bolsistas" value={stats.totalScholarshipHolders} icon={<UsersIcon />} linkTo="/admin/scholarship-holders" isLoading={isLoadingStats} /> {/* Usando UsersIcon para Bolsistas como exemplo */}
        <StatCard title="Total Inscrições" value={stats.totalInscriptions} icon={<InscriptionIcon />} linkTo="/admin/inscriptions" isLoading={isLoadingStats} />
        <StatCard title="Inscrições Pendentes" value={stats.pendingInscriptions} icon={<ClockIcon />} linkTo="/admin/inscriptions" isLoading={isLoadingStats} /> {/* Agora ClockIcon está definido */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas Inscrições</h2>
          {isLoadingRecents && <p className="text-gray-500">Carregando...</p>}
          {!isLoadingRecents && recentInscriptions.length === 0 && <p className="text-gray-500">Nenhuma inscrição recente.</p>}
          {recentInscriptions.length > 0 && (
            <ul className="divide-y divide-gray-200">
              {recentInscriptions.map(insc => (
                <li key={insc.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {insc.scholarshipHolders?.fullName || "Bolsista Desconhecido"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Curso: {insc.courses?.name || "N/A"} em {insc.courses?.institutions?.name || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                     <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${insc.status?.toLowerCase() === 'confirmado' || insc.status?.toLowerCase() === 'ativo' ? 'bg-green-100 text-green-800' : 
                          insc.status?.toLowerCase() === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                          insc.status?.toLowerCase() === 'cancelado' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {insc.status || "N/A"}
                     </span>
                     <p className="text-xs text-gray-500 mt-1">{formatDate(insc.registrationDate)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
           <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Inscrições por Status (Gráfico)</h3>
                <div className="bg-gray-200 h-64 flex items-center justify-center rounded-md">
                    <p className="text-gray-500">Área reservada para o gráfico de status das inscrições.</p>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
                <div className="space-y-3">
                    <Link to="/admin/institutions/new" className="block w-full text-center btn btn-secondary">Adicionar Instituição</Link>
                    <Link to="/admin/courses/new" className="block w-full text-center btn btn-secondary">Adicionar Curso</Link>
                    <Link to="/admin/scholarship-holders/new" className="block w-full text-center btn btn-secondary">Adicionar Bolsista</Link>
                    <Link to="/admin/users/new" className="block w-full text-center btn btn-secondary">Adicionar Usuário</Link>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Outro Dado Importante</h2>
                <div className="bg-gray-200 h-40 flex items-center justify-center rounded-md">
                    <p className="text-gray-500">Informação ou gráfico adicional.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
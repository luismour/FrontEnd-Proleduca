// src/pages/admin/Dashboard.jsx
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";


import {
  Chart as ChartJS,
  ArcElement,      
  Tooltip,
  Legend,
  Title,
  CategoryScale,  
  LinearScale,    
  PointElement,   
  LineElement,    
  Filler          
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2'; 


ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend, 
    Title, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Filler 
);


const UsersIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>);
const InstitutionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V5.63M21 12v-2.25" />
</svg>);
const CourseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
</svg>);
const InscriptionIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>);
const ClockIcon = () => (  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-500">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
</svg>);


const StatCard = ({ title, value, icon, linkTo, isLoading }) => (  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
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
</div>);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    totalCourses: 0,
    totalScholarshipHolders: 0,
    totalInscriptions: 0,
    pendingInscriptions: 0,
  });
  const [recentInscriptions, setRecentInscriptions] = useState([]);
  const [allInscriptionsData, setAllInscriptionsData] = useState([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingRecents, setIsLoadingRecents] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoadingStats(true);
      setIsLoadingRecents(true);
      setError(null);
      try {
        const [institutionsRes, coursesRes, scholarshipHoldersRes, inscriptionsRes] = await Promise.all([
          axiosInstance.get("/institutions"),
          axiosInstance.get("/courses"),
          axiosInstance.get("/scholarship-holders"),
          axiosInstance.get("/registrations")
        ]);

        const totalInstitutions = Array.isArray(institutionsRes.data) ? institutionsRes.data.length : 0;
        const totalCourses = Array.isArray(coursesRes.data) ? coursesRes.data.length : 0;
        const totalScholarshipHolders = Array.isArray(scholarshipHoldersRes.data) ? scholarshipHoldersRes.data.length : 0;
        
        const inscriptionsData = Array.isArray(inscriptionsRes.data) ? inscriptionsRes.data : [];
        setAllInscriptionsData(inscriptionsData);

        const totalInscriptions = inscriptionsData.length;
        const pendingInscriptions = inscriptionsData.filter(insc => insc.status && insc.status.toLowerCase() === 'pendente').length;

        setStats({
          totalInstitutions, totalCourses, totalScholarshipHolders, totalInscriptions, pendingInscriptions,
        });

        const sortedInscriptions = [...inscriptionsData].sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
        setRecentInscriptions(sortedInscriptions.slice(0, 5));

      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError("Não foi possível carregar os dados do dashboard.");
        setAllInscriptionsData([]);
      } finally {
        setIsLoadingStats(false);
        setIsLoadingRecents(false);
      }
    };

    fetchDashboardData();
  }, []);
  
  const formatDate = (dateString) => {   if (!dateString) return 'N/A';

  const parts = dateString.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;

  return new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });};

  // Gráfico de Rosca: Inscrições por Status
  const inscriptionStatusChartData = useMemo(() => {   if (!allInscriptionsData || allInscriptionsData.length === 0) {
    return null;
  }

  const statusCounts = allInscriptionsData.reduce((acc, inscription) => {
    let status = inscription.status?.trim().toLowerCase() || "desconhecido";
    
    let displayStatus = "Outro";
    if (status === "pendente" || status === "ativo") displayStatus = "Pendente/Ativo";
    else if (status === "confirmado") displayStatus = "Confirmado";
    else if (status === "cancelado") displayStatus = "Cancelado";
    
    acc[displayStatus] = (acc[displayStatus] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(statusCounts);
  const data = Object.values(statusCounts);

  const backgroundColors = labels.map(label => {
      switch(label.toLowerCase()) {
          case 'pendente/ativo': return 'rgba(255, 206, 86, 0.8)'; // Amarelo
          case 'confirmado': return 'rgba(75, 192, 192, 0.8)'; // Verde/Azulado
          case 'cancelado': return 'rgba(255, 99, 132, 0.8)';  // Vermelho
          default: return 'rgba(201, 203, 207, 0.8)';      // Cinza
      }
  });
   const borderColors = backgroundColors.map(color => color.replace('0.8', '1'));

  return {
    labels,
    datasets: [
      {
        label: 'Número de Inscrições',
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
        hoverOffset: 4
      },
    ],
  }; }, [allInscriptionsData]);
  const doughnutChartOptions = {  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top', 
      labels: {
          font: {
              size: 12
          },
          padding: 15
      }
    },
    title: {
      display: false,
      text: 'Distribuição de Inscrições por Status',
      font: { size: 16 },
      padding: { bottom: 10 }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed !== null) {
            label += context.parsed;
          }
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) + '%' : '0%';
          label += ` (${percentage})`;
          return label;
        }
      }
    }
  }, };

  const monthlyInscriptionsChartData = useMemo(() => {
    if (!allInscriptionsData || allInscriptionsData.length === 0) {
      return null;
    }

    const monthlyCounts = allInscriptionsData.reduce((acc, inscription) => {
      if (inscription.registrationDate) {
        const date = new Date(inscription.registrationDate);
        // Formato 'YYYY-MM' para agrupar por mês.
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        acc[monthYear] = (acc[monthYear] || 0) + 1;
      }
      return acc;
    }, {});

 
    const sortedMonths = Object.keys(monthlyCounts).sort((a, b) => new Date(a) - new Date(b));

    const labels = sortedMonths.map(monthYear => {
      const [year, month] = monthYear.split('-');
      const monthDate = new Date(parseInt(year), parseInt(month) - 1);
      return monthDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
    });
    const data = sortedMonths.map(month => monthlyCounts[month]);

    return {
      labels,
      datasets: [
        {
          label: 'Novas Inscrições',
          data,
          fill: true,
          borderColor: 'rgb(54, 162, 235)', // Azul
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1,
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [allInscriptionsData]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: false, 
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
            display: false,
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
          callback: function(value) {if (Number.isInteger(value)) {return value;}}
        },
        grid: {
            color: 'rgba(200, 200, 200, 0.2)', 
        }
      },
    },
    hover: {
        mode: 'nearest',
        intersect: true
    }
  };


  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-1">Visão geral do sistema Edupass.</p>
      </header>

      {error && ( /* ...erro... */ <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow" role="alert">
        <p className="font-bold">Erro ao Carregar Dashboard</p>
        <p>{error}</p>
      </div>)}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {/* ...StatCards... */}
        <StatCard title="Instituições" value={stats.totalInstitutions} icon={<InstitutionIcon />} linkTo="/admin/institutions" isLoading={isLoadingStats} />
        <StatCard title="Cursos" value={stats.totalCourses} icon={<CourseIcon />} linkTo="/admin/courses" isLoading={isLoadingStats} />
        <StatCard title="Bolsistas" value={stats.totalScholarshipHolders} icon={<UsersIcon />} linkTo="/admin/scholarship-holders" isLoading={isLoadingStats} />
        <StatCard title="Total Inscrições" value={stats.totalInscriptions} icon={<InscriptionIcon />} linkTo="/admin/inscriptions" isLoading={isLoadingStats} />
        <StatCard title="Pendentes" value={stats.pendingInscriptions} icon={<ClockIcon />} linkTo="/admin/inscriptions" isLoading={isLoadingStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
            {/* ...Últimas Inscrições... */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Últimas Inscrições</h2>
            {isLoadingRecents && <div className="text-center py-4"><span className="text-gray-500">Carregando recentes...</span></div>}
            {!isLoadingRecents && recentInscriptions.length === 0 && !error && (
                 <p className="text-gray-500 text-center py-4">Nenhuma inscrição recente.</p>
            )}
            {recentInscriptions.length > 0 && (
                <ul className="divide-y divide-gray-200">
                {recentInscriptions.map(insc => (
                    <li key={insc.id} className="py-3.5 flex justify-between items-center hover:bg-gray-50 px-2 -mx-2 rounded-md transition-colors">
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                        {insc.scholarshipHolders?.fullName || "Bolsista Desconhecido"}
                        </p>
                        <p className="text-xs text-gray-500">
                        Curso: {insc.courses?.name || "N/A"} 
                        <span className="hidden sm:inline"> em {insc.courses?.institutions?.name || "N/A"}</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-tight font-semibold rounded-full 
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
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Inscrições por Status</h3>
                <p className="text-sm text-gray-500 mb-6">Distribuição visual dos status das inscrições.</p>
                <div className="h-72 md:h-80 relative">
                {/* ...Condicionais para gráfico de Rosca... */}
                {isLoadingStats && !inscriptionStatusChartData && (
                     <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                        <span className="text-gray-500">Carregando dados do gráfico...</span>
                    </div>
                )}
                {!isLoadingStats && error && !inscriptionStatusChartData && (
                    <p className="text-red-500 text-center">Erro ao carregar dados do gráfico.</p>
                )}
                {!isLoadingStats && !error && !inscriptionStatusChartData && allInscriptionsData.length > 0 && (
                    <p className="text-gray-500 text-center">Processando dados do gráfico...</p>
                )}
                 {!isLoadingStats && !error && allInscriptionsData.length === 0 && (
                    <p className="text-gray-500 text-center">Nenhuma inscrição para exibir no gráfico.</p>
                )}
                {inscriptionStatusChartData && (
                    <Doughnut data={inscriptionStatusChartData} options={doughnutChartOptions} />
                )}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                {/* ...Ações Rápidas... */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
                <div className="space-y-3">
                    <Link to="/admin/institutions/new" className="block w-full text-center btn btn-secondary">Adicionar Instituição</Link>
                    <Link to="/admin/courses/new" className="block w-full text-center btn btn-secondary">Adicionar Curso</Link>
                    <Link to="/admin/scholarship-holders/new" className="block w-full text-center btn btn-secondary">Adicionar Bolsista</Link>
                </div>
            </div>
            {/* Card para o Novo Gráfico */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Novas Inscrições por Mês</h3>
                <p className="text-sm text-gray-500 mb-6">Acompanhe o volume de novas inscrições ao longo do tempo.</p>
                <div className="h-64 md:h-72 relative"> {/* Altura para o gráfico de linha */}
                {isLoadingStats && !monthlyInscriptionsChartData && (
                     <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                        <span className="text-gray-500">Carregando dados do gráfico...</span>
                    </div>
                )}
                {!isLoadingStats && error && !monthlyInscriptionsChartData && (
                    <p className="text-red-500 text-center">Erro ao carregar dados do gráfico.</p>
                )}
                {!isLoadingStats && !error && !monthlyInscriptionsChartData && allInscriptionsData.length > 0 && (
                     <p className="text-gray-500 text-center">Processando dados do gráfico...</p>
                )}
                {!isLoadingStats && !error && allInscriptionsData.length === 0 && (
                    <p className="text-gray-500 text-center">Nenhuma inscrição para exibir no gráfico.</p>
                )}
                {monthlyInscriptionsChartData && (
                    <Line data={monthlyInscriptionsChartData} options={lineChartOptions} />
                )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
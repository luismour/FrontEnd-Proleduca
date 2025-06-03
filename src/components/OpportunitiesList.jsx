// src/components/OpportunitiesList.jsx
import React, { useEffect, useState } from 'react';
import OpportunityCard from './OpportunityCard';
import { filtrarOportunidades } from '../utils/filtrarOportunidades';
import FiltroCursos from './FiltroCursos';
import Steps from './Steps';
import axiosInstance from '../api/axiosInstance.js';
import LoadingSpinner from './LoadingSpinner';

export default function OpportunitiesList() {
  const [displayedOpportunities, setDisplayedOpportunities] = useState([]);
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({
    tab: 'Superior',
    cidade: ''
  });

  useEffect(() => {
    const fetchCursos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get('/courses');
        const cursos = response.data;

        if (!Array.isArray(cursos)) {
          console.error("Resposta da API de cursos não é um array:", cursos);
          setAllOpportunities([]);
          setDisplayedOpportunities([]);
          setError("Formato de dados inesperado do servidor.");
          setIsLoading(false);
          return;
        }

        const oportunidadesFormatadas = cursos.map((curso) => {
          const instituicao = curso.institutions || {};
          return {
            id: curso.id,
            logoUrl: instituicao.urlImage || 'https://via.placeholder.com/200x80/E2E8F0/94A3B8?text=Logo',
            institution: instituicao.name || 'Instituição não informada',
            course: curso.name || 'Curso não informado',
            city: instituicao.city || '',
            state: instituicao.state || '',
            turno: curso.shift || 'N/D',
            percent: curso.percentageScholarship ? `${curso.percentageScholarship}%` : null,
            originalPrice: curso.originalValue ? `R$ ${Number(curso.originalValue).toFixed(2).replace('.', ',')}` : null,
            discountedPrice: curso.discountValue ? `R$ ${Number(curso.discountValue).toFixed(2).replace('.', ',')}` : 'Consulte',
            neighborhood: instituicao.neighborhood || '',
            institutionType: instituicao.type || '',
          };
        });
        
        setAllOpportunities(oportunidadesFormatadas);
        const resultadoInicial = filtrarOportunidades(oportunidadesFormatadas, currentFilters);
        setDisplayedOpportunities(resultadoInicial);

      } catch (err) {
        console.error('Erro ao buscar cursos:', err);
        setError("Não foi possível carregar as oportunidades. Tente novamente mais tarde.");
        setAllOpportunities([]);
        setDisplayedOpportunities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCursos();
  }, []);

  const handleBuscar = (filtros) => {
    setCurrentFilters(filtros);
    setIsLoading(true);
    const resultado = filtrarOportunidades(allOpportunities, filtros);
    setDisplayedOpportunities(resultado);
    setTimeout(() => setIsLoading(false), 300); 
  };
  
  const getPageTitle = () => {
    if (currentFilters.tab?.toLowerCase() === 'escola') {
        let title = "Escolas ";
        if (currentFilters.instituicao) title += `no bairro ${currentFilters.instituicao} `;
        if (currentFilters.curso) title += `em ${currentFilters.curso} `;
        return title.trim() || "Escolas";
    }
    let title = "Oportunidades de Bolsas ";
    if (currentFilters.curso) title += `para ${currentFilters.curso} `;
    if (currentFilters.cidade && currentFilters.tab?.toLowerCase() !== 'escola') {
        title += `em ${currentFilters.cidade} `;
    }
    return title.trim();
  };

  return (
    <div className="w-full">
      <FiltroCursos onBuscar={handleBuscar} />
      
      <div className="bg-white py-10 md:py-16"> {/* Fundo branco */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              {getPageTitle()}
            </h1>
            <p className="text-sm sm:text-md text-slate-600 mt-1">
              {isLoading ? "Atualizando resultados..." : 
               displayedOpportunities.length > 0 
                ? `Encontramos ${displayedOpportunities.length} vaga(s) com bolsa para você!`
                : "Nenhuma vaga encontrada com os filtros atuais."}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="h-10 w-10" />
            </div>
          ) : error ? (
            <p className="text-center text-red-600 py-10 text-lg">{error}</p>
          ) : displayedOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  {...opportunity}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-slate-900">Sem resultados</h3>
                <p className="mt-1 text-sm text-slate-500">Tente ajustar seus filtros para encontrar mais oportunidades.</p>
            </div>
          )}
        </div>
      </div>
      <Steps />
    </div>
  );
}
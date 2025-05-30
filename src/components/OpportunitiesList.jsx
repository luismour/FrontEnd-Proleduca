import React, { useEffect, useState } from 'react';
import OpportunityCard from './OpportunityCard';
import { useOpportunities } from '../contexts/OpportunitiesContext.jsx';
import { filtrarOportunidades } from '../utils/filtrarOportunidades';
import FiltroCursos from './FiltroCursos';
import Steps from './Steps';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance.js';

export default function OpportunitiesList() {
  const { opportunities, setOpportunities } = useOpportunities();
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {

      const token = localStorage.getItem('token');

      try {
        const response = await axiosInstance.get('/courses')
        const cursos = response.data;

        const oportunidades = cursos.map((curso) => {
          const instituicao = curso.institutions || {};

          return {
            id: curso.id,
            logoUrl: instituicao.urlImage,
            institution: instituicao.name || 'Instituição não informada',
            course: curso.name || '',
            location: getEnderecoInstituicao(instituicao),
            turno: curso.shift || '',
            percent: curso.percentageScholarship ? `${curso.percentageScholarship}% de desconto` : 'Sem bolsa',
            originalPrice: curso.originalValue ? `R$ ${Number(curso.originalValue).toFixed(2).replace('.', ',')}` : '-',
            discountedPrice: curso.discountValue ? `R$ ${Number(curso.discountValue).toFixed(2).replace('.', ',')}` : '-',
            description: curso.description || '',
            status: curso.status,
          };
        });

        setOpportunities(oportunidades);
        setAllOpportunities(oportunidades);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  const getLogoUrl = (instituicaoId) => {
    const logos = {
      1: '/cover_ficr.png',
      2: '/cover_estacio.png',
      3: '/cover_uninassau.png',
    };
    return logos[instituicaoId] || '/default_logo.png';
  };

  const getEnderecoInstituicao = (instituicao) => {
    if (!instituicao) return '';
    const { street, number, city, state } = instituicao;
    return `${street || ''}, ${number || ''} - ${city || ''} - ${state || ''}`;
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleBuscar = (filtros) => {
    const resultado = filtrarOportunidades(allOpportunities, filtros);
    setOpportunities(resultado);
  };

  return (
    <div className="w-full">
      <FiltroCursos onBuscar={handleBuscar} />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Melhores oportunidades</h1>
        <h2 className="text-md text-gray-600 mb-6">
          Em <span className="text-yellow-500">Recife, PE</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              {...opportunity}
              isFavorite={favorites.includes(opportunity.id)}
              onToggleFavorite={() => toggleFavorite(opportunity.id)}
            />
          ))}
        </div>
      </div>
      <Steps />
    </div>
  );
}

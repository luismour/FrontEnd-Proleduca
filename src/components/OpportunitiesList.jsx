import React, { useEffect, useState } from 'react';
import OpportunityCard from './OpportunityCard';
import { useOpportunities } from '../contexts/OpportunitiesContext.jsx';
import { filtrarOportunidades } from '../utils/filtrarOportunidades';
import FiltroCursos from './FiltroCursos';
import Steps from './Steps';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance.js';

export default function OpportunitiesList() {
  const [displayedOpportunities, setDisplayedOpportunities] = useState([]);
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axiosInstance.get('/courses'); // Seu endpoint GET /courses
        const cursos = response.data;

        if (!Array.isArray(cursos)) {
          console.error("Resposta da API de cursos não é um array:", cursos);
          setAllOpportunities([]);
          setDisplayedOpportunities([]);
          return;
        }

        const oportunidadesFormatadas = cursos.map((curso) => {
          const instituicao = curso.institutions || {};
          return {
            id: curso.id,
            logoUrl: instituicao.urlImage,
            institution: instituicao.name || 'Instituição não informada',
            course: curso.name || '',
            location: `${instituicao.street || ''}, ${instituicao.number || ''} - ${instituicao.neighborhood || ''} - ${instituicao.city || ''} / ${instituicao.state || ''}`.replace(/ , |, - | - /g, ', ').replace(/^,|, $/g, ''),
            
            city: instituicao.city || '', // Essencial para o filtro de cidade na aba "Escolas"
            neighborhood: instituicao.neighborhood || '', // Essencial para o filtro de bairro na aba "Escolas"
            institutionType: instituicao.type || '', // Para o tabMatch
            turno: curso.shift || '',
            percent: curso.percentageScholarship ? `${curso.percentageScholarship}% de desconto` : 'Sem bolsa',
            originalPrice: curso.originalValue ? `R$ ${Number(curso.originalValue).toFixed(2).replace('.', ',')}` : '-',
            discountedPrice: curso.discountValue ? `R$ ${Number(curso.discountValue).toFixed(2).replace('.', ',')}` : '-',
            description: curso.description || '',
            status: curso.status,
            // CAMPOS IDEAIS QUE AINDA FALTAM NA API para filtros precisos:
            // modality: curso.modality, // Ex: 'Presencial', 'EAD', 'Semi-Presencial'
            // level: curso.level,       // Ex: 'Superior', 'Técnico', 'Pós-Graduação'
          };
        });
        
        console.log("Oportunidades formatadas da API:", oportunidadesFormatadas);
        setAllOpportunities(oportunidadesFormatadas);
        setDisplayedOpportunities(oportunidadesFormatadas);

      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        setAllOpportunities([]);
        setDisplayedOpportunities([]);
      }
    };

    fetchCursos();
  }, []);

  const handleBuscar = (filtros) => {
    console.log("Filtros recebidos em OpportunitiesList:", filtros);
    console.log("Filtrando a partir de (allOpportunities):", allOpportunities);
    const resultado = filtrarOportunidades(allOpportunities, filtros);
    console.log("Resultado da filtragem:", resultado);
    setDisplayedOpportunities(resultado);
  };
  

  return (
    <div className="w-full">
      <FiltroCursos onBuscar={handleBuscar} />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Melhores oportunidades</h1>
        <h2 className="text-md text-gray-600 mb-6">
          {/* Este texto é apenas visual, o filtro de cidade está em `filtros.cidade` */}
          Em <span className="text-yellow-500">Recife, PE</span> (e outras localidades)
        </h2>

        {displayedOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                {...opportunity}
                location={opportunity.location} // Passa a string de localização completa para o card
                isFavorite={favorites.includes(opportunity.id)}
                onToggleFavorite={() => toggleFavorite(opportunity.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">Nenhuma oportunidade encontrada com os filtros aplicados.</p>
        )}
      </div>
      <Steps />
    </div>
  );
}

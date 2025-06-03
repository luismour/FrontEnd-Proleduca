// src/components/OpportunityCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Ícones opcionais (exemplo com Heroicons - instale com `npm install @heroicons/react`)
// Se não quiser usar Heroicons, pode usar SVGs simples ou remover os ícones.
// import { MapPinIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline'; 

// Ícones SVG simples como fallback se não usar biblioteca
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 inline-block">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 inline-block">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


export default function OpportunityCard({
  id,
  logoUrl,
  institution,
  course,
  turno,
  city,
  state,
  originalPrice,
  discountedPrice,
  percent,
}) {
  const locationString = [city, state].filter(Boolean).join(', ');

  return (
    <Link
      to={`/bolsa/${id}`}
      className="block group rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
      aria-label={`Ver detalhes da bolsa para ${course} na ${institution}`}
    >
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg hover:shadow-xl h-full flex flex-col overflow-hidden transform group-hover:-translate-y-1 group-focus:-translate-y-1 transition-all duration-300 ease-in-out">
        
        {/* Imagem/Logo da Instituição e Selo de Desconto */}
        <div className="relative">
          <div className="w-full h-32 bg-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={logoUrl || 'https://via.placeholder.com/250x100/E2E8F0/94A3B8?text=Logo'}
              alt={`Logo da ${institution || 'Instituição'}`}
              className="max-h-full max-w-full object-contain p-2"
            />
          </div>
          {percent && (
            <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md">
              {percent} OFF
            </span>
          )}
        </div>

        {/* Conteúdo Principal do Card */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-slate-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-200 h-14 line-clamp-2">
            {/* h-14 e line-clamp-2 para garantir altura consistente e evitar quebra de layout com nomes longos */}
            {course || 'Nome do Curso Indisponível'}
          </h3>
          <p className="text-xs text-slate-500 mb-3 truncate">
            {institution || 'Instituição Indisponível'}
          </p>

          {/* Detalhes como Turno e Localização */}
          <div className="space-y-1.5 text-xs text-slate-600 mb-4">
            {turno && (
              <div className="flex items-center">
                <ClockIcon />
                <span>{turno}</span>
              </div>
            )}
            {locationString && (
              <div className="flex items-center">
                <MapPinIcon />
                <span className="truncate">{locationString}</span>
              </div>
            )}
          </div>
          
          {/* Preços - Empurrado para o final do flex-grow */}
          <div className="mt-auto pt-4">
            {originalPrice && originalPrice !== '-' && (
              <p className="text-slate-400 text-xs line-through text-right">
                De: {originalPrice}
              </p>
            )}
            <p className="text-2xl font-bold text-blue-600 text-right">
              {discountedPrice || 'Consulte'}
            </p>
             <p className="text-xs text-slate-500 text-right mt-0.5">
              mensalidade com bolsa
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}
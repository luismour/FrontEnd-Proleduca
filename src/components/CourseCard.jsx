// src/components/OpportunityCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

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
      className="block group rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-full"
    >
      <div className="relative bg-white border border-slate-200 h-full rounded-xl p-4 shadow-lg hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all duration-300 flex flex-col justify-between min-h-[350px] group-hover:border-blue-400">
        
        <div> 
          {percent && (
            <div className="absolute top-3 left-3 bg-orange-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
              Bolsa {percent}
            </div>
          )}

          <div className="flex flex-col items-center pt-8 pb-3">
            <div className="w-full h-20 flex justify-center items-center mb-4 px-2">
              <img
                src={logoUrl || 'https://via.placeholder.com/200x80/E2E8F0/94A3B8?text=Logo'}
                alt={institution || 'Logo da Instituição'}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-center text-md font-semibold text-slate-800 mb-1 leading-tight group-hover:text-blue-600 transition-colors px-1 h-12 line-clamp-2">
              {course || 'Nome do Curso Indisponível'}
            </h3>
            <p className="text-center text-xs text-slate-500 mb-3 px-1 truncate w-full">
              {institution || 'Instituição Indisponível'}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex justify-between items-end">
            <div className="text-xs text-slate-600 space-y-0.5">
              {turno && <p className="truncate">{turno}</p>}
              {locationString && <p className="truncate font-medium">{locationString}</p>}
            </div>
            <div className="flex flex-col items-end text-right">
              {originalPrice && originalPrice !== '-' && (
                <p className="text-slate-400 text-xs line-through">
                  {originalPrice}
                </p>
              )}
              <p className="text-orange-500 text-xl font-bold">
                {discountedPrice || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
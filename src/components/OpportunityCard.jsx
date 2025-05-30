import React from 'react';
import { Link } from 'react-router-dom';

export default function OpportunityCard({
  id,
  logoUrl,
  institution,
  course,
  turno,
  location,
  originalPrice,
  discountedPrice,
  percent,
  isFavorite,
  onToggleFavorite,
  city,
  description,
  status
}) {
  return (
    <Link to={`/bolsa/${id}`} className="block">
      <div className="relative bg-white border border-gray-200 rounded-xl p-4 w-full shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[300px]">
        {/* Topo: desconto + botão estrela */}
        <div className="absolute top-3 left-3 bg-yellow-100 text-yellow-600 text-[11px] font-semibold px-2 py-[2px] rounded">
          {percent}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 text-yellow-400 text-3x1 focus:outline-none"
        >
          {isFavorite ? '★' : '☆'}
        </button>

        {/* Logo */}
        <div className="w-full mb-3 mt-6">
          <img
            src={logoUrl}
            alt={institution}
            className="h-24 w-full object-contain"
          />
        </div>

        {/* Curso */}
        <p className="text-center text-base font-bold text-black mb-4">
          {course}
        </p>

        {/* Rodapé com turno, localização e preços */}
        <div className="flex justify-between items-end mt-auto">
          {/* Turno e Localização (esquerda) */}
          <div className="text-sm text-black">
            <p>{turno}</p>
            <p>{city}</p>
          </div>

          {/* Preços */}
          <div className="flex flex-col items-end text-right">
            {originalPrice && (
              <p className="text-gray-400 text-sm line-through mb-1">
                {originalPrice}
              </p>
            )}
            <p className="text-orange-500 text-lg font-bold">
              {discountedPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

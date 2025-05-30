import React from "react";

const statusClasses = {
  Confirmado: "bg-blue-600 text-white",
  Pendente: "bg-yellow-400 text-white",
  Cancelado: "bg-red-500 text-white",
};

export default function CourseCard({ curso }) {
  return (
    <div
      className={`bg-white shadow border-l-4 rounded-lg p-4 ${
        statusClasses[curso.status] || "border-gray-300"
      }`}
    >
      {/* Topo */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{curso.dataAdesao}</div>
        {curso.status === "Confirmado" && (
          <button className="text-sm text-white bg-blue-600 font-semibold px-4 py-1 rounded hover:bg-blue-700">
            Baixar comprovante de adesão
          </button>
        )}
      </div>

      {/* Conteúdo principal */}
      <div className="flex items-center gap-4 mt-2">
        <img
          src={curso.logoUrl}
          alt={curso.instituicao}
          className="w-20 h-20 object-contain"
        />
        <div className="flex-1">
          <h2 className="font-bold text-lg">{curso.curso}</h2>
          <p className="text-sm text-gray-600">{curso.instituicao}</p>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">STATUS DA ADESÃO</p>
          <p
            className={`text-sm font-semibold px-2 py-1 rounded ${
              statusClasses[curso.status]
            }`}
          >
            {curso.status}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">MENSALIDADE</p>
          <p className="text-base font-bold text-black">{curso.mensalidade}</p>
        </div>
      </div>

      {/* Ações */}
      <div className="flex justify-end mt-4 gap-4">
        {curso.status !== "Confirmado" && (
          <button className="text-sm font-semibold px-4 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-50">
            Procurar uma nova bolsa
          </button>
        )}
        <button className="text-sm font-semibold px-4 py-1 rounded text-blue-600 hover:underline">
          Ver detalhes da bolsa
        </button>
      </div>
    </div>
  );
}

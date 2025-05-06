import React from 'react';

export default function FormCadastro() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-3 mb-6">
        <img src="/ficr_logo.png" alt="Logo FICR" className="w-12 h-12" />
        <h1 className="text-xl font-semibold text-center">
          Análise e Desenvolvimento de Sistemas na FICR
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
              type="text"
              placeholder="Ex: João Pedro Moura"
              className="mt-1 w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
            <input
              type="date"
              className="mt-1 w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              type="text"
              placeholder="Ex: 000.000.000-00"
              className="mt-1 w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Necessidades especiais</label>
            <input
              type="text"
              placeholder="Ex: Nenhuma"
              className="mt-1 w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Raça</label>
            <input
              type="text"
              placeholder="Ex: Parda"
              className="mt-1 w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cor</label>
            <input
              type="text"
              placeholder="Ex: Morena clara"
              className="mt-1 w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </form>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

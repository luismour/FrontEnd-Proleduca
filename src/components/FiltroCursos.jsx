// src/components/FiltroCursos.jsx
import React, { useState } from 'react';

export default function FiltroCursos({ onBuscar }) {
  const [curso, setCurso] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [cidade, setCidade] = useState('Recife, PE');
  const [bolsa, setBolsa] = useState(80);
  const [modalidade, setModalidade] = useState({
    presencial: true,
    semi: true,
    ead: true,
  });
  const [tab, setTab] = useState('Superior');

  // Lembre-se de AJUSTAR ESTES NOMES para corresponderem EXATAMENTE
  // aos valores do campo 'institutions.type' da sua API (case-insensitive)
  // Exemplo: Se a API retorna "Escola", use "Escola" aqui, não "Escolas".
  const tabs = ['Superior', 'Escola', 'Tecnico', 'Idioma', 'Pos']; // Ajuste conforme sua API

  const handleTabChange = (newTab) => {
    setTab(newTab);
    const newCursoValue = '';
    const newInstituicaoValue = '';
    // Ajuste a lógica da cidade se for diferente para a nova aba
    const newCidadeValue = newTab.toLowerCase() === 'escola' ? '' : 'Recife, PE'; 

    setCurso(newCursoValue);
    setInstituicao(newInstituicaoValue);
    setCidade(newCidadeValue);

    onBuscar({
      tab: newTab,
      curso: newCursoValue,
      instituicao: newInstituicaoValue,
      cidade: newCidadeValue,
      bolsa: bolsa,
      modalidade: modalidade,
    });
  };

  const handleBuscar = () => {
    const filtros = {
      tab,
      curso,
      instituicao,
      cidade,
      bolsa,
      modalidade,
    };
    onBuscar(filtros);
  };

  // Ajuste 'escola' aqui se o nome da sua aba para escolas for diferente após o ajuste no array `tabs`
  const isEscola = tab.toLowerCase() === (tabs.find(t => t.toLowerCase().includes('escola')) || "escola").toLowerCase();


  return (
    <section className="w-full min-h-screen bg-blue-600 flex items-center justify-center py-10 md:py-0"> {/* Adicionado py para mobile */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 pt-0">
        {/* Tabs */}
        <div className="flex border-b border-gray-200"> {/* Adicionada borda inferior para separar */}
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => handleTabChange(item)}
              // CLASSE CORRIGIDA ABAIXO:
              className={`flex-1 py-3 md:py-4 px-2 font-semibold text-sm md:text-base truncate 
                ${tab === item 
                  ? 'text-blue-600 border-b-2 border-blue-600' // Estilo da aba ativa
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300' // Estilo da aba inativa
                } 
                transition-all duration-150 focus:outline-none -mb-px`} // -mb-px para alinhar borda com a borda do contêiner
            >
              {item}
            </button>
          ))}
        </div>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 ">
          <div>
            <label htmlFor="filtro-curso" className="text-sm font-semibold text-gray-700 block mb-1">
              {isEscola ? 'Qual a sua cidade?' : 'Qual curso você quer estudar?'}
            </label>
            <input
              id="filtro-curso"
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              placeholder={isEscola ? 'Digite sua cidade' : 'Digite o curso'}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="filtro-instituicao" className="text-sm font-semibold text-gray-700 block mb-1">
              {isEscola ? 'Qual o seu bairro?' : 'Qual a instituição?'}
            </label>
            <input
              id="filtro-instituicao"
              type="text"
              value={instituicao}
              onChange={(e) => setInstituicao(e.target.value)}
              placeholder={isEscola ? 'Digite seu bairro' : 'Digite a instituição'}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="filtro-cidade-serie" className="text-sm font-semibold text-gray-700 block mb-1">
              {isEscola ? 'Ano/Série' : 'Em que cidade quer estudar?'}
            </label>
            <div className="flex">
              {isEscola ? (
                <select
                  id="filtro-cidade-serie"
                  value={cidade} 
                  onChange={(e) => setCidade(e.target.value)}
                  className="flex-1 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Selecione o ano/série</option>
                  <option value="Maternal">Maternal</option>
                  <option value="Jardim I">Jardim I</option>
                  <option value="Jardim II">Jardim II</option>
                  {[...Array(9)].map((_, i) => <option key={`EF${i+1}`} value={`${i+1}º Ano`}>{`${i+1}º Ano`}</option>)}
                  {[...Array(3)].map((_, i) => <option key={`EM${i+1}`} value={`${i+1}ª Série`}>{`${i+1}ª Série`}</option>)}
                </select>
              ) : (
                <input
                  id="filtro-cidade-serie"
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Digite a cidade"
                  className="flex-1 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              <button
                onClick={handleBuscar}
                className="ml-2 md:ml-4 mt-1 bg-yellow-400 text-white font-bold px-4 py-2 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Bolsa + Modalidade juntos */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-700">Porcentagem da bolsa:</span>
            {[30, 50, 80].map((percent) => (
              <button
                key={percent}
                onClick={() => setBolsa(percent)}
                className={`px-3 py-1 rounded-md font-semibold text-sm transition-colors duration-150
                  ${bolsa === percent 
                    ? 'bg-green-500 text-white ring-2 ring-green-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {percent}%
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap mt-4 md:mt-0 md:ml-6">
            <span className="font-semibold text-gray-700">Modalidade:</span>
            {Object.entries(modalidade).map(([key, value]) => (
              <label key={key} className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    setModalidade((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-blue-500"
                />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
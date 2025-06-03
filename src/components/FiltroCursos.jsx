// src/components/FiltroCursos.jsx
import React, { useState } from 'react';

export default function FiltroCursos({ onBuscar }) {
  const [curso, setCurso] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [cidade, setCidade] = useState('Recife, PE');
  const [bolsa, setBolsa] = useState(50);
  const [modalidade, setModalidade] = useState({
    presencial: true,
    ead: true,
  });
  const [tab, setTab] = useState('Superior');
  const tabs = ['Superior', 'Escola', 'Tecnico', 'Idioma', 'Pós'];

  const handleTabChange = (newTab) => {
    setTab(newTab);
    const isEscolaTab = newTab.toLowerCase() === (tabs.find(t => t.toLowerCase().includes('escola')) || "escola").toLowerCase();
    setCurso('');
    setInstituicao('');
    setCidade(isEscolaTab ? '' : 'Recife, PE');
    onBuscar({
      tab: newTab,
      curso: '',
      instituicao: '',
      cidade: isEscolaTab ? '' : 'Recife, PE',
      bolsa: bolsa,
      modalidade: modalidade,
    });
  };

  const handleBuscarClick = () => {
    onBuscar({ tab, curso, instituicao, cidade, bolsa, modalidade });
  };

  const isEscola = tab.toLowerCase() === (tabs.find(t => t.toLowerCase().includes('escola')) || "escola").toLowerCase();

  return (
    <section className="w-full bg-blue-600 py-12 md:py-16"> {/* Fundo azul para a seção do filtro */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Texto Inspirador */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Seu futuro <span className="text-yellow-400">começa aqui</span>.
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
            Encontre bolsas de estudo incríveis e dê o próximo passo na sua jornada educacional com Edupass.
          </p>
        </div>

        {/* Card do Filtro */}
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10">
          {/* Abas */}
          <div className="flex border-b border-slate-200 mb-6 md:mb-8">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => handleTabChange(item)}
                className={`flex-1 py-3 px-1 sm:px-2 font-semibold text-xs sm:text-sm md:text-base truncate focus:outline-none transition-colors duration-150 -mb-px
                  ${tab === item 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-slate-500 hover:text-slate-700 hover:border-b-2 hover:border-slate-300'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Campos de Filtro Principais (Linha 1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 mb-6 md:mb-8">
            <div>
              <label htmlFor="filtro-curso" className="form-label text-slate-700">
                {isEscola ? 'Sua cidade' : 'Curso desejado'}
              </label>
              <input
                id="filtro-curso" type="text" value={curso} onChange={(e) => setCurso(e.target.value)}
                placeholder={isEscola ? 'Ex: Recife' : 'Ex: Engenharia de Software'}
                className="form-input border-slate-300 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="filtro-instituicao" className="form-label text-slate-700">
                {isEscola ? 'Seu bairro' : 'Instituição (opcional)'}
              </label>
              <input
                id="filtro-instituicao" type="text" value={instituicao} onChange={(e) => setInstituicao(e.target.value)}
                placeholder={isEscola ? 'Ex: Boa Viagem' : 'Deixe em branco para todas'}
                className="form-input border-slate-300 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="filtro-cidade-serie" className="form-label text-slate-700">
                {isEscola ? 'Ano/Série' : 'Cidade da instituição'}
              </label>
              {isEscola ? (
                <select id="filtro-cidade-serie" value={cidade} onChange={(e) => setCidade(e.target.value)}
                  className="form-select border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Selecione o ano/série</option>
                  <option value="Maternal">Maternal</option>
                  <option value="Jardim I">Jardim I</option>
                  <option value="Jardim II">Jardim II</option>
                  {[...Array(9)].map((_, i) => <option key={`EF${i+1}`} value={`${i+1}º Ano Fundamental`}>{`${i+1}º Ano Fundamental`}</option>)}
                  {[...Array(3)].map((_, i) => <option key={`EM${i+1}`} value={`${i+1}ª Série Ensino Médio`}>{`${i+1}ª Série Ensino Médio`}</option>)}
                </select>
              ) : (
                <input
                  id="filtro-cidade-serie" type="text" value={cidade} onChange={(e) => setCidade(e.target.value)}
                  placeholder="Ex: Recife"
                  className="form-input border-slate-300 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
          
          {/* Linha 2: Bolsa (Esquerda), Modalidades (Centro), Botão Buscar (Direita) */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-6 gap-x-6"> {/* Aumentado gap-x para md */}
            {/* Seção da Bolsa */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <span className="text-sm font-medium text-slate-700 mr-1 sm:mr-2 whitespace-nowrap">Bolsa de até:</span>
              {[30, 50, 80].map((percent) => (
              <button
                  key={percent}
                  onClick={() => setBolsa(percent)}
                  className={`px-3 py-1.5 rounded-md font-medium text-xs sm:text-sm transition-colors duration-150
                  ${bolsa === percent 
                      ? 'bg-blue-600 text-white ring-2 ring-offset-1 ring-blue-500' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                  {percent}%
              </button>
              ))}
            </div>

            {/* Seção das Modalidades (Centralizado) */}
            <div className="flex items-center gap-x-3 sm:gap-x-4 gap-y-2 flex-wrap justify-center w-full md:flex-1 md:justify-center">
              <span className="text-sm font-medium text-slate-700 mr-1 sm:mr-2 whitespace-nowrap">Modalidade:</span>
              {Object.entries(modalidade).map(([key, value]) => (
              <label key={key} className="flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer">
                  <input
                  type="checkbox" checked={value} onChange={() => setModalidade((prev) => ({ ...prev, [key]: !prev[key] })) }
                  className="form-checkbox h-4 w-4 text-blue-600 accent-blue-500"
                  />
                  <span className="capitalize">{key}</span>
              </label>
              ))}
            </div>

            {/* Botão Buscar */}
            <div className="w-full md:w-auto md:ml-auto"> {/* md:ml-auto para empurrar para a direita se houver espaço */}
               <button
                  onClick={handleBuscarClick}
                  className="btn btn-primary w-full md:w-auto px-10 py-3 text-sm font-semibold"
              >
                  Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
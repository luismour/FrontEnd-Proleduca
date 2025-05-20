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

  const tabs = ['Superior', 'Escolas', 'Técnico', 'Idiomas', 'Pós'];

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

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCurso('');
    setInstituicao('');
    setCidade(newTab === 'Escolas' ? '' : 'Recife, PE');
  };

  const isEscola = tab === 'Escolas';

  return (
    <section className="w-full min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 pt-0">
        {/* Tabs */}
        <div className="flex">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => handleTabChange(item)}
              className={`flex-3 py-4 font-semibold ${tab === item ? 'bg-white' : 'bg-yellow-400'} ${
                tab === item ? ' border border-white' : ''
              } transition-colors`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 ">
          <div>
            <label className="text-sm font-semibold">
              {isEscola ? 'Qual a sua cidade?' : 'Qual curso você quer estudar?'}
            </label>
            <input
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              placeholder={isEscola ? 'Digite sua cidade' : 'Digite o curso'}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              {isEscola ? 'Qual o seu bairro?' : 'Qual a instituição?'}
            </label>
            <input
              type="text"
              value={instituicao}
              onChange={(e) => setInstituicao(e.target.value)}
              placeholder={isEscola ? 'Digite seu bairro' : 'Digite a instituição que deseja estudar'}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              {isEscola ? 'Ano/Série' : 'Em que cidade quer estudar?'}
            </label>
            <div className="flex">
              {isEscola ? (
                <select
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="flex-1 mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Selecione o ano/série</option>
                  {/* Educação Infantil */}
                  <option value="Maternal">Maternal</option>
                  <option value="Jardim I">Jardim I</option>
                  <option value="Jardim II">Jardim II</option>
                  {/* Ensino Fundamental */}
                  <option value="1º Ano">1º Ano</option>
                  <option value="2º Ano">2º Ano</option>
                  <option value="3º Ano">3º Ano</option>
                  <option value="4º Ano">4º Ano</option>
                  <option value="5º Ano">5º Ano</option>
                  <option value="6º Ano">6º Ano</option>
                  <option value="7º Ano">7º Ano</option>
                  <option value="8º Ano">8º Ano</option>
                  <option value="9º Ano">9º Ano</option>
                  {/* Ensino Médio */}
                  <option value="1ª Série">1ª Série</option>
                  <option value="2ª Série">2ª Série</option>
                  <option value="3ª Série">3ª Série</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Digite a cidade"
                  className="flex-1 mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              )}
              <button
                onClick={handleBuscar}
                className="ml-7 mt-1 bg-yellow-400 text-white font-bold px-4 rounded-md hover:bg-yellow-500"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Bolsa + Modalidade juntos */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Bolsa */}
          <div className="flex items-center gap-2 flex-1/2">
            <span className="font-semibold">Porcentagem da bolsa:</span>
            {[30, 50, 80].map((percent) => (
              <button
                key={percent}
                onClick={() => setBolsa(percent)}
                className={`px-3 py-1 rounded-md font-semibold text-sm ${
                  bolsa === percent ? 'bg-green-500 text-white' : 'bg-blue-100'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>

          {/* Modalidade */}
          <div className="flex items-center gap-2 mr-45">
            <span className="font-semibold">Modalidade:</span>
            {Object.entries(modalidade).map(([key, value]) => (
              <label key={key} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    setModalidade((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                  className="accent-blue-500"
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

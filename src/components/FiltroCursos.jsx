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
    onBuscar(filtros); // Passa os filtros para o componente pai
  };

  return (
    <section className="w-full min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 pt-0">
        {/* Tabs */}
        <div className="flex ">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
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
            <label className="text-sm font-semibold">Qual curso você quer estudar?</label>
            <input
              type="text"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              placeholder="Digite o curso"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Qual a instituição?</label>
            <input
              type="text"
              value={instituicao}
              onChange={(e) => setInstituicao(e.target.value)}
              placeholder="Digite a instituição que deseja estudar"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Em que cidade quer estudar?</label>
            <div className="flex">
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="flex-1 mt-1 p-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={handleBuscar}
                className=" ml-7 mt-1 bg-yellow-400 text-white font-bold px-4 rounded-md hover:bg-yellow-500 "
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

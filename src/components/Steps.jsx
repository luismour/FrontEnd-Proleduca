// src/components/Steps.jsx
import React from 'react';

// --- Ícones SVG de Exemplo ---
// Você pode substituir por seus próprios ícones ou uma biblioteca como react-icons/heroicons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500 mb-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
// --- Fim dos Ícones ---

export default function Steps() {
  const stepsData = [
    {
      number: 1,
      icon: <SearchIcon />,
      title: "Explore e Encontre",
      description: "Navegue por diversas bolsas e encontre a oportunidade perfeita para você e seus dependentes."
    },
    {
      number: 2,
      icon: <UserPlusIcon />,
      title: "Cadastre-se Facilmente",
      description: "Crie sua conta em poucos minutos e adicione os dados do bolsista de forma simples e rápida."
    },
    {
      number: 3,
      icon: <CheckBadgeIcon />,
      title: "Garanta sua Bolsa",
      description: "Realize o pagamento da taxa de adesão única e sua bolsa de estudos estará garantida!"
    }
  ];

  return (
    <section className="bg-slate-100 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-5">
          Como Funciona o <span className="text-blue-600">Edu</span><span className="text-yellow-400">pass</span>?
        </h2>
        <p className="text-slate-600 mb-12 md:mb-16 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
          Conquistar sua bolsa de estudos é um processo simples e transparente. Siga os passos abaixo e dê o próximo grande salto na sua jornada educacional!
        </p>
        
        <div className="relative">
          {/* Linha de conexão para desktop (opcional, visual) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
            <div className="absolute left-0 top-0 h-full w-1/3"></div> {/* Espaço antes do primeiro card */}
            <div className="absolute left-1/3 top-0 h-full w-1/3 border-t-2 border-dashed border-slate-300"></div> {/* Linha entre 1 e 2 */}
            <div className="absolute left-2/3 top-0 h-full w-1/3 border-t-2 border-dashed border-slate-300"></div> {/* Linha entre 2 e 3 */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"> {/* z-10 para cards ficarem sobre a linha */}
            {stepsData.map((step, index) => (
              <div 
                key={step.number} 
                className="bg-white p-6 rounded-xl shadow-xl text-center transform hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col items-center"
              >
                <div className="relative mb-5">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white font-bold text-2xl shadow-md">
                    {step.number}
                  </div>
                  {/* Posicionamento do ícone sobreposto ao número, se desejado, ou apenas acima */}
                </div>
                
                {step.icon} {/* Ícone SVG */}
                
                <h3 className="text-xl font-semibold text-slate-800 mb-2 mt-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/Steps.jsx
export default function Steps() {
  const stepsData = [
    {
      number: 1,
      title: "Explore e Encontre",
      description: "Navegue pelas diversas bolsas e encontre a oportunidade perfeita para você."
    },
    {
      number: 2,
      title: "Cadastre-se Facilmente",
      description: "Crie sua conta em poucos minutos e preencha seus dados para o bolsista."
    },
    {
      number: 3,
      title: "Garanta sua Bolsa",
      description: "Pague a taxa de adesão única e sua bolsa de estudos estará garantida!"
    }
  ];

  return (
    <section className="bg-slate-100 py-16 md:py-20 px-4"> {/* Fundo da seção claro */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4">
          Como Funciona o Edupass?
        </h2>
        <p className="text-slate-600 mb-12 md:mb-16 max-w-3xl mx-auto text-base md:text-lg">
          Conquistar sua bolsa de estudos é um processo simples e transparente. Siga os passos abaixo e dê o próximo grande salto na sua jornada educacional!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stepsData.map((step) => (
            <div 
              key={step.number} 
              className="bg-white p-6 rounded-xl shadow-lg text-left transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4 shadow-md">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{step.title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
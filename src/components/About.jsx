// src/components/About.jsx
import React from 'react';
import { FaArrowRight } from "react-icons/fa";

export default function About() {
  return (
    // Fundo azul mais escuro para esta seção.
    // Exemplos: bg-blue-700, bg-indigo-700, bg-slate-800 (se quiser um azul bem fechado/acinzentado)
    // Usaremos bg-blue-700 como ponto de partida.
    <section className="bg-blue-700 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"> {/* Aumentado o gap */}
          
          {/* Coluna da Esquerda: Logo Proeminente */}
          <div className="text-center md:text-left">
            <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-4"> {/* Aumentado o tamanho da logo */}
              <span className="text-white">Edu</span>
              <span className="text-yellow-400">pass</span>
            </h2>
            <p className="text-xl lg:text-2xl text-blue-200"> {/* Tom de azul mais claro para subtítulo */}
              Seu passaporte para o futuro pela educação.
            </p>
            {/* Você pode adicionar uma imagem/ilustração aqui se desejar,
                garantindo que ela contraste bem com o fundo azul escuro.
            <img 
              src="/path-to-your-dark-theme-illustration.svg" 
              alt="Educação Transformadora" 
              className="w-full max-w-md mx-auto md:mx-0 rounded-lg mt-8"
            /> 
            */}
          </div>

          {/* Coluna da Direita: Conteúdo de Texto */}
          <div className="md:pl-4"> {/* Pequeno ajuste no padding se necessário */}
            <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3"> {/* Destaque em amarelo */}
              Quem Somos
            </h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Sobre o Edupass e a Proleduca
            </h2>
            <p className="text-lg text-blue-100 mb-4 leading-relaxed"> {/* Texto em tom de azul claro para contraste */}
              O <span className="font-semibold text-white">Edupass</span> é uma iniciativa da <span className="font-semibold text-white">Proleduca</span>, nascida da crença no poder transformador da educação. Nossa missão é criar pontes entre estudantes, instituições de ensino e empresas, facilitando o acesso a bolsas de estudo e oportunidades reais de crescimento profissional e pessoal.
            </p>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Acreditamos que aprender muda <span className="font-semibold text-yellow-400">tudo</span> — e que cada talento merece a chance de florescer.
            </p>
            <a 
              href="https://proleduca.com.br/quem-somos/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-400 text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg text-base transform hover:scale-105"
            >
              Conheça a Proleduca
              <FaArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
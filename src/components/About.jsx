// src/components/About.jsx
import React from 'react';
import { FaArrowRight } from "react-icons/fa";

export default function About() {
  return (
    
    <section className="bg-blue-700 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"> {/*  */}
          
          {/*  */}
          <div className="text-center md:text-left">
            <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-4"> {/* */}
              <span className="text-white">Edu</span>
              <span className="text-yellow-400">pass</span>
            </h2>
            <p className="text-xl lg:text-2xl text-blue-200"> {/* */}
              Seu passaporte para o futuro pela educação.
            </p>
          </div>

          {/* Coluna da Direita: Conteúdo de Texto */}
          <div className="md:pl-4"> 
            <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-3">
              Quem Somos
            </h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Sobre o Edupass e a Proleduca
            </h2>
            <p className="text-lg text-blue-100 mb-4 leading-relaxed"> 
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
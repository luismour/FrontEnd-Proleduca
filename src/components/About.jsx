import { FaArrowRight } from "react-icons/fa";

export default function SobreEduPass() {
  return (
    <section className="bg-blue-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Imagem */}
        <div className="w-full md:w-1/2">
        <h2 className="text-6xl font-bold mb-6 ml-35 leading-tight">
            <span className="font-extrabold">Edu</span><span className="text-yellow-400">pass</span>
          </h2>
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Sobre o <span className="text-yellow-300">Edu-Pass</span>
          </h2>
          <p className="text-lg mb-4">
          O <span className="font-bold"> Edu-Pass </span> é um projeto da <span className="font-bold"> Proleduca </span> que acredita no poder transformador da educação. Criamos uma ponte entre empresas, instituições e colaboradores para que mais pessoas tenham acesso a bolsas de estudo e oportunidades reais de crescimento.
          </p>
          <p className="text-lg mb-6">
          Porque aprender muda <span className="font-bold text-yellow-300">tudo</span> — e todo talento merece essa chance.
          </p>
          <a 
            href="https://proleduca.com.br/quem-somos/index.php"
            target="_blank"
            className="inline-flex items-center gap-2 bg-yellow-400 text-white-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
          >
            Conheça nossa história
            <FaArrowRight />
          </a>
        </div>

      </div>
    </section>
  );
}

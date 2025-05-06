import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* WhatsApp Contact */}
        <div className="text-center">
          <p className="font-semibold mb-2">Clique e fale com a gente</p>
          <a 
            href="https://wa.me/5581991297982" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            <FaWhatsapp className="mr-2" /> (81) 9 9129-7982
          </a>
        </div>

        {/* Logo and Hashtag */}
        <div className="text-center">
          <h2 className="text-xl font-bold">Prol Educa</h2>
          <p className="text-sm text-gray-500">#AjudandoAEducar</p>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-4">
          <a href="https://www.instagram.com/proleduca/" target="_blank" className="text-gray-600 hover:text-gray-900"><FaInstagram size={24}  /></a>
          <a href="#" className="text-gray-600 hover:text-gray-900"><FaFacebook size={24} /></a>
          <a href="#" className="text-gray-600 hover:text-gray-900"><FaLinkedin size={24} /></a>
        </div>
      </div>

      <div className="bg-blue-600 text-white mt-8">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Política Bolsa Garantida */}
          <div>
            <h4 className="font-bold mb-2">POLÍTICA BOLSA GARANTIDA</h4>
            <p className="text-sm">Seu filho na escola ou seu dinheiro de volta</p>
          </div>

          {/* Acesse o Sistema */}
          <div>
            <h4 className="font-bold mb-2">ACESSE O SISTEMA</h4>
            <p className="text-sm">
              <a href="#" className="underline hover:text-gray-300">
                Faça aqui o seu login
              </a>
            </p>
          </div>

          {/* Endereço */}
          <div>
            <h4 className="font-bold mb-2">PROL EDUCA</h4>
            <p className="text-sm">
              Endereço: R. do Bom Jesus, 237 - Recife, PE, 50030-170
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-bold mb-2">Navegação</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Institucional</a></li>
              <li><a href="#" className="hover:underline">Explore - Departamentos</a></li>
              <li><a href="#" className="hover:underline">Contato - Fale Conosco</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-700 text-center py-4 text-white text-sm">
        © {new Date().getFullYear()} Prol Educa. Todos os direitos reservados.
      </div>
    </footer>
  );
}

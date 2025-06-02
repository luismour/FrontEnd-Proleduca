// src/components/Footer.jsx
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
    { href: "https://www.instagram.com/proleduca/", icon: <FaInstagram size={24} />, label: "Instagram" },
    { href: "#", icon: <FaFacebook size={24} />, label: "Facebook" },
    { href: "#", icon: <FaLinkedin size={24} />, label: "LinkedIn" },
  ];

  const footerSections = [
    {
      title: "POLÍTICA BOLSA GARANTIDA",
      content: "Seu futuro na escola ou seu dinheiro de volta.",
    },
    {
      title: "ACESSE O SISTEMA",
      content: <Link to="/login" className="hover:text-blue-600 underline">Faça aqui o seu login</Link>,
    },
    {
      title: "PROL EDUCA",
      content: "Endereço: R. do Bom Jesus, 237 - Recife, PE, 50030-170",
    },
    {
      title: "NAVEGAÇÃO",
      links: [
        { href: "#", text: "Institucional" },
        { href: "#", text: "Explore Oportunidades" },
        { href: "#", text: "Contato - Fale Conosco" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-100 text-slate-700 border-t border-slate-200"> {/* Fundo principal claro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-blue-600">
              <span className="font-extrabold">Edu</span>
              <span className="text-yellow-400">pass</span>
            </h3>
            <p className="text-sm text-slate-500 mt-1">by Prol Educa #AjudandoAEducar</p>
          </div>

          <div className="text-center">
            <p className="font-semibold text-slate-800 mb-2">Clique e fale com a gente</p>
            <a 
              href="https://wa.me/5581991297982" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 shadow focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              <FaWhatsapp className="mr-2 h-5 w-5" /> (81) 9 9129-7982
            </a>
          </div>

          <div className="flex justify-center md:justify-end space-x-5">
            {socialLinks.map(social => (
              <a 
                key={social.label} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-slate-500 hover:text-blue-600 transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="py-8 md:py-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {footerSections.map(section => (
            <div key={section.title} className="text-center sm:text-left">
              <h4 className="font-semibold text-slate-800 mb-3 uppercase tracking-wider text-xs">
                {section.title}
              </h4>
              {section.content && <p className="leading-relaxed text-slate-600">{section.content}</p>}
              {section.links && (
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.text}>
                      <a href={link.href} className="text-slate-600 hover:text-blue-600 hover:underline transition-colors duration-300">
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-200 text-center py-5"> {/* Faixa de copyright clara */}
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Prol Educa (Edupass). Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
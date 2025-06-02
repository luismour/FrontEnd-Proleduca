// src/pages/HomePage.jsx
import OpportunitiesList from "../components/OpportunitiesList";
import About from "../components/About"; // Renomeado de SobreEduPass
import Footer from "../components/Footer";

function HomePage() {
  return (
    // O fundo principal pode ser definido no App.jsx ou no body em index.css
    // Para garantir um fundo claro aqui, podemos adicionar:
    <div className="bg-slate-50"> {/* Um cinza muito claro como base para a página */}
      <OpportunitiesList />
      <About />
      <Footer />
    </div>
  );
}

export default HomePage;
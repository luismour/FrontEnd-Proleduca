// src/pages/HomePage.jsx
import OpportunitiesList from "../components/OpportunitiesList";
import About from "../components/About"; 
import Footer from "../components/Footer";

function HomePage() {
  return (

    <div className="bg-slate-50"> 
      <OpportunitiesList />
      <About />
      <Footer />
    </div>
  );
}

export default HomePage;
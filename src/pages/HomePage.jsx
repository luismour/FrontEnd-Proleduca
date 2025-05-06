import Header from "../components/Header";
import Steps from "../components/Steps";
import Footer from "../components/Footer";
import FiltroCursos from "../components/FiltroCursos";
import OpportunitiesList  from "../components/OpportunitiesList";
import About from "../components/About";

function HomePage() {
  return (
    <>
      <FiltroCursos />
      <Steps />
      <OpportunitiesList />
      <About />
      <Footer />
    </>
  );
}

export default HomePage;

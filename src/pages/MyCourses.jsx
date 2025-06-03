import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import OportunityCard from "../components/OpportunitiesList"

export default function MyOportunities() {
  const [minhasBolsas, setMinhasBolsas] = useState([]);

  useEffect(() => {
    axios.get("/api/minhas-bolsas")
      .then((res) => {
        console.log("Resposta da API:", res.data);
       
        const data = Array.isArray(res.data) ? res.data : res.data.bolsas || [];
        setMinhasBolsas(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar bolsas:", err);
    
        setMinhasBolsas([
          {
            id: 1,
            curso: "Análise e Desenvolvimento de Sistemas",
            instituicao: "FICR",
            status: "Confirmado",
            mensalidade: "R$ 480,00",
            dataAdesao: "03/08/2023",
            logoUrl: "/ficr_logo.png",
          },
          {
            id: 2,
            curso: "Engenharia de Produção",
            instituicao: "Estácio",
            status: "Pendente",
            mensalidade: "R$ 282,21",
            dataAdesao: "15/02/2018",
            logoUrl: "/estacio_logo.png",
          },
        ]);
      });
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-1">Minhas Bolsas</h1>
        <p className="text-sm text-gray-600 mb-6">
          Veja os detalhes das suas bolsas de estudo.
        </p>

        <div className="space-y-4">
          {Array.isArray(minhasBolsas) && minhasBolsas.length > 0 ? (
            minhasBolsas.map((bolsa) => (
              <OportunityCard key={bolsa.id} bolsa={bolsa} />
            ))
          ) : (
            <p className="text-gray-500">Nenhuma bolsa encontrada.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

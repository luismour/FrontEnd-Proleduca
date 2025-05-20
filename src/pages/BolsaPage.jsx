import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function BolsaPage() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/courses/${id}`)
      .then(response => {
        setOpportunity(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar curso:', err);
        setError('Erro ao carregar os dados do curso');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Carregando curso...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!opportunity) return <p className="text-center mt-10">Oportunidade não encontrada</p>;

  const inst = opportunity.institutions;
  const location = inst
    ? `${inst.street ?? '-'}, ${inst.number ?? '-'}, ${inst.neighborhood ?? '-'} - ${inst.city ?? '-'} / ${inst.state ?? '-'}`
    : 'Informações da instituição não disponíveis';

  return (
    <>

      <body className="bg-gray-100 min-h-screen">
        <main className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-6">
          {/* Coluna Esquerda */}
          <div className="flex-1">
            <img
              /*src={inst?.urlImage || opportunity.imageUrl} */
              src={"/cover_ficr.png"}
              alt={inst?.name || opportunity.name}
              className="w-full"
            />
            <h2 className="text-xl font-semibold mt-6 mb-2">Informações do curso</h2>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {opportunity.description || 'Nenhuma descrição fornecida.'}
            </p>
          </div>

          {/* Coluna Direita */}
          <div className="w-full md:w-80 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">{opportunity.name}</h2>
              {opportunity.originalValue && (
                <p className="text-sm text-gray-400 line-through">
                  R$ {parseFloat(opportunity.originalValue).toFixed(2).replace('.', ',')}
                </p>
              )}
              {opportunity.discountValue && (
                <p className="text-2xl font-bold text-yellow-500 mb-5">
                  R$ {parseFloat(opportunity.discountValue).toFixed(2).replace('.', ',')}
                </p>
              )}
              <Link
                to={`/inscricao/${opportunity.id}`}
                className="mt-15 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition"
              >
                Inscrever-se na bolsa
              </Link>
            </div>

            {/* Localização abaixo da oferta */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-3">
              {inst?.urlImage && (
                <img src={ "/ficr_icon.png" ||inst.urlImage} alt={inst.name} className="w-15 h-15 object-contain" />
              )}
              <div>
                <p className="text-sm text-gray-600 font-medium">Onde você vai estudar?</p>
                <p className="text-sm text-gray-500">{location}</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </body>
    </>
  );
}

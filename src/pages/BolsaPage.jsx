import { useParams, Link } from 'react-router-dom';
import { useOpportunities } from '../contexts/OpportunitiesContext.jsx';
import { locationsData } from '../data/localInfos';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import LocalInfoCard from '../components/LocalInfoCard.jsx';

export default function BolsaPage() {
  const { id } = useParams();
  const { opportunities } = useOpportunities();
  const opportunity = opportunities.find(o => o.id === parseInt(id));

  if (!opportunity) return <p>Oportunidade não encontrada</p>;

  const locationInfo = locationsData[opportunity.institution];
  const [line1, line2] = opportunity.location.split('\n');

  return (
    <>

      <body className="bg-gray-100 min-h-screen">
      <main className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 mt-6">
        {/* Coluna Esquerda */}
        <div className="flex-1">
          <img
            src={locationInfo.coverImageUrl || opportunity.logoUrl}
            alt={opportunity.institution}
            className="w-full"
          />
          <h2 className="text-xl font-semibold mt-6 mb-2">Informações do curso</h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {opportunity.description}
          </p>
        </div>

        {/* Coluna Direita */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{opportunity.course}</h2>
            <p className="text-sm text-gray-600 mb-2">{line1} - {line2}</p>
            <p className="text-sm text-gray-400 line-through">{opportunity.originalPrice}</p>
            <p className="text-2xl font-bold text-yellow-500 mb-5">{opportunity.discountedPrice}</p>
            <Link
            to={`/inscricao/${opportunity.id}`}
            className="mt-15 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition"
          >
            Inscrever-se na bolsa
          </Link>
          </div>

          {/* Localização abaixo da oferta */}
          {locationInfo && (
            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-3">
              <img src={locationInfo.icon} alt="Local" className="w-15 h-15" />
              <div>
                <p className="text-sm text-gray-600 font-medium">Onde você vai estudar?</p>
                <p className="text-sm text-gray-500">{locationInfo.address}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      </body>
    </>
  );
}

// src/pages/BolsaPage.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import LoadingSpinner from '../components/LoadingSpinner';


const BackArrowIcon = ({ className = "w-5 h-5 mr-2" }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.56l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L5.56 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
const BuildingOfficeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.75M9 12h6.75m-6.75 5.25h6.75M5.25 6.75h.008v.008H5.25V6.75zm0 5.25h.008v.008H5.25V12zm0 5.25h.008v.008H5.25v-5.25z" />
    </svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600"> {/* Cor verde para o ícone da tag de desconto */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);


export default function BolsaPage() {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!id) {
      setError('ID da oportunidade não fornecido.');
      setLoading(false);
      return;
    }
    axiosInstance.get(`/courses/${id}`)
      .then(response => {
        setOpportunity(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar curso:', err);
        setError(err.response?.status === 404 ? 'Oportunidade não encontrada.' : 'Erro ao carregar os dados do curso.');
        setLoading(false);
      });
  }, [id]);

  const handleInscricaoClick = () => {
    if (!user) {
        navigate('/login', { state: { from: `/bolsa/${id}` } });
    } else {
        navigate(`/inscricao/${id}`);
    }
  };

  if (loading) 
  if (error) 
  if (!opportunity) 

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex justify-center items-center bg-slate-50">
        <LoadingSpinner size="h-12 w-12" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex flex-col justify-center items-center bg-slate-50 p-6 text-center">
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <Link to="/" className="btn btn-primary">Voltar para Home</Link>
      </div>
    );
  }
  if (!opportunity) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex flex-col justify-center items-center bg-slate-50 p-6 text-center">
        <p className="text-slate-700 text-xl mb-4">Oportunidade não encontrada.</p>
        <Link to="/" className="btn btn-primary">Voltar para Home</Link>
      </div>
    );
  }

  const institution = opportunity.institutions || {};
  const locationString = [institution.city, institution.state].filter(Boolean).join(', ') || 'Localização não informada';
  const fullAddress = `${institution.street || ''}, ${institution.number || ''}${institution.complement ? ' - ' + institution.complement : ''} - ${institution.neighborhood || ''}, ${locationString}`.replace(/ , |, - | - /g, ', ').replace(/^,|, $/g, '');

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Botão Voltar */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)} 
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-150 group"
          >
            <BackArrowIcon className="w-5 h-5 mr-1.5 text-slate-500 group-hover:text-blue-500 transition-colors" />
            Voltar
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12 items-start">

          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <div className="aspect-w-16 aspect-h-9 bg-slate-100 rounded-xl shadow-lg overflow-hidden mb-6">
              <img
                src={opportunity.imageUrl || institution.urlImage || 'https://via.placeholder.com/800x450/E2E8F0/94A3B8?text=Curso'}
                alt={`Imagem do curso ${opportunity.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
              {opportunity.name || 'Nome do Curso Indisponível'}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-slate-500 mb-6 gap-x-4 gap-y-1">
                <div className="flex items-center">
                    <BuildingOfficeIcon />
                    <span className="ml-1">{institution.name || 'Instituição não informada'}</span>
                </div>
                {opportunity.shift && (
                    <div className="flex items-center">
                        <ClockIcon />
                        <span className="ml-1">{opportunity.shift}</span>
                    </div>
                )}
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
              <h2 className="text-xl font-semibold text-slate-800 mb-2 border-b border-slate-200 pb-2">Sobre o Curso</h2>
              <p>
                {opportunity.description || 'Nenhuma descrição detalhada fornecida para este curso. Entre em contato com a instituição para mais informações.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8 sticky top-24">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-1">Sua Oportunidade Edupass</h2>
              {opportunity.percentageScholarship && (
                <div className="flex items-center text-sm text-green-600 font-semibold my-3">
                    <TagIcon />
                    <span className="ml-1.5">Bolsa de {opportunity.percentageScholarship}% disponível!</span>
                </div>
              )}
              
              {opportunity.originalValue && opportunity.originalValue > 0 && (
                <p className="text-sm text-slate-500 line-through">
                  Mensalidade: R$ {Number(opportunity.originalValue).toFixed(2).replace('.', ',')}
                </p>
              )}
              <p className="text-3xl font-bold text-blue-600 my-1">
                R$ {Number(opportunity.discountValue).toFixed(2).replace('.', ',')}
                <span className="text-base font-normal text-slate-600"> /mês com bolsa</span>
              </p>
              {opportunity.discountEntrance > 0 && (
                <p className="text-sm text-slate-600 mb-5">
                  + Matrícula com desconto: R$ {Number(opportunity.discountEntrance).toFixed(2).replace('.', ',')}
                </p>
              )}

              <button
                onClick={handleInscricaoClick}
                className="btn btn-primary w-full text-base py-3 mt-4 shadow-lg hover:shadow-xl"
              >
                Quero esta Bolsa!
              </button>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Ao clicar, você será direcionado para o formulário de inscrição.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Onde você vai estudar?</h3>
              {institution.urlImage && (
                <div className="w-full h-20 bg-slate-50 rounded-md flex items-center justify-center mb-4 overflow-hidden p-1">
                    <img src={institution.urlImage} alt={`Logo ${institution.name}`} className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <p className="font-medium text-slate-700">{institution.name || 'Nome da Instituição'}</p>
              <div className="text-sm text-slate-600 mt-1.5 space-y-1">
                <div className="flex items-start">
                    <MapPinIcon />
                    <span className="ml-1.5">{fullAddress || 'Endereço não informado'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
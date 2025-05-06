import React, { useEffect } from 'react';
import OpportunityCard  from './OpportunityCard';
import { useOpportunities } from '../contexts/OpportunitiesContext.jsx';

export default function OpportunitiesList() {
  const { opportunities, setOpportunities } = useOpportunities();
  const [favorites, setFavorites] = React.useState([]);

  useEffect(() => {
    
    setOpportunities([
      {
        id: 1,
        logoUrl: '/ficr_logo.png',
        institution: 'Faculdade Católica Imaculada Conceição',
        course: 'Análise e Desenvolvimento de Sistemas',
        location: 'Noite - Presencial\nRecife - PE',
        percent: '50% de desconto',
        originalPrice: 'R$ 900,00',
        discountedPrice: 'R$ 450,00',
        description: 'O estudante de Análise e Desenvolvimento de Sistemas aprende a projetar, documentar, especificar, testar, implementar e cuidar da manutenção de sistemas computacionais e software. O Brasil é um importante investidor no mundo da tecnologia da informação.\n\nA duração mínima é de 2 anos e meio (5 períodos), e o curso de Análise e Desenvolvimento de Sistemas possui foco na formação de profissionais preparados e atentos às exigências do mercado de trabalho.\n\nAs aulas possibilitam o desenvolvimento de habilidades para atuar nas áreas de desenvolvimento de sistemas em suas diversas vertentes. Os alunos são orientados a aprender sobre a análise e modelagem de sistemas de forma prática.\n\nO curso é voltado para a formação de profissionais com conhecimentos em programação, banco de dados, engenharia de software, redes de computadores e desenvolvimento web. O estudante aprende a desenvolver sistemas e aplicativos para diferentes plataformas, como desktop, web e dispositivos móveis.',
      },
      {
        id: 2,
        logoUrl: '/ficr_logo.png',
        institution: 'Faculdade Católica Imaculada Conceição',
        course: 'Gestão de Recursos Humanos',
        location: 'Nota - Presencial\nRecife - PE',
        percent: '50% de desconto',
        originalPrice: 'R$ 900,00',
        discountedPrice: 'R$ 450,00',
        description: 'O curso de Gestão de Recursos Humanos prepara profissionais para atuar de forma estratégica na administração de pessoas dentro das organizações. O estudante desenvolve habilidades em recrutamento e seleção, treinamento e desenvolvimento, avaliação de desempenho, além de aprender sobre legislação trabalhista e relações sindicais.\n\nO curso também foca no desenvolvimento de competências interpessoais e visão organizacional, capacitando o aluno a contribuir para o crescimento e valorização do capital humano nas empresas.\n\nDuração média: 2 anos (4 semestres).',
      },
      {
        id: 3,
        logoUrl: '/estacio_logo.png',
        institution: 'Estácio',
        course: 'Enfermagem',
        location: 'Nota - Presencial\nRecife - PE',
        percent: '50% de desconto',
        originalPrice: 'R$ 800,00',
        discountedPrice: 'R$ 400,00',
        description: 'O curso de Enfermagem forma profissionais aptos a atuar na promoção, prevenção, recuperação e reabilitação da saúde. O aluno aprende sobre anatomia, fisiologia, farmacologia, saúde coletiva, cuidados clínicos e hospitalares, além de práticas em laboratórios e estágios supervisionados.\n\nO curso tem como objetivo formar enfermeiros comprometidos com o cuidado humanizado, ética profissional e a segurança do paciente.\n\nDuração média: 5 anos (10 semestres).',
      },
      {
        id: 4,
        logoUrl: '/estacio_logo.png',
        institution: 'Estácio',
        course: 'Administração',
        location: 'Nota - Presencial\nRecife - PE',
        percent: '50% de desconto',
        originalPrice: 'R$ 500,00',
        discountedPrice: 'R$ 250,00',
        description: 'O curso de Administração capacita o aluno a planejar, organizar, dirigir e controlar os recursos de uma empresa ou instituição. Abrange disciplinas como gestão financeira, marketing, recursos humanos, logística, empreendedorismo e planejamento estratégico.\n\nO estudante é preparado para atuar em diferentes setores da economia, desenvolvendo habilidades analíticas e liderança para enfrentar os desafios do mercado.\n\nDuração média: 4 anos (8 semestres).',
      },
      {
        id: 5,
        logoUrl: '/uninassau_logo.png',
        institution: 'Uninassau',
        course: 'Gestão de TI',
        location: 'Nota - Presencial\nRecife - PE',
        percent: '50% de desconto',
        originalPrice: 'R$ 1000,00',
        discountedPrice: 'R$ 500,00',
        description: 'O curso de Gestão de Tecnologia da Informação (Gestão de TI) forma profissionais para liderar projetos de tecnologia, administrar redes, gerenciar dados e coordenar equipes de suporte e desenvolvimento.\n\nO aluno aprende sobre infraestrutura de TI, segurança da informação, banco de dados, governança de TI e gestão de projetos, com foco no alinhamento estratégico da tecnologia com os objetivos do negócio.\n\nDuração média: 2 anos (4 semestres).',
      },
      {
        id: 6,
        logoUrl: '/uninassau_logo.png',
        institution: 'Uninassau',
        course: 'Direito',
        location: 'Nota - Presencial\nRecife - PE',
        percent: '50% de desconto',
        originalPrice: 'R$ 1500,00',
        discountedPrice: 'R$ 750,00',
        description: 'O curso de Direito prepara profissionais para atuar em diversas áreas jurídicas, como advocacia, magistratura, promotoria e defensoria pública. O estudante aprende sobre direito constitucional, civil, penal, trabalhista, empresarial e internacional, além de desenvolver senso crítico, argumentação e conhecimento da legislação brasileira.\n\nDurante a graduação, são oferecidas atividades práticas como simulações de júri, estágio supervisionado e núcleos de prática jurídica.\n\nDuração média: 5 anos (10 semestres).',
      }
    
    ]);
  }, []);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Melhores oportunidades</h1>
      <h2 className="text-md text-gray-600 mb-6">
        Em <span className="text-yellow-500">Recife, PE</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            {...opportunity}
            isFavorite={favorites.includes(opportunity.id)}
            onToggleFavorite={() => toggleFavorite(opportunity.id)}
          />
        ))}
      </div>

    </div>
  );
}

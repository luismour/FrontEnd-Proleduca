export function filtrarOportunidades(oportunidades, filtros) {
  if (!oportunidades || !Array.isArray(oportunidades)) return [];
  if (!filtros) return oportunidades; // Se não há filtros, retorna tudo

  return oportunidades.filter((item) => {
    const tabSelecionadaLower = filtros.tab?.toLowerCase();
    // Certifique-se que 'escola' corresponde ao valor da sua aba para escolas em FiltroCursos.jsx (em minúsculas)
    // e também ao valor de item.institutionType (vindo de institutions.type da API, em minúsculas).
    const isEscolaTab = tabSelecionadaLower === 'escola'; 

    // --- Filtro de Modalidade: IGNORADO POR ENQUANTO ---
    const modalidadeMatch = true; 

    // --- Filtro de Bolsa ---
    let bolsaPercentMatch = true;
    if (typeof filtros.bolsa === 'number' && item.percent) {
      const bolsaValorItem = parseInt(String(item.percent).replace(/[^\d]/g, ''));
      bolsaPercentMatch = !isNaN(bolsaValorItem) ? bolsaValorItem >= filtros.bolsa : false;
    }

    // --- Filtro de Aba (Tipo/Nível) ---
    let tabMatch = true; // Padrão para true se a aba não for um critério (ex: filtros.tab não definido)
    const tipoInstituicaoLower = item.institutionType?.toLowerCase();
    if (tabSelecionadaLower) { // Aplicar filtro de aba apenas se uma aba foi selecionada
      tabMatch = tipoInstituicaoLower === tabSelecionadaLower;
    }

    // --- Filtros Condicionais (Curso/Cidade, Instituição/Bairro, Localização/AnoSérie) ---
    let inputCursoMatch, inputInstituicaoMatch, inputLocalizacaoMatch;

    if (isEscolaTab) {
      // Na aba "Escolas":
      // filtros.curso é a "Cidade" digitada pelo usuário
      inputCursoMatch = !filtros.curso || (item.city && item.city.toLowerCase().includes(filtros.curso.toLowerCase()));
      
      // filtros.instituicao é o "Bairro" digitado pelo usuário
      inputInstituicaoMatch = !filtros.instituicao || (item.neighborhood && item.neighborhood.toLowerCase().includes(filtros.instituicao.toLowerCase()));
      
      // filtros.cidade é "Ano/Série" - IGNORAR POR ENQUANTO
      inputLocalizacaoMatch = true; 
    } else {
      // Para outras abas (Superior, Técnico, etc.):
      inputCursoMatch = !filtros.curso || (item.course && item.course.toLowerCase().includes(filtros.curso.toLowerCase()));
      inputInstituicaoMatch = !filtros.instituicao || (item.institution && item.institution.toLowerCase().includes(filtros.instituicao.toLowerCase()));
      // filtros.cidade é a "Cidade onde quer estudar"
      inputLocalizacaoMatch = !filtros.cidade || (item.location && item.location.toLowerCase().includes(filtros.cidade.toLowerCase()));
    }

    return (
      inputCursoMatch &&
      inputInstituicaoMatch &&
      inputLocalizacaoMatch &&
      bolsaPercentMatch &&
      modalidadeMatch &&
      tabMatch
    );
  });
}
// src/utils/filtrarOportunidades.js
export function filtrarOportunidades(oportunidades, filtros) {
  if (!oportunidades || !Array.isArray(oportunidades)) return [];
  if (!filtros) return oportunidades; // Se não há filtros, retorna tudo

  // Limpa e normaliza os valores de texto dos filtros uma vez
  const normalizedFiltros = {
    ...filtros,
    tab: filtros.tab?.toLowerCase(),
    curso: filtros.curso?.toLowerCase().trim(),
    instituicao: filtros.instituicao?.toLowerCase().trim(),
    cidade: filtros.cidade?.toLowerCase().trim(),
    // bolsa já é número, modalidade é objeto
  };

  return oportunidades.filter((item) => {
    const tabSelecionadaLower = normalizedFiltros.tab;
    const isEscolaTab = tabSelecionadaLower === 'escola'; // Assumindo que 'escola' é o valor normalizado da aba

    // --- Filtro de Modalidade: IGNORADO POR ENQUANTO ---
    // Se for reativar, certifique-se que item.modality exista e corresponda aos checkboxes
    const modalidadeMatch = true;

    // --- Filtro de Bolsa ---
    let bolsaPercentMatch = true;
    if (typeof normalizedFiltros.bolsa === 'number' && item.percent) { // item.percent é string como "50%"
      const bolsaValorItem = parseInt(String(item.percent).replace(/[^\d]/g, ''));
      // Filtrar cursos com porcentagem ATÉ a porcentagem do filtro
      bolsaPercentMatch = !isNaN(bolsaValorItem) ? bolsaValorItem <= normalizedFiltros.bolsa : false;
    }

    // --- Filtro de Aba (Tipo/Nível da Instituição) ---
    let tabMatch = true;
    const tipoInstituicaoLower = item.institutionType?.toLowerCase();
    if (tabSelecionadaLower) {
      tabMatch = tipoInstituicaoLower === tabSelecionadaLower;
    }

    // --- Filtros Condicionais (Curso/Cidade, Instituição/Bairro, Localização/AnoSérie) ---
    let inputCursoMatch = true;
    let inputInstituicaoMatch = true;
    let inputLocalizacaoMatch = true; // Para o terceiro campo de filtro

    if (isEscolaTab) {
      // Na aba "Escolas":
      // filtros.curso (normalizado) é a "Cidade" digitada pelo usuário
      if (normalizedFiltros.curso) { // Aplicar filtro apenas se houver valor
        inputCursoMatch = item.city && item.city.toLowerCase().includes(normalizedFiltros.curso);
      }

      // filtros.instituicao (normalizado) é o "Bairro" digitado pelo usuário
      if (normalizedFiltros.instituicao) { // Aplicar filtro apenas se houver valor
        inputInstituicaoMatch = item.neighborhood && item.neighborhood.toLowerCase().includes(normalizedFiltros.instituicao);
      }

      // filtros.cidade (normalizado) é "Ano/Série" para a aba Escola
      inputLocalizacaoMatch = true; // Ignorando filtro de Ano/Série para escolas por enquanto

    } else {
      // Para outras abas (Superior, Técnico, etc.):
      // filtros.curso (normalizado) é o "Curso"
      if (normalizedFiltros.curso) {
        inputCursoMatch = item.course && item.course.toLowerCase().includes(normalizedFiltros.curso);
      }

      // filtros.instituicao (normalizado) é a "Instituição"
      if (normalizedFiltros.instituicao) {
        inputInstituicaoMatch = item.institution && item.institution.toLowerCase().includes(normalizedFiltros.instituicao);
      }

      // filters.cidade (normalized) is the "City where you want to study"
      // CORREÇÃO: Comparar com item.city OU item.state
      if (normalizedFiltros.cidade) {
        const cityMatch = item.city && item.city.toLowerCase().includes(normalizedFiltros.cidade);
        const stateMatch = item.state && item.state.toLowerCase() === normalizedFiltros.cidade; // Exact match for state abbreviation
        inputLocalizacaoMatch = cityMatch || stateMatch;
      }
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
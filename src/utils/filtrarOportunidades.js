export function filtrarOportunidades(oportunidades, filtros) {
  return oportunidades.filter((item) => {
    const cursoMatch = item.course.toLowerCase().includes(filtros.curso.toLowerCase());
    const instMatch = item.institution.toLowerCase().includes(filtros.instituicao.toLowerCase());
    const cidadeMatch = item.location.toLowerCase().includes(filtros.cidade.toLowerCase());

    const bolsaPercent = parseInt(item.percent.replace(/[^\d]/g, '')) >= filtros.bolsa;

    const modalidadeInfo = {
      presencial: /presencial/i.test(item.location),
      semi: /semi/i.test(item.location),
      ead: /ead/i.test(item.location),
    };

    const modalidadeMatch = Object.entries(filtros.modalidade).some(
      ([key, val]) => val && modalidadeInfo[key]
    );

    const tabMatch =
      filtros.tab === 'Superior' ||
      item.course.toLowerCase().includes(filtros.tab.toLowerCase());

    return cursoMatch && instMatch && cidadeMatch && bolsaPercent && modalidadeMatch && tabMatch;
  });
}

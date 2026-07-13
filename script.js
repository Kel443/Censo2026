/* ==========================================================================
   script.js - Logica Interativa para Escolas Censo 2026
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Seções do Formulário ---
  const secao1 = document.querySelector('.Seção1');
  const secao2 = document.querySelector('.Seção2');
  const secao3 = document.querySelector('.Seção3');

  // --- Botões de Navegação de Etapas ---
  const btnAvançarParaEtapa2 = document.getElementById('BtnAvançarParaEtapa2');
  const btnVoltarParaEtapa1 = document.getElementById('BtnVoltarParaEtapa1');
  const btnAvançarParaEtapa3 = document.getElementById('BtnAvançarParaEtapa3');
  const btnVoltarParaEtapa2 = document.getElementById('BtnVoltarParaEtapa2');
  const btnRevisarFinalizar = document.getElementById('BtnRevisarFinalizar');

  // --- Indicadores de Passos ---
  const passo1 = document.getElementById('Passo1');
  const passo2 = document.getElementById('Passo2');
  const passo3 = document.getElementById('Passo3');

  // --- Navegação do Menu e Contato ---
  const btnMenuCadastro = document.getElementById('BtnMenuCadastro');
  const btnMenuContato = document.getElementById('BtnMenuContato');
  const areaCadastro = document.getElementById('AreaCadastro');
  const areaContato = document.getElementById('AreaContato');
  const btnFecharContato = document.getElementById('BtnFecharContato');

  // --- Central de Revisão e Impressão ---
  const areaRevisao = document.getElementById('AreaRevisao');
  const relatorioFinalPrint = document.getElementById('RelatorioFinalPrint');
  const btnVoltarParaEditar = document.getElementById('BtnVoltarParaEditar');
  const btnExecutarImpressao = document.getElementById('BtnExecutarImpressao');

  // --- Variáveis de Controle ---
  let secaoAtiva = 1; // Rastreia o formulário na etapa 1, 2 ou 3

  // --- Navegação de Seções ---
  function irParaEtapa(etapa) {
    secao1.style.display = etapa === 1 ? 'block' : 'none';
    secao2.style.display = etapa === 2 ? 'block' : 'none';
    secao3.style.display = etapa === 3 ? 'block' : 'none';
    
    passo1.classList.toggle('ativa', etapa === 1);
    passo2.classList.toggle('ativa', etapa === 2);
    passo3.classList.toggle('ativa', etapa === 3);
    
    secaoAtiva = etapa;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnAvançarParaEtapa2.addEventListener('click', () => irParaEtapa(2));
  btnVoltarParaEtapa1.addEventListener('click', () => irParaEtapa(1));
  btnAvançarParaEtapa3.addEventListener('click', () => irParaEtapa(3));
  btnVoltarParaEtapa2.addEventListener('click', () => irParaEtapa(2));

  // --- Navegação de Menus ---
  btnMenuCadastro.addEventListener('click', () => {
    btnMenuCadastro.classList.add('ativo');
    btnMenuContato.classList.remove('ativo');
    areaCadastro.style.display = 'flex';
    areaContato.style.display = 'none';
    areaRevisao.style.display = 'none';
  });

  btnMenuContato.addEventListener('click', () => {
    btnMenuCadastro.classList.remove('ativo');
    btnMenuContato.classList.add('ativo');
    areaCadastro.style.display = 'none';
    areaContato.style.display = 'flex';
    areaRevisao.style.display = 'none';
  });

  btnFecharContato.addEventListener('click', () => {
    btnMenuCadastro.classList.add('ativo');
    btnMenuContato.classList.remove('ativo');
    areaCadastro.style.display = 'flex';
    areaContato.style.display = 'none';
    irParaEtapa(secaoAtiva);
  });

  // --- Controles do Modal de Revisão ---
  btnRevisarFinalizar.addEventListener('click', mostrarRevisao);

  btnVoltarParaEditar.addEventListener('click', () => {
    areaRevisao.style.display = 'none';
    areaCadastro.style.display = 'flex';
    irParaEtapa(secaoAtiva);
  });

  btnExecutarImpressao.addEventListener('click', () => {
    window.print();
  });

  // --- Lógicas de Exclusão Mútua (Checkboxes Especiais) ---
  function configurarExclusaoMutua(idNenhum, arrayIdsOutros) {
    const elNenhum = document.getElementById(idNenhum);
    if (!elNenhum) return;

    elNenhum.addEventListener('change', () => {
      if (elNenhum.checked) {
        arrayIdsOutros.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.checked = false;
        });
      }
      atualizarPreview();
    });

    arrayIdsOutros.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', () => {
          if (el.checked) {
            elNenhum.checked = false;
          }
          atualizarPreview();
        });
      }
    });
  }

  // Seção 2: Dependências e Acessibilidade
  const dependenciasIds = [
    'SalaDiretoria', 'SalaProfessores', 'SalaSecretaria', 'Almoxarifado', 'Despensa', 'Cozinha', 'Refeitório',
    'Banheiro', 'BanheiroAcessível', 'BanheiroInfantil', 'BanheiroFuncionários', 'vestiário',
    'DormitórioAluno', 'DormitórioProfessor', 'SalaRepousoAlunos', 'Biblioteca', 'SalaLeitura',
    'LaboratórioCiências', 'LaboratórioInformática', 'LaboratórioRobótica', 'LaboratórioEdprofissional',
    'SalaOficinas', 'SalaRecursos', 'ParqueInfantil', 'PátioCoberto', 'PátioDescoberto', 'Piscina',
    'QuadraCoberta', 'QuadraDescoberta', 'Terreirão', 'Auditório', 'EstúdioEdição', 'SalaDeArtes',
    'SalaDeDança', 'SalaDeMusica', 'SalaMultiuso', 'AreaHorta', 'AreaVegetacao', 'AreaAnimais'
  ];
  configurarExclusaoMutua('NenhumaRelacionadas', dependenciasIds);

  const acessibilidadeIds = [
    'Corrimão', 'Elevador', 'PisosTáteis', 'PortasLivres', 'Rampas',
    'Sinalização', 'SinalizaçãoSonora', 'SinalizaçãoTátil', 'SinalizaçãoVisual'
  ];
  configurarExclusaoMutua('NenhumAcessibilidade', acessibilidadeIds);

  // Seção 3: Equipamentos, Internet e Colegiados
  const equipAdminIds = [
    'AntenaParabólica', 'Copiadora', 'Impressora', 'ImpressoraMultifuncional', 'Computadores', 'Scanner'
  ];
  configurarExclusaoMutua('NenhumListado', equipAdminIds);

  const internetIds = [
    'ParaAdministrativo', 'ParaAprendizagem', 'ParaAlunos', 'ParaComunidade'
  ];
  configurarExclusaoMutua('NãoPossuiInternet', internetIds);

  const materiaisIds = [
    'AcervoMultimídia', 'BrinquedosInfantil', 'Conjuntocientíficos', 'EquipamentosDesom', 'EquipamentosAudiovisuais',
    'EquipamentosAgricola', 'InstrumentosMusical', 'KitsDeRobótica', 'MateriaisEducaçãoEmocional',
    'MateriaisParaEdProfissional', 'MateriaisPraticaDesportivas', 'MateriaisBilingueESurdo',
    'MateriaisRelaçõesétnico', 'MateriaisEducaçãoCampo', 'MateriaisPedagógicosIndígena',
    'MateriaisPedagógiQuilombola', 'MateriaisEdEspecial'
  ];
  configurarExclusaoMutua('NenhumListados', materiaisIds);

  const colegiadosIds = [
    'AssociaçãoPais', 'AssociaçãoPaisMestres', 'ConselhoEscolar', 'GrêmioEstudantil', 'OutrosColegiados'
  ];
  configurarExclusaoMutua('NenhumColegiado', colegiadosIds);

  // --- Função para Formatar Datas (dd/mm/aaaa) ---
  function formatarData(dataStr) {
    if (!dataStr) return '';
    const partes = dataStr.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataStr;
  }

  // --- Atualização do Preview em Tempo Real ---
  function atualizarPreview() {
    // 1. Identificação (Seção 1)
    atualizarCampoTexto('NomeEscola', 'PrevNomeEscola', 'Não informado');
    atualizarCampoTexto('Localidade', 'PrevLocalidade', 'Não informada');
    atualizarCampoTexto('Dependencia', 'PrevDependencia', 'Não informada');
    atualizarCampoTexto('Funcionamento', 'PrevFuncionamento', 'Não informado');
    atualizarCampoTexto('Ocupação', 'PrevOcupacao', 'Não informada');
    atualizarCampoTexto('AguaPotavel', 'PrevAgua', 'Não informado');
    atualizarCampoTexto('Esgotamento', 'PrevEsgotamento', 'Não informado');
    atualizarCampoTexto('Eletricidade', 'PrevEnergia', 'Não informada');
    atualizarCampoTexto('DescarteResidos', 'PrevLixo', 'Não informada');

    // Ano Letivo
    const inicio = document.getElementById('InicioData').value;
    const termino = document.getElementById('TerminoData').value;
    const prevAnoLetivo = document.getElementById('PrevAnoLetivo');
    if (inicio || termino) {
      const inicioFmt = formatarData(inicio) || '...';
      const terminoFmt = formatarData(termino) || '...';
      prevAnoLetivo.textContent = `${inicioFmt} a ${terminoFmt}`;
      prevAnoLetivo.className = 'DadoPreenchido';
    } else {
      prevAnoLetivo.textContent = 'Não informado';
      prevAnoLetivo.className = 'DadoVazio';
    }

    // 2. Infraestrutura Física (Seção 2)
    const prevInfra = document.getElementById('PrevInfraestrutura');
    prevInfra.innerHTML = '';
    let infraMarcadas = [];

    // Mapeamento e exibição de dependências físicas
    const dependenciasTextos = {
      'SalaDiretoria': 'Sala de diretoria', 'SalaProfessores': 'Sala de professores', 'SalaSecretaria': 'Sala de secretaria',
      'Almoxarifado': 'Almoxarifado', 'Despensa': 'Despensa', 'Cozinha': 'Cozinha', 'Refeitório': 'Refeitório',
      'Banheiro': 'Banheiro', 'BanheiroAcessível': 'Banheiro adequado para PCD', 'BanheiroInfantil': 'Banheiro infantil',
      'BanheiroFuncionários': 'Banheiro de funcionários', 'vestiário': 'Banheiro/vestiário com chuveiro',
      'DormitórioAluno': 'Dormitório de aluno', 'DormitórioProfessor': 'Dormitório de professor',
      'SalaRepousoAlunos': 'Sala de repouso para alunos', 'Biblioteca': 'Biblioteca', 'SalaLeitura': 'Sala de leitura',
      'LaboratórioCiências': 'Laboratório de ciências', 'LaboratórioInformática': 'Laboratório de informática',
      'LaboratórioRobótica': 'Laboratório de robótica', 'LaboratórioEdprofissional': 'Laboratório de ed. profissional',
      'SalaOficinas': 'Oficinas de ed. profissional', 'SalaRecursos': 'Sala de recursos multifuncionais (AEE)',
      'ParqueInfantil': 'Parque infantil', 'PátioCoberto': 'Pátio coberto', 'PátioDescoberto': 'Pátio descoberto',
      'Piscina': 'Piscina', 'QuadraCoberta': 'Quadra de esportes coberta', 'QuadraDescoberta': 'Quadra de esportes descoberta',
      'Terreirão': 'Terreirão', 'Auditório': 'Auditório', 'EstúdioEdição': 'Estúdio de gravação/edição',
      'SalaDeArtes': 'Sala/ateliê de artes', 'SalaDeDança': 'Sala/estúdio de dança', 'SalaDeMusica': 'Sala de música/coral',
      'SalaMultiuso': 'Sala multiuso', 'AreaHorta': 'Área de horta ou produção agrícola',
      'AreaVegetacao': 'Área de vegetação ou gramado', 'AreaAnimais': 'Viveiro/criação de animais'
    };

    dependenciasIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) {
        infraMarcadas.push(dependenciasTextos[id] || id);
      }
    });

    // Mapeamento de recursos de acessibilidade
    const acessibilidadeTextos = {
      'Corrimão': 'Corrimão e guarda-corpos', 'Elevador': 'Elevador', 'PisosTáteis': 'Pisos táteis',
      'PortasLivres': 'Portas com vão de no mínimo 80cm', 'Rampas': 'Rampas', 'Sinalização': 'Sinalização/alarme luminoso',
      'SinalizaçãoSonora': 'Sinalização sonora', 'SinalizaçãoTátil': 'Sinalização tátil', 'SinalizaçãoVisual': 'Sinalização visual'
    };

    acessibilidadeIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) {
        infraMarcadas.push(`Acessibilidade: ${acessibilidadeTextos[id] || id}`);
      }
    });

    if (document.getElementById('NenhumaRelacionadas').checked) {
      infraMarcadas.push('Nenhuma das dependências relacionadas');
    }
    if (document.getElementById('NenhumAcessibilidade').checked) {
      infraMarcadas.push('Nenhum recurso de acessibilidade nas vias');
    }

    if (infraMarcadas.length > 0) {
      infraMarcadas.forEach(txt => {
        const li = document.createElement('li');
        li.textContent = txt;
        prevInfra.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Nenhum item selecionado';
      li.className = 'DadoVazio';
      prevInfra.appendChild(li);
    }

    // Contagem de Salas e Climatização
    const salasPredio = parseInt(document.getElementById('SalasPredio').value) || 0;
    const salasFora = parseInt(document.getElementById('SalasFora').value) || 0;
    document.getElementById('PrevSalasContagem').textContent = `${salasPredio} dentro / ${salasFora} fora`;

    const salasClimatizadas = parseInt(document.getElementById('SalasClimatizadas').value) || 0;
    const salasAcessiveis = parseInt(document.getElementById('SalasAssecibilidade').value) || 0;
    document.getElementById('PrevSalasDetalhes').textContent = `${salasClimatizadas} climatizadas / ${salasAcessiveis} PCD`;

    const cantinhoLeitura = parseInt(document.getElementById('CantinhoDeLeitura').value) || 0;
    document.getElementById('PrevCantinhoLeitura').textContent = `${cantinhoLeitura} sala(s)`;

    // 3. Equipamentos e Recursos (Seção 3)
    const prevEquip = document.getElementById('PrevEquipamentosRecursos');
    prevEquip.innerHTML = '';
    let equipMarcados = [];

    const equipAdminTextos = {
      'AntenaParabólica': 'Antena parabólica', 'Copiadora': 'Copiadora', 'Impressora': 'Impressora',
      'ImpressoraMultifuncional': 'Impressora multifuncional', 'Computadores': 'Computadores administrativos', 'Scanner': 'Scanner'
    };
    equipAdminIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) equipMarcados.push(equipAdminTextos[id] || id);
    });

    // Aparelhos de ensino quantitativos (se maiores que zero, mostra no preview lateral)
    const dvd = parseInt(document.getElementById('QtdDvd').value) || 0;
    const som = parseInt(document.getElementById('QtdSom').value) || 0;
    const tv = parseInt(document.getElementById('QtdTv').value) || 0;
    const proj = parseInt(document.getElementById('QtdProjetor').value) || 0;
    const lousa = parseInt(document.getElementById('QtdLousa').value) || 0;
    if (dvd > 0) equipMarcados.push(`DVD/Blu-ray: ${dvd}`);
    if (som > 0) equipMarcados.push(`Aparelho de Som: ${som}`);
    if (tv > 0) equipMarcados.push(`Televisão: ${tv}`);
    if (proj > 0) equipMarcados.push(`Projetor Multimídia: ${proj}`);
    if (lousa > 0) equipMarcados.push(`Lousa Digital: ${lousa}`);

    // Computadores alunos
    const desk = parseInt(document.getElementById('Desktop').value) || 0;
    const note = parseInt(document.getElementById('Notebooks').value) || 0;
    const tab = parseInt(document.getElementById('Tablets').value) || 0;
    if (desk > 0) equipMarcados.push(`Desktop Alunos: ${desk}`);
    if (note > 0) equipMarcados.push(`Notebooks Alunos: ${note}`);
    if (tab > 0) equipMarcados.push(`Tablets Alunos: ${tab}`);

    // Redes locais
    const redesTextos = { 'Acabo': 'Rede local a cabo', 'Wireless': 'Rede local Wireless' };
    checkboxesRede.forEach(item => {
      const el = document.getElementById(item.id);
      if (el && el.checked) equipMarcados.push(redesTextos[item.id]);
    });

    // Acesso à internet
    const internetTextos = {
      'ParaAdministrativo': 'Internet Administrativa', 'ParaAprendizagem': 'Internet Pedagógica',
      'ParaAlunos': 'Internet Alunos', 'ParaComunidade': 'Internet Comunidade'
    };
    internetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) equipMarcados.push(internetTextos[id] || id);
    });

    // Materiais Pedagógicos
    const materiaisTextos = {
      'AcervoMultimídia': 'Acervo multimídia', 'BrinquedosInfantil': 'Brinquedos ed. infantil',
      'Conjuntocientíficos': 'Materiais científicos', 'EquipamentosDesom': 'Equipamentos de som',
      'EquipamentosAudiovisuais': 'Equipamentos audiovisuais', 'EquipamentosAgricola': 'Instrumentos agrícolas/horta',
      'InstrumentosMusical': 'Instrumentos musicais', 'KitsDeRobótica': 'Kits de robótica',
      'MateriaisEducaçãoEmocional': 'Educação emocional', 'MateriaisParaEdProfissional': 'Educação profissional',
      'MateriaisPraticaDesportivas': 'Prática desportiva', 'MateriaisBilingueESurdo': 'Ed. bilíngue de surdos',
      'MateriaisRelaçõesétnico': 'Relações étnico-raciais', 'MateriaisEducaçãoCampo': 'Educação do campo',
      'MateriaisPedagógicosIndígena': 'Educação indígena', 'MateriaisPedagógiQuilombola': 'Educação quilombola',
      'MateriaisEdEspecial': 'Educação especial'
    };
    materiaisIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) equipMarcados.push(`Material: ${materiaisTextos[id] || id}`);
    });

    // Ações de Educação Ambiental
    if (document.getElementById('EducacaoAmbiental').checked) {
      equipMarcados.push('Ações de Educação Ambiental');
    }

    // Órgãos Colegiados
    const colegiadosTextos = {
      'AssociaçãoPais': 'Colegiado: Ass. de pais', 'AssociaçãoPaisMestres': 'Colegiado: Ass. de pais e mestres',
      'ConselhoEscolar': 'Colegiado: Conselho escolar', 'GrêmioEstudantil': 'Colegiado: Grêmio estudantil',
      'OutrosColegiados': 'Colegiado: Outros'
    };
    colegiadosIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) equipMarcados.push(colegiadosTextos[id]);
    });

    // Nenhum Marcado nas seções
    if (document.getElementById('NenhumListado').checked) equipMarcados.push('Nenhum equipamento admin');
    if (document.getElementById('NãoaRede').checked) equipMarcados.push('Não há rede local');
    if (document.getElementById('NãoPossuiInternet').checked) equipMarcados.push('Não possui internet');
    if (document.getElementById('NenhumListados').checked) equipMarcados.push('Nenhum material pedagógico');
    if (document.getElementById('NenhumColegiado').checked) equipMarcados.push('Nenhum colegiado ativo');

    if (equipMarcados.length > 0) {
      equipMarcados.forEach(txt => {
        const li = document.createElement('li');
        li.textContent = txt;
        prevEquip.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Nenhum item selecionado';
      li.className = 'DadoVazio';
      prevEquip.appendChild(li);
    }

    // Banda Larga, Alimentação e PPP
    atualizarCampoTexto('BandaLarga', 'PrevBandaLarga', 'Não informada');
    atualizarCampoTexto('AlimentacaoEscolar', 'PrevAlimentacao', 'Não informada');

    const pppSim = document.getElementById('ProjetoPoliticoSim').checked;
    const pppNao = document.getElementById('ProjetoPoliticoNao').checked;
    const prevPPP = document.getElementById('PrevPPP');
    if (pppSim) {
      prevPPP.textContent = 'Sim';
      prevPPP.className = 'DadoPreenchido';
    } else if (pppNao) {
      prevPPP.textContent = 'Não';
      prevPPP.className = 'DadoPreenchido';
    } else {
      prevPPP.textContent = 'Não informado';
      prevPPP.className = 'DadoVazio';
    }
  }

  // Auxiliar para atualizar campos de texto/select simples
  function atualizarCampoTexto(idInput, idPreview, txtPadrao) {
    const elInput = document.getElementById(idInput);
    const elPreview = document.getElementById(idPreview);
    if (!elInput || !elPreview) return;
    const val = elInput.value.trim();
    if (val) {
      elPreview.textContent = val;
      elPreview.className = 'DadoPreenchido';
    } else {
      elPreview.textContent = txtPadrao;
      elPreview.className = 'DadoVazio';
    }
  }

  // --- Função que Gera e Exibe a Revisão Centralizada ---
  function mostrarRevisao() {
    // 1. Coleta dados de Identificação
    const nomeVal = document.getElementById('NomeEscola').value.trim();
    const localidadeVal = document.getElementById('Localidade').value;
    const dependenciaVal = document.getElementById('Dependencia').value;
    const inicioVal = document.getElementById('InicioData').value;
    const terminoVal = document.getElementById('TerminoData').value;
    const funcionamentoVal = document.getElementById('Funcionamento').value;
    const ocupacaoVal = document.getElementById('Ocupação').value;
    const aguaVal = document.getElementById('AguaPotavel').value;
    const esgotamentoVal = document.getElementById('Esgotamento').value;
    const energiaVal = document.getElementById('Eletricidade').value;
    const lixoVal = document.getElementById('DescarteResidos').value;
    
    let identificacaoHTML = '';
    if (nomeVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Nome da Escola:</strong> ${nomeVal}</div>`;
    if (localidadeVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Localidade:</strong> ${localidadeVal}</div>`;
    if (dependenciaVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Dependência Administrativa:</strong> ${dependenciaVal}</div>`;
    if (inicioVal || terminoVal) {
      const inicioFmt = formatarData(inicioVal) || 'Não informado';
      const terminoFmt = formatarData(terminoVal) || 'Não informado';
      identificacaoHTML += `<div class="RevisaoItem"><strong>Ano Letivo:</strong> Início: ${inicioFmt} | Término: ${terminoFmt}</div>`;
    }
    if (funcionamentoVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Local de Funcionamento:</strong> ${funcionamentoVal}</div>`;
    if (ocupacaoVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Forma de Ocupação:</strong> ${ocupacaoVal}</div>`;
    if (aguaVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Abastecimento de Água:</strong> ${aguaVal}</div>`;
    if (esgotamentoVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Esgotamento Sanitário:</strong> ${esgotamentoVal}</div>`;
    if (energiaVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Fonte de Energia Elétrica:</strong> ${energiaVal}</div>`;
    if (lixoVal) identificacaoHTML += `<div class="RevisaoItem"><strong>Destinação do Lixo:</strong> ${lixoVal}</div>`;

    let secaoIdentHTML = '';
    if (identificacaoHTML) {
      secaoIdentHTML = `
        <div class="RevisaoSecao">
          <h3>1. Dados de Identificação</h3>
          <div class="RevisaoGrid">
            ${identificacaoHTML}
          </div>
        </div>
      `;
    }

    // 2. Coleta dados de Infraestrutura
    let infraMarcadas = [];
    const dependenciasTextos = {
      'SalaDiretoria': 'Sala de diretoria', 'SalaProfessores': 'Sala de professores', 'SalaSecretaria': 'Sala de secretaria',
      'Almoxarifado': 'Almoxarifado', 'Despensa': 'Despensa', 'Cozinha': 'Cozinha', 'Refeitório': 'Refeitório',
      'Banheiro': 'Banheiro', 'BanheiroAcessível': 'Banheiro adequado para PCD', 'BanheiroInfantil': 'Banheiro infantil',
      'BanheiroFuncionários': 'Banheiro de funcionários', 'vestiário': 'Banheiro/vestiário com chuveiro',
      'DormitórioAluno': 'Dormitório de aluno', 'DormitórioProfessor': 'Dormitório de professor',
      'SalaRepousoAlunos': 'Sala de repouso para alunos', 'Biblioteca': 'Biblioteca', 'SalaLeitura': 'Sala de leitura',
      'LaboratórioCiências': 'Laboratório de ciências', 'LaboratórioInformática': 'Laboratório de informática',
      'LaboratórioRobótica': 'Laboratório de robótica', 'LaboratórioEdprofissional': 'Laboratório de ed. profissional',
      'SalaOficinas': 'Oficinas de ed. profissional', 'SalaRecursos': 'Sala de recursos multifuncionais (AEE)',
      'ParqueInfantil': 'Parque infantil', 'PátioCoberto': 'Pátio coberto', 'PátioDescoberto': 'Pátio descoberto',
      'Piscina': 'Piscina', 'QuadraCoberta': 'Quadra de esportes coberta', 'QuadraDescoberta': 'Quadra de esportes descoberta',
      'Terreirão': 'Terreirão', 'Auditório': 'Auditório', 'EstúdioEdição': 'Estúdio de gravação/edição',
      'SalaDeArtes': 'Sala/ateliê de artes', 'SalaDeDança': 'Sala/estúdio de dança', 'SalaDeMusica': 'Sala de música/coral',
      'SalaMultiuso': 'Sala multiuso', 'AreaHorta': 'Área de horta ou produção agrícola',
      'AreaVegetacao': 'Área de vegetação ou gramado', 'AreaAnimais': 'Viveiro/criação de animais'
    };
    dependenciasIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) infraMarcadas.push(dependenciasTextos[id]);
    });
    
    let acessibilidadeMarcadas = [];
    const acessibilidadeTextos = {
      'Corrimão': 'Corrimão e guarda-corpos', 'Elevador': 'Elevador', 'PisosTáteis': 'Pisos táteis',
      'PortasLivres': 'Portas com vão de no mínimo 80cm', 'Rampas': 'Rampas', 'Sinalização': 'Sinalização/alarme luminoso',
      'SinalizaçãoSonora': 'Sinalização sonora', 'SinalizaçãoTátil': 'Sinalização tátil', 'SinalizaçãoVisual': 'Sinalização visual'
    };
    acessibilidadeIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) acessibilidadeMarcadas.push(acessibilidadeTextos[id]);
    });
    
    const salasPredio = parseInt(document.getElementById('SalasPredio').value) || 0;
    const salasFora = parseInt(document.getElementById('SalasFora').value) || 0;
    const salasClimatizadas = parseInt(document.getElementById('SalasClimatizadas').value) || 0;
    const salasAcessiveis = parseInt(document.getElementById('SalasAssecibilidade').value) || 0;
    const cantinhoLeitura = parseInt(document.getElementById('CantinhoDeLeitura').value) || 0;

    let salasHTML = '';
    if (salasPredio > 0) salasHTML += `<div class="RevisaoItem"><strong>Salas no Prédio:</strong> ${salasPredio}</div>`;
    if (salasFora > 0) salasHTML += `<div class="RevisaoItem"><strong>Salas fora do Prédio:</strong> ${salasFora}</div>`;
    if (salasClimatizadas > 0) salasHTML += `<div class="RevisaoItem"><strong>Salas Climatizadas:</strong> ${salasClimatizadas}</div>`;
    if (salasAcessiveis > 0) salasHTML += `<div class="RevisaoItem"><strong>Salas Acessíveis (PCD):</strong> ${salasAcessiveis}</div>`;
    if (cantinhoLeitura > 0) salasHTML += `<div class="RevisaoItem" style="grid-column: span 2;"><strong>Salas com Cantinho da Leitura:</strong> ${cantinhoLeitura}</div>`;

    let infraHTML = '';
    const temNenhumaDep = document.getElementById('NenhumaRelacionadas').checked;
    const temNenhumAces = document.getElementById('NenhumAcessibilidade').checked;

    if (salasHTML || infraMarcadas.length > 0 || acessibilidadeMarcadas.length > 0 || temNenhumaDep || temNenhumAces) {
      infraHTML = `
        <div class="RevisaoSecao">
          <h3>2. Infraestrutura Física e Acessibilidade</h3>
          ${salasHTML ? `<div class="RevisaoGrid">${salasHTML}</div>` : ''}
          
          ${infraMarcadas.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Dependências Físicas Existentes:</strong>
              <ul class="ListaSemEstilo" style="margin-top: 5px;">
                ${infraMarcadas.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${acessibilidadeMarcadas.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Recursos de Acessibilidade das Vias:</strong>
              <ul class="ListaSemEstilo" style="margin-top: 5px;">
                ${acessibilidadeMarcadas.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${temNenhumaDep ? `
            <div style="margin-top: 15px; font-style: italic; color: var(--text-muted);">
              * Nenhuma dependência relacionada cadastrada.
            </div>
          ` : ''}

          ${temNenhumAces ? `
            <div style="margin-top: 15px; font-style: italic; color: var(--text-muted);">
              * Nenhum recurso de acessibilidade cadastrado para vias de circulação.
            </div>
          ` : ''}
        </div>
      `;
    }

    // 3. Coleta dados de Equipamentos e Recursos
    let equipAdminMarcados = [];
    const equipAdminTextos = {
      'AntenaParabólica': 'Antena parabólica', 'Copiadora': 'Copiadora', 'Impressora': 'Impressora',
      'ImpressoraMultifuncional': 'Impressora multifuncional', 'Computadores': 'Computadores administrativos', 'Scanner': 'Scanner'
    };
    equipAdminIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) equipAdminMarcados.push(equipAdminTextos[id]);
    });

    const dvd = parseInt(document.getElementById('QtdDvd').value) || 0;
    const som = parseInt(document.getElementById('QtdSom').value) || 0;
    const tv = parseInt(document.getElementById('QtdTv').value) || 0;
    const projetor = parseInt(document.getElementById('QtdProjetor').value) || 0;
    const lousa = parseInt(document.getElementById('QtdLousa').value) || 0;
    
    const desktop = parseInt(document.getElementById('Desktop').value) || 0;
    const notebooks = parseInt(document.getElementById('Notebooks').value) || 0;
    const tablets = parseInt(document.getElementById('Tablets').value) || 0;

    let redesMarcadas = [];
    const redesTextos = { 'Acabo': 'A cabo', 'Wireless': 'Wireless' };
    checkboxesRede.forEach(item => {
      const el = document.getElementById(item.id);
      if (el && el.checked) redesMarcadas.push(redesTextos[item.id]);
    });

    let internetMarcadas = [];
    const internetTextos = {
      'ParaAdministrativo': 'Para uso administrativo', 'ParaAprendizagem': 'Para uso nos processos de ensino-aprendizagem',
      'ParaAlunos': 'Para uso dos alunos', 'ParaComunidade': 'Para uso da comunidade'
    };
    internetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) internetMarcadas.push(internetTextos[id]);
    });
    
    const bandaLarga = document.getElementById('BandaLarga').value;
    const alimentacao = document.getElementById('AlimentacaoEscolar').value;

    let materiaisMarcados = [];
    const materiaisTextos = {
      'AcervoMultimídia': 'Acervo multimídia', 'BrinquedosInfantil': 'Brinquedos para a educação infantil',
      'Conjuntocientíficos': 'Conjunto de materiais científicos', 'EquipamentosDesom': 'Equipamentos para amplificação de som/áudio',
      'EquipamentosAudiovisuais': 'Equipamentos audiovisuais para produção estudantil',
      'EquipamentosAgricola': 'Equipamentos para atividades em área de horta/produção',
      'InstrumentosMusical': 'Instrumentos musicais / fanfarra / banda', 'KitsDeRobótica': 'Kits de robótica',
      'MateriaisEducaçãoEmocional': 'Materiais para a educação emocional e mediação',
      'MateriaisParaEdProfissional': 'Materiais para a educação profissional',
      'MateriaisPraticaDesportivas': 'Materiais para prática desportiva e recreação',
      'MateriaisBilingueESurdo': 'Materiais pedagógicos para a educação bilíngue de surdos',
      'MateriaisRelaçõesétnico': 'Materiais pedagógicos para as relações étnico-raciais',
      'MateriaisEducaçãoCampo': 'Materiais pedagógicos para a educação do campo',
      'MateriaisPedagógicosIndígena': 'Materiais pedagógicos para a educação escolar indígena',
      'MateriaisPedagógiQuilombola': 'Materiais pedagógicos para a educação escolar quilombola',
      'MateriaisEdEspecial': 'Materiais pedagógicos para a educação especial'
    };
    materiaisIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) materiaisMarcados.push(materiaisTextos[id]);
    });

    const amb = document.getElementById('EducacaoAmbiental').checked;
    const pppSim = document.getElementById('ProjetoPoliticoSim').checked;
    const pppNao = document.getElementById('ProjetoPoliticoNao').checked;
    const ppp = pppSim ? 'Sim' : (pppNao ? 'Não' : '');

    let colegiadosMarcados = [];
    const colegiadosTextos = {
      'AssociaçãoPais': 'Associação de pais', 'AssociaçãoPaisMestres': 'Associação de pais e mestres',
      'ConselhoEscolar': 'Conselho escolar', 'GrêmioEstudantil': 'Grêmio estudantil', 'OutrosColegiados': 'Outros'
    };
    colegiadosIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.checked) colegiadosMarcados.push(colegiadosTextos[id]);
    });

    let recursosGridHTML = '';
    if (bandaLarga) recursosGridHTML += `<div class="RevisaoItem"><strong>Internet Banda Larga:</strong> ${bandaLarga}</div>`;
    if (alimentacao) recursosGridHTML += `<div class="RevisaoItem"><strong>Alimentação Escolar:</strong> ${alimentacao}</div>`;
    if (ppp) recursosGridHTML += `<div class="RevisaoItem"><strong>Projeto Político Pedagógico (PPP):</strong> ${ppp}</div>`;
    if (amb) recursosGridHTML += `<div class="RevisaoItem"><strong>Ações Ambientais:</strong> Sim</div>`;

    let ensinoQuantHTML = '';
    if (dvd > 0) ensinoQuantHTML += `<li>DVD/Blu-ray: ${dvd} aparelho(s)</li>`;
    if (som > 0) ensinoQuantHTML += `<li>Aparelho de Som: ${som} aparelho(s)</li>`;
    if (tv > 0) ensinoQuantHTML += `<li>Televisão: ${tv} aparelho(s)</li>`;
    if (projetor > 0) ensinoQuantHTML += `<li>Projetor Multimídia (Data Show): ${projetor} aparelho(s)</li>`;
    if (lousa > 0) ensinoQuantHTML += `<li>Lousa Digital: ${lousa} unidade(s)</li>`;

    let compQuantHTML = '';
    if (desktop > 0) compQuantHTML += `<li>Computadores de Mesa (Desktop): ${desktop}</li>`;
    if (notebooks > 0) compQuantHTML += `<li>Notebooks Portáteis: ${notebooks}</li>`;
    if (tablets > 0) compQuantHTML += `<li>Tablets: ${tablets}</li>`;

    const temListado = document.getElementById('NenhumListado').checked;
    const temRede = document.getElementById('NãoaRede').checked;
    const temInternet = document.getElementById('NãoPossuiInternet').checked;
    const temMateriais = document.getElementById('NenhumListados').checked;
    const temColegiado = document.getElementById('NenhumColegiado').checked;

    let recursosHTML = '';
    if (recursosGridHTML || ensinoQuantHTML || compQuantHTML || equipAdminMarcados.length > 0 || redesMarcadas.length > 0 || internetMarcadas.length > 0 || materiaisMarcados.length > 0 || colegiadosMarcados.length > 0 || temListado || temRede || temInternet || temMateriais || temColegiado) {
      recursosHTML = `
        <div class="RevisaoSecao">
          <h3>3. Equipamentos, Recursos e Gestão</h3>
          ${recursosGridHTML ? `<div class="RevisaoGrid">${recursosGridHTML}</div>` : ''}
          
          ${ensinoQuantHTML || compQuantHTML ? `
            <div class="RevisaoGrid" style="margin-top: 15px;">
              ${ensinoQuantHTML ? `
                <div class="RevisaoItem">
                  <strong>Equipamentos de Ensino Existentes:</strong>
                  <ul class="ListaSemEstilo" style="margin-top: 5px;">
                    ${ensinoQuantHTML}
                  </ul>
                </div>
              ` : ''}
              ${compQuantHTML ? `
                <div class="RevisaoItem">
                  <strong>Computadores para Alunos:</strong>
                  <ul class="ListaSemEstilo" style="margin-top: 5px;">
                    ${compQuantHTML}
                  </ul>
                </div>
              ` : ''}
            </div>
          ` : ''}

          ${equipAdminMarcados.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Equipamentos Administrativos:</strong>
              <ul class="ListaSemEstilo" style="margin-top: 5px;">
                ${equipAdminMarcados.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${redesMarcadas.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Rede Local de Computadores:</strong>
              <ul class="ListaSemEstilo" style="margin-top: 5px;">
                ${redesMarcadas.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${internetMarcadas.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Acesso à Internet:</strong>
              <ul class="ListaSemEstilo" style="margin-top: 5px;">
                ${internetMarcadas.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${materiaisMarcados.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Instrumentos e Materiais Pedagógicos/Socioculturais:</strong>
              <ul class="ListaSemEstilo" style="margin-top: 5px;">
                ${materiaisMarcados.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${colegiadosMarcados.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>Órgãos Colegiados em Funcionamento:</strong>
              <ul class="ListaSemEstilo" style="margin-top: 5px;">
                ${colegiadosMarcados.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${temListado ? `<div style="margin-top: 10px; font-style: italic; color: var(--text-muted);">* Nenhum equipamento administrativo listado.</div>` : ''}
          ${temRede ? `<div style="margin-top: 10px; font-style: italic; color: var(--text-muted);">* Não há rede local de computadores.</div>` : ''}
          ${temInternet ? `<div style="margin-top: 10px; font-style: italic; color: var(--text-muted);">* Não possui acesso à internet.</div>` : ''}
          ${temMateriais ? `<div style="margin-top: 10px; font-style: italic; color: var(--text-muted);">* Nenhum dos materiais pedagógicos listados.</div>` : ''}
          ${temColegiado ? `<div style="margin-top: 10px; font-style: italic; color: var(--text-muted);">* Não há órgãos colegiados em funcionamento.</div>` : ''}
        </div>
      `;
    }

    // Unifica o HTML final da revisão
    let html = '';
    html += secaoIdentHTML;
    html += infraHTML;
    html += recursosHTML;

    if (!html) {
      html = `<div style="text-align: center; padding: 30px; font-style: italic; color: var(--text-muted);">Nenhum dado foi preenchido no formulário.</div>`;
    }

    relatorioFinalPrint.innerHTML = html;
    areaCadastro.style.display = 'none';
    areaRevisao.style.display = 'flex';
  }

  // --- Escutas de eventos para atualização automática do Preview ---
  const form = document.getElementById('FormCenso');
  form.addEventListener('input', atualizarPreview);
  form.addEventListener('change', atualizarPreview);

  // Inicialização básica
  atualizarPreview();
});

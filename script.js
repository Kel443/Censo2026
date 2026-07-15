/* ============================================================
   script.js — Controle de etapas, localStorage e impressão
   Sistema de Cadastro — Escolas Censo 2026
   ============================================================ */

'use strict';

// ===================== REFERÊNCIAS ========================
const Seção1 = document.querySelector('.Seção1');
const Seção2 = document.querySelector('.Seção2');
const Seção3 = document.querySelector('.Seção3');

const BtnVoltar1  = document.getElementById('BtnVoltar1');
const BtnVoltar2  = document.getElementById('BtnVoltar2');
const BtnAvançar1 = document.getElementById('BtnAvançar1');
const BtnAvançar2 = document.getElementById('BtnAvançar2');
const BtnAvançar3 = document.getElementById('BtnAvançar3');

const passo1 = document.getElementById('passo1');
const passo2 = document.getElementById('passo2');
const passo3 = document.getElementById('passo3');

const btnEditar  = document.getElementById('btn-editar');
const btnImprimir = document.getElementById('imprimir');

const Formulario = document.getElementById('Formulario');
const DadosDaEscola = document.getElementById('Dados_Da_Escola');
const placeholderPainel = document.getElementById('placeholder-painel');
const conteudoDados = document.getElementById('conteudo-dados');
const badgeSalvo = document.getElementById('badge-salvo');

const STORAGE_KEY = 'censo2026_escola';

// ===================== TOAST ==============================
function mostrarToast(mensagem, duracao = 2800) {
  const toast = document.getElementById('toast');
  toast.textContent = mensagem;
  toast.classList.add('visivel');
  setTimeout(() => toast.classList.remove('visivel'), duracao);
}

// ===================== BARRA DE PROGRESSO ================
function atualizarProgresso(etapaAtiva) {
  [passo1, passo2, passo3].forEach((p, i) => {
    p.classList.remove('ativo', 'concluido');
    if (i + 1 < etapaAtiva) p.classList.add('concluido');
    else if (i + 1 === etapaAtiva) p.classList.add('ativo');
  });
}

// ===================== NAVEGAÇÃO ENTRE SEÇÕES ===========
function irParaSeção(seção) {
  Seção1.style.display = 'none';
  Seção2.style.display = 'none';
  Seção3.style.display = 'none';
  seção.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

BtnAvançar1.addEventListener('click', () => {
  salvarDados();
  irParaSeção(Seção2);
  atualizarProgresso(2);
});

BtnVoltar1.addEventListener('click', () => {
  irParaSeção(Seção1);
  atualizarProgresso(1);
});

BtnAvançar2.addEventListener('click', () => {
  salvarDados();
  irParaSeção(Seção3);
  atualizarProgresso(3);
});

BtnVoltar2.addEventListener('click', () => {
  irParaSeção(Seção2);
  atualizarProgresso(2);
});

BtnAvançar3.addEventListener('click', () => {
  salvarDados();
  mostrarPainelRevisao();
  atualizarProgresso(3);
  passo3.classList.add('concluido');
  mostrarToast('✓ Dados salvos e prontos para impressão!');
});

// ===================== SALVAR NO LOCALSTORAGE ===========
function salvarDados() {
  const form = document.getElementById('Formulario');
  const dados = {};

  // Inputs text e number
  form.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
    if (input.id) dados[input.id] = input.value;
  });

  // Selects
  form.querySelectorAll('select').forEach(select => {
    if (select.id) dados[select.id] = select.value;
  });

  // Checkboxes — salva quais estão marcados
  const checkboxes = {};
  form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    if (cb.id) checkboxes[cb.id] = cb.checked;
  });
  dados._checkboxes = checkboxes;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));

  // Mostra badge de salvo
  badgeSalvo.style.display = 'inline-flex';
}

// ===================== CARREGAR DO LOCALSTORAGE =========
function carregarDados() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;

  let dados;
  try { dados = JSON.parse(raw); } catch { return false; }

  const form = document.getElementById('Formulario');

  // Inputs text e number
  form.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
    if (input.id && dados[input.id] !== undefined) {
      input.value = dados[input.id];
    }
  });

  // Selects
  form.querySelectorAll('select').forEach(select => {
    if (select.id && dados[select.id] !== undefined) {
      select.value = dados[select.id];
    }
  });

  // Checkboxes
  if (dados._checkboxes) {
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (cb.id && dados._checkboxes[cb.id] !== undefined) {
        cb.checked = dados._checkboxes[cb.id];
      }
    });
  }

  return true;
}

// ===================== MOSTRAR PAINEL DE REVISÃO ========
function mostrarPainelRevisao() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  let dados;
  try { dados = JSON.parse(raw); } catch { return; }

  // Nome da escola no título
  const titulo = document.getElementById('TituloEscola');
  titulo.textContent = dados['NomeEscola'] || 'Dados da Escola';

  // Campos de texto / select
  const mapaCampos = {
    'LocalidadeCv':      { label: 'Localidade',                id: 'Localidade' },
    'DependenciaCv':     { label: 'Dependência Administrativa', id: 'Dependencia' },
    'InicioLetivoCv':    { label: 'Início do Ano Letivo',       id: 'Inicio' },
    'FimLetivoCv':       { label: 'Fim do Ano Letivo',          id: 'Fim' },
    'FuncionamentoCv':   { label: 'Local de Funcionamento',     id: 'Funcionamento' },
    'OcupacaoCv':        { label: 'Forma de Ocupação',          id: 'Ocupacao' },
    'AguaPotavelCv':     { label: 'Abastecimento de Água',      id: 'AguaPotavel' },
    'EsgotamentoCv':     { label: 'Esgotamento Sanitário',      id: 'Esgotamento' },
    'EletricidadeCv':    { label: 'Fonte de Energia Elétrica',  id: 'Eletricidade' },
    'DescarteResidosCv': { label: 'Destinação do Lixo',         id: 'DescarteResidos' },
    'SalaDiretoriaCv':   { label: null, checkbox: 'SalaDiretoria' },
    'SalaProfessoresCv': { label: null, checkbox: 'SalaProfessores' },
    'SalaSecretariaCv':  { label: null, checkbox: 'SalaSecretaria' },
    'AlmoxarifadoCv':    { label: null, checkbox: 'Almoxarifado' },
    'DespensaCv':        { label: null, checkbox: 'Despensa' },
    'CozinhaCv':         { label: null, checkbox: 'Cozinha' },
    'RefeitorioCv':      { label: null, checkbox: 'Refeitorio' },
  };

  Object.entries(mapaCampos).forEach(([cvId, info]) => {
    const el = document.getElementById(cvId);
    if (!el) return;

    if (info.checkbox) {
      // Checkbox
      const marcado = dados._checkboxes && dados._checkboxes[info.checkbox];
      const campo = document.getElementById(info.checkbox);
      const valorTexto = campo ? campo.value : info.checkbox;
      el.innerHTML = marcado ? `<strong>✔</strong> ${valorTexto}` : '';
      el.style.display = marcado ? 'block' : 'none';
    } else {
      // Text / select
      const valor = dados[info.id] || '';
      el.innerHTML = valor ? `<strong>${info.label}:</strong> ${valor}` : '';
      el.style.display = valor ? 'block' : 'none';
    }
  });

  // Ano letivo visibilidade
  const anoLetivoCv = document.getElementById('AnoLetivoCv');
  if (anoLetivoCv) {
    const temInicio = dados['Inicio'] || dados['Fim'];
    anoLetivoCv.style.display = temInicio ? 'block' : 'none';
  }

  // Equipamentos — checkboxes da seção 3
  const equipCv = document.getElementById('equipamentosCv');
  if (equipCv && dados._checkboxes) {
    const idsEquip = [
      'AntenaParabolica','Copiadora','Impressora','ImpressoraMultifuncional',
      'Computadores','Scanner','Acabo','Wireless','NaoPossuiInternet',
      'ParaAdministrativo','ParaAprendizagem','ParaAlunos','ParaComunidade',
      'AcervoMultimidia','BrinquedosInfantil','ConjuntoCientificos',
      'EquipamentosSom','EquipamentosAudiovisuais','EquipamentosAgricola',
      'InstrumentosMusical','KitsRobotica','MateriaisEmocional',
      'MateriaisEdProfissional','MateriaisDesportivos','MateriaisBilingueSurdo',
      'MateriaisEtnicoRacial','MateriaisCampo','MateriaisIndigena',
      'MateriaisQuilombola','MateriaisEdEspecial','AcoesAmbientais',
      'ProjetoPolitico1','ProjetoPolitico2',
      'AssociacaoPais','AssociacaoPaisMestres','ConselhoEscolar','GremioEstudantil',
    ];

    const marcados = idsEquip.filter(id => dados._checkboxes[id]);
    if (marcados.length > 0) {
      equipCv.innerHTML = marcados.map(id => {
        const el = document.getElementById(id);
        const texto = el ? el.value : id;
        return `<p style="display:block"><strong>✔</strong> ${texto}</p>`;
      }).join('');
    } else {
      equipCv.innerHTML = '';
    }

    // Campos numéricos
    const numericos = ['DVD','AparelhoSom','Televisao','Datashow','LousaDigital',
                       'Desktop','Notebooks','Tablets','SalasDentro','SalasFora',
                       'SalasClimatizadas','SalasAcessibilidade','CantinhoDeLeitura'];
    numericos.forEach(id => {
      const v = dados[id];
      if (v && Number(v) > 0) {
        const el = document.getElementById(id);
        const lbl = el ? (el.labels && el.labels[0] ? el.labels[0].textContent : id) : id;
        equipCv.innerHTML += `<p style="display:block"><strong>${lbl}</strong> ${v}</p>`;
      }
    });

    // BandaLarga e AlimentacaoEscolar
    ['BandaLarga','AlimentacaoEscolar'].forEach(id => {
      const v = dados[id];
      if (v) {
        const el = document.getElementById(id);
        const lbl = el ? (el.labels && el.labels[0] ? el.labels[0].textContent : id) : id;
        equipCv.innerHTML += `<p style="display:block"><strong>${lbl}</strong> ${v}</p>`;
      }
    });
  }

  // Exibir painel
  placeholderPainel.style.display = 'none';
  conteudoDados.style.display = 'block';
  badgeSalvo.style.display = 'inline-flex';
  btnEditar.style.display = 'inline-flex';
  btnImprimir.style.display = 'inline-flex';
}

// ===================== BOTÃO EDITAR =====================
btnEditar.addEventListener('click', () => {
  irParaSeção(Seção1);
  atualizarProgresso(1);
  mostrarToast('Modo de edição ativado. Faça as alterações e revise novamente.');
});

// ===================== BOTÃO IMPRIMIR ===================
btnImprimir.addEventListener('click', () => {
  window.print();
});

// ===================== AUTO-SAVE EM TEMPO REAL ==========
document.getElementById('Formulario').addEventListener('input', () => {
  salvarDados();
  // Atualiza painel em tempo real se já estiver exibindo dados
  if (conteudoDados.style.display !== 'none') {
    mostrarPainelRevisao();
  }
});

document.getElementById('Formulario').addEventListener('change', () => {
  salvarDados();
  if (conteudoDados.style.display !== 'none') {
    mostrarPainelRevisao();
  }
});

// ===================== INIT: CARREGAR DADOS SALVOS ======
window.addEventListener('DOMContentLoaded', () => {
  const carregou = carregarDados();
  if (carregou) {
    mostrarToast('Dados anteriores carregados automaticamente!', 3500);
    // Atualiza painel com dados carregados
    setTimeout(() => {
      mostrarPainelRevisao();
    }, 100);
  }
  atualizarProgresso(1);
});
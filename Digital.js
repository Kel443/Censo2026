/* ============================================================
   Digital.js — Atualização em tempo real do painel de dados
   Sistema de Cadastro — Escolas Censo 2026
   ============================================================ */

'use strict';

// Mapa: ID do campo no formulário → ID do parágrafo no painel
const mapaTexto = {
  'NomeEscola':      { alvo: 'TituloEscola',      label: null },
  'Localidade':      { alvo: 'LocalidadeCv',      label: 'Localidade' },
  'Dependencia':     { alvo: 'DependenciaCv',     label: 'Dependência Administrativa' },
  'Inicio':          { alvo: 'InicioLetivoCv',    label: 'Início do Ano Letivo' },
  'Fim':             { alvo: 'FimLetivoCv',        label: 'Fim do Ano Letivo' },
  'Funcionamento':   { alvo: 'FuncionamentoCv',   label: 'Local de Funcionamento' },
  'Ocupacao':        { alvo: 'OcupacaoCv',        label: 'Forma de Ocupação' },
  'AguaPotavel':     { alvo: 'AguaPotavelCv',     label: 'Abastecimento de Água' },
  'Esgotamento':     { alvo: 'EsgotamentoCv',     label: 'Esgotamento Sanitário' },
  'Eletricidade':    { alvo: 'EletricidadeCv',    label: 'Fonte de Energia Elétrica' },
  'DescarteResidos': { alvo: 'DescarteResidosCv', label: 'Destinação do Lixo' },
};

// Mapa: ID do checkbox → ID do parágrafo no painel
const mapaCheckbox = {
  'SalaDiretoria':   'SalaDiretoriaCv',
  'SalaProfessores': 'SalaProfessoresCv',
  'SalaSecretaria':  'SalaSecretariaCv',
  'Almoxarifado':    'AlmoxarifadoCv',
  'Despensa':        'DespensaCv',
  'Cozinha':         'CozinhaCv',
  'Refeitorio':      'RefeitorioCv',
};

// ===================== ATIVA PAINEL ====================
function ativarPainel() {
  const placeholder = document.getElementById('placeholder-painel');
  const conteudo = document.getElementById('conteudo-dados');
  if (placeholder) placeholder.style.display = 'none';
  if (conteudo) conteudo.style.display = 'block';
}

// ===================== ATUALIZA CAMPOS TEXTO/SELECT ====
Object.entries(mapaTexto).forEach(([idCampo, cfg]) => {
  const el = document.getElementById(idCampo);
  if (!el) return;

  const evento = el.tagName === 'SELECT' ? 'change' : 'input';

  el.addEventListener(evento, () => {
    const valor = el.value.trim();
    const alvo = document.getElementById(cfg.alvo);
    if (!alvo) return;

    if (idCampo === 'NomeEscola') {
      alvo.textContent = valor || 'Dados da Escola';
    } else {
      alvo.innerHTML = valor
        ? `<strong>${cfg.label}:</strong> ${valor}`
        : '';
      alvo.style.display = valor ? 'block' : 'none';
    }

    // Exibe Ano Letivo se início ou fim preenchidos
    if (idCampo === 'Inicio' || idCampo === 'Fim') {
      const anoLetivoCv = document.getElementById('AnoLetivoCv');
      const inicio = document.getElementById('Inicio');
      const fim = document.getElementById('Fim');
      const temDado = (inicio && inicio.value.trim()) || (fim && fim.value.trim());
      if (anoLetivoCv) {
        anoLetivoCv.style.display = temDado ? 'block' : 'none';
      }
    }

    ativarPainel();
  });
});

// ===================== ATUALIZA CHECKBOXES =============
Object.entries(mapaCheckbox).forEach(([idCb, idCv]) => {
  const cb = document.getElementById(idCb);
  const cvEl = document.getElementById(idCv);
  if (!cb || !cvEl) return;

  cb.addEventListener('change', () => {
    if (cb.checked) {
      cvEl.innerHTML = `<strong>✔</strong> ${cb.value}`;
      cvEl.style.display = 'block';
    } else {
      cvEl.innerHTML = '';
      cvEl.style.display = 'none';
    }
    ativarPainel();
  });
});

// 1. DADOS ESTÁTICOS DA TRILHA (ESTRUTURA COMPLETA)
const S = [
  {id:1,name:'Alinhamento e base',visit:'Visita 1', tasks:[
    { t:'Apresentar o fluxo do pedido (Fach 1 → Fach 2 → Fach 1) para as 3 pessoas', w:'eq', 
      details: `
        <div class="section" id="s2">
          <p class="section-label">Fluxo do pedido</p>
          <div class="flow-step"><div class="flow-icon" style="background:#E6F1FB">📋</div><div class="flow-body"><strong>Pedido entra na carteira — Fach 1</strong><span>Daiane gera a OP. Yuri faz a análise de itens comprados imediatamente.</span></div></div>
          <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
          <div class="flow-step"><div class="flow-icon" style="background:#EEEDFE">📤</div><div class="flow-body"><strong>Necessidade de peças — Fach 1 → Fach 2</strong><span>Fach 1 informa quais peças precisa com prazo. Fach 2 verifica o kanban e a programação.</span></div></div>
          <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
          <div class="flow-step"><div class="flow-icon" style="background:#E1F5EE">⚙️</div><div class="flow-body"><strong>Fabricação — Fach 2</strong><span>Carmen programa corte → dobra → usinagem. Peças kanban 320 entram automaticamente. Demais entram por programação semanal.</span></div></div>
          <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
          <div class="flow-step"><div class="flow-icon" style="background:#FAEEDA">📦</div><div class="flow-body"><strong>Separação e envio — Fach 2 → Fach 1</strong><span>Peças separadas por pedido e enviadas conforme prioridade da programação.</span></div></div>
          <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
          <div class="flow-step"><div class="flow-icon" style="background:#EAF3DE">🔩</div><div class="flow-body"><strong>Montagem — Fach 1</strong><span>Conjuntos 200 e itens comerciais (código 80). Yuri acompanha o avanço por pedido.</span></div></div>
          <div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>
          <div class="flow-step"><div class="flow-icon" style="background:#E6F1FB">✅</div><div class="flow-body"><strong>Pedido concluído</strong><span>Registro de encerramento. Dados alimentam os indicadores da semana.</span></div></div>
          <div class="congelar-box">
            <h3>Ponto crítico: congelamento da programação</h3>
            <p>A programação da semana é travada toda segunda-feira. Mudanças só com autorização formal e motivo registrado.</p>
          </div>
        </div>
      ` 
    },
    { t:'Mapear a carteira de pedidos em aberto e identificar prioridades críticas', w:'d' },
    { t:'Definir formalmente os papéis: Daiane (carteira), Yuri (montagem e comprados), Carmen (fabricação e kanban)', w:'eq', dynamicRef: 'responsabilidades' },
    { t:'Apresentar a lógica do kanban e o impacto esperado na redução de OPs', w:'eq' },
    { t:'Levantar lista preliminar de itens série 320 que entrarão no kanban', w:'c' },
  ]},
  {id:2,name:'Kanban 320 — Fach 2',visit:'Visitas 1 e 2', tasks:[
    {t:'Identificar todos os itens 320 que se repetem entre pedidos com código e frequência',w:'c'},
    {t:'Calcular ponto de reposição e quantidade de cartões por item',w:'c'},
    {t:'Criar os cartões físicos do kanban (etiqueta com código, descrição e quantidade)',w:'c'},
    {t:'Montar e fixar o quadro de kanban na Fach 2 (colunas: A fabricar | Em produção | Concluído)',w:'c'},
    {t:'Treinar Carmen na gestão do quadro: quando acionar, como repor sem emitir OP',w:'c'},
    {t:'Realizar primeiro ciclo completo do kanban 320 em operação',w:'c'},
    {t:'Validar redução no volume de OPs abertas na Fach 2 (meta: −50%)',w:'d'},
  ]},
  {id:3,name:'Análise de comprados',visit:'Visita 2', tasks:[
    { t:'Fach 1: implantar análise de itens comerciais (código 80) a cada OP gerada por Daiane', w:'y',
      details: `
        <div class="section" id="s6">
          <p class="section-label">Análise de demanda de itens comprados</p>
          <div class="comp-header comp-fach1">
            <h3>Fach 1 — Itens comerciais (código 80)</h3>
            <p>Rolamentos, parafusos, vedações, motores, componentes elétricos e demais itens comprados prontos para montagem. A análise acontece no momento da geração da OP.</p>
          </div>
          <div class="card">
            <p class="section-label" style="margin-bottom:.5rem">Como analisar — passo a passo</p>
            <ul class="step-list blue">
              <li><div><strong>Abrir a lista de materiais (LM) da OP</strong></div></li>
              <li><div><strong>Verificar o estoque disponível</strong></div></li>
              <li><div><strong>Calcular a necessidade líquida</strong></div></li>
              <li><div><strong>Verificar o prazo de entrega do fornecedor</strong></div></li>
              <li><div><strong>Gerar a solicitação de compra</strong></div></li>
              <li><div><strong>Acompanhar o pedido de compra até o recebimento</strong></div></li>
            </ul>
          </div>
          <div class="divider"></div>
          <div class="comp-header comp-fach2" style="margin-top:.75rem">
            <h3>Fach 2 — Matéria-prima (chapas, tubos, barras e perfis)</h3>
            <p>Materiais brutos usados no corte, dobra e usinagem. A análise é feita antes de iniciar a programação da semana, garantindo que a fábrica não pare por falta de material.</p>
          </div>
          <div class="card">
            <p class="section-label" style="margin-bottom:.5rem">Como analisar — passo a passo</p>
            <ul class="step-list teal">
              <li><div><strong>Receber a lista de peças da semana (séries 300 e 20)</strong></div></li>
              <li><div><strong>Consolidar o consumo total de matéria-prima</strong></div></li>
              <li><div><strong>Verificar o estoque físico de MP</strong></div></li>
              <li><div><strong>Calcular a necessidade de reposição</strong></div></li>
              <li><div><strong>Gerar a solicitação de compra de MP</strong></div></li>
              <li><div><strong>Acompanhar o recebimento antes do início da produção</strong></div></li>
            </ul>
          </div>
        </div>
      `
    },
    {t:'Treinar Yuri no cálculo de necessidade líquida: quantidade da LM menos estoque disponível',w:'y'},
    {t:'Fach 2: implantar análise de matéria-prima toda sexta-feira à tarde',w:'c'},
    {t:'Configurar planilha Google Sheets de controle de compras (uma para cada fábrica)',w:'eq'},
    {t:'Definir regra: item com risco de atraso vai direto para Daiane no mesmo dia',w:'d'},
  ]},
  {id:4,name:'Programação congelada',visit:'Visitas 2 e 3', tasks:[
    { t:'Comunicar a regra de congelamento para toda a equipe: segunda até 10h, mudança só com justificativa registrada', w:'d',
      details: `
        <div class="section" id="s3">
          <p class="section-label">Programação</p>
          <div class="congelar-box">
            <h3>Regra de ouro: programação congelada</h3>
            <p>Toda segunda-feira até as 10h a programação da semana está travada para as duas fábricas. Mudança só com justificativa registrada por escrito. Isso protege a sequência e dá previsibilidade.</p>
          </div>
          <div class="card">
            <h3>Rotinas</h3>
            <div class="routine-row"><span class="freq freq-s">Semanal</span><div class="routine-text"><strong>Programação da Fach 2 — segunda até 10h</strong></div><span class="who who-c">Carmen</span></div>
            <div class="routine-row"><span class="freq freq-s">Semanal</span><div class="routine-text"><strong>Programação da Fach 1 — segunda até 10h</strong></div><span class="who who-y">Yuri</span></div>
            <div class="routine-row"><span class="freq freq-d">Diária</span><div class="routine-text"><strong>Confirmação da sequência do dia</strong></div><span class="who who-c">Carmen</span></div>
            <div class="routine-row"><span class="freq freq-d">Diária</span><div class="routine-text"><strong>Liberação de peças Fach 2 → Fach 1</strong></div><span class="who who-c">Carmen</span></div>
            <div class="routine-row"><span class="freq freq-s">Semanal</span><div class="routine-text"><strong>Reunião de fechamento — sexta</strong></div><span class="who who-d">Daiane</span></div>
          </div>
        </div>
      `
    },
    {t:'Configurar planilha de programação semanal da Fach 2 no Google Sheets — Carmen',w:'c'},
    {t:'Configurar planilha de programação semanal da Fach 1 no Google Sheets — Yuri',w:'y'},
    {t:'Realizar primeiro ciclo de programação sem alterações não autorizadas',w:'eq'},
    {t:'Auditar na visita seguinte: quantas OPs saíram da sequência programada e por quê',w:'d'},
  ]},
  {id:5,name:'Apontamento simplificado',visit:'Visitas 3 e 4', tasks:[
    {t:'Criar formulário Google Forms no celular: entrada em produção + conclusão + baixa de material',w:'eq'},
    {t:'Treinar equipe: apenas 3 campos — OP, status (entrada/conclusão), quantidade',w:'eq'},
    {t:'Realizar primeiro ciclo completo de apontamentos nas duas fábricas',w:'eq'},
    {t:'Validar consistência: o que foi apontado bate com o que foi produzido e liberado',w:'c'},
  ]},
  {id:6,name:'Kanban 220 — Fach 1',visit:'Visitas 4 e 5', tasks:[
    {t:'Levantar os conjuntos 220 (séries 420, 520, 500) que entrarão no kanban',w:'c'},
    {t:'Carmen define cartões, pontos de reposição e quantidades sem envolvimento de Yuri',w:'c'},
    {t:'Montar o quadro físico do kanban 220 na Fach 1',w:'c'},
    {t:'Treinar Yuri para acionar os cartões corretamente: apenas retirar e entregar para Carmen',w:'y'},
    {t:'Realizar primeiro ciclo do kanban 220 em operação com Carmen gerenciando',w:'c'},
  ]},
  {id:7,name:'Indicadores e autonomia',visit:'Visita 5', tasks:[
    { t:'5 indicadores configurados e preenchidos pela equipe sem apoio externo', w:'eq',
      details: `
        <div class="section" id="s7">
          <p class="section-label">Indicadores</p>
          <div class="card" style="margin-bottom:1rem">
            <h3>Princípio</h3>
            <p style="font-size:13px; color:var(--text-2); margin-top:4px;">Todos os indicadores são calculados em planilha simples. O dado bruto é coletado durante as rotinas já existentes. Nenhum indicador exige mais de 10 minutos para ser calculado.</p>
          </div>
          <div class="kpi-card"><div class="kpi-header"><div><div class="kpi-title">Pontualidade de entrega</div></div></div></div>
          <div class="kpi-card"><div class="kpi-header"><div><div class="kpi-title">Aderência à programação</div></div></div></div>
          <div class="kpi-card"><div class="kpi-header"><div><div class="kpi-title">Cobertura de matéria-prima</div></div></div></div>
          <div class="kpi-card"><div class="kpi-header"><div><div class="kpi-title">Pedidos com compra em atraso</div></div></div></div>
          <div class="kpi-card"><div class="kpi-header"><div><div class="kpi-title">Volume de OPs encerradas</div></div></div></div>
        </div>
      `
    },
    {t:'Reunião de fechamento semanal (sexta) operando de forma autônoma — Daiane conduz',w:'d'},
    {t:'Kanban 320 operando de forma estável com reposição sem emissão de OP',w:'c'},
    {t:'Kanban 220 operando com Yuri acionando e Carmen gerenciando',w:'c'},
    {t:'Pedidos com prazo de conclusão previsível comunicado ao cliente',w:'d'},
  ]}
];

const whoMap = {c:'wc', d:'wd', y:'wy', eq:'weq'};
const whoLbl = {c:'Carmen', d:'Daiane', y:'Yuri', eq:'Equipe'};
const TOTAL = 36; 

// 2. ESTADO GLOBAL MÚTAVEL (Checks e Fotos via Supabase, Responsabilidades via LocalStorage)
let state = {
  chk: {}, 
  photos: {}, 
  exp: {},
  resp: {
    c: ["Programação semanal Fach 2", "Gestão kanban", "Análise de MP"],
    d: ["Gestão da carteira", "Reunião de fechamento", "Emissão OPs"],
    y: ["Análise itens comprados", "Programação Fach 1", "Apontamentos"]
  }
};

const profiles = {
  c: { name: 'Carmen', role: 'Analista PCP · Fach 2', badge: 'PCP Fach 2', av: 'av-c', bdg: 'badge-purple', init: 'CA' },
  d: { name: 'Daiane', role: 'Líder PCP · Fach 1', badge: 'PCP Fach 1', av: 'av-d', bdg: 'badge-blue', init: 'DA' },
  y: { name: 'Yuri', role: 'Analista PCP · Fach 1', badge: 'PCP Fach 1', av: 'av-y', bdg: 'badge-coral', init: 'YU' }
};

// ==========================================================================
// 3. INTEGRAÇÃO SUPABASE E INICIALIZAÇÃO
// ==========================================================================
const supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

async function initData() {
  // Inicializa estrutura vazia baseada em S
  S.forEach(s => {
    if(!state.exp[s.id]) state.exp[s.id] = false;
    if(!state.chk[s.id]) state.chk[s.id] = {};
    if(!state.photos[s.id]) state.photos[s.id] = {};
    s.tasks.forEach((_, i) => { 
        if(state.chk[s.id][i] === undefined) state.chk[s.id][i] = false; 
    });
  });

  // Carrega Responsabilidades do LocalStorage (já que não foi modelado no BD ainda)
  const savedResp = localStorage.getItem('satiro_resp_state');
  if (savedResp) {
      try { state.resp = JSON.parse(savedResp); } catch(e) { }
  }

  // Busca dados do Supabase
  try {
      const { data, error } = await supabaseClient.from('progresso_pcp').select('*');
      if (error) throw error;
      
      if (data) {
          data.forEach(item => {
              if (item.stage_id !== null && item.task_index !== null) {
                  state.chk[item.stage_id][item.task_index] = item.is_done;
                  if(item.photo_url) {
                      state.photos[item.stage_id][item.task_index] = item.photo_url;
                  }
              }
          });
      }
      document.getElementById('sync-status').textContent = "🟢 Sincronizado";
  } catch (err) {
      console.error("Erro na sincronização:", err);
      document.getElementById('sync-status').textContent = "🔴 Erro de Conexão";
  }

  render();
}

async function toggleTask(sid, tid, e) {
  if(e && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && !e.target.classList.contains('btn-photo-upload')) e.stopPropagation();
  
  const newState = !state.chk[sid][tid];
  state.chk[sid][tid] = newState;

  document.getElementById(`row_${sid}_${tid}`).classList.toggle('t-done', newState);
  document.getElementById(`cb_${sid}_${tid}`).checked = newState;
  
  updateUI();
  const pendenciasTab = document.getElementById('tab-pendencias');
  if (pendenciasTab.classList.contains('active')) {
      renderPendencias(document.getElementById('filter-who').value);
  }

  // Envia para o Supabase de forma assíncrona
  await supabaseClient.from('progresso_pcp').upsert({ 
      task_key: `${sid}_${tid}`, 
      is_done: newState,
      stage_id: sid,
      task_index: tid
  }, { onConflict: 'task_key' });
}

async function handleUpload(sid, tid, event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileName = `foto_${sid}_${tid}_${Date.now()}.jpg`;
  document.getElementById('sync-status').textContent = "⏳ Enviando foto...";

  // Upload no Storage do Supabase
  const { data, error } = await supabaseClient.storage
      .from('fotos')
      .upload(fileName, file);

  if (error) {
      alert("Erro no upload: " + error.message);
      document.getElementById('sync-status').textContent = "🔴 Erro no upload";
      return;
  }

  const photoUrl = `${CONFIG.SUPABASE_URL}/storage/v1/object/public/fotos/${data.path}`;
  state.photos[sid][tid] = photoUrl;

  // Atualiza a tabela com o link da foto
  await supabaseClient.from('progresso_pcp').upsert({ 
      task_key: `${sid}_${tid}`, 
      photo_url: photoUrl,
      stage_id: sid,
      task_index: tid
  }, { onConflict: 'task_key' });

  document.getElementById('sync-status').textContent = "🟢 Foto Salva";
  render(); // Re-renderiza para mostrar o link da foto
}

// ==========================================================================
// 4. LÓGICA DE UI E NAVEGAÇÃO
// ==========================================================================
function switchMainTab(tabId, btnContext) {
  document.querySelectorAll('.main-tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.main-tab-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById('tab-' + tabId).classList.add('active');
  btnContext.classList.add('active');
  
  const titleEl = document.getElementById('dynamic-title');
  if (tabId === 'treinamento') {
      titleEl.innerHTML = 'TREINAMENTO<br>PCP';
  } else if (tabId === 'pendencias') {
      titleEl.innerHTML = 'CONTROLE DE<br>PENDÊNCIAS';
      renderPendencias(document.getElementById('filter-who').value);
  } else {
      titleEl.innerHTML = 'TRILHA DE<br>IMPLANTAÇÃO';
  }
}

function go(index) {
  document.querySelectorAll('.sidebar-nav button').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.treinamento-section').forEach(el => el.classList.remove('active'));
  
  document.querySelectorAll('.sidebar-nav button')[index].classList.add('active');
  document.getElementById('ts-' + index).classList.add('active');
}

function goToTaskInTrilha(stageId, taskIndex) {
  const btnTrilha = document.querySelector('.main-tab-btn[onclick*="trilha"]');
  switchMainTab('trilha', btnTrilha);

  if (!state.exp[stageId]) toggleStage(stageId);

  setTimeout(() => {
      const taskRow = document.getElementById(`row_${stageId}_${taskIndex}`);
      if (taskRow) {
          taskRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
          taskRow.classList.remove('highlight-task');
          void taskRow.offsetWidth; 
          taskRow.classList.add('highlight-task');
          setTimeout(() => taskRow.classList.remove('highlight-task'), 2000);
      }
  }, 150);
}

function totalDone() {
  let c=0; S.forEach(s => Object.values(state.chk[s.id]).forEach(v => {if(v)c++;})); return c;
}
function stageDone(sid) {
  return Object.values(state.chk[sid]).filter(Boolean).length;
}

function updateUI() {
  const done = totalDone();
  const pct = Math.round(done / TOTAL * 100);
  document.getElementById('pf').style.width = pct + '%';
  document.getElementById('pc').textContent = done + ' de ' + TOTAL + ' itens concluídos';
  const ppEl = document.getElementById('pp');
  ppEl.textContent = pct + '%';
  ppEl.classList.toggle('done', pct === 100);
  document.getElementById('sv3').textContent = done;

  let sDone = 0;
  S.forEach(s => {
    const sd = stageDone(s.id);
    const st = s.tasks.length;
    const isDone = sd === st;
    if(isDone) sDone++;

    const card = document.getElementById('card'+s.id);
    if(card) {
      card.classList.toggle('s-done', isDone);
      card.classList.toggle('in-progress', sd > 0 && !isDone);
    }
    const num = document.getElementById('num'+s.id);
    if(num) { num.classList.toggle('n-done', isDone); num.textContent = isDone ? '✓' : s.id; }
    const badge = document.getElementById('badge'+s.id);
    if(badge) badge.style.display = isDone ? 'inline-block' : 'none';
    const cnt = document.getElementById('cnt'+s.id);
    if(cnt) cnt.textContent = sd + '/' + st;
    const mf = document.getElementById('mf'+s.id);
    if(mf) mf.style.width = (sd/st*100) + '%';
  });
  document.getElementById('sv').textContent = sDone;
}

function toggleStage(sid) {
  state.exp[sid] = !state.exp[sid];
  document.getElementById('tasks'+sid).classList.toggle('open', state.exp[sid]);
  document.getElementById('chev'+sid).classList.toggle('open', state.exp[sid]);
}

function toggleDetails(sid, tid, e) {
  e.stopPropagation();
  document.getElementById(`details_${sid}_${tid}`).classList.toggle('open');
  e.currentTarget.classList.toggle('open');
}

// ==========================================================================
// 5. RENDERIZAÇÃO DA INTERFACE PRINCIPAL
// ==========================================================================
function renderPendencias(filter) {
  const container = document.getElementById('pending-list-container');
  if(!container) return;

  let html = '';
  let count = 0;

  S.forEach(stage => {
    stage.tasks.forEach((task, i) => {
      const isDone = state.chk[stage.id][i];
      if (!isDone) {
        if (filter === 'all' || filter === task.w) {
          count++;
          html += `
          <div class="pending-item-card pc-${task.w}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
              <span class="pending-item-stage">Etapa ${stage.id}: ${stage.name}</span>
              <div style="display:flex; gap:8px; align-items:center;">
                <span class="who-tag ${whoMap[task.w]}">${whoLbl[task.w]}</span>
                <button class="btn-view-trilha" onclick="goToTaskInTrilha(${stage.id}, ${i})">Ver na Trilha ➔</button>
              </div>
            </div>
            <span class="pending-item-task">${task.t}</span>
          </div>`;
        }
      }
    });
  });

  if (count === 0) {
    html = `<div class="empty-state">🎉 Nenhuma pendência encontrada para este filtro. Tudo em dia!</div>`;
  }
  container.innerHTML = html;
}

function renderResponsabilidades() {
  const container = document.getElementById('dynamic-responsabilidades');
  if(!container) return; 

  let html = `<div class="section"><p class="section-label">Responsabilidades Editáveis</p>`;
  
  ['c', 'd', 'y'].forEach(k => {
    const p = profiles[k];
    html += `
    <div class="person-card">
      <div class="person-header"><div class="avatar ${p.av}">${p.init}</div><div class="person-meta"><p>${p.name}</p><span>${p.role} · <span class="badge ${p.bdg}" style="font-size:10px">${p.badge}</span></span></div></div>
      <ul class="task-list" id="list-${k}" ondragover="allowDrop(event)" ondrop="drop(event, '${k}')">
        ${state.resp[k].map((txt, i) => `
          <li class="task-item-edit" draggable="true" ondragstart="drag(event, '${k}', ${i})">
            <span class="drag-handle">⠿</span>
            <div class="task-editable" contenteditable="true" onblur="updateResp('${k}', ${i}, this.innerText)">${txt}</div>
            <button class="btn-icon" title="Excluir" onclick="deleteResp('${k}', ${i})">✕</button>
          </li>
        `).join('')}
      </ul>
      <button class="btn-add-line" onclick="addResp('${k}')">+ Adicionar nova responsabilidade para ${p.name}</button>
    </div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function updateResp(role, index, newText) {
  if (newText.trim() === "") return deleteResp(role, index); 
  state.resp[role][index] = newText.trim();
  localStorage.setItem('satiro_resp_state', JSON.stringify(state.resp));
}
function addResp(role) {
  state.resp[role].push("Nova responsabilidade...");
  localStorage.setItem('satiro_resp_state', JSON.stringify(state.resp));
  renderResponsabilidades(); 
}
function deleteResp(role, index) {
  if(confirm("Remover esta responsabilidade?")) {
    state.resp[role].splice(index, 1);
    localStorage.setItem('satiro_resp_state', JSON.stringify(state.resp));
    renderResponsabilidades();
  }
}
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev, role, index) {
  ev.dataTransfer.setData("srcRole", role);
  ev.dataTransfer.setData("srcIndex", index);
}
function drop(ev, targetRole) {
  ev.preventDefault();
  const srcRole = ev.dataTransfer.getData("srcRole");
  const srcIndex = parseInt(ev.dataTransfer.getData("srcIndex"));
  
  if (srcRole && !isNaN(srcIndex)) {
    const item = state.resp[srcRole].splice(srcIndex, 1)[0];
    state.resp[targetRole].push(item);
    localStorage.setItem('satiro_resp_state', JSON.stringify(state.resp));
    renderResponsabilidades();
  }
}

function render() {
  const c = document.getElementById('stages-container');
  c.innerHTML = '';
  S.forEach(s => {
    const tasksHtml = s.tasks.map((task, i) => {
      const isDynamic = task.dynamicRef === 'responsabilidades';
      const hasDetails = !!task.details || isDynamic;
      const detailsContent = isDynamic ? `<div id="dynamic-responsabilidades"></div>` : task.details;
      
      // Controle de Fotos Injetado
      const hasPhoto = state.photos[s.id] && state.photos[s.id][i];
      const photoControls = `
        <div class="photo-controls">
          ${hasPhoto ? `<a href="${state.photos[s.id][i]}" target="_blank" class="task-photo-link" onclick="event.stopPropagation()">Ver Foto</a>` : ''}
          <label class="btn-photo-upload" for="file_${s.id}_${i}" onclick="event.stopPropagation()" title="Anexar foto">📸</label>
          <input type="file" id="file_${s.id}_${i}" style="display:none" accept="image/*" capture="environment" onchange="handleUpload(${s.id}, ${i}, event)">
        </div>
      `;

      return `
      <div class="task-container">
        <div class="task-row ${state.chk[s.id][i] ? 't-done' : ''}" id="row_${s.id}_${i}" onclick="toggleTask(${s.id},${i},event)">
          <input type="checkbox" class="task-cb" id="cb_${s.id}_${i}" ${state.chk[s.id][i] ? 'checked' : ''}>
          <span class="task-txt">${task.t}</span>
          <span class="who-tag ${whoMap[task.w]}">${whoLbl[task.w]}</span>
          ${photoControls}
          ${hasDetails ? `<span class="task-expand" onclick="toggleDetails(${s.id}, ${i}, event)">›</span>` : ''}
        </div>
        ${hasDetails ? `<div class="task-details" id="details_${s.id}_${i}">${detailsContent}</div>` : ''}
      </div>`;
    }).join('');

    const div = document.createElement('div');
    div.className = 'stage-card';
    div.id = 'card'+s.id;
    div.innerHTML = `
      <div class="stage-head" onclick="toggleStage(${s.id})">
        <div class="s-num title-condensed" id="num${s.id}">${s.id}</div>
        <div class="s-info"><span class="s-name">${s.name}</span><span class="s-visit">${s.visit}</span></div>
        <div class="s-right">
          <span class="s-done-badge" id="badge${s.id}" style="display:none">Concluída ✓</span>
          <span class="s-count title-condensed" id="cnt${s.id}">0/${s.tasks.length}</span>
          <span class="chev" id="chev${s.id}">›</span>
        </div>
      </div>
      <div class="s-mini-track"><div class="s-mini-fill" id="mf${s.id}" style="width:0%"></div></div>
      <div class="s-tasks" id="tasks${s.id}">${tasksHtml}</div>`;
    c.appendChild(div);
  });
  
  updateUI();
  renderResponsabilidades(); 
}

const dtEl = document.getElementById('dt-inicio');
if(dtEl) dtEl.value = new Date().toISOString().split('T')[0];

// Inicia a aplicação buscando dados do Supabase
initData();
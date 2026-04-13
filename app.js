// ==========================================================================
// 1. DADOS ESTÁTICOS DA TRILHA (CÓDIGO NOVO INJETADO)
// ==========================================================================

// Array das etapas do Fluxo para podermos injetar botões de foto em cada uma
const flowStepsData = [
  { icon: '📋', bg: '#E6F1FB', title: 'Gatilho: liberação da Engenharia', desc: 'E-mail da Engenharia.' },
  { icon: '📤', bg: '#EEEDFE', title: 'Etapa 01: Planejamento e Programação', desc: 'Data de entrega no planejador Programação por etapa.' },
  { icon: '📋', bg: '#E6F1FB', title: 'Etapa 02 - Análise de Demanda', desc: 'Gera OPs 120, 620 e 220 Solicita compra de 320 e comerciais.' },
  { icon: '⚙️', bg: '#E1F5EE', title: 'Etapa 03 Fach 2:', desc: 'Produção dos 320 · Lista de separação por estrutura (Kanban × PV).' },
  { icon: '📦', bg: '#FAEEDA', title: 'Etapa 03 Fach 1:', desc: 'Prepara montagem dos 220 · Confere 320 recebidos · Apontamento macro.' },
  { icon: '🔩', bg: '#EAF3DE', title: 'Etapa 04: Separação e Envio', desc: 'Fach 2 → Fach 1.' },
  { icon: '🔩', bg: '#EAF3DE', title: 'Etapa 05: Expedição', desc: 'Lista de expedição · check de recebidos · pendências atualizadas.' },
  { icon: '✅', bg: '#E6F1FB', title: 'Pedido concluído', desc: 'Alimentar indicadores.' }
];

// Função que gera o HTML do "Fluxo do Pedido" dinamicamente para incluir as fotos
function generateFluxoHTML() {
  let html = `<div class="section" id="s2"><p class="section-label">Fluxo do pedido</p>`;
  
  flowStepsData.forEach((step, index) => {
    const hasPhoto = state.flowPhotos && state.flowPhotos[index];
    const photoControls = `
      <div class="photo-controls" onclick="event.stopPropagation()">
        ${hasPhoto ? `<a href="${state.flowPhotos[index]}" target="_blank" class="task-photo-link">Ver Foto</a>` : ''}
        <label class="btn-photo-upload" for="flow_file_${index}" title="Anexar Foto">📸</label>
        <input type="file" id="flow_file_${index}" style="display:none" accept="image/*" capture="environment" onchange="handleFlowUpload(${index}, event)">
      </div>
    `;

    html += `
      <div class="flow-step">
        <div class="flow-icon" style="background:${step.bg}">${step.icon}</div>
        <div class="flow-body"><strong>${step.title}</strong><span>${step.desc}</span></div>
        ${photoControls}
      </div>
    `;
    // Adiciona o conector se não for o último
    if (index < flowStepsData.length - 1) {
      html += `<div class="flow-step"><div class="flow-connector"><div class="flow-line"></div></div></div>`;
    }
  });

  html += `
    <p style="font-size:12px; color:var(--primary); font-weight:bold; margin-top:12px;">Aviso: Kanban 320 e 220 · operação independente Autoalimenta pelo nível de estoque · paralelo a todas as etapas Depende apenas do consumo nas prateleiras</p>
    <div class="congelar-box">
      <h3>Ponto crítico:</h3> 
      <h3>1. Congelamento da programação</h3>
      <p>Toda segunda-feira a programação da semana é travada. Mudanças só com autorização formal e motivo registrado. Protege a semana em curso — sem isso, a sequência da fábrica é destruída por mudanças de última hora.</p>
      <h3>2. Checagem no recebimento dos 320</h3>
      <p>Na chegada dos itens 320 na Fach 1, conferência obrigatória antes de iniciar a montagem. Protege o meio do processo — identifica falta ou divergência de peça antes de montar, evitando ruptura com a máquina já parcialmente montada.</p>
      <h3>3. Lista de pendências do PV uma semana antes do carregamento</h3>
      <p>Fechar e divulgar a lista de pendências do pedido de venda uma semana antes da expedição. Protege a entrega final — janela mínima para correr atrás de peças faltantes sem estourar o prazo do cliente.</p>
    </div>
  </div>`;
  return html;
}

const S = [
  {id:1,name:'Alinhamento e base', tasks:[
    { t:'Apresentar o fluxo do pedido (Fach 1 → Fach 2 → Fach 1) para as 3 pessoas', w:'eq', details: generateFluxoHTML },
    { t:'Conferir pedidos liberados que precisam ser programados', w:'d' },
    { t:'Definir formalmente os papéis: Daiane (carteira), Yuri (montagem e comprados), Carmen (fabricação e kanban)', w:'eq', dynamicRef: 'responsabilidades' },
    { t:'Apresentar a lógica do kanban e o impacto esperado na redução de OPs', w:'eq' },
    { t:'Levantar lista preliminar de itens série 320 que entrarão no kanban', w:'c' },
  ]},
  {id:2,name:'Kanban 320 — Fach 2', tasks:[
    {t:'Identificar todos os itens 320 que se repetem entre pedidos com código e frequência',w:'c'},
    {t:'Calcular ponto de reposição e quantidade do lote por item',w:'c'},
    {t:'Criar os cartões físicos do kanban (etiqueta com código, descrição e quantidade)',w:'c'},
    {t:'Montar e fixar o quadro de kanban na Fach 2 (colunas: A fabricar | Em produção)',w:'c'},
    {t:'Treinar Carmen na gestão do quadro: quando acionar, como repor e como analisar',w:'c'},
    {t:'Análisar o giro de reposição do Kanban',w:'c'},
    {t:'Validar redução no volume de OPs abertas na Fach 2 (meta: −50%)',w:'d'},
  ]},
  {id:3,name:'Análise de comprados', tasks:[
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
              <li><div><strong>Abrir a lista de materiais (LM) da OP</strong><br>Para cada pedido que entrar na carteira, acessar a lista completa de itens — incluindo todos os códigos 80 necessários para a montagem.</div></li>
              <li><div><strong>Verificar o estoque disponível</strong><br>Para cada item da lista, conferir manualmente (ou no ERP) a quantidade em estoque. Se o ERP for fraco, manter uma planilha de controle de estoque de itens comerciais atualizada semanalmente.</div></li>
              <li><div><strong>Calcular a necessidade líquida</strong><br>Necessidade = quantidade da LM menos o que está em estoque. Se o resultado for positivo, precisa comprar. Se for zero ou negativo, está coberto.</div></li>
              <li><div><strong>Verificar o prazo de entrega do fornecedor</strong><br>Para cada item que precisa comprar, verificar o lead time do fornecedor. Exemplo: item com lead time de 10 dias úteis precisa ser pedido 10 dias antes da data prevista de montagem.</div></li>
              <li><div><strong>Gerar a solicitação de compra</strong><br>Emitir a solicitação com: código do item, quantidade, data de entrega necessária e OP de referência. Entregar ao comprador ou registrar no sistema.</div></li>
              <li><div><strong>Acompanhar o pedido de compra até o recebimento</strong><br>Verificar na reunião semanal se os itens críticos foram recebidos. Alertar montagem se houver risco de atraso.</div></li>
            </ul>
          </div>
          <div class="alert-box">
            <h4>Quando fazer esta análise</h4>
            <p>Assim que o pedido for confirmado pelo cliente — não na véspera da montagem. O atraso na análise de comprados é uma das causas mais comuns de parada de linha.</p>
          </div>
          <div class="card" style="margin-bottom:.75rem">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><h3>Responsável</h3><span class="who who-y">Yuri</span></div>
            <p>Yuri realiza a análise de comprados assim que a OP é gerada por Daiane. Casos críticos (lead time longo ou itens indisponíveis) são sinalizados imediatamente para Daiane.</p>
          </div>
          <div class="divider"></div>
          <div class="comp-header comp-fach2" style="margin-top:.75rem">
            <h3>Fach 2 — Matéria-prima (chapas, tubos, barras e perfis)</h3>
            <p>Materiais brutos usados no corte, dobra e usinagem. A análise é feita antes de iniciar a programação da semana, garantindo que a fábrica não pare por falta de material.</p>
          </div>
          <div class="card">
            <p class="section-label" style="margin-bottom:.5rem">Como analisar — passo a passo</p>
            <ul class="step-list teal">
              <li><div><strong>Receber a lista de peças da semana (séries 300 e 20)</strong><br>Com base na programação semanal, levantar todos os roteiros de fabricação que entrarão em produção. Identificar quais materiais brutos cada peça consome (tipo, espessura, bitola, dimensão).</div></li>
              <li><div><strong>Consolidar o consumo total de matéria-prima</strong><br>Somar o total de cada material necessário para a semana. Exemplo: "preciso de 12 chapas 3mm, 4 barras redondas 50mm e 6 metros de tubo 2". Planilha simples — uma linha por material.</div></li>
              <li><div><strong>Verificar o estoque físico de MP</strong><br>Conferir o estoque real no almoxarifado — peso, comprimento ou quantidade, conforme o material. Se o ERP não for confiável, a conferência física semanal é obrigatória.</div></li>
              <li><div><strong>Calcular a necessidade de reposição</strong><br>Necessidade = consumo da semana menos estoque disponível. Considerar também o estoque mínimo de segurança (ex: sempre manter 2 chapas de cada tipo mais consumido como reserva).</div></li>
              <li><div><strong>Gerar a solicitação de compra de MP</strong><br>Emitir com: tipo e especificação do material, quantidade, unidade (kg, metro, unidade), data de entrega necessária e referência das OPs que dependem desse material.</div></li>
              <li><div><strong>Acompanhar o recebimento antes do início da produção</strong><br>Se o material não chegar no prazo, Carmen deve replanejar a sequência de produção da semana e comunicar a Daiane para ajustar prioridades de montagem.</div></li>
            </ul>
          </div>
          <div class="alert-box">
            <h4>Frequência e momento ideal</h4>
            <p>A análise de MP deve ser feita toda <strong>sexta-feira à tarde</strong> para a semana seguinte — ou seja, antes de a programação ser travada na segunda. Assim há tempo hábil para acionar o fornecedor caso falte material.</p>
          </div>
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><h3>Responsável</h3><span class="who who-c">Carmen</span></div>
            <p>Carmen realiza a análise toda sexta-feira. A solicitação de compra gerada é encaminhada para o comprador (ou Daiane, conforme o fluxo atual). Qualquer risco de falta na semana seguinte é comunicado na reunião de fechamento — que acontece também na sexta.</p>
          </div>
        </div>
      `
    },
    {t:'Treinar Yuri no cálculo de necessidade líquida: quantidade da LM menos estoque disponível',w:'y'},
    {t:'Fach 2: implantar análise de matéria-prima toda sexta-feira à tarde',w:'c'},
    {t:'Configurar planilha Google Sheets de controle de compras (uma para cada fábrica)',w:'eq'},
    {t:'Definir regra: item com risco de atraso vai direto para Daiane no mesmo dia',w:'d'},
  ]},
  {id:4,name:'Programação congelada', tasks:[
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
            <div class="routine-row"><span class="freq freq-s">Semanal</span><div class="routine-text"><strong>Programação da Fach 2 — segunda até 10h</strong><span>Carmen define sequência de corte, dobra e usinagem para cada pedido da semana.</span></div><span class="who who-c">Carmen</span></div>
            <div class="routine-row"><span class="freq freq-s">Semanal</span><div class="routine-text"><strong>Programação da Fach 1 — segunda até 10h</strong><span>Yuri define sequência de montagem conforme peças disponíveis e a vir da Fach 2.</span></div><span class="who who-y">Yuri</span></div>
            <div class="routine-row"><span class="freq freq-d">Diária</span><div class="routine-text"><strong>Confirmação da sequência do dia</strong><span>Carmen confirma com os setores a ordem do dia e registra qualquer desvio.</span></div><span class="who who-c">Carmen</span></div>
            <div class="routine-row"><span class="freq freq-d">Diária</span><div class="routine-text"><strong>Liberação de peças Fach 2 → Fach 1</strong><span>Carmen registra quando um lote de peças é liberado para a Fach 1 (grupo WhatsApp ou planilha).</span></div><span class="who who-c">Carmen</span></div>
            <div class="routine-row"><span class="freq freq-s">Semanal</span><div class="routine-text"><strong>Reunião de fechamento — sexta</strong><span>20 minutos. O que foi concluído, o que ficou em aberto e os motivos. Daiane conduz.</span></div><span class="who who-d">Daiane</span></div>
          </div>
          <p class="section-label" style="margin-top:.25rem">Apontamento simplificado</p>
          <div class="card">
            <h3>O que registrar — só o essencial</h3>
            <p style="margin-bottom:12px; font-size:13px; color:var(--text-2);">O apontamento não precisa ser complexo. Objetivo neste momento: saber o que foi produzido e dar baixa no material. Nada mais.</p>
            <div style="display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;gap:10px;align-items:center;padding:8px;background:var(--surface-2);border-radius:var(--radius-sm)">
                <span style="font-size:16px;min-width:24px;text-align:center;font-weight:bold;">1</span>
                <div><p style="font-size:13px;font-weight:600;color:var(--text);margin:0">Item entrou em produção</p><p style="font-size:12px;color:var(--text-2);margin:0">Número da OP + data de início</p></div>
              </div>
              <div style="display:flex;gap:10px;align-items:center;padding:8px;background:var(--surface-2);border-radius:var(--radius-sm)">
                <span style="font-size:16px;min-width:24px;text-align:center;font-weight:bold;">2</span>
                <div><p style="font-size:13px;font-weight:600;color:var(--text);margin:0">Item foi concluído</p><p style="font-size:12px;color:var(--text-2);margin:0">OP + data de conclusão + quantidade produzida</p></div>
              </div>
              <div style="display:flex;gap:10px;align-items:center;padding:8px;background:var(--surface-2);border-radius:var(--radius-sm)">
                <span style="font-size:16px;min-width:24px;text-align:center;font-weight:bold;">3</span>
                <div><p style="font-size:13px;font-weight:600;color:var(--text);margin:0">Material baixado</p><p style="font-size:12px;color:var(--text-2);margin:0">Confirmar saída do material do estoque</p></div>
              </div>
            </div>
            <p style="font-size:12px;color:var(--text-3);margin-top:12px;padding-top:12px;border-top:0.5px solid var(--border)">Ferramenta sugerida: Google Forms no celular. O operador preenche em menos de 1 minuto. Alimenta uma planilha automaticamente.</p>
          </div>
        </div>
      `
    },
    {t:'Configurar planilha de programação semanal da Fach 2 no Google Sheets — Carmen',w:'c'},
    {t:'Configurar planilha de programação semanal da Fach 1 no Google Sheets — Yuri',w:'y'},
    {t:'Realizar primeiro ciclo de programação sem alterações não autorizadas',w:'eq'},
    {t:'Auditar na visita seguinte: quantas OPs saíram da sequência programada e por quê',w:'d'},
  ]},
  {id:5,name:'Apontamento simplificado', tasks:[
    {t:'Criar formulário Google Forms no celular: entrada em produção + conclusão + baixa de material',w:'eq'},
    {t:'Treinar equipe: apenas 3 campos — OP, status (entrada/conclusão), quantidade',w:'eq'},
    {t:'Realizar primeiro ciclo completo de apontamentos nas duas fábricas',w:'eq'},
    {t:'Validar consistência: o que foi apontado bate com o que foi produzido e liberado',w:'c'},
  ]},
  {id:6,name:'Kanban 220 — Fach 1', tasks:[
    {t:'Levantar os conjuntos 220 (séries 420, 520, 500) que entrarão no kanban',w:'c'},
    {t:'Carmen define cartões, pontos de reposição e quantidades sem envolvimento de Yuri',w:'c'},
    {t:'Montar o quadro físico do kanban 220 na Fach 1',w:'c'},
    {t:'Treinar Yuri para acionar os cartões corretamente: apenas retirar e entregar para Carmen',w:'y'},
    {t:'Realizar primeiro ciclo do kanban 220 em operação com Carmen gerenciando',w:'c'},
  ]},
  {id:7,name:'Indicadores e autonomia', tasks:[
    { t:'5 indicadores configurados e preenchidos pela equipe sem apoio externo', w:'eq',
      details: `
        <div class="section" id="s7">
          <p class="section-label">Indicadores</p>
          <div class="card" style="margin-bottom:1rem">
            <h3>Princípio</h3>
            <p style="font-size:13px; color:var(--text-2); margin-top:4px;">Todos os indicadores são calculados em planilha simples. O dado bruto é coletado durante as rotinas já existentes. Nenhum indicador exige mais de 10 minutos para ser calculado.</p>
          </div>
          <div class="kpi-card">
            <div class="kpi-header">
              <div><div class="kpi-title">Pontualidade de entrega ao cliente</div><div class="kpi-sub">% de pedidos concluídos no prazo acordado</div></div>
              <div class="kpi-tags"><span class="pill-ctrl">Controle</span><span class="who who-d" style="margin-left:4px">Daiane</span></div>
            </div>
            <div class="kpi-body">
              <div class="kpi-formula"><strong>Cálculo:</strong> Pedidos concluídos no prazo ÷ Total de pedidos concluídos no período × 100<br><strong>Exemplo:</strong> 7 de 10 pedidos concluídos no prazo = 70% · <strong>Meta inicial:</strong> acima de 80%</div>
              <div class="kpi-row"><span class="kpi-label">Coleta</span><span class="kpi-val">Reunião de fechamento semanal: quais pedidos foram encerrados e se ficaram dentro do prazo.</span></div>
              <div class="kpi-row"><span class="kpi-label">Frequência</span><span class="kpi-val">Mensal — consolidado ao final de cada mês (não semanal, pois não há entrega toda semana)</span></div>
            </div>
            <div class="meta-strip"><span>Ferramenta: <strong>Planilha de pedidos</strong></span><span>Dado de entrada: <strong>data de conclusão vs data prometida</strong></span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-header">
              <div><div class="kpi-title">Aderência à programação</div><div class="kpi-sub">% de OPs executadas na semana em que foram programadas</div></div>
              <div class="kpi-tags"><span class="pill-prog">Programação</span><span class="who who-c" style="margin-left:4px">Carmen</span></div>
            </div>
            <div class="kpi-body">
              <div class="kpi-formula"><strong>Cálculo:</strong> OPs executadas no prazo ÷ OPs programadas para a semana × 100<br><strong>Exemplo:</strong> 8 de 10 OPs feitas na semana certa = 80% · <strong>Meta inicial:</strong> acima de 75%</div>
              <div class="kpi-row"><span class="kpi-label">Coleta</span><span class="kpi-val">Carmen compara o que foi programado na segunda com o que foi realmente executado até sexta.</span></div>
              <div class="kpi-row"><span class="kpi-label">Frequência</span><span class="kpi-val">Semanal — calculado toda sexta no fechamento</span></div>
            </div>
            <div class="meta-strip"><span>Ferramenta: <strong>Planilha de programação</strong></span><span>Dado de entrada: <strong>programado vs realizado</strong></span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-header">
              <div><div class="kpi-title">Cobertura de matéria-prima</div><div class="kpi-sub">Quantas semanas o estoque atual cobre</div></div>
              <div class="kpi-tags"><span class="pill-plan">Planejamento</span><span class="who who-c" style="margin-left:4px">Carmen</span></div>
            </div>
            <div class="kpi-body">
              <div class="kpi-formula"><strong>Cálculo:</strong> Estoque atual (kg ou unidades) ÷ Consumo médio semanal<br><strong>Exemplo:</strong> 240 kg em estoque ÷ 80 kg/semana = 3 semanas de cobertura · <strong>Meta mínima:</strong> acima de 1,5 semana</div>
              <div class="kpi-row"><span class="kpi-label">Coleta</span><span class="kpi-val">Levantamento físico toda sexta, durante a análise de MP (já é uma rotina existente).</span></div>
              <div class="kpi-row"><span class="kpi-label">Frequência</span><span class="kpi-val">Semanal</span></div>
            </div>
            <div class="meta-strip"><span>Ferramenta: <strong>Planilha de análise de MP</strong></span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-header">
              <div><div class="kpi-title">Pedidos com compra em atraso</div><div class="kpi-sub">Quantidade de OPs aguardando item comprado não recebido</div></div>
              <div class="kpi-tags"><span class="pill-plan">Planejamento</span><span class="who who-y" style="margin-left:4px">Yuri</span></div>
            </div>
            <div class="kpi-body">
              <div class="kpi-formula"><strong>Cálculo:</strong> Número de OPs paradas por falta de item comprado<br><strong>Meta:</strong> zero — qualquer número acima de zero exige ação imediata e comunicação a Daiane</div>
              <div class="kpi-row"><span class="kpi-label">Coleta</span><span class="kpi-val">Yuri verifica semanalmente as solicitações abertas com data vencida na planilha de compras.</span></div>
              <div class="kpi-row"><span class="kpi-label">Frequência</span><span class="kpi-val">Semanal — apresentado na reunião de sexta</span></div>
            </div>
            <div class="meta-strip"><span>Ferramenta: <strong>Planilha de controle de compras</strong></span></div>
          </div>
          <div class="kpi-card">
            <div class="kpi-header">
              <div><div class="kpi-title">Volume de OPs encerradas</div><div class="kpi-sub">Tendência de produtividade geral da fábrica</div></div>
              <div class="kpi-tags"><span class="pill-ctrl">Controle</span><span class="who who-d" style="margin-left:4px">Daiane</span></div>
            </div>
            <div class="kpi-body">
              <div class="kpi-formula"><strong>Cálculo:</strong> Contagem de OPs encerradas na semana (Fach 1 e Fach 2 separadas)<br><strong>Acompanhar:</strong> tendência — queda de uma semana para outra pede investigação de causa</div>
              <div class="kpi-row"><span class="kpi-label">Coleta</span><span class="kpi-val">Yuri e Carmen apontam diariamente. Daiane consolida na sexta.</span></div>
              <div class="kpi-row"><span class="kpi-label">Frequência</span><span class="kpi-val">Semanal — consolidado por Daiane</span></div>
            </div>
            <div class="meta-strip"><span>Ferramenta: <strong>Planilha consolidada semanal</strong></span><span>Dado de entrada: <strong>apontamento diário de OPs</strong></span></div>
          </div>
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

// ==========================================================================
// 2. ESTADO GLOBAL MÚTAVEL (SUPABASE)
// ==========================================================================
let state = {
  chk: {}, 
  photos: {},
  flowPhotos: {}, 
  exp: {},
  resp: {
    c: ["Programação semanal e diária da Fach 2", "Gestão do quadro de kanban", "Análise semanal de matéria-prima"],
    d: ["Gestão da carteira de pedidos", "Reunião de fechamento semanal", "Emissão de OPs"],
    y: ["Análise de itens comprados", "Geração de solicitação de compra", "Programação semanal de montagem"]
  }
};

const profiles = {
  c: { name: 'Carmen', role: 'Analista PCP · Fach 2', badge: 'PCP Fach 2', av: 'av-c', bdg: 'badge-purple', init: 'CA' },
  d: { name: 'Daiane', role: 'Líder PCP · Fach 1', badge: 'PCP Fach 1', av: 'av-d', bdg: 'badge-blue', init: 'DA' },
  y: { name: 'Yuri', role: 'Analista PCP · Fach 1', badge: 'PCP Fach 1', av: 'av-y', bdg: 'badge-coral', init: 'YU' }
};

// ==========================================================================
// 3. INTEGRAÇÃO SUPABASE E LÓGICA DE DADOS
// ==========================================================================
const supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

async function initData() {
  S.forEach(s => {
    if(!state.exp[s.id]) state.exp[s.id] = false;
    if(!state.chk[s.id]) state.chk[s.id] = {};
    if(!state.photos[s.id]) state.photos[s.id] = {};
    s.tasks.forEach((_, i) => { if(state.chk[s.id][i] === undefined) state.chk[s.id][i] = false; });
  });

  const savedResp = localStorage.getItem('satiro_resp_state');
  if (savedResp) { try { state.resp = JSON.parse(savedResp); } catch(e) { } }

  try {
      const { data, error } = await supabaseClient.from('progresso_pcp').select('*');
      if (error) throw error;
      
      if (data) {
          data.forEach(item => {
              // Verifica se é uma foto do fluxo de pedido
              if(item.task_key.startsWith('flow_step_')) {
                  const stepIndex = parseInt(item.task_key.split('_')[2]);
                  state.flowPhotos[stepIndex] = item.photo_url;
              } 
              // Senão é uma tarefa normal
              else if (item.stage_id !== null && item.task_index !== null) {
                  state.chk[item.stage_id][item.task_index] = item.is_done;
                  if(item.photo_url) state.photos[item.stage_id][item.task_index] = item.photo_url;
              }
          });
      }
      document.getElementById('sync-status').textContent = "🟢 Nuvem Ativa";
  } catch (err) {
      console.error(err);
      document.getElementById('sync-status').textContent = "🔴 Erro";
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

  await supabaseClient.from('progresso_pcp').upsert({ 
      task_key: `${sid}_${tid}`, 
      is_done: newState,
      stage_id: sid,
      task_index: tid
  }, { onConflict: 'task_key' });
}

// Upload de fotos para TAREFAS
async function handleUpload(sid, tid, event) {
  const file = event.target.files[0];
  if (!file) return;
  document.getElementById('sync-status').textContent = "⏳ Enviando...";

  const fileName = `foto_${sid}_${tid}_${Date.now()}.jpg`;
  const { data, error } = await supabaseClient.storage.from('fotos').upload(fileName, file);

  if (error) { alert("Erro: " + error.message); return; }

  const photoUrl = `${CONFIG.SUPABASE_URL}/storage/v1/object/public/fotos/${data.path}`;
  state.photos[sid][tid] = photoUrl;

  await supabaseClient.from('progresso_pcp').upsert({ 
      task_key: `${sid}_${tid}`, 
      photo_url: photoUrl,
      stage_id: sid,
      task_index: tid
  }, { onConflict: 'task_key' });

  document.getElementById('sync-status').textContent = "🟢 Nuvem Ativa";
  render(); 
}

// NOVO: Upload de fotos exclusivo para os FLUXOS DO PEDIDO
async function handleFlowUpload(stepIndex, event) {
  const file = event.target.files[0];
  if (!file) return;
  document.getElementById('sync-status').textContent = "⏳ Enviando foto do fluxo...";

  const fileName = `flow_step_${stepIndex}_${Date.now()}.jpg`;
  const { data, error } = await supabaseClient.storage.from('fotos').upload(fileName, file);

  if (error) { alert("Erro: " + error.message); return; }

  const photoUrl = `${CONFIG.SUPABASE_URL}/storage/v1/object/public/fotos/${data.path}`;
  state.flowPhotos[stepIndex] = photoUrl;

  await supabaseClient.from('progresso_pcp').upsert({ 
      task_key: `flow_step_${stepIndex}`, 
      photo_url: photoUrl
  }, { onConflict: 'task_key' });

  document.getElementById('sync-status').textContent = "🟢 Nuvem Ativa";
  render(); // Atualiza a tela para mostrar o link da foto do fluxo
}

// Funções de fallback local para Responsabilidades
function exportState() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ resp: state.resp }));
  const dlAnchorElem = document.createElement('a'); dlAnchorElem.setAttribute("href", dataStr); dlAnchorElem.setAttribute("download", "pcp_backup.json"); dlAnchorElem.click();
}
function importState(e) {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const parsed = JSON.parse(evt.target.result);
      if(parsed.resp) { state.resp = parsed.resp; localStorage.setItem('satiro_resp_state', JSON.stringify(state.resp)); }
      render(); alert('Dados importados com sucesso!');
    } catch(err) { alert('Erro ao importar arquivo JSON inválido.'); }
  };
  reader.readAsText(file);
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
  if (tabId === 'treinamento') titleEl.innerHTML = 'TREINAMENTO<br>PCP';
  else if (tabId === 'pendencias') { titleEl.innerHTML = 'CONTROLE DE<br>PENDÊNCIAS'; renderPendencias(document.getElementById('filter-who').value); }
  else titleEl.innerHTML = 'TRILHA DE<br>IMPLANTAÇÃO';
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

function totalDone() { let c=0; S.forEach(s => Object.values(state.chk[s.id]).forEach(v => {if(v)c++;})); return c; }
function stageDone(sid) { return Object.values(state.chk[sid]).filter(Boolean).length; }

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
    if(card) { card.classList.toggle('s-done', isDone); card.classList.toggle('in-progress', sd > 0 && !isDone); }
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

function renderPendencias(filter) {
  const container = document.getElementById('pending-list-container');
  if(!container) return;
  let html = '', count = 0;

  S.forEach(stage => {
    stage.tasks.forEach((task, i) => {
      const isDone = state.chk[stage.id][i];
      if (!isDone && (filter === 'all' || filter === task.w)) {
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
    });
  });
  if (count === 0) html = `<div class="empty-state">🎉 Nenhuma pendência encontrada para este filtro. Tudo em dia!</div>`;
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
function drag(ev, role, index) { ev.dataTransfer.setData("srcRole", role); ev.dataTransfer.setData("srcIndex", index); }
function drop(ev, targetRole) {
  ev.preventDefault();
  const srcRole = ev.dataTransfer.getData("srcRole"), srcIndex = parseInt(ev.dataTransfer.getData("srcIndex"));
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
      
      // Nova lógica: se details for uma função (como o Fluxo do Pedido), executa. Senão, usa a string.
      let detailsContent = '';
      if (isDynamic) detailsContent = `<div id="dynamic-responsabilidades"></div>`;
      else if (typeof task.details === 'function') detailsContent = task.details();
      else if (task.details) detailsContent = task.details;

      const hasDetails = !!detailsContent;
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
        <div class="s-info"><span class="s-name">${s.name}</span></div>
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

initData();
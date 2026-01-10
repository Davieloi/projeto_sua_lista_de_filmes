// 1. Seleção de Elementos Globais
const form = document.getElementById('formFilme');
const ul = document.getElementById('listaFilmes');


form.addEventListener("submit", fazer_submit);
document.getElementById('btnImportar').addEventListener('click', importar_os_coisas);
document.getElementById('btnExportar').addEventListener('click', exportar_do_formulario);


// --- FUNÇÃO 1: ADICIONAR AO VISUAL (SUBMIT) ---
function fazer_submit(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const nota = document.getElementById('nota').value;
    const lancamento = document.getElementById('lancamento').value;
    const descricao = document.getElementById('descricao').value;

    if (nome === "" || genero === "") {
        alert("Preencha Nome e Gênero para adicionar à lista!");
        return;
    }

    const li = document.createElement('li');
    li.className = "card-filme";
    li.innerHTML = `
        <strong>🎬 ${nome}</strong>
        <p><span class="label">🎭 Gênero:</span> ${genero}</p>
        <p><span class="label">⭐ Nota:</span> ${nota}/5</p>
        <p><span class="label">📅 Lançamento:</span> ${lancamento}</p>
        <div class="caixa-do-filme">${descricao}</div>
        <div class="acoes-filme">
            <button class="btn-apagar" onclick="remover_card(this)">Apagar</button>
        </div>
    `;

    ul.appendChild(li);
    form.reset(); 
}


// --- FUNÇÃO 2: REMOVER CARD DA TELA ---
function remover_card(botao) {
    const card = botao.closest('li');
    card.remove();
}


// --- FUNÇÃO 3: IMPORTAR CSV PARA O FORMULÁRIO ---
function importar_os_coisas() {
    const input = document.getElementById('arquivoCSV');

    if (input.files.length === 0) {
        alert("Por favor, selecione um arquivo .csv primeiro!");
        return;
    }

    const arquivo = input.files[0];
    const leitor = new FileReader();

    leitor.onload = function(evento) {
        const conteudo = evento.target.result;
        const dados = conteudo.split(";"); 

        if (dados.length >= 5) {
            document.getElementById('nome').value = dados[0].trim();
            document.getElementById('genero').value = dados[1].trim();
            document.getElementById('nota').value = dados[2].trim();
            document.getElementById('lancamento').value = dados[3].trim();
            document.getElementById('descricao').value = dados[4].trim();
            alert("Dados carregados no formulário!");
        } else {
            alert("Arquivo com formato incorreto.");
        }
    };

    leitor.readAsText(arquivo);
}


// --- FUNÇÃO 4: EXPORTAR COM MENSAGEM DE DOWNLOAD ---
function exportar_do_formulario() {
    const nome = document.getElementById('nome').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const nota = document.getElementById('nota').value;
    const lancamento = document.getElementById('lancamento').value;
    const descricao = document.getElementById('descricao').value.trim();

    if (nome === "" || genero === "") {
        alert("Erro: Nome e Gênero são obrigatórios para exportar!");
        return;
    }

    // Criando o conteúdo
    const cabecalho = "Nome;Gênero;Nota;Lançamento;Descrição\n";
    const linha = `${nome.replace(/;/g, ',')};${genero.replace(/;/g, ',')};${nota};${lancamento};${descricao.replace(/;/g, ',')}`;
    
    const blob = new Blob([cabecalho + linha], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;

    const nomeArquivoLimpo = nome.toLowerCase().replace(/\s+/g, '_') + ".csv";
    link.download = nomeArquivoLimpo;
    
    // --- ADICIONANDO A MENSAGEM ---
    // Avisa o usuário que o processo começou
    alert("Preparando arquivo: " + nomeArquivoLimpo + "\nO download começará em instantes!");

    link.click();

    // Feedback visual opcional no console para conferência
    console.log("Download iniciado: " + nomeArquivoLimpo);

    URL.revokeObjectURL(url);
}
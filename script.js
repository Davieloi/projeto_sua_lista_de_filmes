const form = document.getElementById('formFilme');
const ul = document.getElementById('listaFilmes');

// 1. ADICIONAR FILME
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const filme = {
        nome: document.getElementById('nome').value,
        genero: document.getElementById('genero').value,
        nota: document.getElementById('nota').value,
        lancamento: document.getElementById('lancamento').value,
        descricao: document.getElementById('descricao').value
    };

    criarCard(filme);
    form.reset();
});

// 2. CRIAR CARD NA TELA
function criarCard(filme) {
    const li = document.createElement('li');
    li.className = 'card-filme';
    
    // Guardar dados para o botão editar
    li.dataset.nome = filme.nome;
    li.dataset.genero = filme.genero;
    li.dataset.nota = filme.nota;
    li.dataset.lancamento = filme.lancamento;
    li.dataset.descricao = filme.descricao;

    li.innerHTML = `
        <strong>🎬 ${filme.nome}</strong>
        <p>🎭 Gênero: ${filme.genero} |   ⭐ Nota: ${filme.nota}/5</p>
        <p>📅 Lançamento: ${filme.lancamento}</p>
        <p style="font-style: italic; color: #aaa;">${filme.descricao}</p>
        <div class="acoes-filme">
            <button class="btn-editar" onclick="editarFilme(this)">Editar</button>
            <button class="btn-apagar" onclick="this.parentElement.parentElement.remove()">Apagar</button>
        </div>
    `;
    ul.appendChild(li);
}

// 3. EDITAR FILME
function editarFilme(botao) {
    const li = botao.closest('li');
    
    document.getElementById('nome').value = li.dataset.nome;
    document.getElementById('genero').value = li.dataset.genero;
    document.getElementById('nota').value = li.dataset.nota;
    document.getElementById('lancamento').value = li.dataset.lancamento;
    document.getElementById('descricao').value = li.dataset.descricao;

    li.remove();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. IMPORTAR CSV
document.getElementById('btnImportar').addEventListener('click', function() {
    const input = document.getElementById('arquivoCSV');
    if (input.files.length === 0) return alert("Selecione um arquivo!");

    const leitor = new FileReader();
    leitor.onload = function(e) {
        const dados = e.target.result.split(";");
        if (dados.length >= 5) {
            document.getElementById('nome').value = dados[0].trim();
            document.getElementById('genero').value = dados[1].trim();
            document.getElementById('nota').value = dados[2].trim();
            document.getElementById('lancamento').value = dados[3].trim();
            document.getElementById('descricao').value = dados[4].trim();
        }
    };
    leitor.readAsText(input.files[0]);
});

// 5. EXPORTAR FORMULÁRIO
document.getElementById('btnExportar').addEventListener('click', function() {
    const nome = document.getElementById('nome').value;
    const genero = document.getElementById('genero').value;
    
    if (!nome || !genero) return alert("Preencha Nome e Gênero!");

    const dados = `${nome};${genero};${document.getElementById('nota').value};${document.getElementById('lancamento').value};${document.getElementById('descricao').value}`;
    const blob = new Blob([dados], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `${nome.toLowerCase().replace(/ /g, "_")}.csv`;
    alert("Iniciando download de: " + link.download);
    link.click();
});
// ================================
// REFERÊNCIAS
// ================================
const form = document.getElementById('formFilme');
const ul = document.getElementById('listaFilmes');
const btnImportar = document.getElementById('btnImportar');
const btnExportar = document.getElementById('btnExportar');
const inputCSV = document.getElementById('arquivoCSV');

// ================================
// 1. ADICIONAR FILME
// ================================
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const filme = {
        nome: document.getElementById('nome').value.trim(),
        genero: document.getElementById('genero').value.trim(),
        nota: document.getElementById('nota').value,
        lancamento: document.getElementById('lancamento').value,
        descricao: document.getElementById('descricao').value.trim()
    };

    criarCard(filme);
    form.reset();
});

// ================================
// 2. CRIAR CARD
// ================================
function criarCard(filme) {
    const li = document.createElement('li');
    li.classList.add('card-filme'); // ✅ corrigido

    // Dados para edição
    li.dataset.nome = filme.nome;
    li.dataset.genero = filme.genero;
    li.dataset.nota = filme.nota;
    li.dataset.lancamento = filme.lancamento;
    li.dataset.descricao = filme.descricao;

    const titulo = document.createElement('strong');
    titulo.textContent = `🎬 ${filme.nome}`;

    const info = document.createElement('p');
    info.textContent = `🎭 Gênero: ${filme.genero} | ⭐ Nota: ${filme.nota}/5`;

    const data = document.createElement('p');
    data.textContent = `📅 Lançamento: ${filme.lancamento || 'Não informado'}`;

    const descricao = document.createElement('p');
    descricao.textContent = filme.descricao || 'Sem descrição';
    descricao.style.fontStyle = 'italic';
    descricao.style.color = '#aaa';

    const acoes = document.createElement('div');
    acoes.classList.add('acoes-filme');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.classList.add('btn-editar');
    btnEditar.addEventListener('click', () => editarFilme(li));

    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar';
    btnApagar.classList.add('btn-apagar');
    btnApagar.addEventListener('click', () => apagarFilme(li));

    acoes.append(btnEditar, btnApagar);
    li.append(titulo, info, data, descricao, acoes);
    ul.appendChild(li);
}

// ================================
// 3. EDITAR FILME
// ================================
function editarFilme(li) {
    document.getElementById('nome').value = li.dataset.nome;
    document.getElementById('genero').value = li.dataset.genero;
    document.getElementById('nota').value = li.dataset.nota;
    document.getElementById('lancamento').value = li.dataset.lancamento;
    document.getElementById('descricao').value = li.dataset.descricao;

    li.remove();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ================================
// 4. APAGAR FILME
// ================================
function apagarFilme(li) {
    if (confirm('Deseja realmente apagar este filme?')) {
        li.remove();
    }
}

// ================================
// 5. IMPORTAR CSV
// ================================
btnImportar.addEventListener('click', function () {
    if (!inputCSV.files.length) {
        alert('Selecione um arquivo!');
        return;
    }

    const leitor = new FileReader();
    leitor.onload = function (e) {
        const dados = e.target.result.split(';');

        if (dados.length < 5) {
            alert('Arquivo CSV inválido!');
            return;
        }

        document.getElementById('nome').value = dados[0].trim();
        document.getElementById('genero').value = dados[1].trim();
        document.getElementById('nota').value = dados[2].trim();
        document.getElementById('lancamento').value = dados[3].trim();
        document.getElementById('descricao').value = dados[4].trim();
    };

    leitor.readAsText(inputCSV.files[0]); // ✅ corrigido
});

// ================================
// 6. EXPORTAR CSV
// ================================
btnExportar.addEventListener('click', function () {
    const nome = document.getElementById('nome').value.trim();
    const genero = document.getElementById('genero').value.trim();

    if (!nome || !genero) {
        alert('Preencha Nome e Gênero!');
        return;
    }

    const dados = [
        nome,
        genero,
        document.getElementById('nota').value,
        document.getElementById('lancamento').value,
        document.getElementById('descricao').value
    ].join(';');

    const blob = new Blob([dados], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${nome.toLowerCase().replace(/\s+/g, '_')}.csv`;

    link.click();
    URL.revokeObjectURL(url); // ✅ boa prática
});

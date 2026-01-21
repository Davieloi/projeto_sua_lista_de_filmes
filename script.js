// referências
const form = document.getElementById('formFilme');
const ul = document.getElementById('listaFilmes');
const btnImportar = document.getElementById('btnImportar');
const btnExportar = document.getElementById('btnExportar');
const inputCSV = document.getElementById('arquivoCSV');

//Array dos filmes
let filmes = [];
let indice_edicao = null;

// Adicionar filmes
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const filme = {
        nome: document.getElementById('nome').value.trim(),
        genero: document.getElementById('genero').value.trim(),
        nota: document.getElementById('nota').value,
        lancamento: document.getElementById('lancamento').value,
        descricao: document.getElementById('descricao').value.trim()
    };

    if (indice_edicao === null) {
        filmes.push(filme);
    } else {
        filmes[indice_edicao] = filme;
        indice_edicao = null;
    }

    renderizarLista();
    form.reset();
});


// Renderização
function renderizarLista() {
    ul.innerHTML = '';

    filmes.forEach((filme, index) => {
        const li = document.createElement('li');
        li.classList.add('card-filme');

        li.innerHTML = `
            <strong>&#x1F3AC ${filme.nome}</strong>
            <p>&#x1F3AD Gênero: ${filme.genero}  |  &#x2B50 Nota: ${filme.nota}/5</p>
            <p>&#x1F4C5 Lançamento: ${filme.lancamento || 'Não informado'}</p>
            <p style="font-style: italic; color: #aaa;">
                ${filme.descricao || 'Sem descrição'}
            </p>
            <div class="acoes-filme">
                <button class="btn-editar">Editar</button>
                <button class="btn-apagar">Apagar</button>
            </div>
        `;

        li.querySelector('.btn-editar').addEventListener('click', () => editarFilme(index));
        li.querySelector('.btn-apagar').addEventListener('click', () => apagarFilme(index));

        ul.appendChild(li);
    });
}

// editar filme
function editarFilme(index) {
    const filme = filmes[index];

    document.getElementById('nome').value = filme.nome;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('nota').value = filme.nota;
    document.getElementById('lancamento').value = filme.lancamento;
    document.getElementById('descricao').value = filme.descricao;

    indice_edicao = index;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// apagar filme
function apagarFilme(index) {
    if (confirm('Deseja realmente apagar este filme?')) {
        filmes.splice(index, 1);
        renderizarLista();
    }
}

// IMPORTAR CSV
btnImportar.addEventListener('click', function () {
    if (!inputCSV.files.length) {
        alert('Selecione um arquivo!');
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (e) {
        const filmesImportados = csvParaArray(e.target.result);

        if (filmesImportados.length === 0) {
            alert('Arquivo CSV inválido!');
            return;
        }

        filmes = filmes.concat(filmesImportados);
        renderizarLista();
    };

    leitor.readAsText(inputCSV.files[0]);
});

function csvParaArray(csvTexto) {
    const linhas = csvTexto.trim().split('\n');
    const resultado = [];

    linhas.forEach(linha => {
        const dados = linha.split(';');

        if (dados.length >= 5) {
            resultado.push({
                nome: dados[0].trim(),
                genero: dados[1].trim(),
                nota: dados[2].trim(),
                lancamento: dados[3].trim(),
                descricao: dados[4].trim()
            });
        }
    });

    return resultado;
}



// 6. EXPORTAR CSV
btnExportar.addEventListener('click', function () {
    if (filmes.length === 0) {
        alert('Não há filmes para exportar!');
        return;
    }

    const csv = filmes.map(filme =>
        `${filme.nome};${filme.genero};${filme.nota};${filme.lancamento};${filme.descricao}`
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'filmes.csv';
    link.click();

    URL.revokeObjectURL(url);
});

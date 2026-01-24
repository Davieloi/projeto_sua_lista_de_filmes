//  Array
let lista_de_filmes = [];

// Referência
const form = document.getElementById('formFilme');
const ul_filmes = document.getElementById('listaFilmes');

form.addEventListener('submit', adicionar_filme);

function adicionar_filme(evento) {
    evento.preventDefault();
    // Objeto
    const novoFilme = {
        nome: document.getElementById('nome').value,
        genero: document.getElementById('genero').value,
        nota: document.getElementById('nota').value,
        lancamento: document.getElementById('lancamento').value,
        descricao: document.getElementById('descricao').value
    }

    lista_de_filmes.push(novoFilme);
    rendenrizar_tela();
    form.reset();
}

function rendenrizar_tela() {
    ul_filmes.innerHTML = '';

    lista_de_filmes.forEach((filme, index) => {

        const li = document.createElement('li');

        li.classList.add('card-filme');

        li.innerHTML = `
      <strong>&#x1F3AC ${filme.nome}</strong>
      <p>&#x1F3AD Gênero: ${filme.genero}  |  &#x2B50 Nota: ${filme.nota}/5</p>
      <p>&#x1F4C5 Lançamento: ${filme.lancamento || 'Não informado'}</p>
      <div class="caixa-do-filme">
          <p style="font-style: italic; color: #aaa;">
              ${filme.descricao || 'Sem descrição'}
          </p>
      </div>
      <div class="acoes-filme">
          <button class="btn-editar" onclick="editarFilme(${index})">Editar</button>
          <button class="btn-apagar" onclick="removerFilme(${index})">Apagar</button>
      </div>
    `;

        ul_filmes.appendChild(li);
    });
}

function removerFilme(index) {

    lista_de_filmes.splice(index, 1);

    rendenrizar_tela();
};

function editarFilme(index) {
    const filme = lista_de_filmes[index];

    document.getElementById('nome').value = filme.nome;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('nota').value = filme.nota;
    document.getElementById('lancamento').value = filme.lancamento;
    document.getElementById('descricao').value = filme.descricao;

    removerFilme(index);
}

const exportar = document.getElementById('btnExportar');

exportar.addEventListener('click', exportar_csv);

function exportar_csv() {

    if (lista_de_filmes.length === 0) {
        alert("A lista está vazia!");
        return;
    }

    let csv_content = "Nome;Gênero;Nota;Ano;Descrição\n";

    lista_de_filmes.forEach(filme => {
        const linha = `${filme.nome};${filme.genero};${filme.nota};${filme.lancamento};${filme.descricao}`;
        csv_content += linha + "\n";
    });

    const blob = new Blob([csv_content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", "meus_filmes.csv");
    link.click();
}

const importar = document.getElementById('btnImportar');

importar.addEventListener('click', importar_csv);

function importar_csv() {
    const arquivo = document.getElementById('arquivoCSV').files[0];
    if (!arquivo) {
        alert("Selecione um arquivo primeiro!");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = processar_csv;
    leitor.readAsText(arquivo);
}

function processar_csv(e) {
    const conteudo = e.target.result;
    const linhas = conteudo.split("\n");

    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].trim() === "") continue;

        const colunas = linhas[i].split(";");

        const filmeCarregado = {
            nome: colunas[0],
            genero: colunas[1],
            nota: colunas[2],
            lancamento: colunas[3],
            descricao: colunas[4]
        };

        lista_de_filmes.push(filmeCarregado);
    }
    rendenrizar_tela();
    alert("Filmes importados com sucesso!");
}




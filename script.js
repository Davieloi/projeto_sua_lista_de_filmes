const form = document.getElementById('formFilme');
const ul = document.getElementById('listaFilmes');

form.addEventListener("submit", fazer_submit);

function fazer_submit(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const genero = document.getElementById('genero').value;
    const nota = document.getElementById('nota').value;
    const lancamento = document.getElementById('lancamento').value;
    const descricao = document.getElementById('descricao').value;

    const li = document.createElement('li');

    li.innerHTML = `
        <strong>&#x1F3AC ${nome}</strong>
        <p><span class="label">&#x1F3AD Gênero:</span> ${genero}</p>
        <p><span class="label">&#x2B50 Nota:</span> ${nota}/5</p>
        <p><span class="label">&#x1F4C5 Lançamento:</span> ${lancamento}</p>
        <div class="caixa-do-filme">${descricao}</div>
        <div class="acoes-filme">
            <button class="btn-editar">Editar</button>
            <button class="btn-apagar">Apagar</button>
        </div>
    `;
    ul.appendChild(li);
    form.reset();
};

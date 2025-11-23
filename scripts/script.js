let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("input.campo-busca");
let botaoBusca = document.querySelector(".btn-busca"); // 1. Adiciona o seletor para o botão
let dados = [];

async function carregarDados() {
    let resposta = await fetch("scripts/data.json");
    dados = await resposta.json();
    // Inicialmente, não renderizamos nada até que uma busca seja feita ou podemos renderizar todos.
    // Para este caso, vamos deixar em branco e esperar a busca.
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa a área de cards antes de adicionar novos

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("article-details");
        article.innerHTML = `
        <p class="movie-year">${dado.ano} ${dado.premiadoEm}</p>
                <h1 class="movie-name">${dado.nome}</h1>
                <h3 class="text-info">Sinopse</h3>
                <p class="movie-about">${dado.sinopse}</p>
                <div class="rating-box">
                    <h4><span class="fa-solid fa-star star-icon"></span>IMDb Rating: ${dado.rating}</h4>
                    <a href="${dado.link}" class="imdb-link" target="_blank">View on IMDb</a>
                </div>
        `
        cardContainer.appendChild(article); // 3. Adiciona o card criado à página
    }
}

function buscarPorAno() {
    const anoBuscado = campoBusca.value;

    // Filtra o array 'dados' para encontrar filmes cujo ano corresponda ao ano buscado.
    const resultado = dados.filter(filme => filme.ano.toString() === anoBuscado);

    if (resultado.length > 0) {
        renderizarCards(resultado); // Se encontrou, renderiza o card do filme.
    } else {
        // Se não encontrou, exibe uma mensagem.
        cardContainer.innerHTML = `<p class="search-feedback">Nenhum filme encontrado para o ano de ${anoBuscado}. Tente outro ano.</p>`;
    }
}

// Carrega os dados dos filmes assim que o script é executado.
carregarDados();

// Adiciona o evento de clique ao botão para chamar a função de busca.
botaoBusca.addEventListener("click", buscarPorAno);
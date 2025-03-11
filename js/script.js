const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results-container');
const artistContainer = document.getElementById('artist-container');

// Função que faz a requisição para a API com o termo de pesquisa
function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then(response => response.json())
        .then(result => displayResults(result))
        .catch(error => console.error('Erro ao buscar artistas:', error));
}

// Função para exibir os resultados da pesquisa
function displayResults(result) {
    // Limpa os resultados antigos
    artistContainer.innerHTML = '';

    // Se não houver resultados, mostra a mensagem de 'Nenhum artista encontrado'
    if (result.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.innerText = 'Nenhum artista encontrado.';
        artistContainer.appendChild(noResultsMessage);
        searchResultsContainer.classList.remove('hidden');
        return;
    }

    // Exibe os resultados dos artistas
    result.forEach(element => {
        const artistDiv = document.createElement('div');
        artistDiv.classList.add('artist-card');

        const artistName = document.createElement('h3');
        artistName.innerText = element.name;

        const artistImage = document.createElement('img');
        artistImage.src = element.urlImg;
        artistImage.alt = `Imagem de ${element.name}`;

        artistDiv.appendChild(artistImage);
        artistDiv.appendChild(artistName);
        artistContainer.appendChild(artistDiv);
    });

    // Exibe o contêiner de resultados
    searchResultsContainer.classList.remove('hidden');
}

// Evento de 'input' no campo de pesquisa
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Se o campo de pesquisa estiver vazio, esconde os resultados
    if (searchTerm === '') {
        searchResultsContainer.classList.add('hidden');
        return;
    }

    // Faz a requisição para a API com o termo de pesquisa
    requestApi(searchTerm);
});

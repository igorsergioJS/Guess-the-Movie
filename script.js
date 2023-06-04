$(document).ready(function () {
    $.getJSON("https://raw.githubusercontent.com/igorsergioJS/Guess-the-Movie/main/data.json", function (data) {

        var randomIndex = Math.floor(Math.random() * data.items.length);
        var movie = data.items[randomIndex];
        var poster = movie.image || ""; // Verifica se a propriedade 'image' existe
        var title = movie.title;
        var flippedCount = 0;
        movieGlobalName = title;
        console.log(title);
        $("#poster").attr("src", poster);

        $(".grid-square").click(function () {
            $(this).fadeOut(500);
            flippedCount++;
            updateCounter(flippedCount); //Chama a função que atualiza o contador da tela
        });

        $("#title").text(title);
    }).fail(function () {
        console.log("Ocorreu um erro ao carregar o arquivo JSON.");
    });
});

// Carregar o JSON dos filmes
var movies = []; // Array para armazenar os filmes

fetch('https://raw.githubusercontent.com/igorsergioJS/Guess-the-Movie/main/data.json')
    .then(response => response.json())
    .then(data => {
        movies = data.items; // Armazenar os filmes no array
    })
    .catch(error => console.error('Ocorreu um erro ao carregar o JSON:', error));

// Mostrar as sugestões de pesquisa
function showSuggestions() {
    var input = document.getElementById('guess-input').value.toLowerCase();
    var suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = ''; // Limpar a lista de sugestões

    if (input.length > 0) {
        // Filtrar os filmes com base no input
        var filteredMovies = movies.filter(function (movie) {
            return movie.title.toLowerCase().startsWith(input);
        });

        // Exibir as sugestões de filmes
        filteredMovies.forEach(function (movie) {
            var listItem = document.createElement('li');
            listItem.textContent = movie.title;
            listItem.addEventListener('click', function () {
                document.getElementById('guess-input').value = movie.title;
                suggestionsList.innerHTML = ''; // Limpar a lista de sugestões
            });
            suggestionsList.appendChild(listItem);
        });
    }
}

// Verificar o palpite do usuário
function checkGuess() {
    var input = document.getElementById('guess-input').value;
    var filmName = movieGlobalName;
    var resultContainer = document.getElementById('result-container');
  
    if (input.toLowerCase() === filmName.toLowerCase()) {
      resultContainer.textContent = "Parabéns! Você acertou o nome do filme!";
      resultContainer.classList.remove('error');
      resultContainer.classList.add('success');
    } else {
      resultContainer.textContent = "Ops! Tente novamente.";
      resultContainer.classList.remove('success');
      resultContainer.classList.add('error');
    }
  }


function updateCounter(flippedCount) {
    var counterElement = document.getElementById("counter");
    counterElement.textContent = "Espaços revelados: " + flippedCount.toString();
  }
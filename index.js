// Sélectionner les éléments du DOM
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Gérer l'événement de soumission du formulaire
searchForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire

  const searchTerm = searchInput.value;
  
  // Vérifier si un terme de recherche a été saisi
  if (searchTerm.trim() !== '') {
    // Effectuer des actions en fonction de la requête de recherche (par exemple, afficher les résultats)
    displaySearchResults(searchTerm);
  }
});

// Fonction pour afficher les résultats de recherche (exemple)
function displaySearchResults(searchTerm) {
  // Effacer les résultats précédents
  searchResults.innerHTML = '';

  // Effectuer des actions pour obtenir les résultats de recherche
  // par exemple, envoyer une requête AJAX à une API de recherche
  
  // Exemple de code pour afficher les résultats
  const resultItem = document.createElement('div');
  resultItem.textContent = `Résultats de recherche pour : ${searchTerm}`;
  searchResults.appendChild(resultItem);
}


//Effectuez des requêtes AJAX :
// Fonction pour effectuer une requête AJAX à une API de recherche
function searchAPI(searchTerm) {
  const apiKey = 'VOTRE_CLE_API';
  const apiUrl = `https://api.example.com/search?q=${encodeURIComponent(searchTerm)}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Traiter les résultats renvoyés par l'API
      const results = data.results;
      displaySearchResults(results);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la requête API :', error);
    });
}

// Fonction pour afficher les résultats de recherche
function displaySearchResults(results) {
  // Effacer les résultats précédents
  searchResults.innerHTML = '';

  // Parcourir les résultats et créer des éléments HTML pour les afficher
  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.snippet}</p>
      <a href="${result.url}" target="_blank">Voir plus</a>
    `;
    searchResults.appendChild(resultItem);
  });
}

// Modifier la fonction de soumission du formulaire pour appeler la recherche API
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const searchTerm = searchInput.value;

  if (searchTerm.trim() !== '') {
    searchAPI(searchTerm);
  }
});

//Mettez en œuvre la fonctionnalité de pagination
// Variables globales pour la pagination
const resultsPerPage = 10; // Nombre de résultats par page
let currentPage = 1; // Page actuelle

// Fonction pour afficher les résultats de recherche paginés
function displayPaginatedResults(results) {
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  // Effacer les résultats précédents
  searchResults.innerHTML = '';

  // Parcourir les résultats paginés et les afficher
  paginatedResults.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.innerHTML = `
      <h3>${result.title}</h3>
      <p>${result.snippet}</p>
      <a href="${result.url}" target="_blank">Voir plus</a>
    `;
    searchResults.appendChild(resultItem);
  });

  // Afficher les boutons de pagination
  displayPaginationButtons(results.length);
}

// Fonction pour afficher les boutons de pagination
function displayPaginationButtons(totalResults) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const paginationContainer = document.createElement('div');

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('page-button');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }

    pageButton.addEventListener('click', function() {
      currentPage = i;
      displayPaginatedResults(results);
      highlightActivePageButton();
    });

    paginationContainer.appendChild(pageButton);
  }

  searchResults.appendChild(paginationContainer);
}

// Fonction pour mettre en évidence le bouton de page active
function highlightActivePageButton() {
  const pageButtons = document.querySelectorAll('.page-button');

  pageButtons.forEach(button => {
    button.classList.remove('active');
    if (Number(button.textContent) === currentPage) {
      button.classList.add('active');
    }
  });
}

// Modifier la fonction de recherche pour gérer la pagination
function performSearch(searchTerm) {
  const apiKey = 'VOTRE_CLE_API';
  const apiUrl = `https://api.example.com/search?q=${encodeURIComponent(searchTerm)}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      displayPaginatedResults(results);
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la requête API :', error);
    });
}

// Modifier la fonction de soumission du formulaire pour appeler la recherche paginée
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const searchTerm = searchInput.value;

  if (searchTerm.trim() !== '') {
    currentPage = 1; // Réinitialiser la page actuelle à la recherche initiale
    performSearch(searchTerm);
  }
});

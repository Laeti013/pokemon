// Déclare une fonction asynchrone pour rechercher les informations d'un Pokémon spécifique par son nom.
async function fetchPokemon() {
    // Récupère la valeur saisie par l'utilisateur dans l'élément input ayant l'id "pokemonName".
    const pokemonName = document.getElementById("pokemonName").value;
    // Construit l'URL pour l'API Pokémon en utilisant le nom du Pokémon, converti en minuscules pour éviter les problèmes de casse.
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
  
    try {
      // Attend la réponse de la requête fetch à l'URL construite.
      const response = await fetch(url);
  
      // Vérifie si la réponse n'est pas ok (par exemple, statut HTTP 404 ou 500).
      if (!response.ok) {
        // Affiche une erreur dans la console si la requête a échoué.
        console.error("Failed to fetch Pokémon:", response.status);
        // Met à jour l'élément HTML ayant l'id "pokemonDisplay" pour indiquer une erreur.
        document.getElementById(
          "pokemonDisplay"
        ).innerHTML = `Pokémon non trouvé ou erreur de requête.`;
        return; // Sort de la fonction si une erreur est rencontrée.
      }
  
      // Convertit la réponse en JSON si la réponse est ok.
      const reponseJSon = await response.json();
      // Affiche les données du Pokémon dans la console pour le débogage.
      console.log(reponseJSon);
  
      // Appelle la fonction displayPokemon pour afficher les informations du Pokémon.
      displayPokemon(reponseJSon);
    } catch (error) {
      // Capture et affiche les erreurs survenues pendant la requête fetch ou le traitement des données.
      console.error("Erreur lors de la récupération des données:", error);
    }
  }
  
  // Fonction pour afficher les informations d'un Pokémon spécifique.
  function displayPokemon(pokemon) {
    // Sélectionne l'élément HTML destiné à afficher les informations du Pokémon.
    const displayArea = document.getElementById("pokemonDisplay");
    // Met à jour l'HTML de cet élément pour inclure le nom du Pokémon et son image.
    displayArea.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="Image de ${pokemon.name}">
    `;
  }
  
  // Déclare une fonction asynchrone pour récupérer une liste de Pokémon.
  async function fetchAllPokemons() {
    // URL de l'API pour récupérer une liste limitée de Pokémon (ici, limitée à 50).
    const url = `https://pokeapi.co/api/v2/pokemon?limit=50`;
  
    try {
      // Attend la réponse de la requête fetch à l'URL construite.
      const response = await fetch(url);
      // Convertit la réponse en JSON.
      const data = await response.json();
  
      // Sélectionne l'élément HTML destiné à afficher la liste de tous les Pokémon.
      const allPokemonsContainer = document.getElementById("allPokemonsDisplay");
      // Vide cet élément avant d'ajouter de nouveaux Pokémon.
      allPokemonsContainer.innerHTML = "";
  
      // Parcourt la liste des Pokémon obtenus.
      for (const pokemon of data.results) {
        // Pour chaque Pokémon, effectue une nouvelle requête fetch pour obtenir des détails supplémentaires.
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.json();
  
        // Crée un nouvel élément div pour chaque Pokémon et y inclut son nom et son image.
        const pokemonElement = document.createElement("div");
        pokemonElement.classList.add("pokemonCard");
        pokemonElement.innerHTML = `
                <h3>${pokemonDetails.name}</h3>
                <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">
            `;
        // Ajoute cet élément au conteneur de tous les Pokémon.
        allPokemonsContainer.appendChild(pokemonElement);
      }
    } catch (error) {
      // Capture et affiche les erreurs survenues pendant les requêtes fetch ou le traitement des données.
      console.error("Erreur lors du chargement de tous les Pokémon:", error);
    }
  }
  
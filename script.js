const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 200) + 1; // There are 898 Pokémon in the PokéAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = await response.json();
    return pokemon;
  };
  
  const getPokemonPoints = (pokemon) => {
    const stats = pokemon.stats;
    let points = 0;
    stats.forEach(stat => {
      points += stat.base_stat;
    });
    return points;
  };
  
  const getThreeRandomPokemon = async () => {
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(getRandomPokemon());
    }
    return await Promise.all(promises);
  };
  
  const displayPokemon = (playerElement, pokemonList, pointsElement, pokemon) => {
    playerElement.innerHTML = '';
    let totalPoints = 0;
  
    pokemon.forEach(p => {
      const pokemonDiv = document.createElement('div');
      pokemonDiv.className = 'pokemon';
      pokemonDiv.innerHTML = `
        <img src="${p.sprites.front_default}" alt="${p.name}">
        <p>${p.name}</p>
      `;
      playerElement.appendChild(pokemonDiv);
      totalPoints += getPokemonPoints(p);
    });
  
    pointsElement.textContent = `Total Points: ${totalPoints}`;
    return totalPoints;
  };
  
  const startGame = async () => {
    const player1Pokemon = await getThreeRandomPokemon();
    const player2Pokemon = await getThreeRandomPokemon();
  
    const player1Element = document.getElementById('player1-pokemon');
    const player1PointsElement = document.getElementById('player1-points');
    const player2Element = document.getElementById('player2-pokemon');
    const player2PointsElement = document.getElementById('player2-points');
  
    const player1Points = displayPokemon(player1Element, player1Pokemon, player1PointsElement, player1Pokemon);
    const player2Points = displayPokemon(player2Element, player2Pokemon, player2PointsElement, player2Pokemon);
  
    const resultElement = document.getElementById('result');
    // resultElement.classList = '.winner';
    if (player1Points > player2Points) {
      resultElement.textContent = 'Player 1 wins!';
    } else if (player2Points > player1Points) {
      resultElement.textContent = 'Player 2 wins!';
    } else {
      resultElement.textContent = 'It\'s a tie!';
      resultElement.classList.remove = '.winner';
    }
  };
  
  document.getElementById('start-game').addEventListener('click', startGame);
  

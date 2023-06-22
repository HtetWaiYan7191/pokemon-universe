import './style.css';
import getAllPokemons from './modules/getAllPokemons.js';

const pokemonsNumbers = 10;
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const reactionBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const pokemonCardsContainer = document.querySelector('.pokemon-cards-container');
let pokemons = [];
let gameId;

// const getData = (id) => {
//   const appId = id;
//   return appId;
// };

const getAppData = async () => {
  if (gameId) {
    console.log(`this is gameID ${gameId}`);
    return gameId;
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  };
  const result = await fetch(`${reactionBaseUrl}/apps/`, requestOptions);
  // const contentType = result.headers.get('content-type');
  const dataText = await result.text();

  const data = dataText;
  gameId = data;
  return data;
};

const getReaction = async () => {
  const appId = gameId;
  console.log(appId);
  const url = `${reactionBaseUrl}/apps/${appId}/likes`;
  const result = await fetch(`${url}`);
  // const contentType = result.headers.get('content-type');
  const reactionNumbers = result.text();
  return reactionNumbers;
};

const addReaction = async (reactionBtn) => {
  reactionBtn.addEventListener('click', async (e) => {
    const id = await getAppData();
    const appId = id;
    console.log(`${appId} addreactionID`);
    const item = { item_id: `${e.target.id}` };
    const url = `${reactionBaseUrl}/apps/${appId}/likes`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(item),
    };

    const result = await fetch(`${url}`, requestOptions);
    // const contentType = result.headers.get('content-type');
    const reactionNumbersStr = await getReaction();
    const reactionNumbers = JSON.parse(reactionNumbersStr);
    console.log(reactionNumbers[0].likes)
  });
};

function createPokemonCard(pokemon) {
  pokemonCardsContainer.innerHTML += `
    <div class="col-3">
            <figure class="image-container text-center">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="pokemon-image" alt="${pokemon.name}">
            </figure>
            <div class="caption d-flex justify-content-around">
                <figcaption>
                    ${pokemon.name}
                </figcaption>
                <div class="reaction">
                    <i class="fa-regular fa-heart" id="${pokemon.id}"></i>
                    <span class="reaction-count">48</span>
                </div>
            </div>
            <div class="button-container">
                <button class="m-2 w-100">Comments</button>
            </div>
            <div class="button-container">
                <button class="m-2 w-100">Reservations</button>
            </div>   
        </div>
    `;

  const reactionBtns = document.querySelectorAll('.fa-heart');
  reactionBtns.forEach((reactionBtn) => addReaction(reactionBtn));
  // const reactionCount = document.querySelectorAll('reaction-count');
}

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumbers; i += 1) {
    pokemons = await getAllPokemons(i, pokemons, baseUrl);
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

fetchPokemons();

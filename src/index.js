import './style.css';
import getAllPokemons from './modules/getAllPokemons.js';
const pokemons_numbers = 10;
const base_url = "https://pokeapi.co/api/v2/pokemon";
const pokemon_cards_container = document.querySelector('.pokemon-cards-container')
let pokemons = [];

const fetchPokemons = async () => {
    for(let i=1;i <= pokemons_numbers; i++) {
        pokemons = await getAllPokemons(i,pokemons,base_url);
    }
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
}

const createPokemonCard = (pokemon) => {
    pokemon_cards_container.innerHTML += `
    <div class="col-3">
            <figure class="image-container text-center">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="pokemon-image" alt="${pokemon.name}">
            </figure>
            <div class="caption d-flex justify-content-around">
                <figcaption>
                    ${pokemon.name}
                </figcaption>
                <div class="reaction">
                    <i class="fa-regular fa-heart"></i>
                    <span>48</span>
                </div>
            </div>
            <div class="button-container">
                <button class="m-2 w-100">Comments</button>
            </div>
            <div class="button-container">
                <button class="m-2 w-100">Reservations</button>
            </div>   
        </div>
    `
}

fetchPokemons();

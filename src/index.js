import './style.css';
import getAllPokemons from './modules/getAllPokemons.js';
import { create, get } from 'lodash';
const pokemons_numbers = 10;
const base_url = "https://pokeapi.co/api/v2/pokemon";
const reaction_base_url = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi";
const pokemon_cards_container = document.querySelector('.pokemon-cards-container')
let pokemons = [];

const getAppData = async () => {
    const requestOptions = {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=UTF-8',
        },
      };
        const result = await fetch(`${reaction_base_url}/apps/`, requestOptions);
        const contentType = result.headers.get('content-type');
        const data_text = await result.text();
        let data;
          data = data_text;
         return data;
};

const getData = async () => {
    const appId = await getAppData();
    return appId;
}


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

    const reaction_btns = document.querySelectorAll('.fa-heart');
    reaction_btns.forEach((reaction_btn) => addReaction(reaction_btn, getData));
    const reaction_count = document.querySelectorAll('reaction-count');

}

const addReaction = async (reaction_btn, id) => {
    reaction_btn.addEventListener('click', async (e) => {
        const appId = await id();
        const item = {'item_id': `${e.target.id}`}
        const url = `${reaction_base_url}/apps/${appId}/likes`;
        const requestOptions = {
            method: 'POST',
            headers: {
              'content-type': 'application/json; charset=UTF-8',
            },
            body : JSON.stringify(item)
          };

          const result = await fetch(`${url}`,requestOptions);
          const contentType = result.headers.get('content-type');
          const resolve = await result.text();
          console.log(resolve)
    })
   
}

const getReaction = async () => {

}
fetchPokemons();

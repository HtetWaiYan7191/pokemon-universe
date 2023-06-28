/*  eslint-disable no-await-in-loop */
/*  eslint-disable no-unused-vars */

import './style.css';
import getAllPokemons from './modules/getAllPokemons.js';
import createComments from './modules/createComments';
import closePopUp from './modules/closePopUp';
import sendCommentsToApi from './modules/sendCommentsToApi';
import getCommentsFromApi from './modules/getCommentsFromApi';
import createReservations from './modules/createReservations';
import sendReservesToApi from './modules/sendReservesToApi';
import getReservesFromApi from './modules/getReservesFromApi';
import addReaction from './modules/addReaction';
import addScrollAnimation from './modules/addScrollAnimation';
import { popUpBox, gameId } from './modules/getAppData';
import getReaction from './modules/getReaction';
import showReaction from './modules/showReaction';

const pokemonsNumbers = 12;
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const pokemonCardsContainer = document.querySelector('.pokemon-cards-container');
// const commentStore = await getCommentsFromApi();
const reserveStore = [];
// popUpBox.classList.add('hidePopUp');
let pokemons = [];

const heartAnimation = (reactionBtn) => {
  reactionBtn.addEventListener('mouseover', (e) => {
    e.target.classList.add('fa-shake');
    e.target.classList.add('regular-red');
  });

  reactionBtn.addEventListener('mouseout', (e) => {
    e.target.classList.remove('regular-red');
    e.target.classList.remove('fa-shake');
  });
};

const createCommentBox = async (commentBtn, pokemons) => {
  commentBtn.addEventListener('click', async (e) => {
    const id = e.target.id - 1;
    popUpBox.classList.add('hidePopUp');
    popUpBox.innerHTML = `
    <div class="icon-container text-end">
    <i class="fa-solid fa-xmark close-comment-btn"></i>
</div>
<figure class="popup-img-container text-center">
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons[id].id}.png" alt ="${pokemons[id].name}" class="pop-up-image">
</figure>
<h3 class="text-center pop-up-title">${pokemons[id].name}</h3>
<div class="row row-cols-2 mx-auto text-container my-4">
    <div class="col text-center">Main Ability</div>
    <div class="col text-center">${pokemons[id].abilities[0].ability.name}</div>
    <div class="col text-center">Base Experience</div>
    <div class="col text-center">${pokemons[id].base_experience}</div>
</div>
<h3 class="comment-title text-center my-3">Comments <span id="comment-count">0</span></h3>
<ul class="comments-container text-center">
   
</ul>
<h3 class="text-center">Add a Comment</h3>
<div class="form-container d-flex flex-column w-50 mx-auto">
    <input type="text" name="user-name" placeholder="Your Name" id="user-name">
    <textarea name="user-comment" id="user-comment" cols="15" rows="5" placeholder="Your Comments"></textarea>
    <button class="comment-button my-2 px-3" id="comment-btn">Comment</button>
</div>
    `;
    const overLay = document.createElement('div');
    overLay.classList.add('overlay');
    popUpBox.insertAdjacentElement('afterend', overLay);
    const commentContainer = document.querySelector('.comments-container');

    let commentStore = await getCommentsFromApi(pokemons[e.target.id - 1].id);
    createComments(commentContainer, commentStore);

    const closeCommentBtn = document.querySelector('.close-comment-btn');
    closePopUp(closeCommentBtn, overLay);

    const submitComment = document.getElementById('comment-btn');
    submitComment.addEventListener('click', async () => {
      const userNameInput = document.getElementById('user-name');
      const userCommentInput = document.getElementById('user-comment');
      const userName = userNameInput.value.trim();
      const userComment = userCommentInput.value.trim();
      const result = await sendCommentsToApi(userName, userComment, e.target.id);
      userNameInput.value = '';
      userCommentInput.value = '';
      commentContainer.innerHTML = '';
      const comments = await getCommentsFromApi(pokemons[id].id);
      commentStore = [...comments];
      createComments(commentContainer, commentStore);
    });
  });
};

const createReserveBox = async (reserveBtn, pokemons, reserveStore) => {
  reserveBtn.addEventListener('click', async (e) => {
    const id = e.target.id - 1;
    popUpBox.classList.add('hidePopUp');
    popUpBox.innerHTML = `
    <div class="icon-container text-end">
    <i class="fa-solid fa-xmark close-reserve-btn"></i>
</div>
<figure class="popup-img-container text-center">
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons[id].id}.png" alt ='${pokemons[id].name}' class="pop-up-image">
</figure>
<h3 class="text-center pop-up-title">${pokemons[id].name}</h3>
<div class="row row-cols-2 mx-auto text-container">
    <div class="col text-center">Main Ability</div>
    <div class="col text-center">${pokemons[id].abilities[0].ability.name}</div>
    <div class="col text-center">Base Experience</div>
    <div class="col text-center">${pokemons[id].base_experience}</div>
</div>
<h3 class="comment-title text-center my-3">Reservations <span id="reserve-count">0</span></h3>
<ul class="reserve-container text-center">
   
</ul>
<h3 class="text-center">Add a Reservation</h3>
<div class="form-container d-flex flex-column w-50 mx-auto">
    <input type="text" name="user-name" placeholder="Your Name" id="user-name">
    <input type="date" name="start-date" placeholder="Start Date" id="start-date">
    <input type="date" name="end-date" placeholder="End Date" id="end-date">
    <button class="reserve-button my-3" id="reserve-btn">Reserve</button>
</div>
    `;
    const overLay = document.createElement('div');
    overLay.classList.add('overlay');
    popUpBox.insertAdjacentElement('afterend', overLay);
    const reserveContainer = document.querySelector('.reserve-container');

    createReservations(reserveContainer, reserveStore);

    const closeReserveBtn = document.querySelector('.close-reserve-btn');
    closePopUp(closeReserveBtn, overLay);

    const reserveBtn = document.getElementById('reserve-btn');
    reserveBtn.addEventListener('click', async () => {
      const userNameInput = document.getElementById('user-name');
      const startDateInput = document.getElementById('start-date');
      const endDateInput = document.getElementById('end-date');
      const userName = userNameInput.value.trim();
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;
      const result = await sendReservesToApi(userName, startDate, endDate, e.target.id);
      userNameInput.value = '';
      startDateInput.value = '';
      endDateInput.value = '';
      reserveContainer.innerHTML = '';
      const reserves = await getReservesFromApi(pokemons[id].id);
      reserveStore = [...reserves];
      createReservations(reserveContainer, reserveStore);
    });
  });
};

async function createPokemonCard(pokemons) {
  pokemons.forEach((pokemon) => {
    pokemonCardsContainer.innerHTML += `
    <div class="col-3 pokemon-card">
            <figure class="image-container text-center">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="pokemon-image" alt="${pokemon.name}">
            </figure>
            <div class="caption d-flex justify-content-around align-items-center">
                <figcaption>
                    ${pokemon.name}
                </figcaption>
                <div class="reaction">
                    <i class="fa-regular fa-heart" id="${pokemon.id}"></i>
                    <span class="reaction-count" id="${pokemon.id}"></span>
                </div>
            </div>
            <div class="button-container text-center">
                <button class="m-2 w-50  comment-btn" id=${pokemon.id}>Comments</button>
            </div>
            <div class="button-container text-center">
                <button class="m-2 w-50  reserve-btn" id=${pokemon.id}>Reservations</button>
            </div>   
        </div>
    `;
  });
  const reactionNumbersStr = await getReaction();
  const reactionNumbers = JSON.parse(reactionNumbersStr);
  const reactionCounts = document.querySelectorAll('.reaction-count');
  showReaction(reactionNumbers, reactionCounts);

  const reactionBtns = document.querySelectorAll('.fa-heart');
  reactionBtns.forEach((reactionBtn) => addReaction(reactionBtn, reactionCounts));
  reactionBtns.forEach((reactionBtn) => heartAnimation(reactionBtn));

  const commentBtns = document.querySelectorAll('.comment-btn');
  commentBtns.forEach((commentBtn) => createCommentBox(commentBtn, pokemons));

  const reserveBtns = document.querySelectorAll('.reserve-btn');
  reserveBtns.forEach((reserveBtn) => createReserveBox(reserveBtn, pokemons, reserveStore));
}

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumbers; i += 1) {
    pokemons = await getAllPokemons(i, pokemons, baseUrl);
  }
  createPokemonCard(pokemons);
  // pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

await fetchPokemons();

const pokemonCards = document.querySelectorAll('.pokemon-card');
pokemonCards.forEach((pokemonCard) => pokemonCard.classList.add('leftToRightCard'));

window.addEventListener('scroll', addScrollAnimation);

/*  eslint-disable no-await-in-loop */
/*  eslint-disable no-unused-vars */

import './style.css';
import getAllPokemons from './modules/getAllPokemons.js';

const pokemonsNumbers = 12;
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const reactionBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const pokemonCardsContainer = document.querySelector('.pokemon-cards-container');
const popUpBox = document.querySelector('.pop-up-box');
const commentStore = [];
const reserveStore = [];
popUpBox.classList.add('hidePopUp');
let pokemons = [];
let gameId;

const getAppData = async () => {
  if (gameId) {
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
  const url = `${reactionBaseUrl}/apps/${appId}/likes`;
  const result = await fetch(`${url}`);
  // const contentType = result.headers.get('content-type');
  const reactionNumbers = await result.text();
  return reactionNumbers;
};

const addReaction = async (reactionBtn) => {
  reactionBtn.addEventListener('click', async (e) => {
    const id = await getAppData();
    const appId = id;
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
    const reactionNumbersStr = await getReaction();
    const reactionNumbers = JSON.parse(reactionNumbersStr);
    const currentId = e.target.id - 1;
    e.target.nextElementSibling.textContent = `${reactionNumbers[currentId].likes}`;
  });
};
const closePopUp = (closeCommentBtn, overLay) => {
  closeCommentBtn.addEventListener('click', () => {
    popUpBox.classList.add('hidePopUp');
    overLay.classList.add('hidePopUp');
  });
};

const sendCommentsToApi = async (userName, userComment, id) => {
  const appId = await getAppData();
  const userData = {
    item_id: id,
    username: userName,
    comment: userComment,
  };

  const url = `${reactionBaseUrl}/apps/${appId}/comments`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(userData),
  };

  const result = await fetch(`${url}`, requestOptions);
  const data = await result.text();
  return data;
};

const sendReservesToApi = async (userName, startDate, endDate, id) => {
  const appId = await getAppData();
  const reserveData = {
    item_id: id,
    username: userName,
    date_start: startDate,
    date_end: endDate,
  };
  const url = `${reactionBaseUrl}/apps/${appId}/reservations`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(reserveData),
  };

  const result = await fetch(`${url}`, requestOptions);
  const data = await result.text();
  return data;
};

const getCommentsFromApi = async (id) => {
  const appId = await getAppData();
  const url = `${reactionBaseUrl}/apps/${appId}/comments?item_id=${id}`;
  const result = await fetch(`${url}`);
  let comments = await result.text();
  comments = JSON.parse(comments);
  return comments;
};

const getReservesFromApi = async (id) => {
  const appId = await getAppData();
  const url = `${reactionBaseUrl}/apps/${appId}/reservations?item_id=${id}`;
  const result = await fetch(`${url}`);
  const reserves = await result.json();
  return reserves;
};

const createComments = (commentContainer, commentStore) => {
  commentStore.forEach((comment, id) => {
    const listElement = document.createElement('li');
    const commentCount = document.getElementById('comment-count');
    commentCount.textContent = `${commentStore.length}`;
    listElement.textContent = `${comment.creation_date} ${comment.username} ${comment.comment}`;
    commentContainer.appendChild(listElement);
  });
};

const createReservations = (reserveContainer, reserveStore) => {
  reserveStore.forEach((reserve, id) => {
    const listElement = document.createElement('li');
    const reserveCount = document.getElementById('reserve-count');
    reserveCount.textContent = `${reserveStore.length}`;
    listElement.textContent = ` ${reserve.date_start} - ${reserve.date_end} by ${reserve.username}`;
    reserveContainer.appendChild(listElement);
  });
};

const createCommentBox = async (commentBtn, pokemons, commentStore) => {
  commentBtn.addEventListener('click', async (e) => {
    const id = e.target.id - 1;
    popUpBox.classList.remove('hidePopUp');
    popUpBox.innerHTML = `
    <div class="icon-container text-end">
    <i class="fa-solid fa-xmark close-comment-btn"></i>
</div>
<figure class="popup-img-container text-center">
<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons[id].id}.png" alt ="${pokemons[id].name}" class="pop-up-image">
</figure>
<h3 class="text-center pop-up-title">${pokemons[id].name}</h3>
<div class="row row-cols-2 mx-auto text-container">
    <div class="col text-center">Main Ability</div>
    <div class="col text-center">${pokemons[id].abilities[0].ability.name}</div>
    <div class="col text-center">Base Experience</div>
    <div class="col text-center">${pokemons[id].base_experience}</div>
</div>
<h3 class="comment-title text-center">Comments<span id="comment-count">0</span></h3>
<ul class="comments-container text-center">
   
</ul>
<h3 class="text-center">Add a Comment</h3>
<div class="form-container d-flex flex-column w-50 mx-auto">
    <input type="text" name="user-name" placeholder="Your Name" id="user-name">
    <textarea name="user-comment" id="user-comment" cols="15" rows="10" placeholder="Your Comments"></textarea>
    <button class="comment-button" id="comment-btn">Comment</button>
</div>
    `;
    const overLay = document.createElement('div');
    overLay.classList.add('overlay');
    popUpBox.insertAdjacentElement('afterend', overLay);
    const commentContainer = document.querySelector('.comments-container');

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
    popUpBox.classList.remove('hidePopUp');
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
<h3 class="comment-title text-center">Reservations<span id="reserve-count">0</span></h3>
<ul class="reserve-container text-center">
   
</ul>
<h3 class="text-center">Add a Reservation</h3>
<div class="form-container d-flex flex-column w-50 mx-auto">
    <input type="text" name="user-name" placeholder="Your Name" id="user-name">
    <input type="date" name="start-date" placeholder="Start Date" id="start-date">
    <input type="date" name="end-date" placeholder="End Date" id="end-date">
    <button class="reserve-button" id="reserve-btn">Reserve</button>
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

async function createPokemonCard(pokemon) {
  pokemonCardsContainer.innerHTML += `
    <div class="col-3 pokemon-card">
            <figure class="image-container text-center">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" class="pokemon-image" alt="${pokemon.name}">
            </figure>
            <div class="caption d-flex justify-content-around">
                <figcaption>
                    ${pokemon.name}
                </figcaption>
                <div class="reaction">
                    <i class="fa-regular fa-heart" id="${pokemon.id}"></i>
                    <span class="reaction-count"></span>
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

  const reactionBtns = document.querySelectorAll('.fa-heart');
  reactionBtns.forEach((reactionBtn) => addReaction(reactionBtn));

  const commentBtns = document.querySelectorAll('.comment-btn');
  commentBtns.forEach((commentBtn) => createCommentBox(commentBtn, pokemons, commentStore));

  const reserveBtns = document.querySelectorAll('.reserve-btn');
  reserveBtns.forEach((reserveBtn) => createReserveBox(reserveBtn, pokemons, reserveStore));
}

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumbers; i += 1) {
    pokemons = await getAllPokemons(i, pokemons, baseUrl);
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

fetchPokemons();

import './style.css';
import getAllPokemons from './modules/getAllPokemons.js';

const pokemonsNumbers = 10;
const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const reactionBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const pokemonCardsContainer = document.querySelector('.pokemon-cards-container');
const popUpBox = document.querySelector('.pop-up-box');
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
  console.log(reactionNumbers)
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
  closeCommentBtn.addEventListener('click', (e) => {
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
  console.log(data)
};

const getCommentsFromApi = async (id) => {
  const appId = await getAppData();
  const url = `${reactionBaseUrl}/apps/${appId}/comments?item_id=${id}`;
  const result = await fetch(`${url}`);
  let comments = await result.text();
  comments = JSON.parse(comments)
  return comments;
};
const checkComments = async (comments, id) => {
  let count = 0;
  if(count === 0) {
    comments = 'no comment';
    count += 1 ;
    return comments;
  } else {
    comments = await getCommentsFromApi(id);
    console.log('else' + comments)
    return comments;
  }
}
const createCommentBox = async (commentBtn, pokemons) => {
  commentBtn.addEventListener('click', async (e) => {
    const id = e.target.id - 1;
    let comments = await getCommentsFromApi(pokemons[id].id);
    comments = await checkComments(comments, pokemons[id].id);
   console.log(comments)
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
<h3 class="comment-title text-center">Comments <span>count</span></h3>
<ul class="comments-container text-center">
    <li>${comments}</li>
    <li>${comments}</li>
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

    const closeCommentBtn = document.querySelector('.close-comment-btn');
    closePopUp(closeCommentBtn, overLay);

    const submitComment = document.getElementById('comment-btn');
    submitComment.addEventListener('click', async () => {
      const userNameInput = document.getElementById('user-name');
      const userCommentInput = document.getElementById('user-comment');
      const userName = userNameInput.value.trim();
      const userComment = userCommentInput.value.trim();
      sendCommentsToApi(userName, userComment, e.target.id);
      userNameInput.value = '';
      userCommentInput.value = '';
    });
  });
};

async function createPokemonCard(pokemon) {
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
                    <span class="reaction-count"></span>
                </div>
            </div>
            <div class="button-container">
                <button class="m-2 w-100 comment-btn" id=${pokemon.id}>Comments</button>
            </div>
            <div class="button-container">
                <button class="m-2 w-100 reserve-btn">Reservations</button>
            </div>   
        </div>
    `;

  const reactionBtns = document.querySelectorAll('.fa-heart');
  reactionBtns.forEach((reactionBtn) => addReaction(reactionBtn));

  const commentBtns = document.querySelectorAll('.comment-btn');
  commentBtns.forEach((commentBtn) => createCommentBox(commentBtn, pokemons));
  const reserveBtns = document.querySelectorAll('.reserve-btn');

 

}

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonsNumbers; i += 1) {
    pokemons = await getAllPokemons(i, pokemons, baseUrl);
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

fetchPokemons();

import getAppData from "./getAppData";

// variables.js
const reactionBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const popUpBox = document.querySelector('.pop-up-box');
let gameId = await getAppData();

export { reactionBaseUrl, popUpBox, gameId };

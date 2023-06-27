export const reactionBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
export const popUpBox = document.querySelector('.pop-up-box');

export const getAppData = async () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  };
  const result = await fetch(`${reactionBaseUrl}/apps/`, requestOptions);
  const dataText = await result.text();

  const data = dataText;
  return data;
};

export const getGameId = async () => {
  let gameId;
  const storedGameId = localStorage.getItem('gameId');

  if (storedGameId) {
    gameId = storedGameId;
  } else {
    gameId = await getAppData();
    localStorage.setItem('gameId', gameId);
  }

  return gameId;
};

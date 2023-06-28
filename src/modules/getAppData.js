export const reactionBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
export const popUpBox = document.querySelector('.pop-up-box');
export const gameId = 'o0hYzIj7HjtVBGYGIPs7';

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
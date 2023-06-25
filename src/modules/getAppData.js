import { gameId, reactionBaseUrl } from './variables';

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
  const dataText = await result.text();

  const data = dataText;
  gameId = data;
  return data;
};

export default getAppData;
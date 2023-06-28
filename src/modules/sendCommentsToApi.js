import { gameId, reactionBaseUrl } from './getAppData';

const sendCommentsToApi = async (userName, userComment, id) => {
  const appId = gameId;
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

export default sendCommentsToApi;
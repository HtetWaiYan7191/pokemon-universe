import { getGameId, reactionBaseUrl } from './getAppData';

const getCommentsFromApi = async (id) => {
  const appId = await getGameId();
  const url = `${reactionBaseUrl}/apps/${appId}/comments?item_id=${id}`;
  const result = await fetch(`${url}`);
  let comments = await result.text();
  comments = JSON.parse(comments);
  return comments;
};

export default getCommentsFromApi;
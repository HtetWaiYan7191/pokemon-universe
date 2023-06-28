import { gameId, reactionBaseUrl } from './getAppData';

const getCommentsFromApi = async (id) => {
  const appId = gameId;
  const url = `${reactionBaseUrl}/apps/${appId}/comments?item_id=${id}`;
  const result = await fetch(`${url}`);
  let comments = await result.text();
  comments = JSON.parse(comments);
  if (comments.length > 0) {
    return comments;
  }
  comments = [];
  return comments;
};

export default getCommentsFromApi;
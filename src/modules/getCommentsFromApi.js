import getAppData from './getAppData';
import { reactionBaseUrl } from './variables';

const getCommentsFromApi = async (id) => {
  const appId = await getAppData();
  const url = `${reactionBaseUrl}/apps/${appId}/comments?item_id=${id}`;
  const result = await fetch(`${url}`);
  let comments = await result.text();
  comments = JSON.parse(comments);
  return comments;
};

export default getCommentsFromApi;
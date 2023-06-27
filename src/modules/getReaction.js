import { reactionBaseUrl, getGameId } from './getAppData';

const getReaction = async () => {
  const appId = await getGameId();
  const url = `${reactionBaseUrl}/apps/${appId}/likes`;
  const result = await fetch(`${url}`);
  // const contentType = result.headers.get('content-type');
  const reactionNumbers = await result.text();
  return reactionNumbers;
};

export default getReaction;
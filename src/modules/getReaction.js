import { gameId, reactionBaseUrl } from './variables';

const getReaction = async () => {
  const appId = gameId;
  const url = `${reactionBaseUrl}/apps/${appId}/likes`;
  const result = await fetch(`${url}`);
  // const contentType = result.headers.get('content-type');
  const reactionNumbers = await result.text();
  return reactionNumbers;
};

export default getReaction;
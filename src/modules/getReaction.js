import { reactionBaseUrl, gameId } from './getAppData';

const getReaction = async () => {
  const appId = gameId;
  const url = `${reactionBaseUrl}/apps/${appId}/likes`;
  const result = await fetch(`${url}`);
  const reactionNumbers = await result.text();
  return reactionNumbers;
};

export default getReaction;
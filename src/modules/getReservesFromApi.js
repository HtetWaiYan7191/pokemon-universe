import { gameId, reactionBaseUrl } from './getAppData';

const getReservesFromApi = async (id) => {
  const appId = gameId;
  const url = `${reactionBaseUrl}/apps/${appId}/reservations?item_id=${id}`;
  const result = await fetch(`${url}`);
  const reserves = await result.json();
  return reserves;
};

export default getReservesFromApi;
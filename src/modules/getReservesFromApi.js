import { gameId, reactionBaseUrl } from './getAppData';

const getReservesFromApi = async (id) => {
  const appId = gameId;
  const url = `${reactionBaseUrl}/apps/${appId}/reservations?item_id=${id}`;
  const result = await fetch(`${url}`);
  let reserves = await result.json();
  if (reserves.length > 0) {
    return reserves;
  }
  reserves = [];
  return reserves;
};

export default getReservesFromApi;
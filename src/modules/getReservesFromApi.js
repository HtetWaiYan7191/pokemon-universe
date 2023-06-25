import getAppData from './getAppData';
import { reactionBaseUrl } from './variables';

const getReservesFromApi = async (id) => {
  const appId = await getAppData();
  const url = `${reactionBaseUrl}/apps/${appId}/reservations?item_id=${id}`;
  const result = await fetch(`${url}`);
  const reserves = await result.json();
  return reserves;
};

export default getReservesFromApi;
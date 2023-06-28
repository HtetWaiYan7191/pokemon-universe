import { gameId, reactionBaseUrl } from './getAppData';

const sendReservesToApi = async (userName, startDate, endDate, id) => {
  const appId = gameId;
  const reserveData = {
    item_id: id,
    username: userName,
    date_start: startDate,
    date_end: endDate,
  };
  const url = `${reactionBaseUrl}/apps/${appId}/reservations`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(reserveData),
  };

  const result = await fetch(`${url}`, requestOptions);
  const data = await result.text();
  return data;
};

export default sendReservesToApi;
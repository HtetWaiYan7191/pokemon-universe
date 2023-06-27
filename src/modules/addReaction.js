/*  eslint-disable no-unused-vars */
// otherFile.js
import { reactionBaseUrl, getGameId } from './getAppData';
import getReaction from './getReaction';

const addReaction = async (reactionBtn) => {
  reactionBtn.addEventListener('click', async (e) => {
    e.target.classList.remove('fa-shake');
    e.target.classList.add('fa-bounce');
    e.target.classList.remove('fa-regular');
    e.target.classList.add('fa-solid');
    e.target.classList.add('red');
    const id = await getGameId();
    const appId = id;
    console.log(appId);
    const item = { item_id: `${e.target.id}` };
    const url = `${reactionBaseUrl}/apps/${appId}/likes`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(item),
    };

    const result = await fetch(`${url}`, requestOptions);
    const reactionNumbersStr = await getReaction();
    const reactionNumbers = JSON.parse(reactionNumbersStr);
    const currentId = reactionNumbers.length - 1;
    e.target.nextElementSibling.textContent = `${reactionNumbers[currentId].likes}`;
    e.target.classList.remove('fa-bounce');
  });
};

export default addReaction;
/*  eslint-disable no-unused-vars */
// otherFile.js
import { reactionBaseUrl, gameId } from './getAppData';
import getReaction from './getReaction';
import showReaction from './showReaction';

const addReaction = async (reactionBtn, reactionCounts) => {
  reactionBtn.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('fa-solid')) {
      e.target.classList.remove('fa-shake');
      e.target.classList.add('fa-bounce');
      e.target.classList.remove('fa-regular');
      e.target.classList.add('fa-solid');
      e.target.classList.add('red');
      const id = gameId;
      const appId = id;
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
      console.log(reactionNumbers);
      showReaction(reactionNumbers, reactionCounts);
      // const currentId = reactionNumbers.length - 1;
      // console.log(currentId)
      // e.target.nextElementSibling.textContent = `${reactionNumbers[currentId].likes}`;
      e.target.classList.remove('fa-bounce');
    }
  });
};

export default addReaction;
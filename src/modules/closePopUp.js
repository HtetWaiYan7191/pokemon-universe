import { popUpBox } from './getAppData';
import { closePopupCard } from './popUp';

const closePopUp = (closeCommentBtn, overLay) => {
  popUpBox.classList.remove('goBackPopUp');
  closeCommentBtn.addEventListener('click', () => {
    closePopupCard();
    popUpBox.classList.remove('hidePopUp');
    popUpBox.classList.add('goBackPopUp');
    overLay.classList.add('hideOverlay');
  });
};

export default closePopUp;
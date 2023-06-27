import { popUpBox } from './getAppData';

const closePopUp = (closeCommentBtn, overLay) => {
  popUpBox.classList.remove('goBackPopUp');
  closeCommentBtn.addEventListener('click', () => {
    popUpBox.classList.remove('hidePopUp');
    popUpBox.classList.add('goBackPopUp');
    overLay.classList.add('hideOverlay');
  });
};

export default closePopUp;
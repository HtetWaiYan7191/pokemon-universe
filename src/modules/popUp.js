// When the pop-up card is opened
function openPopupCard() {
  document.body.classList.add('no-scroll');
}

// When the pop-up card is closed
function closePopupCard() {
  document.body.classList.remove('no-scroll');
}

export { openPopupCard, closePopupCard };
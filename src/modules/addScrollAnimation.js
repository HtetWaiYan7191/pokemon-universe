export default function addScrollAnimation() {
  const element = document.querySelector('#contact-text');
  const position = element.getBoundingClientRect().top;

  const meText = document.querySelector('#me-text');

  const screenHeight = window.innerHeight;
  if (position - screenHeight <= 0) {
    element.classList.add('leftToRight');
    meText.classList.add('rightToLeft');
  }
}
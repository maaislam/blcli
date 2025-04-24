import trapFocus from './trapFoucs';

const openModal = (ID) => {
  const modal = document.querySelector(`.${ID}__modal`);

  modal.classList.add(`${ID}__open`);
  modal.classList.remove(`${ID}__closing`);

  // Define the handler separately so it can be removed later
  window.trapFocusHandler = (e) => trapFocus(e, ID, modal);

  // Attach focus trap
  document.addEventListener('keydown', window.trapFocusHandler);
};
export default openModal;

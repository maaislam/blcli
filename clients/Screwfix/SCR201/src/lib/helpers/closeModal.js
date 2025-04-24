const closeModal = (ID) => {
  const modal = document.querySelector(`.${ID}__modal`);

  modal.classList.add(`${ID}__closing`);
  modal.classList.remove(`${ID}__open`);

  window.lastActiveElement.focus();

  // Remove focus trap event listener
  document.removeEventListener('keydown', window.trapFocusHandler);
};

export default closeModal;

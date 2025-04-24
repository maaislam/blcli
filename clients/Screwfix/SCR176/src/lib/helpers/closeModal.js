export const closeModal = (ID) => {
  const modal = document.querySelector(`.${ID}__modal`);
  const modalLoader = modal.querySelector(`.${ID}__loader`);
  const modalContent = modal.querySelector(`.${ID}__modal-content`);

  modal.classList.add(`${ID}__closing`);
  modal.classList.remove(`${ID}__open`);
  modalLoader.classList.remove(`${ID}__hide`);
  modalContent.innerHTML = '';
};

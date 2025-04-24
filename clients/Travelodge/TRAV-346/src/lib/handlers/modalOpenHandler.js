const modalOpenHandler = (ID, element) => {
  const isMobile = window.innerWidth <= 768;
  const modal = document.querySelector(`.${ID}__modal`);
  if (isMobile && !modal.classList.contains(`${ID}__open`)) {
    modal.classList.remove(`${ID}__closing`);
    modal.classList.add(`${ID}__open`);
    const searchWrapper = element.closest(`.${ID}__container`);
    modal.querySelector(`.${ID}__modal-content`).insertAdjacentElement('beforeend', searchWrapper);
  }
};

export default modalOpenHandler;

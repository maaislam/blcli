import { fireEvent } from "../../../../../../core-files/services";

const openModal = (ID) => {
    const modal = document.querySelector(`.${ID}__modal`);
    const modalContainer = document.querySelector(`.${ID}__modal-container`);

    fireEvent('Users tapping More Info');

    modal.classList.add(`${ID}__open`);
    modal.classList.remove(`${ID}__closing`);
    modalContainer.setAttribute('tabindex', '0');
    modalContainer.setAttribute('aria-modal', 'true');

    // Set focus on modal container
    setTimeout(() => {
        modalContainer.focus();
    }, 400);

};
export default openModal;
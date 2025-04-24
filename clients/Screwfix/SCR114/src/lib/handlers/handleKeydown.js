import closeModal from "../helpers/closeModal";
import openModal from "../helpers/openModal";

const handleKeydown = (ID) => {
    const images = document.querySelectorAll(`.${ID}__gallery .carousel:not(.is-fullscreen) .image-wrapper`);
    const zoomBtn = document.querySelector(`.${ID}__zoomButton span`);
    const closeBtn = document.querySelector(`.${ID}__closeWrapper`);

    images.forEach((image) => {
        image.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest(`.${ID}__optionsContainer`)) {
                e.preventDefault();
                openModal(ID, e.target);
            } else if (e.key === 'Escape') {
                closeModal(ID);
            }
        });
    });

    zoomBtn?.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest(`.${ID}__optionsContainer`)) {
            e.preventDefault();
            openModal(ID, e.target);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeModal(ID);
            }
        });
    }
};

export default handleKeydown;

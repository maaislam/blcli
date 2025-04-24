import { fireEvent } from "../../../../../../core-files/services";
import buttonWrapper from "../components/buttonWrapper";

const openModal = (ID) => {
    fireEvent('User taps to open the zoom lightbox');

    const sliderContainer = document.querySelector('.flickity-fullscreen-container');
    const mainSlideWrapper = document.querySelector('.carousel-main');
    const fullScreenButton = mainSlideWrapper.querySelector('.flickity-fullscreen-button-view');

    window.lastActiveElement = window.flickityInstance.selectedIndex;

    if (!mainSlideWrapper.classList.contains('is-fullscreen')) {
        fullScreenButton.click();
        sliderContainer.setAttribute('tabindex', '-1');
        sliderContainer.setAttribute('aria-modal', 'true');
        sliderContainer.focus();
    }

    if (!document.querySelector(`.${ID}__buttonWrapper`)) {
        const videoButton = document.querySelector('[data-qaid="pdp-video-button"]');
        const spinButton = document.querySelector('[data-qaid="pdp-spinset-button"]');
        document
            .querySelector(`.${ID}__gallery .carousel-nav`)
            .insertAdjacentHTML('beforeend', buttonWrapper(ID, videoButton, spinButton));
    }

    setTimeout(() => { //resize flickity after full screen
        const allSliders = mainSlideWrapper.querySelectorAll('.carousel-cell');

        allSliders.forEach((item) => {
          item.removeAttribute('style');
        });
        window.flickityInstance.resize();
        window.flickityInstance.reloadCells()
    }, 50);

    document.body.style.overflow = 'hidden';
};
export default openModal;
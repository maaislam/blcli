const closeModal = (ID) => {
    const mainSlideWrapper = document.querySelector('.carousel-main');
    const fullScreenExitButton = mainSlideWrapper.querySelector('.flickity-fullscreen-button-exit');
    const sliderContainer = document.querySelector('.flickity-fullscreen-container');

    if (mainSlideWrapper.classList.contains('is-fullscreen')) {
        fullScreenExitButton.click();
    }

    if (document.querySelector(`.${ID}__buttonWrapper`)) {
        document.querySelector(`.${ID}__buttonWrapper`).remove();
    }

    sliderContainer.setAttribute('tabindex', '0');
    sliderContainer.setAttribute('aria-modal', 'false');

    setTimeout(() => {
        const elementIndex = window.lastActiveElement;
        window.flickityInstance.select(elementIndex, true, true);
        window.flickityInstance.resize();
        window.flickityInstance.reloadCells();
        window.flickityInstance.selectedElement.focus();
    }, 50);

    document.body.style.overflow = 'inherit';
};
export default closeModal;
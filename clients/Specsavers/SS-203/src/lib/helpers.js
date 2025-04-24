import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Standard experiment setup
 */
export const showLightbox = () => {
  const lightbox = document.querySelector(`.${ID}-lightbox__wrapper`);

  lightbox.classList.remove('fade-out');
  lightbox.classList.add('show');
  lightbox.classList.remove('hidden');
  document.querySelector('body').classList.add(`${ID}-noScroll`);
  
  lightboxClickEvents(lightbox);
}

export const lightboxClickEvents = (lightbox) => {
  const lightboxOverlay = document.querySelector(`.${ID}-overlay`);
  lightboxOverlay.addEventListener('click', (e) => {
    lightbox.classList.remove('show');
    lightbox.classList.add('fade-out');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 600);
    document.querySelector('body').classList.remove(`${ID}-noScroll`);
  });

  const closeIcon = document.querySelector(`.${ID}-closeIcon`);
  closeIcon.addEventListener('click', (e) => {
    lightbox.classList.remove('show');
    lightbox.classList.add('fade-out');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 600);
    document.querySelector('body').classList.remove(`${ID}-noScroll`);
  });

  const closeBtn = document.querySelector(`.${ID}-btn#${ID}-close-btn`);
  closeBtn.addEventListener('click', (e) => {
    lightbox.classList.remove('show');
    lightbox.classList.add('fade-out');
    setTimeout(() => {
      lightbox.classList.add('hidden');
    }, 600);
    document.querySelector('body').classList.remove(`${ID}-noScroll`);
  });
}
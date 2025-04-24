import settings from '../settings';

export default () => {
  const allImages = document.querySelectorAll(`.${settings.ID}-extra_image_wrapper .${settings.ID}-extra_lightbox`);
  const overlay = document.querySelector(`.${settings.ID}-overlay`);
  for (let index = 0; index < allImages.length; index += 1) {
    const element = allImages[index];

    const mainImage = element.parentNode.querySelector(`.${settings.ID}-image`);

    // show lightbox
    mainImage.addEventListener('click', () => {
      element.classList.add(`${settings.ID}-lightbox_showing`);
      overlay.classList.add(`${settings.ID}-overlay_showing`);
      document.body.classList.add(`${settings.ID}-noScroll`);
    });

    // close lightbox
    const lightboxExit = element.querySelector(`.${settings.ID}-extra_lightbox-exit`);
    lightboxExit.addEventListener('click', () => {
      element.classList.remove(`${settings.ID}-lightbox_showing`);
      overlay.classList.remove(`${settings.ID}-overlay_showing`);
      document.body.classList.remove(`${settings.ID}-noScroll`);
    });

    // overlay click
    overlay.addEventListener('click', () => {
      element.classList.remove(`${settings.ID}-lightbox_showing`);
      overlay.classList.remove(`${settings.ID}-overlay_showing`);
      document.body.classList.remove(`${settings.ID}-noScroll`);
    });
  }
};

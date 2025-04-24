import settings from '../settings';

/**
 * Lightbox
 */
const Lightbox = (props, shouldScroll = true) => {
  let classNames = `${settings.ID}-lightbox__inner`;
  if(shouldScroll) {
    classNames += ` ${settings.ID}-lightbox__inner--scrollable`; 
  }

  return `
    <div class="${settings.ID}-lightbox ${props.active ? settings.ID + '-active' : ''}">
      <div class="${settings.ID}-lightbox__bg"></div>
      <div class="${classNames}">
        ${props.content}
      </div>
    </div>
  `;
};

export default Lightbox;

/**
 * Close Lightbox
 */
export const closeLightbox = () => {
  const lightbox = document.querySelector(`.${settings.ID}-lightbox`);
  if(lightbox) {
    lightbox.classList.remove(`${settings.ID}-active`);
  }
};

/**
 * Show Lightbox
 */
export const showLightbox = () => {
  const lightbox = document.querySelector(`.${settings.ID}-lightbox`);
  if(lightbox) {
    lightbox.classList.add(`${settings.ID}-active`);
  }
};

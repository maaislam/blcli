import { characterIcon } from '../assets/icons';

const bannerWrapper = (id) => {
  const html = `<div class="${id}__bannerWrapper">
        <div class="${id}__bannerContainer">
            <div class="${id}__icon">${characterIcon}</div>
            <div class="${id}__info">
                <div class="${id}__text">Have a pre-existing issue that needs repairing sooner? That's <span>Ding.</span></div>
                <a href="/repairs/" class="${id}__repair-button" aria-label="Find out more">Find out more</a>   
            </div>
        </div>
  </div>`;
  return html.trim();
};

export default bannerWrapper;

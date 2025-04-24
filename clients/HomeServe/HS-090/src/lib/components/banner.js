import { characterIcon, crossIcon } from '../assets/icons';

const banner = (id) => {
  const html = `
    <div class="${id}__bannerWrapper">
        <div class="${id}__bannerContainer container">
            <span class="${id}__icon">${characterIcon}</span>
            <div class="${id}__text">Need a job doing today? Meet <span>Ding.&nbsp;</span><a href="/repairs/">Find out more</a></div>
            <span class="${id}__closeWrapper">${crossIcon} <span class="${id}__closeText">Close</span></span>
        </div>
    </div>
  `;
  return html.trim();
};

export default banner;

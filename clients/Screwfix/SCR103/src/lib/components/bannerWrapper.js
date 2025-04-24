import { previousIcon, anotherPreviousIcon } from '../assets/icons';

const bannerWrapper = (id, getUrl, userName, VARIATION) => {
  const htmlV1 = `
           <div class="${id}__bannerWrapper">
                <a href="${getUrl}" class="${id}__button">
                    <span class="${id}__icon">${previousIcon}</span>
                    <span class="${id}__text">Shop Previous Purchases</span>
                </a>
            </div>       
    `;

  const htmlV2 = ` 
           <div class="${id}__bannerWrapper">
                <h1>Hi ${userName},<br> Welcome Back</h1>
                <a href="${getUrl}" class="${id}__button">
                    <span class="${id}__icon">${anotherPreviousIcon}</span>
                    <span class="${id}__text">Shop Previous Purchases</span>
                </a>
            </div>       
    `;

  return VARIATION === '1' ? htmlV1.trim() : htmlV2.trim();
};

export default bannerWrapper;

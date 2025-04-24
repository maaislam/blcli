import getPromoFromDOM from '../helpers/getPromoFromDOM';

const renderPromotionMsg = (id) => {
  const promotions = getPromoFromDOM(); //promotion data from api is inaccurate at times in RU
  const hasPromotion = promotions.length > 0;
  console.log(promotions);
  const promotionsContainer = (promotions) => {
    const tootltip = `
  
    <span class="AG084a__tooltip--btn">
    
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM12 17C12.5128 17 12.9355 16.614 12.9933 16.1166L13 16V11C13 10.4477 12.5523 10 12 10C11.4872 10 11.0645 10.386 11.0067 10.8834L11 11V16C11 16.5523 11.4477 17 12 17ZM12 7C12.5523 7 13 7.44771 13 8C13 8.55229 12.5523 9 12 9C11.4477 9 11 8.55229 11 8C11 7.44771 11.4477 7 12 7Z" fill="white"/>
    </svg>
    
    </span>
  `;
    const htmlStr = `
        <div class="${id}__promo">
            <div class="${id}__promo--header">${tootltip}\${Promotion Header}</div>
            <div class="${id}__promo--messages">
                ${promotions
                  .map((promotion) => `<div class="${id}__promo--messages-description">${promotion.description}</div>`)
                  .join('\n')}
            </div>
        </div>
    `;

    return htmlStr;
  };

  if (hasPromotion) {
    return promotionsContainer(promotions);
  } else {
    return '';
  }
};

export default renderPromotionMsg;

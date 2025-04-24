import { cardHolderIcon, offersIcon, speedyDeliverIcon, advantageCardTransparent } from '../assets/icons';

const noAccount = (id) => {
  const html = `
    <div class="${id}__noAccountWrapper">
        <div class="${id}__noAccountContainer">
            <div class="${id}__header">
                ${advantageCardTransparent}
                <h1>Unlock instant savings</h1>
            </div>
            <div class="${id}__content">
                <h2>Sign up to Advantage Card</h2>
                <div class="${id}__lists">
                    <div class="${id}__item">
                        <div class="${id}__icon">${speedyDeliverIcon}</div>
                        <div class="${id}__text">Lower prices on your favourites with Price Advantage</div>
                    </div>
                    <div class="${id}__item">
                        <div class="${id}__icon">${cardHolderIcon}</div>
                        <div class="${id}__text">10% off our amazing Boots brands</div>
                    </div>
                    <div class="${id}__item">
                         <div class="${id}__icon">${offersIcon}</div>
                        <div class="${id}__text">Earn 3 points for every £1 you spend</div>
                    </div>
                </div>
            </div>
            <div class="${id}__buttons">
                <a href='https://www.boots.com/AdvantageCardApply' class="${id}__primary-btn">Sign up/Log in</a>
                <a href='https://www.boots.com/sitesearch?searchTerm=price+advantage' class="${id}__secondary-btn no-account-price-advant">
                    Shop Price Advantage
                </a>
            </div>
        </div>
    </div>
  `;
  return html.trim();
};

export default noAccount;

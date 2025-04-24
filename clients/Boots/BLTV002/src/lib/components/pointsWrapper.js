import { advantageCardTransparent } from '../assets/icons';

const pointsWrapper = (id, price) => {
  const html = `
    <div class="${id}__pointsContainer">
      <div class="${id}__pointsWrapper">
        <div class="${id}__icon">${advantageCardTransparent}</div>
        <div class="${id}__text">You have ${price} worth of points</div>
      </div>
      <a class="${id}__primary-btn" href="https://www.boots.com/sitesearch?searchTerm=price+advantage">Shop Price Advantage</a>
    </div>
    `;
  return html.trim();
};

export default pointsWrapper;

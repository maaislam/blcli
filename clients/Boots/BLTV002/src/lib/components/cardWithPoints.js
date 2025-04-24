import { advantageCardTransparent } from '../assets/icons';
import { calculatePoints, extractNumber } from '../helpers/utils';

const cardWithPoints = (id) => {
  const adcardPointsSectionElem = document.querySelector('#adcardPointsSection');
  const worthPrice = adcardPointsSectionElem?.textContent || '0';
  const priceInNumber = extractNumber(worthPrice);

  const points = calculatePoints(priceInNumber);
  const pointText = `${points} ${points === 0 ? 'point' : 'points'}`;

  const html = `
    <div class="${id}__cardWithPointsWrapper">
        <div class="${id}__icon">
          ${advantageCardTransparent}
        </div>
        <div class="${id}__points">${pointText}</div>
    </div>
  `;
  return html.trim();
};

export default cardWithPoints;

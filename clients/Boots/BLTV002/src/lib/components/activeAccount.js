import { advantageCardTransparent, clickIcon, speedyDeliverIcon } from '../assets/icons';
import { extractNumber, calculatePoints } from '../helpers/utils';

const activeAccount = (id) => {
    const adcardPointsSectionElem = document.querySelector('#adcardPointsSection');
    const worthPrice = adcardPointsSectionElem?.textContent;
    const priceInNumber = extractNumber(worthPrice);

    const points = calculatePoints(priceInNumber);
    const pointText = `(${points} ${points === 0 ? 'point' : 'points'})`;

    const html = `
    <div class="${id}__accountWrapper">
        <div class="${id}__accountContainer">
            <div class="${id}__header">
                <h1>My points</h1>
                <div class="${id}__pointsBox">
                <div class="${id}__pointsContent">
                    <div class="${id}__icon">${advantageCardTransparent}</div>
                    <div class="${id}__money">${worthPrice} worth of points*</div>
                    <div class="${id}__points">${pointText}</div>
                </div>
                <div class="${id}__pointsText">
                    *You must have the full amount of points available to cover your total, you cannot split paying with cash/card & Advantage Card points
                </div>
            </div>
            </div>
            
            <div class="${id}__content">
                <h2>Good to know</h2>
                <div class="${id}__lists">
                    <div class="${id}__item">
                        <div class="${id}__icon">${speedyDeliverIcon}</div>
                        <div class="${id}__text">
                            <p>Delivery = <strong>395 points</strong></p>
                            <p>(or free when you spend 2500 points)</p>
                        </div>
                    </div>
                    <div class="${id}__item">
                        <div class="${id}__icon">${clickIcon}</div>
                        <div class="${id}__text">
                            <p>Click & Collect = <strong>150 points</strong></p>
                            <p>(or free when you spend 1500 points)</p>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="${id}__buttons">
                <a class="${id}__btn-normal ${id}__continue">Continue shopping</a>
                <a class="${id}__primary-btn ${id}__shop-price-advantage" href="https://www.boots.com/sitesearch?searchTerm=price+advantage">Shop Price Advantage</a>
            </div>
        </div>
    </div>
    `;
    return html.trim();
};

export default activeAccount;

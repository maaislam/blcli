import { cardIcon, successIcon } from '../assets/icons';

const offerWrapper = (id, device) => {
  const html = `
        <div class="${id}__offerWrapper ${id}__${device}">
            <div class="${id}__offersContainer">
                <!-- Load Now Section -->
                <div class="${id}__load-now">
                    <span class="${id}__load-title">Load now:</span>
                    <button class="${id}__load-button">
                        <span class="${id}__load-card-icon">${cardIcon}</span>
                        <span class="${id}__load-card-title">Add all offers to card</span>     
                        <span class="${id}__load-card-success">${successIcon}</span>     
                    </button>
                </div>

                <!-- Filter By Section -->
                <div class="${id}__filter-section">
                    <span class="${id}__filter-title">Filter by:</span>
                    <div class="${id}__filter-buttons">
                        <button class="${id}__filter-button" data-test-id="discount">Discounts</button>
                        <button class="${id}__filter-button" data-test-id="point">Points</button>
                        <button class="${id}__filter-button" data-test-id="saving">Savings</button>
                    </div>
                </div>
            </div>
        </div>
    `;

  return html.trim();
};

export default offerWrapper;

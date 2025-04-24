import { characterIcon, mainCharacter } from '../assets/icons';

const repairBanner = (id) => {
  const html = `
        <div class="${id}__repair-section">
            <div class="${id}__repair-container">
                <div class="repair-content">
                    <div class="${id}__repair-icon">${characterIcon}</div>
                    <h1 class="repair-title">Need a home or boiler repair?</span></h1>
                    <p class="repair-description">
                        Introducing Ding, for the odd jobs ranging from blocked drains to boiler repairs. Jobs start from £95 when you become a member for <strong>£5 a month</strong>. Cancel anytime.
                    </p>
                    <a href="" target="_blank" class="repair-button" aria-label="View availability and pricing">View availability and pricing</a>
                </div>
                <div class="repair-pricing">
                    <span class="repair-main-icon">${mainCharacter}</span>
                    <h2 class="pricing-title">Don't wing it, Ding it</h2>
                    <ul class="pricing-list">
                        <li class="pricing-item">
                            <span class="price-item-title">
                                <span class="icon">
                                    <img src="https://www.homeserve.co.uk/-/media/UK/Ding-Repairs-Page-Images/Bath2x.png" alt="Illustration of a bathtub filled with hot water, with a towel draped over the side.">
                                </span>
                                <strong>Plumbing from £95</strong>
                            </span>
                            <ul>
                                <li>Repair a leak</li>
                                <li>Unblock a drain</li>
                                <li>Replace a tap</li>
                            </ul>
                        </li>
                        <li class="pricing-item">
                            <span class="price-item-title">
                                <span class="icon">
                                    <img src="https://www.homeserve.co.uk/-/media/UK/Ding-Repairs-Page-Images/light-22x.png" alt="Illustration of a lampshade with a visible lightbulb inside.">
                                </span>
                                <strong>Electrics from £125</strong>
                            </span>
                            <ul>
                                <li>Repair or replace a light switch</li>
                                <li>Repair or replace a plug socket</li>
                                <li>Replace a light fitting</li>
                            </ul>
                        </li>
                        <li class="pricing-item">
                            <span class="price-item-title">
                                <span class="icon">
                                    <img src="https://www.homeserve.co.uk/-/media/UK/Ding-Repairs-Page-Images/Gas2x.png" alt="Illustration of a gas boiler.">
                                </span>
                                <strong>Heating from £160</strong>
                            </span>
                            <ul>
                                <li>Gas boiler service and maintenance</li>
                                <li>Repair a gas boiler</li>
                                <li>Carbon monoxide alarm installation</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
  return html.trim();
};

export default repairBanner;

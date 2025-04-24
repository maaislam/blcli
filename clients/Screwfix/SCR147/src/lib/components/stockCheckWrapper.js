import { locationIcon } from '../assets/icons';

const stockCheckWrapper = (id) => {
  const html = `
    <div class="${id}__stock-check">
        <h2>Check stock</h2>
        <p>Enter postcode for available delivery and collection options</p>
        <div class="input-container">
            <input type="text" placeholder="Enter your location or postcode" autocomplete="off" aria-expanded="false">
            <button class="${id}__checkCta">Check</button>
        </div>
        <div class="location">
            <a tabindex="0" rel="noreferrer" aria-label="Use my current location">
            ${locationIcon}
              <span class="BV57H2">Use my current location</span>
            </a>
        </div>
    </div>
  `;

  return html.trim();
};

export default stockCheckWrapper;

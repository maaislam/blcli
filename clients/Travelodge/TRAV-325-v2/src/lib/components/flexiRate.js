import { cancelSVG, lockSVG, refundSVG } from "../assets/svg";

const flexiRate = (ID, rateDifference) => {
    return `
    <div class="${ID}-flexi-container">
      <div class="${ID}-flexi-container-head">
        <h2>Before you move on, did you know we offer flexible rates?</h2>
        <button class="${ID}-flexi-container-head-skip">Skip <div class="${ID}-loader ${ID}__hide"></div> </button>
      </div>
      <div class="${ID}-flexi-container-body">
        <div class="${ID}-flexi-container-body-left ${ID}-flexi-container-body-section">
          <h3>Don’t risk losing money if plans change!</h3>
          <p>${cancelSVG} Cancel until 12pm on arrival day</p>
          <p>${refundSVG} Get a total refund or amend for FREE</p>
          <p>${lockSVG} Rates fluctuate daily - lock them in now</p>
          <button class="${ID}-add-flexi">Continue with flexible rate | + £${rateDifference}</button>
        </div>
        <div class="${ID}-flexi-container-body-right ${ID}-flexi-container-body-section">
          <img src="https://media.travelodge.co.uk/image/upload/Testing/travelodge-flexi-rate.png" alt="Travelodge flexible rate">
        </div>
      </div>
    </div>
  `;
};

export default flexiRate;
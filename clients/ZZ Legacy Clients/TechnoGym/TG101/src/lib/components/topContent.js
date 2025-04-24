import shared from '../shared';
import { __ } from '../helpers';

const { ID } = shared;

export default class TopContent {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_topContent`);
    element.innerHTML = `
      <div class="${ID}-titleWrapper">
        <h1>${__('Discover MYRUN')}</h1>
        <span class="${ID}-price">${__('£3,250')}</span>
        <div class="${ID}-finance">${__('From £122 per month')}<span class="${ID}-tooltip_icon"></span><span class="${ID}-pricingMessage"><b>x</b>${__('Price £3250, deposit £322, total credit amount £2928 to be returned in 24 monthly repayments each of £122. 0% interest.')}</span></div>
        <p>${__('The perfect combination of minimal design and innovative technology. MyRun is designed by runners for those who like to keep fit.')}</p>
        <div class="${ID}-download_brochure_link">${__('Download Brochure')}</div>
      </div>
      <div class="${ID}-imageText_wrapper">
        <div class="${ID}-image_container">
          <div class="${ID}-image ${ID}-image_first">
            <div class="${ID}-text ${ID}-text_first">
              <h3>${__('Run to the beat')}</h3>
              <p>${__('Chooses the songs from your playlist that are best suited to the rhythm of your run.')}</p>
            </div>
          </div>
          <div class="${ID}-image ${ID}-image_second">
            <div class="${ID}-text ${ID}-text_second">
              <h3>${__('MAXIMUM COMFORT, MINIMAL FOOTPRINT')}</h3>
              <p>${__('MyRun has won some of the most prestigious awards for its inimitable style. MYRUN TECHNOGYM® brings you the same feeling of space as a professional treadmill, in a compact footprint.')}</p>
            </div>
          </div>
          <div class="${ID}-image ${ID}-image_third">
            <div class="${ID}-text ${ID}-text_second">
              <h3>${__('Innovative running surface')}</h3>
              <p>${__('Adapts to the way you run to reduce the risk of injuries')}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="${ID}-anchor_link"></div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    const mainContainer = document.querySelector('.container-fluid.page-container');
    mainContainer.insertAdjacentElement('beforebegin', component);


    // on tooltip click
    const tooltip = document.querySelector(`.${ID}_topContent .${ID}-finance`);
    const financeMessage = document.querySelector(`.${ID}-pricingMessage`);
    tooltip.addEventListener('click', () => {
      if(financeMessage.classList.contains(`${ID}-finance_show`)) {
        financeMessage.classList.remove(`${ID}-finance_show`);
      } else {
        financeMessage.classList.add(`${ID}-finance_show`);
      }
    });
  }
}

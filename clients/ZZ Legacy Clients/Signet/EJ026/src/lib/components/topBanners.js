import settings from '../../lib/settings';

const { ID } = settings;

export default class TopBanners {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_topBanners`);

    // if free delivery and sale price, add them above the image
    const freeDelivery = document.querySelector('.delivery-offer__message');

    const salePrice = document.querySelector('.buying-info__price--was');
    element.innerHTML = `${salePrice ? `<div class="${ID}-saleBanner ${ID}-banner">Sale</div>` : ''}
    ${freeDelivery ? `<div class="${ID}-freeDelivery ${ID}-banner">Free Delivery</div>` : ''}`;

    this.component = element;
  }

  render() {
    const { component } = this;
    const PDPContent = document.querySelector('.container.pdpContent');
    PDPContent.insertAdjacentElement('afterbegin', component);
  }
}

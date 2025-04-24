import shared from '../shared';

const { ID } = shared;

export default class InformationBanner {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    let title;
    let image;
    let topText;
    let bottomText;

    if(shared.VARIATION === '1' || shared.VARIATION === '3') {
        title = 'Why Merchoid?',
        image = 'https://www.merchoid.com/static/version1569321712/frontend/Merchoid/merchoid2/en_GB/images/icon-rosette.png';
        topText = "Merchoid only sells 100% officially licensed, awesome merchandise.";
        bottomText = "Everything we sell has been approved by the likes of Disney, Marvel and DC - which means you're getting the very best quality merch. All of Merchoid's products are either made by us or handpicked by the Merchoid team. We don't settle for Jakku junk and neither should you. Order today to get the very best, officially licensed merchandise available";
    } else if(shared.VARIATION === '2' || shared.VARIATION === '4') {
        title = 'Limited Stock';
        image = 'https://www.merchoid.com/static/version1569493753/frontend/Merchoid/merchoid2/en_GB/images/icon-shield-tick.png';
        topText = 'Buy now, don\'t miss out! All stock is made/ordered in limited quantities. Get yours before they\'re gone.';
        bottomText = "This means some products can completely sell out and might not be available again. If you don't want to miss out on your favourite item, order today.";
    }

    const element = document.createElement('div');
    element.classList.add(`${ID}_informationBanner`);
    element.innerHTML = `
      <div class="${ID}-title">${title}</div>
      <div class="${ID}-topText_row">
        <div class="${ID}-informationImage" style="background-image: url(${image})"></div>
        <div class="${ID}-informationText">${topText} <div class="${ID}-learnMore">Learn More</div></div>
      <div>
      <div class="${ID}-bottomBannerText">${bottomText}</div>
    `;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
    const readmoreLink = component.querySelector(`.${ID}-learnMore`);
    const bottomText = component.querySelector(`.${ID}-bottomBannerText`);

    readmoreLink.addEventListener('click', () => {
        bottomText.classList.add(`${ID}-showMoreText`);
        readmoreLink.style.display = 'none';
    
    });
  }

  render() {
    const { component } = this;
    const productDescription = document.querySelector(`.${ID}_productTabs`);
    if(shared.VARIATION === '1' || shared.VARIATION === '2') {
        productDescription.insertAdjacentElement('beforebegin', component);
    } else if (shared.VARIATION === '3' || shared.VARIATION === '4') {
        productDescription.insertAdjacentElement('afterend', component);
    }
  }
}


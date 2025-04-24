import shared from '../shared';

const { ID } = shared;

export default class ProductUSPs {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const productPrice = window.digitalData.product[0].price.currentPrice;
    

    let returnOrCollect;

    if(shared.VARIATION === '1') {
      returnOrCollect = {
        title: 'Free Returns and Exchanges.',
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
        content: 'Giving you peace of mind so you can try the watch on at home.'
      }
    } else if(shared.VARIATION === '2') {
      returnOrCollect = {
        title: 'Click and Collect.',
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5C1965C4BABC92319BB8968C63AFF6391BAF50ABE99627ACAF314BD7982066E3/ernestjones-co-uk/EJ054c---PDP-Proposition---Fashion-Watches/noun_PackageLocation_23326891.png',
        content: 'Free click and collect from any of our 600+ stores (select in checkout)'
      }
    }

    const actualDate = document.getElementById('js-update-delivery').innerText.replace(/(,)(\s).+/, '').trim();

    const below500 = {
      delivery: {
        title: 'Free Delivery.',
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
        content: ` This product is eligible for free standard delivery`,
      },
      moneyOff: {
        title: `Save 10%.`,
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
        content: `Sign up to our <a class="${ID}-newsletterLink">newsletter</a> and get a code to save 10% today`,
      },
      returnOrCollect,
    }

    const above500 = {
      delivery: {
        title: 'Free Express Delivery.',
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
        content: `Tracked delivery on ` + actualDate + ` when you order in <span class="${ID}-countdown"></span>`,
      },
      moneyOff: {
        title: `Save 10%.`,
        icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
        content: `Sign up to our <a class="${ID}-newsletterLink">newsletter</a> and get a code to save 10% today`,
      },
      returnOrCollect,
    }
    
    let uspToUse;

    if (productPrice >= 500) {
      uspToUse = above500;
    } else if (productPrice < 500) {
      uspToUse = below500;
    }
    
    const element = document.createElement('div');
    element.classList.add(`${ID}_usp_Wrapper`);
  
    
    Object.keys(uspToUse).forEach((i) => {
        const uspContent = document.createElement('div');
        uspContent.classList.add(`${ID}-usp`);
        uspContent.innerHTML = `
        <div class="${ID}-icon"style="background-image: url(${uspToUse[i].icon})"></div>
        <p>
          <span class="${ID}-uspPoint">${uspToUse[i].title}</span>
          ${uspToUse[i].content}
        </p>`;

        element.appendChild(uspContent);
    });


    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    if(window.innerWidth > 767) {
      const form = document.querySelector('#basketForm');
      form.insertAdjacentElement('afterend', component);
    } else {
      const productDetails = document.querySelector('.detail-page__right-column');
      productDetails.appendChild(component);
    } 
    
  }
}
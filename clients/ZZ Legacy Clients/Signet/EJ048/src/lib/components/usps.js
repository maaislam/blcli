import shared from '../shared';

const { ID } = shared;

export default class ProductUSPs {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    var productType;
    const brandName = window.digitalData.product[0].productInfo.brand;
    const primaryCat = window.digitalData.product[0].category.primaryCategory;
    const secondaryCat = window.digitalData.product[0].category.subCategory1;
    const actualDate = document.getElementById('js-update-delivery').innerText.replace(/(,)(\s).+/, '').trim();
    const productPrice = window.digitalData.product[0].price.currentPrice;
    let usps;

    if (primaryCat === "Watches" && (/(BOSS|Emporio Armani|Hugo Boss|Michael Kors|Olivia Burton)/gmi.test(brandName))){
      productType = "Watch"
    }
    else if (primaryCat === "Jewellery" && secondaryCat === "Rings"){
      productType = "Rings"
    }

    if (productType === "Watch") {
      if (productPrice >= 500){
        usps = {
          delivery: {
            title: 'Free Express Delivery.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
            content: `Tracked delivery on <span class="${ID}-deliveryDate">` + actualDate + `</span> when you order in <span class="${ID}-countdown"></span>`,
          },
          guaranteeYear: {
            title: `Extended Christmas Returns.`,
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
            content: `This product can be exchanged or refunded up to Saturday 25th January 2020.`,
          },
          returns: {
            title: 'Gift Wrapping Available.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
            content: 'Get your order beautifully packaged with a personal message.'
          }
        }
      }
      else if (productPrice < 500){
        usps = {
          delivery: {
            title: 'Free Delivery.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
            content: `On all products over £100. We aim to deliver within 2-3 working days, Monday to Saturday.`,
          },
          guaranteeYear: {
            title: `Extended Christmas Returns.`,
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
            content: `This product can be exchanged or refunded up to Saturday 25th January 2020.`,
          },
          returns: {
            title: 'Gift Wrapping Available.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
            content: 'Get your order beautifully packaged with a personal message.'
          }
        }
      }
    }

    else if (productType === "Rings") {
      if (productPrice >= 500){
        usps = {
          delivery: {
            title: 'Free Express Delivery.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
            content: `Tracked delivery on <span class="${ID}-deliveryDate">` + actualDate + `</span> when you order in <span class="${ID}-countdown"></span>`,
          },
          guaranteeYear: {
            title: `Extended Christmas Returns.`,
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
            content: `This product can be exchanged or refunded up to Saturday 25th January 2020`,
          },
          returns: {
            title: 'Gift Wrapping Available.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
            content: 'Get your order beautifully packaged with a personal message.'
          }
        }
      }

      else if (productPrice < 500){
        usps = {
          delivery: {
            title: 'Free Delivery.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
            content: `On all products over £100. We aim to deliver within 2-3 working days, Monday to Saturday.`,
          },
          guaranteeYear: {
            title: `Extended Christmas Returns.`,
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
            content: `This product can be exchanged or refunded up to Saturday 25th January 2020.`,
          },
          returns: {
            title: 'Gift Wrapping Available.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
            content: 'Get your order beautifully packaged with a personal message.'
          }
        }
      }
    }

    const element = document.createElement('div');
    element.classList.add(`${ID}_usp_Wrapper`);
  
    
    Object.keys(usps).forEach((i) => {
        const uspContent = document.createElement('div');
        uspContent.classList.add(`${ID}-usp`);
        uspContent.innerHTML = `
        <div class="${ID}-icon"style="background-image: url(${usps[i].icon})"></div>
        <p>
          <span class="${ID}-uspPoint">${usps[i].title}</span>
          ${usps[i].content}
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
    if (document.querySelector('.product-step-up-down__container')){
      const form = document.querySelector('.product-step-up-down__container');
      form.insertAdjacentElement('beforebegin', component);
    }
    else if(window.innerWidth > 767) {
      const form = document.querySelector('#basketForm');
      form.insertAdjacentElement('beforebegin', component);
    } else {
      const productDetails = document.querySelector('.detail-page__right-column');
      productDetails.appendChild(component);
    } 
    
  }
}
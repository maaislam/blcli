import shared from '../shared';

const {
  ID
} = shared;

var productType;
const primaryCat = window.digitalData.product[0].category.primaryCategory;
const secondaryCat = window.digitalData.product[0].category.subCategory1;
const productPrice = window.digitalData.product[0].price.currentPrice;
let usps;

export default class ProductUSPs {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const actualDate = document.getElementById('js-update-delivery');

    if (primaryCat === "Watches") {
      productType = "Watch"
    } else if (primaryCat === "Jewellery" && secondaryCat === "Rings") {
      productType = "Rings"
    }


    if (productPrice >= 500) {
        usps = {
          delivery: {
            title: 'Free Express Delivery.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
            content: `Tracked delivery on <span class="${ID}-deliveryDate">` + actualDate.innerText.replace(/(,)(\s).+/, '').trim() + `</span> when you order in <span class="${ID}-countdown"></span>`,
          },
          guaranteeYear: {
            title: `Free Returns.`,
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
            content: `On this product, giving you peace of mind.`,
          },
          returns: {
            title: 'Click and Collect.',
            icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
            content: 'To over 300 stores across the UK. You will be provided with estimated delivery dates in the checkout.'
          }
        }
    } 
    else if (productPrice < 499 && productPrice >= 49) {
      usps = {
        delivery: {
          title: 'Free Delivery.',
          icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
          content: `We aim to deliver within 2-3 working days, Monday to Saturday.`,
        },
        guaranteeYear: {
          title: `Free Returns`,
          icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
          content: `On this product, giving you peace of mind.`,
        },
        returns: {
          title: 'Click and Collect.',
          icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
          content: 'To over 300 stores across the UK. You will be provided with estimated delivery dates in the checkout.'
        }
      }
    } else if(productPrice < 49) {
      usps = {
        delivery: {
          title: 'Free Delivery.',
          icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/E2EED08A0505D5E2964F04E4BB438A800D5F014C2F3E23CED1251537DFBE8396/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_ExpressDelivery_1559182.png',
          content: `Available on orders over £49.`,
        },
        guaranteeYear: {
          title: `Free Returns`,
          icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/400D5EB1EDB04C176C52D7DA49AD5DA88029BFE00FE586BEDD3BB63CC4DDA039/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_Refund_1544357.png',
          content: `On this product, giving you peace of mind.`,
        },
        returns: {
          title: 'Click and Collect.',
          icon: 'https://service.maxymiser.net/cm/images-us/1/1/2/5BA53296368F77DA94FF6A6AD2600C7897EB2AA97DCE2548EC941B552FB8F8F8/ernestjones-co-uk/EJ034---PDP-Service-Messaging---Prestige-Watches/noun_warranty_85329.png',
          content: 'To over 300 stores across the UK. You will be provided with estimated delivery dates in the checkout.'
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
    const {
      component
    } = this;
  }

  render() {
    const {
      component
    } = this;

    if (productType === "Watch") {
      if (window.innerWidth > 767) {
        const form = document.querySelector('.product-summary');
        form.insertAdjacentElement('afterend', component);
      } else {
        const productDetails = document.querySelector('.detail-page__right-column');
        productDetails.appendChild(component);
      }

    } else if (productType === "Rings") {
      if (window.innerWidth > 767) {
        if (document.querySelector('.product-ifc')) {
          const IFC = document.querySelector('.product-ifc')
          IFC.insertAdjacentElement('afterend', component);
        } else if (document.querySelector('.product-paypal-credit')) {
          const form = document.querySelector('.product-paypal-credit');
          form.insertAdjacentElement('afterend', component);
        } else {
          const form = document.querySelector('.product-summary');
          form.insertAdjacentElement('afterend', component);
        }
      } else {
        const productDetails = document.querySelector('.detail-page__right-column');
        productDetails.appendChild(component);
      }
    }
  }
}
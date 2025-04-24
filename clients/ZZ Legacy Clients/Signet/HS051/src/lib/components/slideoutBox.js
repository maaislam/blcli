import shared from '../shared';

const { ID } = shared;

export default class SlideOutBox {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    const slideOutMarkup = {
        return: {
            icon: '',
            title: 'Free refunds & returns',
            innerMarkup: `
            <p class="${ID}-boldText">Returning online purchases</p>
            <p>If you've changed your mind about keeping your purchase, please return it in its original condition and we'll exchange or refund it.</p>
     
            <p>You can return items by post or in store within 30 days for a full refund or exchange.</p>

            <p class="${ID}-boldText">Return to a UK store</p>
            <p>This is the quickest way to return items. You can also exchange any unwanted items at your local store.</p>
            <div class="${ID}-customerService">
                <div class="${ID}-icon"></div><div class="${ID}-serviceText"><p>Customer Service</p><a href="tel:0800 458 1065">0800 458 1065</a></div>
            </div>
            <a href="/returns/?icid=ej-fn-ess-returns">More returns information</a>`,
        },
        delivery: {
            icon: '',
            title: 'Delivery Options',
            innerMarkup: 
            `<p><p class="${ID}-boldText">Free Click & Collect</p> to any H Samuel Store (excluding Eire or the Channel Islands).</p>
            <p><p class="${ID}-boldText">Free Next Day Delivery</p> on selected orders when you spend £500 or more.</p>
            <p><p class="${ID}-boldText">Free Standard Delivery</p> on selected orders when you spend £49 or more.</p>
            <a href="/delivery/">Click here for more delivery information</a>`,
        },
        exchange: {
            icon: '',
            title: 'Free Exchange',
            innerMarkup: 
            `<p class="${ID}-boldText">You can exchange any unwanted items at your local store. Find your nearest store with our store locator and follow below instructions on store exchanges:</p>
            <p>Place the item into its original presentation box. Please note that pierced items can only be returned in their original sealed packaging.</p>
            <br>
            <p>Take it to a UK store of your choice together with your dispatch note. Orders via the website cannot be returned to stores in the Eire or the Channel Islands.</p>
            <br>
            <p>If the item is in it's original condition, we will process the exchange for you.</p>
            <br>
            <p>If you received the item as a gift, we will offer an exchange for an alternative item or reimburse you with a gift card credited to the cost of the item.</p>
            <a href="/returns/">Click here for more exchange information</a>`,
        },
    }

    const element = document.createElement('div');
    element.classList.add(`${ID}_slideOutWrapper`);

    const overlay = document.createElement('div');
    overlay.classList.add(`${ID}_overlay`);

    Object.keys(slideOutMarkup).forEach((i) => {
        const data = slideOutMarkup[i];
  
        const productBlock = document.createElement('div');
        productBlock.classList.add(`${ID}-slideOut_inner`);
        productBlock.id = `${ID}-${[i][0]}`;
        productBlock.innerHTML =
        `<div class="${ID}-slideOut_top">
            <h2 class="${ID}-slideOutTitle">${data.title}</h2>
            <div class="${ID}-slide_outClose"></div>
        </div>
        <div class="${ID}-slideout_content">
            ${data.innerMarkup}
        </div>`;
  
        element.appendChild(productBlock);
      });

    this.component = element;
    this.overlayEl = overlay;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component, overlayEl } = this;
    document.body.appendChild(component);
    document.body.appendChild(overlayEl);
  }
}


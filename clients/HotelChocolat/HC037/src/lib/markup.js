import shared from "./shared";

const { ID } = shared;

export default class GiftMarkup {
    constructor() {
      this.create();
      this.bindEvents();
      this.render();
    }
  
    create() {
      const element = document.createElement('div');
      element.classList.add(`${ID}-pageContent`);
      element.innerHTML = `
      <div class="${ID}-topContent">
      <div class="${ID}-container">
      <div class="${ID}-headerimage"></div>
        <div class="${ID}-addToCartSection">
            <h1>The Velvetiser Gift Card</h1>
            <p>Do you want to give the gift of a Velvetiser but are unsure what colour machine they would like or what drinking chocolate they will enjoy? Our Velvetiser Starter Kit gift card is the perfect answer.</p>
            <div class="${ID}-priceBlock">
                <h3>£109.95</h3> <span>Inc. FREE STANDARD DELIVERY</span>
            </div>
            <div class="${ID}-addToBag">
            
                <div class="${ID}-qty"></div>
                <div class="${ID}-button">Add to bag</div>
            </div>
            <klarna-placement id="klarna-placement-cart" data-key="credit-promotion-badge" data-locale="en-GB" data-purchase-amount="109.95"><iframe src="https://rcgmal4n.klarnaservices.com/v3/r?ver=1.18.2&amp;a=e8f6c62b-9110-edd8-159e-8f847ca63787&amp;b=etlVEy8ZoXDxeUE2DTmv_&amp;d=credit-promotion-badge&amp;e=en-GB&amp;g=a9ad1d09-920c-5709-8839-788b9a4234da&amp;purchase_amount=109.95" scrolling="no" frameborder="no" style="display: block; width: 100%; height: 60px; max-width: 100%;"></iframe></klarna-placement>
        </div>
        </div>
      </div>
       <div class="${ID}-container">
        <div class="${ID}-section ${ID}-imageBlocks">
            <div class="${ID}-infoImage">
                <div class="${ID}-image ${ID}-colours"></div>
                <p>Let them choose their Velvetiser machine colour</p>
            </div>
            <div class="${ID}-infoImage">
                <div class="${ID}-image ${ID}-sachets"></div>
                <p>Let them choose a drinking chocolat or coffee latte sachet box</p>
            </div>
            <div class="${ID}-infoImage">
                <div class="${ID}-image ${ID}-store"></div>
                <p>Redeemable online or in any Hotel Chocolat store</p>
            </div>
            <div class="${ID}-infoImage">
                <div class="${ID}-image ${ID}-card"></div>
                <p>Gift Card is valid for 2 years from date of purchase</p>
            </div>
        </div>
        <div class="${ID}-section ${ID}-includedBlock">
            <div class="${ID}-left"></div>
            <div class="${ID}-right">
                <h4>The Velvetiser</h4>
                <span>Imagined by Hotel Chocolat, engineered by Dualit</span>
                <div class="${ID}-textContent">
                    <p>Make barista-grade drinking chocolat or coffee lattes at home in just 2.5 minutes.</p>
                    <p>The Velvetiser comes in a choice of copper, matt charcoal or white and includes:</p>
                    <ul class="${ID}-includesList">
                        <li>+ 2 ceramic podcups worth £20</li>
                        <li>+ 1-year full parts and labour guarantee</li>
                        <a class="${ID}-readMore" href="https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-machine.html">Read More</a>
                    </ul>
                </div>
            </div>
        </div>
        <div class="${ID}-section ${ID}-description">
            <h3>Velvetiser Gift Card Information</h3>
            <div class="${ID}-accordion"></div>
        </div>
        <div class="${ID}-section ${ID}-terms">
            <h5>Velvetiser Gift Card Terms & Conditions</h5>
            <p>Velvetiser Gift Card is pre-loaded to enable the purchase of a Velvetiser and 1 box of Single Serve sachets when purchased together, either online or in Hotel Chocolat UK locations*. Purchase of a Velvetiser is subject to availability and at times when the Velvetiser is temporarily sold out on our website, we may offer Pre-Order as an alternative instead. Free Standard UK delivery applies to one address and when both items are available and sent together. The Velvetiser Gift Card is pre-loaded with a value of £109.95 which can be redeemed against any other Hotel Chocolat purchase(s) online or in UK locations if a Velvetiser is not required. Usual Gift Card Terms and Conditions would then apply, and free Standard UK delivery would not be given.</p>
            <p class="${ID}-small">*Velvetiser Gift Card cannot be redeemed in Hotel Chocolat concessions in third party department stores or independent retail outlets or in Hotel Chocolat franchises. 
            </p>
        </div>
        <div class="${ID}-section ${ID}-gallery">
            <div class="${ID}-left">
                <div class="${ID}-video"></div>
            </div>
            <div class="${ID}-right">
                <div class="${ID}-gallLargeimage"></div>
                <div class="${ID}-col2">
                    <div class="${ID}-gallSmallimage"></div>
                    <div class="${ID}-gallSmallimage"></div>
                </div>
            </div>
        </div>
       </div>
      `;
      this.component = element;


      // move qty
      const qtyBox = document.querySelector('.product-add-to-cart .inventory');
      element.querySelector(`.${ID}-qty`).appendChild(qtyBox);
    }
  
    bindEvents() {
      const { component } = this;
    }
  
    render() {
      const { component } = this;
      document.querySelector('#main').insertAdjacentElement('beforebegin', component);
    }
  }

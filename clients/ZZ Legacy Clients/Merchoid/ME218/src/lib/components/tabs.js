import shared from "../shared";

const { ID } = shared;

export default class ProductTabs {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_productTabs`);
    element.innerHTML = 
    `<div class="${ID}-tabs">
        <div class="${ID}-tab ${ID}-info ${ID}-tabName_active" tab-target="info_content">
            <span>The Details</span>
        </div>
        <div class="${ID}-tab ${ID}-delivery" tab-target="delivery_content">
            <span>Delivery</span>
        </div>
        <div class="${ID}-tab_slider"></div>
    </div>
    <div class="${ID}-tabContent">
        <div class="${ID}-tabInner ${ID}-tab_active ${ID}-info_content">
            <div class="${ID}-product_intro">
            <h3></h3>
            <p></p>
            </div>
            <div class="${ID}-productInfo"></div>
        </div>
        <div class="${ID}-tabInner ${ID}-delivery_content">
            <h4>UK Delivery</h4>
            <p>First Class Royal Mail - FREE (estimated next working day)</p>
            <p>Special delivery and courier - £4.99 (next working day guaranteed)</p>

            <h4>International Delivery</h4>
            <p>Standard delivery - FREE (to most destinations)</p>
            <p>International delivery arrives in 5-15 days (may be longer if delays if held by your country’s customs)</p>
            <br/>
            <p>Estimated arrival and delivery cost (if applicable) calculated at checkout.</p>
            <p>Tracked delivery as standard on most deliveries</p>

            <h4>Returns</h4>
            <p>100 day returns for a full refund</p>
            <p>UK return shipping is free; if returning an international order charges may apply.</p>
        </div>
    </div>`;

    this.component = element;

    // add the product name and first line of the description
    const productName = document.querySelector('.mobile-product-title').textContent.trim();
    element.querySelector(`.${ID}-info_content h3`).textContent = productName;

    // add the first sentence from the control description
    const productDescription = document.querySelector(".product.attribute.description").innerText;
    element.querySelector(`.${ID}-info_content p`).textContent = productDescription.match(/^([\w\d\s!’…\-:;&%(),"]+(\?|\.|\!)).*/)[1];
  }

  bindEvents() {
    const { component } = this;

    const tabHeadings = component.querySelectorAll(`.${ID}-tab`);
    for (let index = 0; index < tabHeadings.length; index += 1) {
        const element = tabHeadings[index];
        element.addEventListener('click', (e) => {
            const matchingTarget = e.currentTarget.getAttribute('tab-target');
            const matchingContent = component.querySelector(`.${ID}-${matchingTarget}`);
            
            // add active classes to the tab heading
            Array.prototype.forEach.call(component.querySelectorAll(`.${ID}-tab`), (tabName) => {
                tabName.classList.remove(`${ID}-tabName_active`);
            });
            e.currentTarget.classList.add(`${ID}-tabName_active`);
            

            // add active class to the matching content
            Array.prototype.forEach.call(component.querySelectorAll(`.${ID}-tabInner`), (tab) => {
                tab.classList.remove(`${ID}-tab_active`);
            });
            matchingContent.classList.add(`${ID}-tab_active`);
        });
    }
  }

  render() {
    const { component } = this;
    const description = document.querySelector('.product-description');
    description.insertAdjacentElement('beforebegin', component);
  }
}
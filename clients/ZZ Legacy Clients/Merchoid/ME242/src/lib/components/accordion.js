import shared from '../shared';

const { ID } = shared;

export default class ProductAccordion {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {
    const productDescText = document.querySelector('.product-description .product.attribute.description .value');

    const element = document.createElement('div');
    element.classList.add(`${ID}_productAccordion`);
    if(window.innerWidth > 767) {
      element.innerHTML = `
      <div class="${ID}-accordionTab_container">
          <div class="${ID}-accordionTab ${productDescText ? `${ID}-tab_active`: ''}" acc-target="${ID}-description">
              <h2>Product Description</h2>
          </div>
          <div class="${ID}-accordionTab ${productDescText ? '': `${ID}-tab_active`}"" acc-target="${ID}-features">
              <h2>Product Features</h2>
          </div>
          <div class="${ID}-accordionTab" acc-target="${ID}-delivery">
              <h2>Delivery and Returns</h2>
          </div>
          <div class="${ID}-accordionTab" acc-target="${ID}-about">
              <h2>About Merchoid</h2>
          </div>
        </div>
        <div class="${ID}-content_wrapper">
          <div class="${ID}-accordionContent ${ID}-description ${productDescText ? `${ID}-accordion_active`: ''}"></div>
          <div class="${ID}-accordionContent ${ID}-features ${productDescText ? '': `${ID}-accordion_active`}"></div>
          <div class="${ID}-accordionContent ${ID}-delivery"></div>
          <div class="${ID}-accordionContent ${ID}-about"></div>
        </div>
    `;

    } else {
      element.innerHTML = `
        <div class="${ID}-accordionTab ${ID}-tab_active" acc-target="${ID}-description">
            <h2>Product Description</h2>
        </div>
        <div class="${ID}-accordionContent ${ID}-description ${ID}-accordion_active"></div>
        <div class="${ID}-accordionTab" acc-target="${ID}-features">
            <h2>Product Features</h2>
        </div>
        <div class="${ID}-accordionContent ${ID}-features"></div>
        <div class="${ID}-accordionTab" acc-target="${ID}-delivery">
            <h2>Delivery and Returns</h2>
        </div>
        <div class="${ID}-accordionContent ${ID}-delivery"></div>
        <div class="${ID}-accordionTab" acc-target="${ID}-about">
            <h2>About Merchoid</h2>
        </div>
        <div class="${ID}-accordionContent ${ID}-about"></div>
      `;
    }


    this.component = element;
  }

  bindEvents() {
    const { component } = this;

    const allTabs = component.querySelectorAll(`.${ID}-accordionTab`);
    const allContent = component.querySelectorAll(`.${ID}-accordionContent`);

    for (let index = 0; index < allTabs.length; index += 1) {
      const element = allTabs[index];

      element.addEventListener('click', (e) => {
        const thisTarget = e.currentTarget.getAttribute('acc-target');
        const activeTab = document.querySelector(`.${ID}-tab_active`);

        // remove active tab class if any are already active
        if(activeTab) {
          if(activeTab !== e.currentTarget) {
            if(activeTab.classList.contains(`${ID}-tab_active`)) {
              activeTab.classList.remove(`${ID}-tab_active`);
            }
            e.currentTarget.classList.add(`${ID}-tab_active`);
            } else {
              if(window.innerWidth < 767) {
                e.currentTarget.classList.remove(`${ID}-tab_active`);
              }
          }
          // to close the tabs
        } else {
          e.currentTarget.classList.add(`${ID}-tab_active`);
        }
       
        // if any are active, remove the class on mobile
        if(component.querySelector(`.${thisTarget}`).classList.contains(`${ID}-accordion_active`)) {
          if(window.innerWidth < 767) {
            component.querySelector(`.${thisTarget}`).classList.remove(`${ID}-accordion_active`);
          }
         
        } else {
          for (let index = 0; index < allContent.length; index += 1) {
            const element = allContent[index];
            if(element.classList.contains(`${ID}-accordion_active`)) {
              element.classList.remove(`${ID}-accordion_active`);
            }
          }
          component.querySelector(`.${thisTarget}`).classList.add(`${ID}-accordion_active`);
        }
        
        
        // add scroll top
        if(window.innerWidth < 767) {
          document.documentElement.scrollTop += e.currentTarget.getBoundingClientRect().top - 150
        }

      });
      
    }
  } 

  render() {
      const { component } = this;
      
      const productDescription = document.querySelector('.product-description');

      if(window.innerWidth > 767) {
        document.querySelector('#maincontent').insertAdjacentElement('afterend', component);
      } else {
        productDescription.insertAdjacentElement('afterend', component);
      }

      
      // remove product desc tab if it doesn't exist
      const productDescText = document.querySelector('.product-description .product.attribute.description .value');
      if(productDescText) {
        component.querySelector(`.${ID}-description`).innerHTML = productDescText.innerHTML;
      } else {
        component.querySelector(`.${ID}-description`).remove();
        component.querySelector(`.${ID}-accordionTab[acc-target="${ID}-description"]`).remove();
      }
      
      // add all the content to the tabs based off text on the page
      const productFeatures = document.querySelector('.product-secondary-tabs .features-content');
      component.querySelector(`.${ID}-features`).innerHTML = productFeatures.innerHTML;

      const deliveryReturns = document.querySelector('#product_accardion .accardion-content .uc-accordion-content__inner');
      if(deliveryReturns.querySelector('h3').textContent.indexOf('Delivery') > -1) {
        component.querySelector(`.${ID}-delivery`).innerHTML = deliveryReturns.innerHTML;
      }

      const aboutMerchoid = document.querySelector('.product-secondary-tabs .about-content');
      component.querySelector(`.${ID}-about`).innerHTML = aboutMerchoid.innerHTML;
    }
}
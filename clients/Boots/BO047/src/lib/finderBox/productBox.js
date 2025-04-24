import shared from '../shared';

const { ID, VARIATION } = shared;

export default class ProductBox {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}_finderBox-outer`);
    /*element.innerHTML = 
    `
    <div class="${ID}_finderBox">
        <h2>Shop our range of products</h2>
        <p class="${ID}-finderIntroText">Find what you're looking for with our product finder</p>
        <div class="${ID}-selectBoxes">
            <div class="${ID}-selectBox ${ID}-department" data-target="${ID}-department">Select a department</div>
            <div class="${ID}-selectBox ${ID}-category" data-target="${ID}-category">Select a category</div>
            <div class="${ID}-selectBox ${ID}-subCategory" data-target="${ID}-subCategory">Select a subcategory</div>
        </div>
        <div class="${ID}-refine">Refine products</div>
    </div>`;*/
    this.component = element;

    // add product finder outer box
    const productFinder = document.createElement('div');
    productFinder.classList.add(`${ID}-finderOptions_wrapper`)
    productFinder.innerHTML = 
    `<div class="${ID}-optionsTop">
        <div class="${ID}-closeFinder"></div>
        <div class="${ID}-steps">
          <div class="${ID}-step ${ID}-department"></div>
          <div class="${ID}-step ${ID}-category1"></div>
          <div class="${ID}-step ${ID}-category2"></div>
        </div>
        <div class="${ID}-optionsTitle">
          <h3>Select a <span></span></h3>
        </div>
      </div>
      <div class="${ID}-optionsWrapper"> 
        <div class="${ID}-finderOptions"></div>
        ${VARIATION === '3' ? `<div class="${ID}-catOffers"></div>` : ''}
      </div>
      <div class="${ID}_scrollPrompt"></div>
      <div class="${ID}-mobile_back"><span>Back</span></div>`;

      document.querySelector(`.${ID}-heroBanner`).appendChild(productFinder);
  }


  render() {
    const { component } = this;
    document.querySelector(`.${ID}-productFinder`).appendChild(component);

    // move steps for desktop
    /*if(window.innerWidth > 1023) {
      document.querySelector(`.${ID}-optionsTitle`).insertAdjacentElement('afterend', document.querySelector(`.${ID}-steps`));
    }*/

    // on mobile scroll remove the prompt
    if(window.innerWidth < 767) {
      const finderOptions = document.querySelector(`.${ID}-finderOptions`);
      finderOptions.addEventListener('scroll', function(e){
        document.querySelector(`.${ID}_scrollPrompt`).style.display = 'none';
      });
    }
  }
}


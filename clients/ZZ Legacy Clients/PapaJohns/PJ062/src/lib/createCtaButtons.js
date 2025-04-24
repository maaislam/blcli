import settings from './settings';
const { VARIATION } = settings;

export default (postcodeWrapper) => {
  if (VARIATION === '1') {
    const newCtaBtns = `
      <div class="PJ062-orderOptions__wrapper-v1 PJ062-deliverCTA">
        <a class="PJ062-orderOptions__option greenButton" id="PJ062-order__delivery" value="PJ062-delivery" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
          <span class="leftB"></span>  
          <span class="centerB">Deliver</span>
          <span class="rightB"></span>
        </a>
      </div>
      <div class="PJ062-orderOptions__wrapper-v1 PJ062-collectCTA">
        <a class="PJ062-orderOptions__option greenButton" id="PJ062-order__collect" value="PJ062-collection" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
          <span class="leftB"></span>  
          <span class="centerB">I'll collect</span>
          <span class="rightB"></span>
        </a>
      </div>`;

      const postcodeCtaContainer = postcodeWrapper.querySelector('.PJ062-postcodeCta__container');

    if (!document.querySelector('.PJ062-orderOptions__wrapper-v1.PJ062-deliverCTA')) {
      postcodeCtaContainer.insertAdjacentHTML('afterbegin', newCtaBtns);
    }
    
  } else if (VARIATION === '2') {
    let activeDeliverClass = '';
    let activeCollectionClass = '';
    if (localStorage.getItem('PJ062-orderMethod')) {
      switch(localStorage.getItem('PJ062-orderMethod')) {
        case 'PJ062-delivery':
          activeDeliverClass = 'active';
          break;
        case 'PJ062-collection':
          activeCollectionClass = 'active';
          break;
      }
    }
    const newCtaBtns = `<div class="PJ062-orderOptions__wrapper-v2 PJ062-deliverCTA ${activeDeliverClass}">
      <a class="PJ062-orderOptions__option" id="PJ062-order__delivery" value="PJ062-delivery" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
        <span class="PJ062-cta__img PJ062-img__delivery"></span>    
        <span class="PJ062-text">Deliver to me</span>  
      </a>
    </div>
    <div class="PJ062-orderOptions__wrapper-v2 PJ062-collectCTA ${activeCollectionClass}">
      <a class="PJ062-orderOptions__option" id="PJ062-order__collect" value="PJ062-collection" href="javascript:__doPostBack('ctl00$cphBody$lbGetStarted','')">
        <span class="PJ062-cta__img PJ062-img__collect"></span>
        <span class="PJ062-text">I'll collect</span>  
      </a>
    </div>`;
    const postcodeCtaContainer = postcodeWrapper.querySelector('.PJ062-postcodeCta__container');

    if (!document.querySelector('.PJ062-orderOptions__wrapper-v2.PJ062-deliverCTA')) {
      postcodeCtaContainer.insertAdjacentHTML('afterbegin', newCtaBtns);
    }
  }
};
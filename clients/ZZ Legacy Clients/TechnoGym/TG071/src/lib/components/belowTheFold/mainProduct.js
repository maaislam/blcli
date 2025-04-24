import specs from './specs';
import faqs from './faqs';
import { observer } from '../../../../../../../lib/uc-lib';
import { __ } from '../../helpers';

export default () => {
  const newProductSection = document.querySelector('.TG071-mainProduct');

  const createMainProduct = () => {
    const mainProduct = document.querySelector('#main');
    newProductSection.innerHTML = `
    <h2>${__('BUY MYRUN')}</h2>
    ${window.location.href.indexOf('/it') > -1 ? `<p class="finance_message">DA 85€ mese* / TAN 0% / TAEG 0%</p>` : ''}
    <p>${__('MYRUN TECHNOGYM is more than a treadmill. It is the first solution for running that seamlessly integrates a treadmill and a native app that syncs to your tablet, and is designed to offer you the ultimate running experience, with personalised training programmes and instant running feedback. This will improve the way you run. Forever.')}</p>
    <div class="TG071-product"></div>`;
    document.querySelector('.TG071-product').appendChild(mainProduct);

    // change the CTA
    const addButton = document.querySelector('.configuration-buttons .button');
    const finalAddButton = document.querySelector('button.btn-cart.btn-block');
    addButton.classList.add('TG071-primary_button');
    addButton.classList.add('TG071-button');
    finalAddButton.classList.add('TG071-primary_button');
    finalAddButton.classList.add('TG071-button');
    finalAddButton.classList.remove('btn-cart');
  };

  /* Add the colour options container */
  const colourContainer = () => {
    const newOptionsContainer = document.createElement('div');
    newOptionsContainer.classList.add('TG071-colour_options');
    newOptionsContainer.innerHTML = `<h4>${__('Choose your Version')}:</h4><div class="TG071-inner_options"></div>`;
    newProductSection.querySelector('.product-shop .swiper-wrapper .swiper-slide').insertAdjacentElement('afterbegin', newOptionsContainer);
  };

  /* Create the new options from the old ones */
  const addOptions = () => {
    const options = document.querySelectorAll('.input-box .elem-choice-container');
    for (let index = 0; index < options.length; index += 1) {
      const element = options[index];
      const colourText = element.querySelector('.elem-choice').textContent;
      const colourImage = element.querySelector('img').getAttribute('src');

      const newOption = document.createElement('div');
      newOption.classList.add('TG071-option');
      newOption.innerHTML = `
      <div data-match="${element.id}" class="TG071-colour">
        <div class="TG071-colour_image" style="background-image: url('${colourImage}')"></div>
        <p>${colourText}</p>
      </div>`;
      document.querySelector('.TG071-inner_options').appendChild(newOption);
    }
  };

  /* On click of the new options */
  const selectOptions = () => {
    const newOptions = document.querySelectorAll('.TG071-inner_options .TG071-colour');

    const handleClick = (e) => {
      e.preventDefault();
      const active = document.querySelector('.TG071-option_selected');
      if (active) {
        active.classList.remove('TG071-option_selected');
      }
      e.currentTarget.classList.add('TG071-option_selected');

      // click the matching select option
      const matchingItem = e.currentTarget.getAttribute('data-match');
      document.querySelector(`#${matchingItem}`).click();
    };

    newOptions.forEach((node) => {
      node.addEventListener('click', handleClick);
    });
  };

  const includesSection = () => {
    const includesText = {
      '//cdn.optimizely.com/img/8355110909/f91b722cdbe44285819ada57b0178ee2.png': [`${__('Treadmill shipping: you will be contacted to arrange a convenient delivery date and time')}`],
      '//cdn.optimizely.com/img/8355110909/eed5b9b2379d45109ddf893e580248af.png': [`${__('Installation, positioning and cleaning of the installation area')}`],
      '//cdn.optimizely.com/img/8355110909/ce61237b1c8b4edb8d54b63fd3bb35bd.png': [`${__('24 months warranty')}`],
    };

    const includesContent = document.createElement('div');
    includesContent.classList.add('TG071-includes_section');
    includesContent.innerHTML = `<h4>${__('Includes')}:</h4>`;
    document.querySelector('.product-shop .swiper-wrapper').insertAdjacentElement('afterend', includesContent);

    Object.keys(includesText).forEach((i) => {
      const data = includesText[i];
      const includedText = document.createElement('p');
      includedText.classList.add('TG071-included_text');
      includedText.innerHTML = `<span style="background-image: url(${[i][0]})"></span><p>${data}</p>`;
      includesContent.appendChild(includedText);
    });

    // change the main product images to white background
    const firstImage = document.querySelector('.product-img-box .product-gallery .swiper-wrapper .swiper-slide:first-of-type img');
    firstImage.setAttribute('src', '//cdn.optimizely.com/img/8355110909/d0400d88630b42a393df0b488ac1c75b.jpg');

    const secondImage = document.querySelector('.product-img-box .product-gallery .swiper-wrapper .swiper-slide:nth-of-type(2) img');
    secondImage.setAttribute('src', '//cdn.optimizely.com/img/8355110909/046088d92cd24a02a621b047a06c0996.jpg');

    // show the next one by default
    const sliderNext = document.querySelector('.gallery-wrapper .swiper-button-next');
    sliderNext.click();

    const productFinanceText = document.querySelector('#new-additional-info-attribute');
    const bottomText = document.createElement('p');
    bottomText.classList.add('TG071-finance_text');
    // bottomText.innerHTML = `<p>${__('MYRUN available from £122 a month / flexible payment plans available. Call 0800 316 2496.')} <br><a>${__('Example of a loan')}</a><span> ${__('Price £3250, deposit £325, total credit amount £2925 to be returned in 24 monthly repayments each of £122. 0% interest.')}</span></p><div class="TG069-closeFinance">${__('Close finance example')}</div>`;
    bottomText.appendChild(productFinanceText);
    document.querySelector('.TG071-includes_section').insertAdjacentElement('afterend', bottomText);
/*
    const closeFinance = document.querySelector('.TG071-closeFinance');
    closeFinance.style.display = 'none';
    bottomText.querySelector('a').addEventListener('click', () => {
      bottomText.querySelector('span').style.display = 'block';
      closeFinance.style.display = 'block';
    });

    closeFinance.addEventListener('click', () => {
      bottomText.querySelector('span').style.display = 'none';
      closeFinance.style.display = 'none';
    });*/
  };

  const errorMessage = () => {
    const errorText = document.createElement('div');
    errorText.classList.add('TG071-error');
    errorText.innerHTML = `${__('Please select a version')}`;

    const nextButton = document.querySelector('.configuration-buttons .button.next-step');
    const activeColour = document.querySelector('.TG071-colour');
    nextButton.addEventListener('click', () => {
      if (!activeColour.classList.contains('TG071-option_selected')) {
        nextButton.parentNode.insertAdjacentElement('afterend', errorText);
      } else {
        const errorMessageOnPage = document.querySelector('.TG071-error');
        if (errorMessageOnPage) {
          errorMessageOnPage.remove();
        }
      }
    });
  };

  const changeButtonOnBuy = () => {
    const buyOnlineButton = document.querySelector('.TG071-cta .TG071-primary_button.TG071-button');
    buyOnlineButton.textContent = 'Checkout';

    buyOnlineButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'https://www.technogym.com/gb/onestepcheckout/';
    });
  };

  /*const changeAddToCheckout = () => {
    const addedToBagMessage = document.createElement('div');
    addedToBagMessage.classList.add('TG071-added');
    addedToBagMessage.innerHTML = 'Successfully added to bag';

    const popUp = document.querySelector('.block.aw-afptc-popup');

    const addToCartLast = document.querySelector('.addtocart-replace button');
    if (popUp.style.display !== 'none') {
      addToCartLast.style.display = 'none'; // hide add to bag button

      const checkButton = document.querySelector('.go-checkout .button');
      checkButton.classList.add('TG071-primary_button');
      checkButton.classList.add('TG071-button'); // add classes to checkout button

      // add added to bag message
      if (!document.querySelector('.TG071-added')) {
        const mainProductPosition = document.querySelector('#TG071-mainProduct').getBoundingClientRect().y - 100;
        checkButton.parentNode.parentNode.parentNode.insertAdjacentElement('afterEnd', addedToBagMessage);
        window.scrollTo(0, mainProductPosition);
        changeButtonOnBuy();
      }
    }
  };*/

  const changeAddToCheckout = () => {
    const addedToBagMessage = document.createElement('div');
    addedToBagMessage.classList.add('TG071-added');
    addedToBagMessage.innerHTML = 'Successfully added to bag';
    console.log(addedToBagMessage);

    //const popUp = document.querySelector('.block.aw-afptc-popup');

    const addToCartLast = document.querySelector('.addtocart-replace button');

    const checkoutButton = document.querySelector('.go-checkout')

    if (checkoutButton.style.display !== 'none') {
      addToCartLast.style.display = 'none'; // hide add to bag button

      //const checkButton = document.querySelector('.go-checkout .button');
      checkoutButton.querySelector('.button').classList.add('TG071-primary_button');
      checkoutButton.querySelector('.button').classList.add('TG071-button'); // add classes to checkout button

      // add added to bag message
      if (!document.querySelector('.TG071-added')) {
        //const mainProductPosition = document.querySelector('#TG069-mainProduct').getBoundingClientRect().y - 100;
        document.querySelector('#summary-slide .configuration-buttons').insertAdjacentElement('afterEnd', addedToBagMessage);
        //window.scrollTo(0, mainProductPosition);
        changeButtonOnBuy();
      }
    }
  };

  const moveNewProductSection = () => {
    const mainproductArea = document.querySelector('#main');
    document.querySelector(`#TG071-mainProduct`).appendChild(mainproductArea);

    // on click of add, keep in same position
    const addButton = document.querySelector('.button.btn-cart.btn-block');
    addButton.addEventListener('click', () => {
    
      if(document.querySelector('.configurable-attribute-select .input-box').classList.contains('validation-error')) {
        const currentPosition = document.querySelector('.gallery-wrapper');
        currentPosition.scrollIntoView();
      }
    });
  }

  const addFinanceMsg = () =>{
    if (document.location.href.indexOf('/it/tapis-roulant-myrun') > -1){

      var productTitle = document.querySelector('.product-name h1');
      var financeMsg = `DA 85€ mese* / TAN 0% / TAEG 0%`;
      
      productTitle.insertAdjacentHTML('afterend', financeMsg);
      
      }
  }

  //createMainProduct();
  //colourContainer();
  //addOptions();
  //selectOptions();
  //includesSection();
  moveNewProductSection();
  specs();
  faqs();
  addFinanceMsg();
  //errorMessage();

 // observer.connect(document.querySelector('.block.aw-afptc-popup'), () => {
  observer.connect(document.querySelector('.go-checkout'), () => {
    //changeAddToCheckout();
  }, {
    config: { attributes: true, childList: true, subtree: false },
    throttle: 1000,
  });
};

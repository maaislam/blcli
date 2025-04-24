import specs from './specs';
import faqs from './faqs';
import { pollerLite, observer } from '../../../../../../../../../lib/uc-lib';
import { __, getLanguage } from '../../../../helpers';

export default () => {
  const newProductSection = document.querySelector('.TG103-mainProduct');

  const createMainProduct = () => {
    const mainProduct = document.querySelector('#main');
    newProductSection.innerHTML = `
    <h2>${__('BUY MYRUN')}</h2>
    <p>${__('MYRUN TECHNOGYM is more than a treadmill. It is the first solution for running that seamlessly integrates a treadmill and a native app that syncs to your tablet, and is designed to offer you the ultimate running experience, with personalised training programmes and instant running feedback. This will improve the way you run. Forever.')}</p>
    <div class="TG103-product"></div>`;
    document.querySelector('.TG103-product').appendChild(mainProduct);

    // change the CTA
    const addButton = document.querySelector('.configuration-buttons .button');
    const finalAddButton = document.querySelector('button.btn-cart.btn-block');
    addButton.classList.add('TG103-primary_button');
    addButton.classList.add('TG103-button');
    finalAddButton.classList.add('TG103-primary_button');
    finalAddButton.classList.add('TG103-button');
    finalAddButton.classList.remove('btn-cart');
  };

  /* Add the colour options container */
  const colourContainer = () => {
    const newOptionsContainer = document.createElement('div');
    newOptionsContainer.classList.add('TG103-colour_options');
    newOptionsContainer.innerHTML = `<h4>${__('Choose your Version')}:</h4><div class="TG103-inner_options"></div>`;
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
      newOption.classList.add('TG103-option');
      newOption.innerHTML = `
      <div data-match="${element.id}" class="TG103-colour">
        <div class="TG103-colour_image" style="background-image: url('${colourImage}')"></div>
        <p>${colourText}</p>
      </div>`;
      document.querySelector('.TG103-inner_options').appendChild(newOption);
    }
  };

  /* On click of the new options */
  const selectOptions = () => {
    const newOptions = document.querySelectorAll('.TG103-inner_options .TG103-colour');

    const handleClick = (e) => {
      e.preventDefault();
      const active = document.querySelector('.TG103-option_selected');
      if (active) {
        active.classList.remove('TG103-option_selected');
      }
      e.currentTarget.classList.add('TG103-option_selected');

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
    includesContent.classList.add('TG103-includes_section');
    includesContent.innerHTML = `<h4>${__('Includes')}:</h4>`;
    document.querySelector('.product-shop .swiper-wrapper').insertAdjacentElement('afterend', includesContent);

    Object.keys(includesText).forEach((i) => {
      const data = includesText[i];
      const includedText = document.createElement('p');
      includedText.classList.add('TG103-included_text');
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
    bottomText.classList.add('TG103-finance_text');
    // bottomText.innerHTML = `<p>${__('MYRUN available from £122 a month / flexible payment plans available. Call 0800 316 2496.')} <br><a>${__('Example of a loan')}</a><span> ${__('Price £3250, deposit £325, total credit amount £2925 to be returned in 24 monthly repayments each of £122. 0% interest.')}</span></p><div class="TG103-closeFinance">${__('Close finance example')}</div>`;
    bottomText.appendChild(productFinanceText);
    document.querySelector('.TG103-includes_section').insertAdjacentElement('afterend', bottomText);

    /*const closeFinance = document.querySelector('.TG103-closeFinance');
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
    errorText.classList.add('TG103-error');
    errorText.innerHTML = `${__('Please select a version')}`;

    const nextButton = document.querySelector('.configuration-buttons .button.next-step');
    const activeColour = document.querySelector('.TG103-colour');
    nextButton.addEventListener('click', () => {
      if (!activeColour.classList.contains('TG103-option_selected')) {
        nextButton.parentNode.insertAdjacentElement('afterend', errorText);
      } else {
        const errorMessageOnPage = document.querySelector('.TG103-error');
        if (errorMessageOnPage) {
          errorMessageOnPage.remove();
        }
      }
    });
  };

  const changeSliderImages = () => {
    const galleryButton = document.querySelector('#image-gallery-button');
    galleryButton.addEventListener('click', () => {
      const sliderOneThumb = document.querySelector('#blueimp-gallery .indicator li[data-index="3"]');
      const sliderTwoThumb = document.querySelector('#blueimp-gallery .indicator li[data-index="4"]');
      const sliderThreeThumb = document.querySelector('#blueimp-gallery .indicator li[data-index="5"]');

      const sliderImageOne = document.querySelector('#blueimp-gallery .slide[data-index="3"]');
      const sliderImageTwo = document.querySelector('#blueimp-gallery .slide[data-index="4"]');
      const sliderImageThree = document.querySelector('#blueimp-gallery .slide[data-index="5"]');

      // change thumbnails
      sliderOneThumb.setAttribute('style', 'background-image: url("//cdn.optimizely.com/img/8355110909/295172c97ef644a786a663d0c2fe1ce7.jpg")');
      sliderTwoThumb.setAttribute('style', 'background-image: url("//cdn.optimizely.com/img/8355110909/1efe733b3c6c40dcbd02dd2b2349a6b7.jpg")');
      sliderThreeThumb.setAttribute('style', 'background-image: url("//cdn.optimizely.com/img/8355110909/12575366ecee4db4ba0c811fdc53d313.jpg")');

      pollerLite(['#blueimp-gallery .slide[data-index="3"] img'], () => {
        sliderImageOne.querySelector('img').setAttribute('src', '//cdn.optimizely.com/img/8355110909/295172c97ef644a786a663d0c2fe1ce7.jpg');
        sliderImageTwo.querySelector('img').setAttribute('src', '//cdn.optimizely.com/img/8355110909/1efe733b3c6c40dcbd02dd2b2349a6b7.jpg');
        sliderImageThree.querySelector('img').setAttribute('src', '//cdn.optimizely.com/img/8355110909/12575366ecee4db4ba0c811fdc53d313.jpg');
      });
    });
  };

  const changeButtonOnBuy = () => {
    const buyOnlineButton = document.querySelector('.TG103-cta .TG103-primary_button.TG103-button');
    buyOnlineButton.textContent = 'Checkout';

    buyOnlineButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'https://www.technogym.com/gb/onestepcheckout/';
    });

    const basketIcon = document.querySelector('.mini-cart.items-in-cart');
    const navBasketIcon = basketIcon.cloneNode(true);
    const stickyNav = document.querySelector('.TG103-sticky_nav_wrapper .TG103-cta');
    stickyNav.insertAdjacentElement('afterend', navBasketIcon);

    const checkoutLink = document.querySelector('.TG103-sticky_nav_wrapper .mini-cart.items-in-cart a');
    checkoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      checkoutLink.setAttribute('data-toggle', '');
      if (window.location.href.indexOf('/it/') > -1){
        window.location.href = 'https://www.technogym.com/it/checkout/cart/';
      }
      else if (window.location.href.indexOf('/gb/') > -1){
      window.location.href = 'https://www.technogym.com/gb/checkout/cart/';
      }
    });
  };

  const changeAddToCheckout = () => {
    const addedToBagMessage = document.createElement('div');
    addedToBagMessage.classList.add('TG103-added');
    addedToBagMessage.innerHTML = 'Successfully added to bag';

    const popUp = document.querySelector('.block.aw-afptc-popup');

    const addToCartLast = document.querySelector('.addtocart-replace button');
    if (popUp.style.display !== 'none') {
      addToCartLast.style.display = 'none'; // hide add to bag button

      const checkButton = document.querySelector('.go-checkout .button');
      checkButton.classList.add('TG103-primary_button');
      checkButton.classList.add('TG103-button'); // add classes to checkout button

      // add added to bag message
      if (!document.querySelector('.TG103-added')) {
        const mainProductPosition = document.querySelector('#TG103-mainProduct').getBoundingClientRect().y - 100;
        checkButton.parentNode.parentNode.parentNode.insertAdjacentElement('afterEnd', addedToBagMessage);
        window.scrollTo(0, mainProductPosition);
        changeButtonOnBuy();
      }
    }
  };

  observer.connect(document.querySelector('.block.aw-afptc-popup'), () => {
    changeAddToCheckout();
  }, {
    config: { attributes: true, childList: true, subtree: false },
    throttle: 1000,
  });


  createMainProduct();
  colourContainer();
  addOptions();
  selectOptions();
  includesSection();
  specs();
  faqs();
  errorMessage();

  pollerLite(['#blueimp-gallery'], () => {
    changeSliderImages();
  });
};

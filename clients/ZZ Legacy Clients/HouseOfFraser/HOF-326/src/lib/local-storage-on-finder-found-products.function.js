import shared from '../../../../../core-files/shared';
import { getStorage } from './local-storage.function';
import { fireEvent } from '../../../../../core-files/services';
import { getSeeAllMatchesUrl } from './request-helpers.function';
const { ID, VARIATION } = shared;

export const localStorageOnFinderFoundProducts = () => {
  const storage = getStorage();

  const calculatingResultsElement = document.querySelector(
    '.modal__calculating-results'
  );

  // Add 1 second delay to hide the result finder page
  storage.isFinderOpen &&
    setTimeout(() => {
      if (
        !calculatingResultsElement.classList.contains(
          'modal__calculating-results--hidden'
        )
      ) {
        calculatingResultsElement.classList.add(
          'modal__calculating-results--hidden'
        );
      }
    }, 1000);

  const swipperBase = `<div class="swiper-container">
     <div class="swiper-wrapper"></div>
     <div class="modal-swiper__see-all-matches"></div>
   </div>`;

  if (!!document.querySelector('.modal-swiper__wrapper .swiper-container'))
    document.querySelector('.modal-swiper__wrapper .swiper-container').remove();

  document
    .querySelector('.modal-swiper__wrapper')
    .insertAdjacentHTML('afterbegin', swipperBase);

  // Add elements to swipper wrapper
  document
    .querySelector('.modal-swiper__wrapper .swiper-container .swiper-wrapper')
    .insertAdjacentHTML(
      'afterbegin',
      storage.steps[5].products
        .map(
          (product) => `
            <div class="swiper-slide">
                <div class="modal-swiper__content">
                  <div class="modal-swiper__image-desktop">
                      <img class="" src="${product.image}" alt="${product.imageAltText}" />
                  </div>
                  <div class="modal-swiper__content-desktop">
                    <div class="modal-swiper__content-top">
                      <div class="modal-swiper__content-top--image-mobile">
                        <img class="" src="${product.image}" alt="${product.imageAltText}" />
                      </div>
                      <div class="modal-swiper__content-top--text">
                        <p class="modal-swiper__content-top--text-brand">${product.brand}</p>
                        <p class="modal-swiper__content-top--text-name">${product.name}</p>
                        <p class="modal-swiper__content-top--text-price">From: ${product.price}</p>
                      </div>
                    </div>
                    <div class="modal-swiper__content-bottom">
                      <p class="modal-swiper__content-bottom-description">${product.productShortDescription.replace(/(<([^>]+)>)/gi, "").replace('<div', '')}</p>
                      <div class="modal-swiper__content-bottom-buttons">
                          <a class="modal-swiper__content-bottom-buttons--link" data-name="${product.name}" href="${product.url}">VIEW PRODUCT <span class="modal-swiper__content-bottom-buttons--link-underscore"></span></a>
                          <div class="modal-swiper__content-bottom-buttons--button-container">
                            <button class="modal-swiper__content-bottom-buttons--button" data-id="${product.addToBadId}" data-name="${product.name}">ADD TO BAG</button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
     `
        )
        .join('')
    );

  const slider = document.querySelector(
    '.modal-swiper__wrapper .swiper-container'
  );

  slider.classList.add('swiper-active');

  // Swiper
  const swiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    spaceBetween: 10,
    grabCursor: true,
    // Responsive breakpoints
    slidesPerView: 2,
    slidesPerGroup: 2,
    loopFillGroupWithBlank: true,
    breakpoints: {
      1024: {
        slidesPerView: 1.8,
        slidesPerGroup: 1,
      },
      767: {
        slidesPerView: 1.4,
        slidesPerGroup: 1,
      },
      600: {
        slidesPerView: 1.2,
        slidesPerGroup: 1,
      },
    },
    navigation: {
      nextEl: '.modal-swiper__wrapper .swiper-button-next',
      prevEl: '.modal-swiper__wrapper .swiper-button-prev',
    },
  });

  // Add see all matches 'a' element
  document
    .querySelector('.modal-swiper__see-all-matches')
    .insertAdjacentHTML(
      'afterbegin',
      `<a href="${getSeeAllMatchesUrl()}" class="modal-swiper__see-all-matches--button">SEE ALL MATCHES (${
        storage.steps[5]?.numberOfProducts ?? 0
      }) <span class="modal-swiper__see-all-matches-underscore"></span></a>`
    );

  // Add listener to the see all matches button
  document
    .querySelector('.modal-swiper__see-all-matches--button')
    .addEventListener('click', (e) => {
      e.preventDefault();
      fireEvent(
        `Fragrance Finder - step: 5 (Your Top Matches) - user clicked SEE ALL MATCHES and is redirected to: ${getSeeAllMatchesUrl()}.`
      );

      if (window.location.href === e.target.href)
        return window.location.reload();

      window.location = e.target.href;
    });

  // Event listener on the VIEW PRODUCT button
  for (const element of document.querySelectorAll(
    '.modal-swiper__content-bottom-buttons--link'
  )) {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      fireEvent(
        `Fragrance Finder - step: 5 (Your Top Matches) - user clicked VIEW PRODUCT with name: ${e.target.dataset?.name} and url: ${e.target.href}.`
      );
      window.location = e.target.href;
    });
  }

  // Event listener on the ADD TO BASKER
  for (const element of document.querySelectorAll(
    '.modal-swiper__content-bottom-buttons--button'
  )) {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      fireEvent(
        `Fragrance Finder - step: 5 (Your Top Matches) - user clicked ADD TO BASKET with name: ${e.target.dataset?.name} and id: ${e.target.dataset?.id}.`
      );

      // Add to basket call
      $.ajax({
        type: 'POST',
        url: '/api/basket/v1/add',
        data: JSON.stringify([
          {
            sizeVariantId: e.target.dataset?.id,
            quantity: '1',
            personalisation: [],
            isProductRec: false,
          },
        ]),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true,
        },
        success: function (data, error) {
          fireEvent(
            `Fragrance Finder - step: 5 (Your Top Matches) - user succesfully added product to basket (id: ${e.target.dataset?.id}).`
          );

          e.target.innerHTML = 'ADDED';

          // Add listener to the modal close button -> refresh the page
          const modalCloseButtons =
            document.querySelectorAll(`.modal__btn-close`);

          for (const closeButton of modalCloseButtons) {
            const newButton = closeButton.cloneNode(true);
            closeButton.parentNode.replaceChild(newButton, closeButton);
            newButton.addEventListener('click', (e) => {
              e.preventDefault();
              window.location.reload();
            });
          }
        },
      });
    });
  }

  swiper.init();
};

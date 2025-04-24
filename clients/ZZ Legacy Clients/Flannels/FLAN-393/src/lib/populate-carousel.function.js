import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import { displaySlider } from './display-slider.function';
import { getStorage, setStorage } from './get-product-data.function';

const { ID } = shared;

/**
 * @param {string} price
 * @returns {string}
 */
const formatPrice = (price) => {
  const currencyText = document.querySelector(
    '.spanCurrencyLanguageSelector > p'
  ).innerHTML;

  const currencyCode = currencyText
    .substring(currencyText.indexOf(' '), currencyText.length)
    .trim();

  const alteredPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  return currencyCode == 'EUR' ? alteredPrice.replace('.', ',') : alteredPrice;
};

/**
 * @param {string} sku
 */
const onQuickBuyStorageChange = (sku) => {
  const storage = getStorage();
  const selectedProduct = storage.products[sku];
  const firstVariant = selectedProduct.variantsData[0];
  setStorage({
    ...storage,
    modal: {
      active: { ...firstVariant, sku },
      variants: selectedProduct.variantsData.map((variant) => ({
        ...variant,
        sku,
      })),
    },
  });
};

const onSizeButtonClick = () => {
  for (const sizeButton of document.querySelectorAll(
    `.${ID}-quick-buy-modal-select-size-single-size`
  )) {
    sizeButton.addEventListener('click', (e) => {
      e.preventDefault();

      const sizeVarId = e.currentTarget.dataset.sizevarid;

      fireEvent(
        `FLAN-393: user changed QUICK BUY size to sizeVarId: ${e.currentTarget.dataset.sizevarid}.`
      );

      // Change styles on chosen element
      document
        .querySelector(
          `.${ID}-quick-buy-modal-select-size-single-size.chosen-size`
        )
        ?.classList.remove('chosen-size');
      document
        .querySelector(`[data-sizevarid='${sizeVarId}']`)
        ?.classList.add('chosen-size');
    });
  }
};

export const populateCarousel = (items) => {
  // Create and insert HTML for each slot
  const htmlItemsToInsert = items.reduce(
    (acc, slot) =>
      acc +
      `
  <div data-product-sku="${
    slot.item.sku
  }" class="swiper-slide ${ID}-carousel-slide">
        <a href="${slot.item.url}" class="${ID}-carousel-image">
          <img src="${
            slot.item.image_url
          }" class="${ID}-carousel-image-element" alt="${
        slot.item.name
      } image" />
        </a>
        <div class="${ID}-carousel-product-info">
          <a href="${slot.item.url}">
          <p class="${ID}-product-brand">${slot.item.brand}</p>
          <p class="${ID}-product-name">${slot.item.name}</p>
          <p class="${ID}-prices ${
        slot.item.price == slot.item.ticket_price ||
        slot.item.ticket_price == '0.00'
          ? 'equal-prices'
          : 'sale-prices'
      }"><span class="now-price">${formatPrice(
        slot.item.price
      )}</span> <span class="was-price">${formatPrice(
        slot.item.ticket_price
      )}</span> </p> </a>
          <button data-sku=${
            slot.item.sku
          } class="${ID}-quick-buy-button">QUICK VIEW</button>
        </div>
      </div>
  </div>
`,
    ''
  );

  // Get the carousel wrapper
  const carouselWrapper = document.querySelector(
    `#${ID}-recs-carousel-inner .swiper-wrapper`
  );

  carouselWrapper.insertAdjacentHTML('beforeend', htmlItemsToInsert);

  // On QUICK BUY click
  for (const button of document.querySelectorAll(`.${ID}-quick-buy-button`)) {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      fireEvent(
        `FLAN-393: user opened QUICK BUY for product with sku: ${e.currentTarget.dataset.sku}`
      );

      document.documentElement.classList.add(`${ID}-noscroll`);

      onQuickBuyStorageChange(e.currentTarget.dataset.sku);

      const storage = getStorage();

      // Main info about the product
      const selectedProduct = storage.products[e.currentTarget.dataset.sku];
      // Main info about the chosen color
      const activeVariant = storage.modal.active;
      // All avaiable variants
      const allVariants = storage.modal.variants;

      document.querySelector('body').insertAdjacentHTML(
        'beforeend',
        `
      <div class="${ID}-quick-buy-modal-wrapper ${e.currentTarget.dataset.sku}-modal">
        
        <div class="${ID}-quick-buy-modal-content">
        <div class="${ID}-quick-buy-modal-line-on-top"></div>
          <svg class="x-close-button" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
            <g>
              <g>
                  <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                    L284.286,256.002z"/>
              </g>
            </g>
          </svg>
          <img class="${ID}-quick-buy-modal-img" src="${
          activeVariant.imageUrl
        }"></img>
          <div class="${ID}-quick-buy-modal-text">
            <p class="${ID}-quick-buy-modal-text-name">${
          selectedProduct.brand
        }</p>
            <p class="${ID}-quick-buy-modal-text-description">${
          selectedProduct.name
        }</p>
            <p class="${ID}-quick-buy-modal-text-price">${
          activeVariant.prodVarPrices.sellPrice
        }${
          activeVariant.prodVarPrices.sellPrice !==
          activeVariant.prodVarPrices.refPrice
            ? `<span>${activeVariant.prodVarPrices.refPrice}</span>`
            : ``
        }</p>
            <a class="${ID}-quick-buy-modal-text-view-details" href="${
          activeVariant.detailsUrl
        }">View full product details</a>
          </div>
          <div class="${ID}-quick-buy-modal-select-colour">
            <p class="${ID}-quick-buy-modal-select-colour-text">Colour</p>
            <div class="${ID}-quick-buy-modal-select-colour-images ${allVariants.length > 1 ? `multiple-colours` : `single-colours`}">
              ${allVariants.length > 1 ? `
                <select class="${ID}-quick-buy-dropdown ${ID}-quick-buy-dropdown--colour">
                  
                ${allVariants.reduce(
                  (acc, currentVariant) =>
                    acc +
                    `
                  <option class="${ID}-quick-buy-modal-select-colour-images-single" ${currentVariant.colVarId === activeVariant.colVarId ? 'selected="selected"' : ''} value="${currentVariant.colVarId}">${currentVariant.colourName}</option>
                `,
                  ''
                )}
                </select>
              ` :
              `
                <span class="${ID}-quick-buy-single">${allVariants[0].colourName}</span>
              
              `}

              
            </div>
          </div>
          <div class="${ID}-quick-buy-modal-select-size">
            <p class="${ID}-quick-buy-modal-select-size-text">Size</p>
            <div class="${ID}-quick-buy-modal-select-size-sizes">
              <select class="${ID}-quick-buy-dropdown ${ID}-quick-buy-dropdown--size">
                <option>Please select</option>
              ${activeVariant.sizeVariants.reduce(
                (acc, currentVariant) =>
                  acc +
                  `<option class="${ID}-quick-buy-modal-select-size-single-size" value="${currentVariant.sizeVarId}">${currentVariant.sizeName}</option>`,
                ''
              )}
              </select>
            </div>
          </div>
          <div class="${ID}-add-to-bag-container">
            <button class="${ID}-add-to-bag">ADD TO BAG</button>
          </div>
          <a class="${ID}-quick-buy-modal-text-view-details--desktop" href="${
          activeVariant.detailsUrl
        }">View full product details</a>
        </div>
      </div>
      `
      );

      // Show slowly
      const modalElement = document.querySelector(
        `.${ID}-quick-buy-modal-wrapper`
      );

      setTimeout(() => {
        modalElement.classList.add('slowly-show');
      }, 50);

      // On X click

      modalElement.addEventListener('click', (e) => {
        e.stopPropagation();
        if(!e.target.closest(`.${ID}-quick-buy-modal-content`)) {
          modalElement.classList.add('slowly-hide');

          fireEvent(`FLAN-393: user closed QUICK BUY window by clicking outside the modal.`);
          document.documentElement.classList.remove(`${ID}-noscroll`);
          setTimeout(() => {
            modalElement.remove();
          }, 510);
        }

      })

      document
        .querySelector('.x-close-button')
        .addEventListener('click', () => {
          modalElement.classList.add('slowly-hide');

          fireEvent(`FLAN-393: user closed QUICK BUY window by clicking the X.`);
          document.documentElement.classList.remove(`${ID}-noscroll`);
          setTimeout(() => {
            modalElement.remove();
          }, 510);
        });

        if(document.querySelector(`.${ID}-quick-buy-dropdown--colour`)) {
          document.querySelector(`.${ID}-quick-buy-dropdown--colour`).addEventListener('change', (e) => {
            const storage = getStorage();
            const colVarId = e.currentTarget.value;
            const allVariants = storage.modal.variants;
            const newActive = allVariants.find(
              (variant) => variant.colVarId === colVarId
            );
  
            fireEvent(
              `FLAN-393: user changed QUICK BUY color to colVarId: ${colVarId}.`
            );
  
            // Change chosen image
            document.querySelector(`.${ID}-quick-buy-modal-img`).src =
              newActive.imageUrl;
  
            // Change view details buttons
            document.querySelector(
              `.${ID}-quick-buy-modal-text-view-details`
            ).href = newActive.detailsUrl;
            document.querySelector(
              `.${ID}-quick-buy-modal-text-view-details--desktop`
            ).href = newActive.detailsUrl;
  
            // Change chosen image on scroll
            document
              .querySelector(
                `.${ID}-quick-buy-modal-select-colour-images-single.chosen-img`
              )
              ?.classList.remove('chosen-img');
            document
              .querySelector(`[data-colvarid='${colVarId}']`)
              ?.classList.add('chosen-img');
  
            document
              .querySelector(`.${ID}-quick-buy-dropdown--size`).innerHTML = "";
  
            // Add new size buttons
            document
              .querySelector(`.${ID}-quick-buy-dropdown--size`)
              .insertAdjacentHTML(
                'afterbegin',
                newActive.sizeVariants.reduce(
                  (acc, currentVariant) =>
                    acc +
                    `<option class="${ID}-quick-buy-modal-select-size-single-size" value="${currentVariant.sizeVarId}">${currentVariant.sizeName}</option>`,
                  ''
                )
              );
            // On change size
            onSizeButtonClick();
          });
        }
        

      // On change size
      onSizeButtonClick();

      // Add to bag functionality
      document
        .querySelector(`.${ID}-add-to-bag`)
        .addEventListener('click', (e) => {
          e.preventDefault();

          let chosenSize = false;
          
          if(document.querySelector(`.${ID}-quick-buy-dropdown--size`).value !== "Please select") {
            chosenSize = true;
          }

          if (!chosenSize) {
            document
              .querySelector(`.${ID}-quick-buy-modal-select-size`)
              ?.classList.add('shake');

            setTimeout(() => {
              document.querySelector('.shake')?.classList.remove('shake');
            }, 1000);

            return;
          }

          const sizeVarId = document.querySelector(`.${ID}-quick-buy-dropdown--size`).value;

          fireEvent(
            `FLAN-393: user clicked ADD TO BASKET for product with sizeVarId: ${sizeVarId}.`
          );

          const bagContent = [
            {
              sizeVariantId: sizeVarId,
              quantity: '1',
              personalisation: [],
              isProductRec: false,
            },
          ];

          $.ajax({
            type: 'POST',
            url: '/api/basket/v1/add',
            data: JSON.stringify(bagContent),
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
              withCredentials: true,
            },
            success: function (data, error) {
              const addedMessage = `FLAN-393: product sizeVarId: ${sizeVarId} added to basket.`;
              logMessage(addedMessage);
              fireEvent(addedMessage);

              window.location.reload();
            },
          });
        });
    });
  }

  setTimeout(() => {
    displaySlider();
  }, 1000);
};

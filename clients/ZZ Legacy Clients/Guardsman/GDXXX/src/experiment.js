import { fullStory, events } from '../../../../lib/utils';
import { poller } from '../../../../lib/uc-lib';
import { basket, basketRollover, newBasketItem } from './lib/basketMarkup';
import flicker from './lib/flickerPrevention';
/* eslint no-param-reassign: ["error", { "props": false }] */

/**
 * {{GDXXX}} - {{Guardsman Quote}}
 */

flicker();

const Run = () => {
  function removeC(el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'GDXXX',
      VARIATION: '1',
    },
    cache: (() => {
      const bodyVar = document.body;
      const navTabs = document.querySelector('#nav_tabs');
      const basketJSON = [];
      let newItemAdded;
      // Apparently ESLint can't read code properly and see
      // that after a function call it get's reassigned
      // eslint-disable-next-line
      let $ = false;
      let fadeTimeout;

      return {
        bodyVar,
        navTabs,
        basketJSON,
        newItemAdded,
        $,
        fadeTimeout,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;
      if (Exp.cache.bodyVar.querySelector('.logout')) {
        Exp.hideFlicker();
      } else {
        Exp.cache.bodyVar.classList.add(settings.ID);
        services.tracking();

        components.header.addBasketMarkup();
        components.header.basketReveal();
        components.header.newItemReveal();
        components.header.navCheck();
        services.URLCheck();
        services.localStorageJSON();

        // Debug Basket API
        // services.testBasket();
      }
    },
    hideFlicker: () => {
      const hide = document.getElementById('GDXXX_flickerPrevention');
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      IsNaNFunc(o) {
        // eslint-disable-next-line
        return typeof (o) === 'number' && isNaN(o);
      },
      testBasket: () => {
        window.basket = window.basket || {};

        window.basket.load = function load() {
          console.log(Exp.cache.basketJSON);
        };
        window.basket.clearBasket = function clearBasket() {
          localStorage.removeItem('GDXXX_basket');
          Exp.cache.basketJSON = [];
        };
      },
      emptyBasket: () => {
        localStorage.removeItem('GDXXX_basket');
        Exp.cache.basketJSON = [];
        window.location.reload();
      },
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      URLCheck: () => {
        const { components } = Exp;
        const URL = window.location.href;

        if (URL.match(/(http:|https:)(\/)(\/)(www.guardsmanltd.co.uk)(\/)[\w\d-_+_]+(\/)[\w\d-_+_]+(~c~).+($|\?.*)/) || URL.match(/(http:|https:)(\/)(\/)(www.guardsmanltd.co.uk)(\/)[\w\d-_+_]+(~c~).+($|\?.*)/) || URL.match(/(http:|https:)(\/)(\/)(www\.guardsmanltd\.co\.uk)(\/)([\w\d-_+_]+(\/)[\w\d-_+_]+(\/)[\w\d-_+_]+(~c~).+)|([\w\d-_+_]+(\/)[\w\d-_+_]+(\/)[\w\d-_+_]+(\/)[\w\d-_+_]+(~c~).+)($|\?.*)/)) {
          components.catPage.poller();
        } else if (URL.match(/(http:|https:)(\/)(\/)(www\.guardsmanltd\.co\.uk)(\/)([\w\d-_+_]+(\/)[\w\d-_+_]+(\/)[\w\d-_+_]+(~c~).+)|([\w\d-_+_]+(\/)[\w\d-_+_]+(\/)[\w\d-_+_]+(\/)[\w\d-_+_]+(~p~).+)($|\?.*)/)) {
          components.prodPage.poller();
        } else if (URL.indexOf('/cart') > -1) {
          components.basketPage.poller();
        } else {
          Exp.hideFlicker();
        }
      },
      sendQuote: () => {
        const basketPage = document.querySelector('.GDXXX_page-wrap');

        Exp.cache.$.ajax({
          url: 'https://ab-test-sandbox.userconversion.com/guardsman-orderer/api/submit-data-no-captcha',
          type: 'post',
          data: {
            name: document.querySelector('.GDXXX_name').value,
            postcode: document.querySelector('.GDXXX_postcode').value,
            phone: document.querySelector('.GDXXX_phone').value,
            email: document.querySelector('.GDXXX_email').value,
            formData: Exp.cache.basketJSON,
          },
          success: () => {
            basketPage.classList.add('GDXXX_transition');
            Exp.cache.$('html, body').animate({
              scrollTop: 0,
            }, 1000);
            localStorage.removeItem('GDXXX_basket');
            Exp.cache.basketJSON = [];
          },
          error: () => {
            basketPage.querySelector('.GDXXX_basket-confirmation h2').innerText = 'The quote has failed to send successfully';
            basketPage.querySelector('.GDXXX_basket-confirmation p').innerText = 'Please try refreshing the page and submitting your quote again.';
            basketPage.classList.add('GDXXX_transition');
            Exp.cache.$('html, body').animate({
              scrollTop: 0,
            }, 1000);
          },
        });
        /* eslint-disable */
        // Exp.cache.$.ajax({
        //   url: 'https://ab-test-sandbox.userconversion.com/guardsman-orderer/api/submit-data',
        //   type: 'post',
        //   data: {
        //     'g-recaptcha-response': $('#GDXXX_form-el [name=g-recaptcha-response]').val(),
        //     name: document.querySelector('.GDXXX_name').value,
        //     postcode: document.querySelector('.GDXXX_postcode').value,
        //     phone: document.querySelector('.GDXXX_phone').value,
        //     email: document.querySelector('.GDXXX_email').value,
        //     formData: Exp.cache.basketJSON,
        //   },
        //   success: () => {
        //     basketPage.classList.add('GDXXX_transition');
        //     Exp.cache.$('html, body').animate({
        //       scrollTop: 0,
        //     }, 1000);
        //     localStorage.removeItem('GDXXX_basket');
        //     Exp.cache.basketJSON = [];
        //   },
        //   error: () => {
        //     basketPage.querySelector('.GDXXX_basket-confirmation h2').innerText = 'The quote has failed to send successfully';
        //     basketPage.querySelector('.GDXXX_basket-confirmation p').innerText = 'Please try refreshing the page and submitting your quote again.';
        //     basketPage.classList.add('GDXXX_transition');
        //     Exp.cache.$('html, body').animate({
        //       scrollTop: 0,
        //     }, 1000);
        //   },
        // });
        /* eslint-enable */
      },
      localStorageJSON: () => {
        let localStorageBasket = localStorage.getItem('GDXXX_basket');

        if (localStorageBasket) {
          localStorageBasket = decodeURIComponent(localStorageBasket);
          localStorageBasket = JSON.parse(localStorageBasket);
          Exp.cache.basketJSON = localStorageBasket;
          let basketQuan = 0;
          let basketQuanCurr = 0;
          const rolloverTarget = document.querySelector('.entries');
          removeC(rolloverTarget.querySelector('.empty-popup-cart'));
          rolloverTarget.insertAdjacentHTML('beforeend', `
            <p class="legend">
              Showing <span class="GDXXX_showing-items">1</span> of <span class="GDXXX_max-items">1</span> Item(s)
            </p>`);

          Exp.cache.basketJSON.forEach((el) => {
            basketQuan += el.qty;
            basketQuanCurr += 1;
            Exp.services.addMarkupToRollover(el.qty, el.name, el.link, el.img, el.code, el.size, rolloverTarget.querySelector('.legend'), el.branding);
          });

          if (basketQuanCurr > 3) {
            basketQuanCurr = 3;
          }

          rolloverTarget.querySelector('.GDXXX_showing-items').innerText = basketQuanCurr;
          rolloverTarget.querySelector('.GDXXX_max-items').innerText = Exp.cache.basketJSON.length;

          Exp.services.updateBasketQuantity(basketQuan);
        }
      },
      /**
       * Updates the basket
       * @constructor
       * @param {number} qty - The amount the user wants to order
       * @param {string} name - The name of the product
       * @param {string} link - The href of the product added
       * @param {string} img - The image src of the product added
       * @param {string} code - The product code
       * @param {any} size - The size of the product if there is one
       * @param {boolean} branding - Can the product have custom branding
       */
      updateBasket: (qty, name, link, img, code, size, branding) => {
        const rolloverCart = document.querySelector('#rollover_cart_popup');
        const newItemAddedReveal = Exp.cache.newItemAdded;

        if (rolloverCart.querySelector('.empty-popup-cart')) {
          removeC(rolloverCart.querySelector('.empty-popup-cart'));
          rolloverCart.querySelector('.entries').insertAdjacentHTML('beforeend', `
            <p class="legend">
              Showing <span class="GDXXX_showing-items">1</span> of <span class="GDXXX_max-items">1</span> Item(s)
            </p>`);

          Exp.services.updateJSON(qty, name, link, img, code, size, false, false, 'none', branding);
          Exp.services.addMarkupToRollover(qty, name, link, img, code, size, rolloverCart.querySelector('.legend'), 'none', branding);
        } else {
          const rolloverCurrentlyShowed = rolloverCart.querySelector('.GDXXX_showing-items');
          const rolloverCurrentTotal = rolloverCart.querySelector('.GDXXX_max-items');
          const currentProductsAdded = rolloverCart.querySelectorAll('.cart_modal_popup');
          let rolloverInt = parseInt(rolloverCurrentlyShowed.innerText, 10);
          let prodMatch = false;
          let brand = 'none';
          let brandTextMatch = '';

          if (branding.available === true && branding.custom === true) {
            brand = true;
            brandTextMatch = 'yes';
          } else if (branding.available === true) {
            brand = false;
            brandTextMatch = 'no';
          }

          [].forEach.call(currentProductsAdded, (el) => {
            if (el.querySelector('.prod_name').innerText === name) {
              if (el.querySelector('.prod_options .product-variant-label + span') && el.querySelector('.prod_options .product-variant-label + span').innerText === size) {
                if (brandTextMatch === 'yes' && el.querySelector('.GDXXX_branding-label span + span') && el.querySelector('.GDXXX_branding-label span + span').innerText.toLowerCase() === brandTextMatch) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, true, true, brand, branding);
                  prodMatch = true;
                } else if (brandTextMatch === 'no' && el.querySelector('.GDXXX_branding-label span + span') && el.querySelector('.GDXXX_branding-label span + span').innerText.toLowerCase() === brandTextMatch) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, true, true, brand, branding);
                  prodMatch = true;
                } else if (brandTextMatch === '' && branding.available === false) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, true, true, brand, branding);
                  prodMatch = true;
                }
              } else if (!el.querySelector('.prod_options .product-variant-label + span')) {
                if (brandTextMatch === 'yes' && el.querySelector('.GDXXX_branding-label span + span') && el.querySelector('.GDXXX_branding-label span + span').innerText.toLowerCase() === brandTextMatch) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, false, true, brand, branding);
                  prodMatch = true;
                } else if (brandTextMatch === 'no' && el.querySelector('.GDXXX_branding-label span + span') && el.querySelector('.GDXXX_branding-label span + span').innerText.toLowerCase() === brandTextMatch) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, false, true, brand, branding);
                  prodMatch = true;
                } else if (brandTextMatch === '' && branding.available === false) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, false, true, brand, branding);
                  prodMatch = true;
                }
              } else if (size === false) {
                if (brandTextMatch === 'yes' && el.querySelector('.GDXXX_branding-label span + span') && el.querySelector('.GDXXX_branding-label span + span').innerText.toLowerCase() === brandTextMatch) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, false, true, brand, branding);
                  prodMatch = true;
                } else if (brandTextMatch === 'no' && el.querySelector('.GDXXX_branding-label span + span') && el.querySelector('.GDXXX_branding-label span + span').innerText.toLowerCase() === brandTextMatch) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, false, true, brand, branding);
                  prodMatch = true;
                } else if (brandTextMatch === '' && branding.available === false) {
                  const quanTarget = el.querySelector('.prod_quantity .product-variant-label + span');
                  const currentQuan = parseInt(quanTarget.innerText, 10) + qty;
                  quanTarget.innerText = currentQuan;
                  // eslint-disable-next-line
                  Exp.services.updateJSON(qty, name, link, img, code, size, false, true, brand, branding);
                  prodMatch = true;
                }
              }
            }
          });

          if (prodMatch === false) {
            rolloverCurrentTotal.innerText = parseInt(rolloverCurrentTotal.innerText, 10) + 1;
            if (rolloverInt < 3) {
              rolloverInt += 1;
              rolloverCurrentlyShowed.innerText = rolloverInt;
            }
            // eslint-disable-next-line
            Exp.services.updateJSON(qty, name, link, img, code, size, false, false, brand, branding);
            Exp.services.addMarkupToRollover(qty, name, link, img, code, size, rolloverCart.querySelector('.legend'), branding);
          }
        }

        newItemAddedReveal.querySelector('.prod_image').innerHTML = `<img src="${img}" alt="${name}" title="${name}" class="prod_primary_image">`;
        newItemAddedReveal.querySelector('.prod_info .prod_name').innerText = name;
        newItemAddedReveal.querySelector('.prod_info .prod_quantity').innerText = `Quantity Added  ${qty}`;

        if (size === false) {
          newItemAddedReveal.querySelector('.prod_info .prod_options').style.display = 'none';
        } else {
          newItemAddedReveal.querySelector('.prod_info .prod_options').style.display = 'block';
          newItemAddedReveal.querySelector('.prod_info .prod_size').innerText = `Size: ${size}`;
        }

        Exp.services.revealNewItem();
        Exp.services.updateBasketQuantity(qty);
      },
      addMarkupToRollover: (qty, name, link, img, code, size, target, branding) => {
        if (size === false) {
          if (branding.available === true && branding.custom === true) {
            target.insertAdjacentHTML('afterend', `
              <div class="cart_modal_popup">
                <div class="prod_image">
                  <a href="${link}">
                    <img src="${img}" alt="${name}" title="${name}" class="prod_primary_image">
                  </a>
                </div>
                <div class="prod_info">
                  <a href="${link}"><p class="prod_name">${name}</p></a>
                  <p class="prod_options">
                    <span class="product-variant-label GDXXX_branding-label">Branding: </span><span>Yes</span>
                  </p>
                  <p class="prod_quantity"><span class="product-variant-label">Quantity </span><span>${qty}</span></p>
                </div>
              </div>
            `);
          } else {
            target.insertAdjacentHTML('afterend', `
              <div class="cart_modal_popup">
                <div class="prod_image">
                  <a href="${link}">
                    <img src="${img}" alt="${name}" title="${name}" class="prod_primary_image">
                  </a>
                </div>
                <div class="prod_info">
                  <a href="${link}"><p class="prod_name">${name}</p></a>
                  <p class="prod_options">
                    <span class="product-variant-label">Branding: </span><span>No</span>
                  </p>
                  <p class="prod_quantity"><span class="product-variant-label">Quantity </span><span>${qty}</span></p>
                </div>
              </div>
            `);
          }
        } else if (branding.available === true && branding.custom === true) {
          target.insertAdjacentHTML('afterend', `
            <div class="cart_modal_popup">
              <div class="prod_image">
                <a href="${link}">
                  <img src="${img}" alt="${name}" title="${name}" class="prod_primary_image">
                </a>
              </div>
              <div class="prod_info">
                <a href="${link}"><p class="prod_name">${name}</p></a>
                <p class="prod_options">
                  <span class="product-variant-label">Size/Option: </span><span>${size}</span>
                    <span class="product-variant-label GDXXX_branding-label">Branding: </span><span>Yes</span>
                </p>
                <p class="prod_quantity"><span class="product-variant-label">Quantity </span><span>${qty}</span></p>
              </div>
            </div>
          `);
        } else {
          target.insertAdjacentHTML('afterend', `
            <div class="cart_modal_popup">
              <div class="prod_image">
                <a href="${link}">
                  <img src="${img}" alt="${name}" title="${name}" class="prod_primary_image">
                </a>
              </div>
              <div class="prod_info">
                <a href="${link}"><p class="prod_name">${name}</p></a>
                <p class="prod_options">
                  <span class="product-variant-label">Size/Option: </span><span>${size}</span>
                </p>
                <p class="prod_quantity"><span class="product-variant-label">Quantity </span><span>${qty}</span></p>
              </div>
            </div>
          `);
        }
      },
      updateBasketQuantity: (toAdd) => {
        const basketQuan = document.querySelector('.GDXXX_basket-quan');
        const quanNum = parseInt(basketQuan.innerText, 10) + toAdd;
        basketQuan.innerText = quanNum;
      },
      storeBasket: (basketJSON) => {
        let encodedJSON = JSON.stringify(basketJSON);
        encodedJSON = encodeURIComponent(encodedJSON);
        localStorage.setItem('GDXXX_basket', encodedJSON);
      },
      // eslint-disable-next-line
      updateJSON: (qtyP, nameP, linkP, imgP, codeP, sizeP, matchedSize, matchedName, branding, productBranding) => {
        let brandingFound = false;
        if (matchedName === true) {
          if (matchedSize === true) {
            if (branding === true || branding === false) {
              Exp.cache.basketJSON.forEach((el) => {
                // eslint-disable-next-line
                if (el.name === nameP && el.size === sizeP && productBranding.custom === el.branding.custom) {
                  let newQTY = el.qty;
                  newQTY += qtyP;

                  el.qty = newQTY;
                  brandingFound = true;
                }
              });
              if (brandingFound === false) {
                Exp.cache.basketJSON.push({
                  qty: qtyP,
                  name: nameP,
                  link: linkP,
                  img: imgP,
                  code: codeP,
                  size: sizeP,
                  branding: productBranding,
                });
              }
            } else {
              Exp.cache.basketJSON.forEach((el) => {
                if (el.name === nameP && el.size === sizeP) {
                  let newQTY = el.qty;
                  newQTY += qtyP;

                  el.qty = newQTY;
                }
              });
            }
          } else if (branding === true || branding === false) {
            Exp.cache.basketJSON.forEach((el) => {
              if (el.name === nameP && productBranding.custom === el.branding.custom) {
                let newQTY = el.qty;
                newQTY += qtyP;

                el.qty = newQTY;
                brandingFound = true;
              }
            });
            if (brandingFound === false) {
              Exp.cache.basketJSON.push({
                qty: qtyP,
                name: nameP,
                link: linkP,
                img: imgP,
                code: codeP,
                size: sizeP,
                branding: productBranding,
              });
            }
          } else {
            Exp.cache.basketJSON.forEach((el) => {
              if (el.name === nameP) {
                let newQTY = el.qty;
                newQTY += qtyP;

                el.qty = newQTY;
              }
            });
          }
        } else {
          Exp.cache.basketJSON.push({
            qty: qtyP,
            name: nameP,
            link: linkP,
            img: imgP,
            code: codeP,
            size: sizeP,
            branding: productBranding,
          });
        }

        Exp.services.storeBasket(Exp.cache.basketJSON);
      },
      revealNewItem: () => {
        poller([
          () => {
            let returnVal = false;
            if (Exp.cache.$ !== false) {
              returnVal = true;
            } else if (window.jQuery) {
              Exp.cache.$ = window.jQuery;
            }

            return returnVal;
          },
        ], () => {
          clearTimeout(Exp.cache.fadeTimeout);
          $(Exp.cache.newItemAdded).fadeIn();

          Exp.cache.fadeTimeout = setTimeout(() => {
            $(Exp.cache.newItemAdded).fadeOut();
          }, 5000);
        });
      },
      basketRefresh: () => {
        const basketQuan = document.querySelector('.GDXXX_basket-quan');
        const rolloverTarget = document.querySelector('.entries');
        let itemCount = 0;

        rolloverTarget.innerHTML = '';
        rolloverTarget.insertAdjacentHTML('beforeend', `
          <p class="legend">
            Showing <span class="GDXXX_showing-items">1</span> of <span class="GDXXX_max-items">1</span> Item(s)
          </p>`);

        const legend = rolloverTarget.querySelector('.legend');
        let prodCount = 0;

        Exp.cache.basketJSON.forEach((item) => {
          itemCount += item.qty;
          prodCount += 1;
          // eslint-disable-next-line
          Exp.services.addMarkupToRollover(item.qty, item.name, item.link, item.img, item.code, item.size, legend, item.branding);
        });

        if (prodCount > 3) {
          document.querySelector('.GDXXX_showing-items').innerText = 3;
        } else {
          document.querySelector('.GDXXX_showing-items').innerText = prodCount;
        }

        document.querySelector('.GDXXX_max-items').innerText = prodCount;

        basketQuan.innerText = itemCount;
      },
      removeItem: (name, size, brandingCurr, current) => {
        if (size !== false) {
          Exp.cache.basketJSON.forEach((arrEl, index, arr) => {
            if (String(arrEl.name) === name && String(arrEl.size) === size) {
              if (arrEl.branding.available === true
              && arrEl.branding.custom === true
              && String(arrEl.branding.custom) === brandingCurr) {
                arr.splice(index, 1);
                current.remove();
              } else if (arrEl.branding.available === true
              && arrEl.branding.custom === false
              && String(arrEl.branding.custom) === brandingCurr) {
                arr.splice(index, 1);
                current.remove();
              } else if (arrEl.branding.available === false
              && String(arrEl.branding.custom) === brandingCurr) {
                arr.splice(index, 1);
                current.remove();
              }
            }
          });
        } else {
          Exp.cache.basketJSON.forEach((arrEl, index, arr) => {
            if (String(arrEl.name) === name) {
              if (arrEl.branding.available === true
              && arrEl.branding.custom === true
              && String(arrEl.branding.custom) === brandingCurr) {
                arr.splice(index, 1);
                current.remove();
              } else if (arrEl.branding.available === true
              && arrEl.branding.custom === false
              && String(arrEl.branding.custom) === brandingCurr) {
                arr.splice(index, 1);
                current.remove();
              } else if (arrEl.branding.available === false
              && String(arrEl.branding.custom) === brandingCurr) {
                arr.splice(index, 1);
                current.remove();
              }
            }
          });
        }

        Exp.services.storeBasket(Exp.cache.basketJSON);
        Exp.services.basketRefresh();
      },
    },
    validation: {
      checkNumber: (str) => {
        const re = /^(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*(\d)?(\D)*$/;
        return re.test(str);
      },
      checkEmail: (str) => {
        // eslint-disable-next-line
        const re = /((([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|("(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21\x23-\x5B\x5D-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*"))@(([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(\[(([\x01-\x08\x0B\x0C\x0E-\x1F\x7F]|[\x21-\x5A\x5E-\x7E])|(\\[\x01-\x09\x0B\x0C\x0E-\x7F]))*\])))/;
        return re.test(str);
      },
      checkPostcode: (str) => {
        // eslint-disable-next-line
        const re = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
        return re.test(str);
      },
    },
    components: {
      header: {
        addBasketMarkup: () => {
          const basketRollPlace = document.getElementById('Branding');

          basketRollPlace.insertAdjacentHTML('afterend', basketRollover);
          basketRollPlace.insertAdjacentHTML('afterend', basket);
          basketRollPlace.insertAdjacentHTML('afterend', newBasketItem);

          Exp.cache.newItemAdded = document.querySelector('.GDXXX_recently-added');
        },
        basketReveal: () => {
          // const { services } = Exp;

          poller([
            () => {
              let returnVal = false;
              if (Exp.cache.$ !== false) {
                returnVal = true;
              } else if (window.jQuery) {
                Exp.cache.$ = window.jQuery;
              }

              return returnVal;
            },
          ], () => {
            const basketHeader = Exp.cache.$('#cart_header');
            const rollover = Exp.cache.$('#rollover_cart_popup');

            basketHeader.on('mouseover', () => {
              if (!rollover.hasClass('GDXXX_reveal')) {
                rollover.stop(true, true).fadeIn().addClass('GDXXX_reveal');
              }
            });
            basketHeader.on('mouseleave', () => {
              setTimeout(() => {
                if (rollover.hasClass('GDXXX_reveal') && !rollover.is(':hover')) {
                  rollover.stop(true, true).fadeOut().removeClass('GDXXX_reveal');
                }
              }, 100);
            });
            rollover.on('mouseover', () => {
              if (!rollover.hasClass('GDXXX_reveal')) {
                rollover.stop(true, true).fadeIn().addClass('GDXXX_reveal');
              }
            });
            rollover.on('mouseleave', () => {
              setTimeout(() => {
                if (rollover.hasClass('GDXXX_reveal') && !basketHeader.is(':hover')) {
                  rollover.stop(true, true).fadeOut().removeClass('GDXXX_reveal');
                }
              }, 100);
            });
          });
        },
        newItemReveal: () => {
          poller([
            () => {
              let returnVal = false;
              if (Exp.cache.$ !== false) {
                returnVal = true;
              } else if (window.jQuery) {
                Exp.cache.$ = window.jQuery;
              }

              return returnVal;
            },
          ], () => {
            const basketHeader = Exp.cache.$('.GDXXX_recently-added');

            basketHeader.on('mouseover', () => {
              if (!basketHeader.hasClass('GDXXX_reveal')) {
                basketHeader.stop(true, true).fadeIn().addClass('GDXXX_reveal');
              }
            });
            basketHeader.on('mouseleave', () => {
              setTimeout(() => {
                if (basketHeader.hasClass('GDXXX_reveal') && !basketHeader.is(':hover')) {
                  basketHeader.stop(true, true).fadeOut().removeClass('GDXXX_reveal');
                }
              }, 100);
            });

            $('.GDXXX_recently-added #add_to_cart_close').on('click', () => {
              $('.GDXXX_recently-added').fadeOut();
            });
          });
        },
        navCheck: () => {
          poller([
            '.subcat_leftNav .nav_column',
          ], () => {
            const shopBy = document.querySelectorAll('.subcat_leftNav .nav_column .item');

            if (shopBy.length < 2) {
              Exp.cache.bodyVar.classList.add('GDXXX_shop_alt');
            }
          });
        },
      },
      catPage: {
        poller: () => {
          poller([
            () => {
              let returnVar = false;
              if (document.querySelector('.add_to_cart_form button')) {
                Exp.components.catPage.init();
                returnVar = true;
              } else if (document.querySelector('.prod_cat_grid')) {
                Exp.hideFlicker();
                returnVar = true;
              } else if (document.querySelector('.prod_refine .strong')) {
                let prodRefine = document.querySelector('.prod_refine .strong').innerText;
                prodRefine = parseInt(prodRefine.replace('Products found'), 10);
                if (prodRefine === 0) {
                  events.send('GDXXX', '0 product category page', window.location.href, { sendOnce: true });
                  Exp.hideFlicker();
                  returnVar = true;
                }
              }
              return returnVar;
            },
          ], () => {});
        },
        init: () => {
          const { catPage } = Exp.components;

          catPage.render();
          catPage.bindings();
          catPage.addToBasket();
          Exp.hideFlicker();
        },
        render: () => {
          const productArr = document.querySelectorAll('.add_to_cart_form');

          [].forEach.call(productArr, (el) => {
            const qtySelector = el.querySelector('.qty');

            el.querySelector('button').insertAdjacentHTML('afterend', '<a class="GDXXX_add_to_quote">Add to quote</a>');
            qtySelector.classList.add('GDXXX_qty-wrap');
            qtySelector.insertAdjacentHTML('afterbegin', `
              <span class="GDXXX_nan">Please Enter a Number</span>
              <a class="GDXXX_qty minus">-</a>
                <input class="GDXXX_qty-input qty profileInputArea" type="text" name="qty" maxlength="4" value="1">
              <a class="GDXXX_qty plus">+</a>`);
          });
        },
        bindings: () => {
          const qtyWraps = document.querySelectorAll('.GDXXX_qty-wrap');

          [].forEach.call(qtyWraps, (el) => {
            const qtyMinus = el.querySelector('.GDXXX_qty.minus');
            const qtyMinusParent = qtyMinus.parentNode;
            const qtyPlus = el.querySelector('.GDXXX_qty.plus');
            const qtyPlusParent = qtyPlus.parentNode;

            qtyMinus.addEventListener('click', () => {
              const qtyInput = qtyMinusParent.querySelector('.GDXXX_qty-input');
              let inputVal = parseFloat(qtyInput.value);
              inputVal = Math.round(inputVal);

              if (inputVal <= 1) {
                inputVal = 1;
              } else {
                inputVal -= 1;
              }
              qtyInput.value = inputVal;
            });

            qtyPlus.addEventListener('click', () => {
              const qtyInput = qtyPlusParent.querySelector('.GDXXX_qty-input');
              let inputVal = parseFloat(qtyInput.value);
              inputVal = Math.round(inputVal);

              if (inputVal < 0) {
                inputVal = 1;
              } else {
                inputVal += 1;
              }
              qtyInput.value = inputVal;
            });
          });
        },
        addToBasket: () => {
          const { services } = Exp;

          poller([
            '.GDXXX_add_to_quote',
            () => {
              let returnVal = false;
              if (Exp.cache.$ !== false) {
                returnVal = true;
              } else if (window.jQuery) {
                Exp.cache.$ = window.jQuery;
              }

              return returnVal;
            },
          ], () => {
            const addToBasketBtn = Exp.cache.$('.GDXXX_add_to_quote');

            addToBasketBtn.each((i, item) => {
              Exp.cache.$(item).on('click', (e) => {
                e.preventDefault();
                const el = Exp.cache.$(item);
                const elParent = el.closest('.prod_cols');
                const qtyWrap = elParent.find('.GDXXX_qty-wrap');
                const qtyVal = parseInt(elParent.find('.GDXXX_qty-input')[0].value, 10);
                const prodName = elParent.find('label a')[0].innerText.trim();
                const prodLink = elParent.find('label a')[0].href;
                const prodImg = elParent.find('.thumb .img a img')[0].src;
                const prodCode = elParent.find('.thumb .code')[0].innerText.replace('Code:', '').trim();
                let size = false;
                const brand = { available: false, custom: false };

                if (Exp.services.IsNaNFunc(qtyVal)) {
                  qtyWrap.addClass('GDXXX_nan-error');
                } else {
                  qtyWrap.removeClass('GDXXX_nan-error');
                  if (elParent.find('.profileSelectArea option').length > 0) {
                    size = elParent.find('.profileSelectArea');
                    size = size.find(':selected').text().replace('Size', '').trim();
                  }

                  if (elParent[0].querySelector('.branding label span input')) {
                    if (elParent[0].querySelector('.branding label span input').checked === true) {
                      brand.available = true;
                      brand.custom = true;
                    } else {
                      brand.available = true;
                      brand.custom = false;
                    }
                  }

                  events.send('GDXXX', 'Add to bag', 'User added to basket on PLP', { sendOnce: true });
                  services.updateBasket(qtyVal, prodName, prodLink, prodImg, prodCode, size, brand);
                }
              });
            });
          });
        },
      },
      prodPage: {
        poller: () => {
          poller([
            () => {
              let returnVar = false;
              if (document.querySelector('#productDetailUpdateable .prod_add_to_cart')) {
                Exp.components.prodPage.init();
                returnVar = true;
              } else if (document.querySelector('.add_to_cart_form button')) {
                Exp.components.catPage.init();
                returnVar = true;
              } else if (document.querySelector('.prod_cat_grid')) {
                Exp.hideFlicker();
                returnVar = true;
              } else if (document.querySelector('.prod_refine .strong')) {
                let prodRefine = document.querySelector('.prod_refine .strong').innerText;
                prodRefine = parseInt(prodRefine.replace('Products found'), 10);
                if (prodRefine === 0) {
                  events.send('GDXXX', '0 product category page', window.location.href, { sendOnce: true });
                  Exp.hideFlicker();
                  returnVar = true;
                }
              }
              return returnVar;
            },
          ], () => {
          });
        },
        init: () => {
          const { prodPage } = Exp.components;

          prodPage.render();
          prodPage.bindings();
          prodPage.addToBasket();
          Exp.hideFlicker();
        },
        render: () => {
          const productArr = document.querySelector('.prod_add_to_cart');
          productArr.insertAdjacentHTML('afterend', `
            <a class="GDXXX_add_to_quote qty">Add to quote</a>
            <div class="GDXXX_qty-wrap">
              <span class="GDXXX_nan">Please Enter a Number</span>
              <a class="GDXXX_qty minus">-</a>
                <input class="GDXXX_qty-input qty profileInputArea" type="text" name="qty" maxlength="4" value="1">
              <a class="GDXXX_qty plus">+</a> 
            </div>`);
        },
        bindings: () => {
          const qtyWraps = document.querySelector('.GDXXX_qty-wrap');
          const qtyMinus = qtyWraps.querySelector('.GDXXX_qty.minus');
          const qtyMinusParent = qtyMinus.parentNode;
          const qtyPlus = qtyWraps.querySelector('.GDXXX_qty.plus');
          const qtyPlusParent = qtyPlus.parentNode;

          qtyMinus.addEventListener('click', () => {
            const qtyInput = qtyMinusParent.querySelector('.GDXXX_qty-input');
            let inputVal = parseFloat(qtyInput.value);
            inputVal = Math.round(inputVal);

            if (inputVal <= 1) {
              inputVal = 1;
            } else {
              inputVal -= 1;
            }
            qtyInput.value = inputVal;
          });

          qtyPlus.addEventListener('click', () => {
            const qtyInput = qtyPlusParent.querySelector('.GDXXX_qty-input');
            let inputVal = parseFloat(qtyInput.value);
            inputVal = Math.round(inputVal);

            if (inputVal < 0) {
              inputVal = 1;
            } else {
              inputVal += 1;
            }
            qtyInput.value = inputVal;
          });
        },
        addToBasket: () => {
          const { services } = Exp;

          poller([
            '.GDXXX_add_to_quote',
            '#imageLink',
            () => {
              let returnVal = false;
              if (Exp.cache.$ !== false) {
                returnVal = true;
              } else if (window.jQuery) {
                Exp.cache.$ = window.jQuery;
              }

              return returnVal;
            },
          ], () => {
            const addToBasketBtn = Exp.cache.$('.GDXXX_add_to_quote');

            addToBasketBtn.on('click', (e) => {
              e.preventDefault();
              const elParent = Exp.cache.$('#content');
              const prodDesc = elParent.find('.mainImageHolder + .span-9 .prod');
              const qtyVal = parseInt(elParent.find('.GDXXX_qty-input')[0].value, 10);
              const qtyWrap = elParent.find('.GDXXX_qty-wrap');
              const prodName = prodDesc.find('> h3:first-child label')[0].innerText.trim();
              const prodLink = window.location.href;
              const prodImg = elParent.find('.mainImageHolder .span-5 .prod_image_main #imageLink img')[0].src;
              const prodCode = prodDesc.find('p.code')[0].innerText.replace('Code:', '').trim();
              let prodSize = false;
              const brand = { available: false, custom: false };

              if (Exp.services.IsNaNFunc(qtyVal)) {
                qtyWrap.addClass('GDXXX_nan-error');
              } else {
                if (elParent.find('.variant_options #variant option').length > 0) {
                  prodSize = elParent.find('.variant_options #variant');
                  prodSize = prodSize.find(':selected').text().replace('Size', '').trim();
                }

                if (elParent[0].querySelector('.branding label span input')) {
                  if (elParent[0].querySelector('.branding label span input').checked === true) {
                    brand.available = true;
                    brand.custom = true;
                  } else {
                    brand.available = true;
                    brand.custom = false;
                  }
                }
                /* eslint-disable */
                events.send('GDXXX', 'Add to bag', 'User added to basket on PDP', { sendOnce: true });
                services.updateBasket(qtyVal, prodName, prodLink, prodImg, prodCode, prodSize, brand);
                /* eslint-enable */
              }
            });
          });
        },
      },
      basketPage: {
        poller: () => {
          poller([
            '#content .span-24.basket .span-20',
          ], Exp.components.basketPage.init);
        },
        init: () => {
          const { basketPage } = Exp.components;

          basketPage.render();
          basketPage.bindings();
          basketPage.formFunctionality();
          Exp.hideFlicker();
        },
        render: () => {
          const contentWrap = document.querySelector('#content .span-24.basket .span-20');
          contentWrap.insertAdjacentHTML('afterend', `
            <div class="GDXXX_page-wrap">
              <section class="GDXXX_basket-wrap">
                <div class="GDXXX_header">
                  <h2>Your Quote Basket</h2>
                  <a class="GDXXX_empty-basket">Empty Basket</a>
                  <a class="GDXXX_go-to">Request Quote</a>
                  <div class="GDXXX_empty-confirm ui-helper-clearfix">
                    <span>Are you sure you want to empty your quote basket?</span>
                    <a class="GDXXX_empty-no">Cancel</a>
                    <a class="GDXXX_empty-yes">Empty</a>
                    <a class="GDXXX_empty-close"></a>
                  </div>
                </div>
                <div class="GDXXX_basket-table GDXXX_clearfix">
                  <div class="GDXXX_table-header">
                    <div>Quote Basket</div>
                    <div>Quantity</div>
                  </div>
                  <div class="GDXXX_basket-products">
                  </div>
                </div>
              </section>
              <section class="GDXXX_quote-form">
                <h3>Request a Quote</h3>
                <div class="GDXXX_form-row">
                  <span class="GDXXX_label">Name: <span>*</span></span>
                  <input type="text" class="GDXXX_input GDXXX_name" placeholder="Name" />
                </div>
                <div class="GDXXX_form-row">
                  <span class="GDXXX_label">Postcode: <span>*</span></span>
                  <input type="text" class="GDXXX_input GDXXX_postcode" placeholder="Postcode" />
                </div>
                <div class="GDXXX_form-row">
                  <span class="GDXXX_label">Phone Number: <span>*</span></span>
                  <input type="text" class="GDXXX_input GDXXX_phone" placeholder="Phone Number" />
                </div>
                <div class="GDXXX_form-row">
                  <span class="GDXXX_label">Email: <span>*</span></span>
                  <input type="email" class="GDXXX_input GDXXX_email" placeholder="Email" />
                </div>
                <a class="GDXXX_submit">Submit Request</a>
              </section>
              <section class="GDXXX_basket-confirmation">
                <h2>The quote has succesfully been sent.</h2>
                <p>We will contact you within 2 hours of this quote being submitted.</p>
              </section>
            </div>
          `);

          contentWrap.classList.add('GDXXX_hide');
          const basketWrap = document.querySelector('.GDXXX_basket-products');

          if (Exp.cache.basketJSON.length === 0) {
            document.querySelector('.GDXXX_table-header').innerHTML = '<h3>Your quote basket is empty</h3>';
            document.querySelector('.GDXXX_header').classList.add('GDXXX_hide');
            document.querySelector('.GDXXX_basket-table').classList.add('GDXXX_empty-basket');
            document.querySelector('.GDXXX_quote-form').classList.add('GDXXX_hide');
          } else {
            Exp.cache.basketJSON.forEach((el) => {
              let sizeInfo;
              if (el.size === false) {
                if (el.branding.available === true) {
                  let msg;
                  if (el.branding.custom === true) {
                    msg = 'Yes';
                  } else {
                    msg = 'No';
                  }
                  basketWrap.insertAdjacentHTML('beforeend', `
                  <div class="GDXXX_basket-product">
                    <div class="GDXXX_prod-wrap">
                      <div class="GDXXX_prod-img">
                        <a href="${el.link}">
                          <img src="${el.img}" alt="${el.name}" />
                        </a>
                      </div>
                      <div class="GDXXX_prod-info">
                        <a href="${el.link}">${el.name}</a>
                        <div>Branded: <span>${msg}</span></div>
                        <div>Code: <span>${el.code}</span></div>
                      </div>
                    </div>
                    <div class="GDXXX_quantity-wrap GDXXX_qty-wrap">
                      <a class="GDXXX_qty minus">-</a>
                      <input class="GDXXX_qty-input qty profileInputArea" type="text" name="qty" maxlength="4" value="${el.qty}">
                      <a class="GDXXX_qty plus">+</a>
                      <a class="GDXXX_update-basket" data-name="${el.name}" data-size="false" data-branding="${el.branding.custom}">Update</a>
                      <a class="GDXXX_remove-item" data-name="${el.name}" data-size="false" data-branding="${el.branding.custom}"><img src="/_ui/desktop/theme-protec/images/icon-cart-remove.png" alt="Remove" title="Remove"></a>
                    </div>
                  </div>
                `);
                } else {
                  basketWrap.insertAdjacentHTML('beforeend', `
                  <div class="GDXXX_basket-product">
                    <div class="GDXXX_prod-wrap">
                      <div class="GDXXX_prod-img">
                        <a href="${el.link}">
                          <img src="${el.img}" alt="${el.name}" />
                        </a>
                      </div>
                      <div class="GDXXX_prod-info">
                        <a href="${el.link}">${el.name}</a>
                        <div>Code: <span>${el.code}</span></div>
                      </div>
                    </div>
                    <div class="GDXXX_quantity-wrap GDXXX_qty-wrap">
                      <a class="GDXXX_qty minus">-</a>
                      <input class="GDXXX_qty-input qty profileInputArea" type="text" name="qty" maxlength="4" value="${el.qty}">
                      <a class="GDXXX_qty plus">+</a>
                      <a class="GDXXX_update-basket" data-name="${el.name}" data-size="false" data-branding="false">Update</a>
                      <a class="GDXXX_remove-item" data-name="${el.name}" data-size="false" data-branding="false"><img src="/_ui/desktop/theme-protec/images/icon-cart-remove.png" alt="Remove" title="Remove"></a>
                    </div>
                  </div>
                `);
                }
              } else if (el.branding.available === true) {
                sizeInfo = el.size.replace('&nbsp;', '');
                let msg;
                if (el.branding.custom === true) {
                  msg = 'Yes';
                } else {
                  msg = 'No';
                }
                basketWrap.insertAdjacentHTML('beforeend', `
                <div class="GDXXX_basket-product">
                  <div class="GDXXX_prod-wrap">
                    <div class="GDXXX_prod-img">
                      <a href="${el.link}">
                        <img src="${el.img}" alt="${el.name}" />
                      </a>
                    </div>
                    <div class="GDXXX_prod-info">
                      <a href="${el.link}">${el.name}</a>
                      <div>Size/Option: <span>${el.size}</span></div>
                      <div>Branded: <span>${msg}</span></div>
                      <div>Code: <span>${el.code}</span></div>
                    </div>
                  </div>
                  <div class="GDXXX_quantity-wrap GDXXX_qty-wrap">
                    <a class="GDXXX_qty minus">-</a>
                    <input class="GDXXX_qty-input qty profileInputArea" type="text" name="qty" maxlength="4" value="${el.qty}">
                    <a class="GDXXX_qty plus">+</a>
                    <a class="GDXXX_update-basket" data-name="${el.name}" data-size="${sizeInfo}" data-branding="${el.branding.custom}">Update</a>
                    <a class="GDXXX_remove-item" data-name="${el.name}" data-size="${sizeInfo}" data-branding="${el.branding.custom}"><img src="/_ui/desktop/theme-protec/images/icon-cart-remove.png" alt="Remove" title="Remove"></a>
                  </div>
                </div>
              `);
              } else {
                sizeInfo = el.size.replace('&nbsp;', '');
                basketWrap.insertAdjacentHTML('beforeend', `
                  <div class="GDXXX_basket-product">
                    <div class="GDXXX_prod-wrap">
                      <div class="GDXXX_prod-img">
                        <a href="${el.link}">
                          <img src="${el.img}" alt="${el.name}" />
                        </a>
                      </div>
                      <div class="GDXXX_prod-info">
                        <a href="${el.link}">${el.name}</a>
                        <div>Size/Option: <span>${el.size}</span></div>
                        <div>Code: <span>${el.code}</span></div>
                      </div>
                    </div>
                    <div class="GDXXX_quantity-wrap">
                      <a class="GDXXX_qty minus">-</a>
                      <input class="GDXXX_qty-input" type="text" name="qty" maxlength="4" value="${el.qty}">
                      <a class="GDXXX_qty plus">+</a>
                      <a class="GDXXX_update-basket" data-name="${el.name}" data-size="${sizeInfo}" data-branding="false">Update</a>
                      <a class="GDXXX_remove-item" data-name="${el.name}" data-size="${sizeInfo}" data-branding="false"><img src="/_ui/desktop/theme-protec/images/icon-cart-remove.png" alt="Remove" title="Remove"></a>
                    </div>
                  </div>
                `);
              }
            });
          }
        },
        bindings: () => {
          poller([
            () => {
              let returnVal = false;
              if (Exp.cache.$ !== false) {
                returnVal = true;
              } else if (window.jQuery) {
                Exp.cache.$ = window.jQuery;
              }

              return returnVal;
            },
          ], () => {
            const emptyBtn = document.querySelector('.GDXXX_empty-basket');
            const emptyModal = Exp.cache.$('.GDXXX_empty-confirm');
            const updateBasketBtn = Exp.cache.$('.GDXXX_update-basket');
            const qtyWraps = document.querySelectorAll('.GDXXX_quantity-wrap');
            const goToForm = document.querySelector('.GDXXX_go-to');

            goToForm.addEventListener('click', () => {
              Exp.cache.$('html, body').animate({
                scrollTop: $('.GDXXX_quote-form').offset().top,
              }, 1000);
            });

            emptyBtn.addEventListener('click', () => {
              emptyModal.fadeIn();
            });

            Exp.cache.$('.GDXXX_empty-no, .GDXXX_empty-close').on('click', () => {
              emptyModal.fadeOut();
            });

            emptyModal.find('.GDXXX_empty-yes').on('click', () => {
              Exp.services.emptyBasket();
              emptyModal.fadeOut();
            });

            updateBasketBtn.each((i, item) => {
              Exp.cache.$(item).on('click', () => {
                const el = Exp.cache.$(item);
                const elDataName = el.attr('data-name');
                const quanInput = parseInt(el.parent('.GDXXX_quantity-wrap').find('input').val(), 10);
                const elDataSize = el.attr('data-size');
                const brandingData = el.attr('data-branding');

                if (elDataSize !== 'false') {
                  Exp.cache.basketJSON.forEach((arrEl, index, arr) => {
                    if (String(arrEl.name) === elDataName && String(arrEl.size) === elDataSize) {
                      if (arrEl.branding.available === true
                      && arrEl.branding.custom === true
                      && String(arrEl.branding.custom) === brandingData) {
                        if (quanInput === 0) {
                          arr.splice(index, 1);
                          el.closest('.GDXXX_basket-product').remove();
                        } else {
                          arrEl.qty = quanInput;
                        }
                      } else if (arrEl.branding.available === true
                      && arrEl.branding.custom === false
                      && String(arrEl.branding.custom) === brandingData) {
                        if (quanInput === 0) {
                          arr.splice(index, 1);
                          el.closest('.GDXXX_basket-product').remove();
                        } else {
                          arrEl.qty = quanInput;
                        }
                      } else if (arrEl.branding.available === false
                      && String(arrEl.branding.custom) === brandingData) {
                        if (quanInput === 0) {
                          arr.splice(index, 1);
                          el.closest('.GDXXX_basket-product').remove();
                        } else {
                          arrEl.qty = quanInput;
                        }
                      }
                    }
                  });
                } else {
                  Exp.cache.basketJSON.forEach((arrEl, index, arr) => {
                    if (String(arrEl.name) === elDataName) {
                      if (arrEl.branding.available === true
                      && arrEl.branding.custom === true
                      && String(arrEl.branding.custom) === brandingData) {
                        if (quanInput === 0) {
                          arr.splice(index, 1);
                          el.closest('.GDXXX_basket-product').remove();
                        } else {
                          arrEl.qty = quanInput;
                        }
                      } else if (arrEl.branding.available === true
                      && arrEl.branding.custom === false
                      && String(arrEl.branding.custom) === brandingData) {
                        if (quanInput === 0) {
                          arr.splice(index, 1);
                          el.closest('.GDXXX_basket-product').remove();
                        } else {
                          arrEl.qty = quanInput;
                        }
                      } else if (arrEl.branding.available === false
                      && String(arrEl.branding.custom) === brandingData) {
                        if (quanInput === 0) {
                          arr.splice(index, 1);
                          el.closest('.GDXXX_basket-product').remove();
                        } else {
                          arrEl.qty = quanInput;
                        }
                      }
                    }
                  });
                }

                Exp.services.storeBasket(Exp.cache.basketJSON);
                Exp.services.basketRefresh();
                window.location.reload();
              });
            });

            [].forEach.call(qtyWraps, (el) => {
              const qtyMinus = el.querySelector('.GDXXX_qty.minus');
              const qtyMinusParent = qtyMinus.parentNode;
              const qtyPlus = el.querySelector('.GDXXX_qty.plus');
              const qtyPlusParent = qtyPlus.parentNode;

              qtyMinus.addEventListener('click', () => {
                const qtyInput = qtyMinusParent.querySelector('.GDXXX_qty-input');
                let inputVal = parseFloat(qtyInput.value);
                inputVal = Math.round(inputVal);

                if (inputVal <= 1) {
                  inputVal = 1;
                } else {
                  inputVal -= 1;
                }
                qtyInput.value = inputVal;
              });

              qtyPlus.addEventListener('click', () => {
                const qtyInput = qtyPlusParent.querySelector('.GDXXX_qty-input');
                let inputVal = parseFloat(qtyInput.value);
                inputVal = Math.round(inputVal);

                if (inputVal < 0) {
                  inputVal = 1;
                } else {
                  inputVal += 1;
                }
                qtyInput.value = inputVal;
              });
            });

            Exp.cache.$('.GDXXX_remove-item').each((i, item) => {
              Exp.cache.$(item).on('click', () => {
                if (document.querySelectorAll('.GDXXX_basket-product').length === 1) {
                  Exp.services.removeItem($(item).attr('data-name'), $(item).attr('data-size'), $(item).attr('data-branding'), $(item).closest('.GDXXX_basket-product'));
                  window.location.reload();
                } else {
                  Exp.services.removeItem($(item).attr('data-name'), $(item).attr('data-size'), $(item).attr('data-branding'), $(item).closest('.GDXXX_basket-product'));
                }
              });
            });
          });
        },
        formFunctionality: () => {
          const form = document.querySelector('.GDXXX_quote-form');
          const nameInput = form.querySelector('.GDXXX_name');
          const postcodeInput = form.querySelector('.GDXXX_postcode');
          const phoneInput = form.querySelector('.GDXXX_phone');
          const emailInput = form.querySelector('.GDXXX_email');
          const submitBtn = form.querySelector('.GDXXX_submit');
          const inputs = form.querySelectorAll('.GDXXX_input');

          submitBtn.addEventListener('click', () => {
            let validate = true;
            nameInput.classList.remove('GDXXX_form-error');
            postcodeInput.classList.remove('GDXXX_form-error');
            phoneInput.classList.remove('GDXXX_form-error');
            emailInput.classList.remove('GDXXX_form-error');

            if (!nameInput.value) {
              nameInput.classList.add('GDXXX_form-error');
              validate = false;
            }
            if (!postcodeInput.value) {
              postcodeInput.classList.add('GDXXX_form-error');
              validate = false;
            } else if (Exp.validation.checkPostcode(postcodeInput.value) === false) {
              postcodeInput.classList.add('GDXXX_form-error');
              validate = false;
            }
            if (!phoneInput.value) {
              phoneInput.classList.add('GDXXX_form-error');
              validate = false;
            } else if (Exp.validation.checkNumber(phoneInput.value) === false) {
              phoneInput.classList.add('GDXXX_form-error');
              validate = false;
            }
            if (!emailInput.value) {
              emailInput.classList.add('GDXXX_form-error');
              validate = false;
            } else if (Exp.validation.checkEmail(emailInput.value) === false) {
              emailInput.classList.add('GDXXX_form-error');
              validate = false;
            }
            if (validate === true) {
              events.send('GDXXX', 'click', 'submit quote', { sendOnce: true });
              Exp.services.sendQuote();
            } else {
              events.send('GDXXX', 'click', 'submit quote but has validation errors', { sendOnce: true });
            }
          });

          [].forEach.call(inputs, (el) => {
            el.addEventListener('blur', () => {
              if (el.value) {
                el.classList.remove('GDXXX_form-error');
              }
            });
          });
        },
      },
    },
  };

  Exp.init();
};

export default Run;

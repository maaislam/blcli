/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import {
  sendHttpRequest,
  insertAfterElement,
  checkIntersection,
  pollerLite,
  waitForGlobalProperty,
} from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  waitForGlobalProperty('dataLayer.3.product_sku', () => {
    setup();

    fireEvent(`Conditions Met`);

    const productIDs = {
      F0849300: 'F6861100',
      F0850400: 'F6879000',
      F0856800: 'F6919800',
      F0887700: 'F5259700',
      F0900800: 'F6901800',
      F0901100: 'F5131800',
      F0903900: 'F5442200',
      F0905300: 'F2285400',
      F1229600: 'F6742800',
      F1254400: 'F6744200',
      F1310979: 'F1377968',
      F1324192: 'F1324230',
      F1324196: 'F1324231',
      F1324197: 'F1324242',
      F1324198: 'F1324243',
      F1324199: 'F1324233',
      F1324201: 'F1324234',
      F1324202: 'F1324232',
      F1324203: 'F1324236',
      F1324204: 'F1324237',
      F1324205: 'F1324238',
      F1324206: 'F1324235',
      F1324207: 'F1324239',
      F1324208: 'F1324244',
      F1324209: 'F1324240',
      F1324210: 'F1324241',
      F1327033: 'F1325861',
      F1327036: 'F1325864',
      F1337900: 'F5153300',
      F1376988: 'F1401004',
      F1376993: 'F1401006',
      F1377698: 'F1377986',
      F1378900: 'F5188700',
      F1379692: 'F1377989',
      F1379693: 'F1377992',
      F1379694: 'F1377993',
      F1381154: 'F1398207',
      F1381155: 'F1398208',
      F1384265: 'F1344781',
      F1385881: 'F1385961',
      F1385884: 'F1385964',
      F1385885: 'F1385965',
      F1385887: 'F1385966',
      F1385891: 'F1385969',
      F1385893: 'F1387052',
      F1385895: 'F1385971',
      F1385897: 'F1385972',
      F1385899: 'F1385973',
      F1385902: 'F1385975',
      F1385905: 'F1385977',
      F1385906: 'F1385978',
      F1385908: 'F1387055',
      F1385979: 'F1386599',
      F1385980: 'F1387053',
      F1387101: 'F1377964',
      F1387102: 'F1377965',
      F1387103: 'F1377963',
      F1387104: 'F1385828',
      F1387105: 'F1377962',
      F1387108: 'F1377961',
      F1387168: 'F1377995',
      F1387169: 'F1390577',
      F1388283: 'F1421346',
      F1388368: 'F1388421',
      F1388369: 'F1388422',
      F1388371: 'F1388432',
      F1388372: 'F1388433',
      F1388373: 'F1388424',
      F1388374: 'F1388434',
      F1388375: 'F1390249',
      F1388376: 'F1388435',
      F1388379: 'F1388427',
      F1388382: 'F1390250',
      F1388385: 'F1389105',
      F1388386: 'F1388439',
      F1388387: 'F1388440',
      F1388393: 'F1388445',
      F1388736: 'F1389060',
      F1389101: 'F1389106',
      F1397145: 'F1377996',
      F1397147: 'F1377987',
      F1397148: 'F1377990',
      F1400971: 'F1401005',
      F1407077: 'F1407122',
      F1407079: 'F1407102',
      F1407080: 'F1407103',
      F1407081: 'F1407104',
      F1407082: 'F1407105',
      F1407083: 'F1407106',
      F1407084: 'F1407107',
      F1407085: 'F1407125',
      F1407086: 'F1407108',
      F1407087: 'F1407136',
      F1407088: 'F1407109',
      F1407089: 'F1407139',
      F1407124: 'F1407128',
      F1407129: 'F1407137',
      F1407130: 'F1407138',
      F1407131: 'F1407140',
      F1420124: 'F1420125',
      F1422705: 'F1422706',
      F1426700: 'F6818100',
      F1440423: 'F1441310',
      F1445544: 'F1445492',
      F1629900: 'F2192600',
      F2920700: 'F6684000',
      F2920800: 'F6689100',
      F2920900: 'F6736700',
      F2921100: 'F6739700',
      F2921400: 'F6795700',
      F3045400: 'F6642000',
      F3045500: 'F6931600',
      F3046300: 'F6602700',
      F3047700: 'F6696300',
      F3771800: 'F5152100',
      F3796500: 'F5282500',
      F3796700: 'F5331300',
      F3797100: 'F5376200',
      F3797300: 'F5242300',
      F3843300: 'F6742900',
      F4113400: 'F6841000',
      F4128900: 'F6933000',
      F5245600: 'F5746400',
      F5383800: 'F5447200',
      F6583500: 'F5132100',
      F6594100: 'F5179200',
      F6594900: 'F5189500',
      F6608000: 'F5189600',
      F6621800: 'F5197100',
      F6661300: 'F5395500',
      F6670600: 'F5259100',
      F7766400: 'F7799000',
    };

    const currentID = window.dataLayer[3].product_sku;

    const checkIfProductIdMatchesList = () => {
      return currentID && Object.keys(productIDs).includes(currentID);
    };

    const checkIfSampleIdMatchesList = () => {
      return currentID && Object.values(productIDs).includes(currentID);
    };

    if (VARIATION === 'control') {
      // Tracking
      window.addEventListener('load', () => {
        const addToBag = document.querySelector('#btn-basket');

        fireEvent(`User is on a PDP`);

        checkIntersection(addToBag, 0, false).then(() => fireEvent(`Add to Bag button is in view`));

        if (checkIfProductIdMatchesList) {
          fireEvent(
            `User is on a PDP that matches the sku list of products with a direct sample SKU`
          );
        }

        if (checkIfSampleIdMatchesList) {
          addToBag.addEventListener('click', () => {
            fireEvent(`User added a sample product to the basket`);
          });
        }
      });
      // End Tracking
    } else {
      window.addEventListener('load', () => {
        const entryElementOne = document.querySelector('.product-form ');
      const entryElementTwo = document.querySelector('.product-delivery-cta');
      const entryElement = () => (entryElementTwo ? entryElementTwo : entryElementOne);
      const experimentRootElement = document.createElement('div');

      experimentRootElement.classList.add(`${ID}-root`);

      const fallbackElement = /* HTML */ `
        <div class="${ID}-sample-banner">
          <h4 class="${ID}-sample-banner-title">Not Sure What to Buy?</h4>
          <p class="${ID}-sample-banner-text">
            We offer <strong>3 for £1</strong> on a range of samples. Mix and match and feel
            confident about buying with us.
          </p>
          <a href="https://avon.uk.com/collections/sample" class="${ID}-sample-banner-cta">
            Show Samples
          </a>
        </div>
      `;

      const insertFallbackElement = () => {
        experimentRootElement.innerHTML = fallbackElement;

        insertAfterElement(entryElement(), experimentRootElement);
      };

      if (checkIfProductIdMatchesList) {
        sendHttpRequest('GET', `https://avon.uk.com/search?type=product&q=${productIDs[currentID]}`)
          .then((res) => {
            const temp = document.createElement('html');
            temp.innerHTML = res;

            const link = temp.querySelector('.product-title > a').href;

            return link;
          })
          .then((link) => {
            experimentRootElement.innerHTML = /* HTML */ `
              <div class="${ID}-sample-banner">
                <h4 class="${ID}-sample-banner-title">Sample Available on this Product!</h4>
                <p class="${ID}-sample-banner-text">
                  Need to try before you buy? Get 3 for £1 on our samples.
                </p>
                <a href="${link}" class="${ID}-sample-banner-cta">View Sample</a>
              </div>
            `;

            insertAfterElement(entryElement(), experimentRootElement);
          })
          .catch(() => {
            insertFallbackElement();
          });
      } else {
        insertFallbackElement();
      }

      // Tracking
      window.addEventListener('load', () => {
        pollerLite([`.${ID}-sample-banner`], () => {
          const newElement = document.querySelector(`.${ID}-sample-banner`);

          checkIntersection(newElement, 0, false).then(() => fireEvent(`New element is in view`));
        });

        fireEvent(`User is on a PDP`);

        if (checkIfProductIdMatchesList) {
          fireEvent(
            `User is on a PDP that matches the sku list of products with a direct sample SKU`
          );
        }

        if (checkIfSampleIdMatchesList) {
          const addToBag = document.querySelector('#btn-basket');

          addToBag.addEventListener('click', () => {
            fireEvent(`User added a sample product to the basket`);
          });
        }
      });
      // End Tracking
      })
    }
  });
};

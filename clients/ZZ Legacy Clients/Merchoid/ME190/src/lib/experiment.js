/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ProductSlider from './components/slider';
import ProductMessages from './components/messages';
import settings from './settings';
import { pollerLite } from '../../../../../lib/uc-lib';


const activate = () => {
  setup();

  const productBrand = document.querySelector('[property="og:brand"]').content;
  const mainBrand = document.querySelector('.official-licensed-product .merchoid_genuine_brand_logo').getAttribute('src');

  const productSlider = new ProductSlider();

  pollerLite([`.${settings.ID}_productSlider`], () => {
    if (settings.VARIATION === '1') {
      const sliderMessages = new ProductMessages(
        {
          messages: [
            {
              text: `Premium ${productBrand} Product`,
            },
            {
              text: `Officially Licensed By <img src="${mainBrand}"/>`,
            },
            {
              text: 'Limited Quantities Available. <span>Get Yours Now!</span>',
            },
          ],
      });
    } 
    else if (settings.VARIATION === '2') {
      const sliderMessages = new ProductMessages(
        {
          messages: [
            {
              text: `Premium ${productBrand} Product`,
            },
            {
              text: `Every Product Approved By <img src="${mainBrand}"/>`,
            },
            {
              text: 'Don\'t Miss Out. <span>Buy Yours Now!</span>',
            },
          ],
      });
    }
    else if (settings.VARIATION === '3') {
      const sliderMessages = new ProductMessages(
        {
          messages: [
            {
              text: `Premium ${productBrand} product`,
            },
            {
              text: `Design Approved By The By <img src="${mainBrand}"/>  Franchise`,
            },
            {
              text: 'Don\'t Miss Out. <span>Buy Yours Now!</span>',
            },
          ],
        });
    }
  });
};

export default activate;

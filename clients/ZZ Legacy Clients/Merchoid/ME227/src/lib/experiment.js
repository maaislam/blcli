/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import outofstockproducts from './components/outofstockproducts';
import { events } from '../../../../../lib/utils';
import lowStockMessage from './components/lowStockMessage';
import shared from './shared';

export default () => {
  setup();
  outofstockproducts(); 

  const { ID } = shared; 

  // show out of stock products on scroll


const onScrollOfEachResult = () => {
  const allOutStockProducts = document.querySelectorAll('.ME227-out_of_stock');
  for (let index = 0; index < allOutStockProducts.length; index += 1) {
    const element = allOutStockProducts[index];
    if(element){
      const productHeight = element.clientHeight;

      // check when each element comes in to view
      const inView = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;

        const scrollPosition = scrollY + windowHeight;
        const bannerPosition = element.getBoundingClientRect().top + scrollY + productHeight;

        if (scrollPosition > bannerPosition) {
          return true;
        }
        return false;
      }

      // animate element when it is in view
      if (!element.classList.contains(`${ID}-inView`) && inView()) {
          element.classList.add(`${ID}-inView`);
          element.classList.add(`ME227-show_stock`);
        }
      } 
    }
  }
  // trigger the scroll event
  document.addEventListener('scroll', onScrollOfEachResult); 

  // add events on any of the products with low stock or selling fast
  if(window.location.href.indexOf('geeks-guide-to-ugly-christmas-sweaterjumpers') > -1) {
    lowStockMessage();

    const allProducts = document.querySelectorAll('.product-item');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const lowStockProduct = element.querySelector('.ME227-lowStockBadge');
      const sellingFastProduct = element.querySelector('.ME227-sellFastBadge');

      if(lowStockProduct) {
        element.addEventListener('click', () => {
          events.send('ME227 V1', 'User clicked low stock product');
        });
      }
      if(sellingFastProduct) {
        element.addEventListener('click', () => {
          events.send('ME227 V1', 'User clicked selling fast product');
        });
      }
    }
  }
};

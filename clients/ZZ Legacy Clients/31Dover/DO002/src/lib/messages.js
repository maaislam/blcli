import { events } from '../../../../../lib/utils';
import settings from './settings';

export const thresholdMessage = (ref, pos, message, background) => {
  if (!ref) ref = document.body;
  // if (document.querySelector('.DO002-thresholdMessage')) {
  //   const el = document.querySelector('.DO002-thresholdMessage');
  //   // Remove incase basket has updated
  //   el.parentNode.removeChild(el);
  // }
  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    <div class="DO002-thresholdMessage ${background ? 'DO002-bg' : ''}">
      <p>${message}</p> 
      
    </div>
  `);
};

export const viewAll = (ref, pos) => {
  if (!ref) ref = document.body;

  // Product Brand
  const productLink = document.querySelector('a.product--supplier-link');
  let name;
  let link;
  if (productLink) {
    link = productLink.href;
    const productLinkImg = productLink.querySelector('img');
    name = productLinkImg.getAttribute('alt');
  }

  // Product Category
  const { ecommerce } = window.dataLayer[0];
  const { detail } = ecommerce;
  const { actionField } = detail;
  const { list } = actionField; // The cat.
  // let subCat = list

  // Top level cat
  const { products } = detail;
  const { category } = products[0]; // Top level cat.

  const encodedLink = category.trim().replace(/^\s|\s$/g, '').replace(/\&|\s/g, '-').toLowerCase();
  const catLink = `https://www.31dover.com/${encodedLink}`;


  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    <div class="DO002-viewAll">
      <a href="${link}">View All ${name}</a>
    </div>
  `);

  // Click event
  const addedLink = document.querySelector('.DO002-viewAll a');
  if (addedLink) {
    addedLink.addEventListener('click', () => {
      events.send(settings.ID, 'Brand Link');
    });
  }
};
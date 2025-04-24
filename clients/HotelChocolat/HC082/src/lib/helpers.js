import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Standard experiment setup
 */
export const generateContent = (object, forWhom) => {
  // const giftBanner = `<div class="HC082-banner__wrapper">
  //   <div class="HC082-banner">
  //     <svg height="25px" width="25px" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" style="position: relative;transform: rotate(33deg);"><path d="M13.742,93c0,1.104,0.896,2,2,2h27.81V52.934h-29.81V93z"></path><path d="M56.448,95h27.81c1.104,0,2-0.896,2-2V52.934h-29.81V95z"></path><path d="M89.092,30.538H64.514c4.272-1.581,8.432-3.891,10.76-7.249c1.898-2.739,2.435-5.934,1.549-9.239  C75.393,8.722,70.544,5,65.034,5c-1.063,0-2.128,0.141-3.163,0.418c-5.65,1.515-9.482,8.06-11.871,14.028  c-2.388-5.969-6.221-12.514-11.871-14.028C37.094,5.141,36.03,5,34.966,5c-5.511,0-10.358,3.722-11.788,9.052  c-0.886,3.305-0.35,6.499,1.549,9.237c2.328,3.358,6.488,5.668,10.761,7.249h-24.58c-1.104,0-2,0.896-2,2v15.171  c0,1.104,0.896,2,2,2h32.644V32.793v-1.179h12.896v1.179v16.916h32.644c1.104,0,2-0.896,2-2V32.538  C91.092,31.434,90.195,30.538,89.092,30.538z M30.025,19.614c-0.829-1.196-1.021-2.397-0.621-3.894  c0.677-2.517,2.963-4.272,5.562-4.272c0.5,0,1.004,0.066,1.493,0.197c3.749,1.005,7.224,8.321,9.221,14.979  C40.221,25.561,32.609,23.342,30.025,19.614z M54.33,26.64c1.847-6.12,5.22-13.924,9.21-14.994c0.489-0.132,0.994-0.198,1.494-0.198  c2.599,0,4.884,1.756,5.56,4.271c0.401,1.497,0.211,2.697-0.617,3.894C67.559,23.107,60.333,25.477,54.33,26.64z"></path></svg>
  //   </div>
  // </div>`;
  const giftBanner = '';

  let listOfProducts = '';
  let obj = object;
  for (const key in obj) {
    console.log(`${key}: ${obj[key]}`);
    let data = obj[key];


    listOfProducts += `<li class="${ID}-grid-tile grid-tile ${forWhom}" data-colors-to-show="">
      ${giftBanner}
      <div class="product-tile lazyLoading" id="${data.id}" data-itemid="${data.dataItemId}" style="height: 391px;">
        <div class="product-image">
          ${data.badgeTitle ? `<div class="${ID}-badge"><span>${data.badgeTitle}</span></div>` : ''}
          <a class="thumb-link" href="${data.url}" title="${data.prodName}">
            <img class="" src="${data.img.url}" alt="${data.prodName}" title="${data.prodName}" data-src="${data.img.url}">
          </a>
          <a class="quickview quickviewbutton " href="${data.url}" title="${data.prodName}">   
        </div>
        <div class="tile-wrapper">
          <div class="product-name">
            <a class="name-link" href="${data.url}" title="${data.prodName}">
              <span class="product-name-24">${data.prodName24}</span>
              <span class="product-name-40">${data.prodName40}</span>    
            </a>
          </div>
          <div class="product-pricing">
            <span class="product-sales-price" title="Sale Price">${data.price}</span>
            <span class="null" title="null"></span>
          </div>
          <div class="inc-delivery"></div>
          <div class="product-review-links product-review product-review-links-top">
            <a href="/uk/christmas-h-box.html" class="review-link">
              <div class="stars-rating">
                <div class="stars-rating-base"></div>
                <div class="stars-rating-filled" style="width:${data.stars}"></div>
              </div>
            </a>
          </div>
        </div>
      </div> 
    </li>`;
  }
  
  

  document.querySelector('.search-result-content ul').insertAdjacentHTML('afterbegin', listOfProducts);
}

export const removeFilteredContent = (forWhom) => {
  const allFilteredProds = document.querySelectorAll(`.${ID}-grid-tile.${forWhom}`);
  if (allFilteredProds.length > 0) {
    [].forEach.call(allFilteredProds, (prod) => {
      prod.parentElement.removeChild(prod);
    });
  }
}
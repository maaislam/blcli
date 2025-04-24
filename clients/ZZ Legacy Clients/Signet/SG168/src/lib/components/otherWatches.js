/**
 * Other watches
 */

import { getData } from "../data";
import shared from "../../../../../../core-files/shared";
 
 const { ID } = shared;
 
 export default () => {
     
     const productName = window.digitalData.product[0].productInfo.productName;
     const productObj = getData(productName);
 
     const otherProducts = productObj.otherWatches;
 
     if(productObj.otherWatches) {
         Object.keys(otherProducts).forEach((i) => {
             const data =  otherProducts[i];
             const product = document.createElement('div');
             product.classList.add(`swiper-slide`);
             product.classList.add(`${ID}__watchProduct`);
             product.innerHTML = `
                 <a href="${data.link}">
                     <div class="${ID}__image" style="background-image:url(${data.image})"></div>
                     <div class="${ID}__productDetail">
                         <p>${data.name}</p>
                         <p class="${ID}__productPrice">${data.price}</p>
                     </div>
                 </a>`;   
 
                 document.querySelector(`.${ID}__range .swiper-wrapper`).appendChild(product);
         });
 
         const watchesSwiper = new Swiper (`.${ID}__range .swiper-container`, {
             direction: 'horizontal',
             loop: true,
             centeredSlides: true,
             slidesPerView: 3,
             spaceBetween: 5,
             observer: true,
             observeParents: true,
             paginationClickable: true,
             pagination: {
                 el: `.${ID}__range .swiper-pagination`,
                 clickable: true
             },
             navigation: {
                 nextEl: `.${ID}__range .swiper-button-next.${ID}__slide_next`,
                 prevEl: `.${ID}__range .swiper-button-prev.${ID}__slide_prev`,
             },
             breakpoints: {
                 320: {
                     slidesPerView: 1.8,
                     spaceBetween: 5,
                 },
                 768: {
                     slidesPerView: 3,
                 },
                 1024: {
                     slidesPerView: 3,
                     spaceBetween: 5,
                 }
             },
             observer: true,  
             observeParents: true,
         });

     }
 }
   
 
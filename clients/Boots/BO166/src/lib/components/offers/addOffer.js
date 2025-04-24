import { fireEvent } from "../../../../../../../core-files/services";
import shared from "../../../../../../../core-files/shared"

export default () => {

    const { ID } = shared;

    const offerCount = (str) => {
        const re = /(P1a)/g
        return ((str || '').match(re) || []).length
      }
      
    
      // loop through products
      const addMultiOffer = () => {
        const allProductOffers = document.querySelectorAll(`.estore_product_container .product_offer.plp-promotion-redesign-container`);
    
        for (let index = 0; index < allProductOffers.length; index += 1) {
          const element = allProductOffers[index];
    
          const offerInput = element.querySelector('input');
          if(offerInput) {
    
                // checks if product has more than offer, if it does change the html
              if(offerCount(offerInput.value) > 1) {
                  const noOfOffers = offerCount(offerInput.value);

                  element.classList.add(`${ID}-multiple`);
                  element.querySelector('a').innerHTML = `<span>${noOfOffers}</span><p>View offers available on this product</p>`;
              };
          
              // send event if clicked
              element.addEventListener('click', () => {
                fireEvent('Clicked PLP Offer');
              });
            }
        }
      }
    
      addMultiOffer();
}
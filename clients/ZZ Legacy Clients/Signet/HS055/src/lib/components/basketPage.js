import shared from '../shared';

export default () => {
    const { ID } = shared;
    
    // if on basket and basket item exists
    const basketProduct = document.querySelector('.product-summary');

    const offer = document.querySelector('.product-summary.offer');

    if(basketProduct) {
 
        // if offer has been selected on product page
        if(offer) {
            if(localStorage.getItem(`${ID}-offer`)) {
                // remove the storage and add the offer
                document.querySelector('.product-summary.offer button').click();

                setTimeout(() => {
                    localStorage.removeItem(`${ID}-offer`);
                }, 2000);
            }
        } else {
            // remove even if it's not there
            setTimeout(() => {
                localStorage.removeItem(`${ID}-offer`);
            }, 2000);
        }
    }
}
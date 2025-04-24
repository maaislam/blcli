import shared from "../../../../../../core-files/shared";
import VelvetiserUpsell from "./velvetiserUpsell";

const { ID } = shared;


export default () => {

    const checkBasketItems = () => {
        const kitSachetSkus = ['503879' , '503897' , '503771' , '503770' , '503772' , '503773' , '503802' , '503780' , '503885' , '503808' , '503886' , '503884' , '503777' , '503776' , '503779' , '503805' , '503775' , '503774' , '503803' , '503839' , '503835' , '503950' , '504167' , '504168'];
        const allBasketItems = document.querySelectorAll('.cart-row');

        let velvetiserExists = false;
        let kitSkuExists = false;  

        for (let index = 0; index < allBasketItems.length; index++) {
            const element = allBasketItems[index];
    
            if(element.querySelector('.name').textContent.indexOf('The Velvetiser') > -1) {
                velvetiserExists = true;
            }

            if(kitSachetSkus.includes(element.getAttribute('data-pid'))) {
                kitSkuExists = true;
            }            
        }
      
        return {
          velvetiserExists: velvetiserExists,
          kitItemsExist: kitSkuExists,
          numItemsInBasket: allBasketItems.length
        }
    }


    const result = checkBasketItems();

    const checkVoucher = () => {
        let apply = true;

        
        
        // if error
        if(document.querySelector('.coupon-error') && document.querySelector('.coupon-error').textContent.indexOf('EXTRA15') > -1) {
            apply = false;
        }

        if(document.querySelector('.applied-coupon-code')) {
            if(document.querySelector('.applied-coupon-code').textContent.indexOf('EXTRA15') > -1) {
                apply = false;
            }
        }

        return apply;

    }

    const applyVoucher = () => {
        document.querySelector('#dwfrm_cart_couponCode').value = 'EXTRA15';
        document.querySelector('#add-coupon').click();
    }

    if(result.velvetiserExists && result.kitItemsExist) {
        // voucher
        if(checkVoucher() === true) {
            if(!sessionStorage.getItem('removedExtra')) {
                applyVoucher();
            }
        }

        if(document.querySelector('.button-text.remove-coupon')) {
            document.querySelector('.button-text.remove-coupon').addEventListener('click', () => {
                sessionStorage.setItem('removedExtra', 1);
            });
        }
        

       


        // // if no error
        // if(!document.querySelector('.coupon-error') || !document.querySelector('.applied-coupon-code')) {
        //     applyVoucher();
        // }
        // if(document.querySelector('#dwfrm_cart_couponCode').value !== 'EXTRA15') {
        //     applyVoucher();
        // }

        // if(document.querySelector('.applied-coupon-code') && document.querySelector('.applied-coupon-code').textContent !== 'EXTRA15') {
        //     applyVoucher();
        // } else if(!document.querySelector('.coupon-error') || document.querySelector('.coupon-error').textContent.indexOf('EXTRA15') === -1) {
        //     applyVoucher();
        // } else {
            
        // }

        // if(!sessionStorage.getItem('HCapplied')) {
        //     if(!document.querySelector('.coupon-error') || document.querySelector('.coupon-error').textContent.indexOf('EXTRA15') === -1) {
        //         document.querySelector('#dwfrm_cart_couponCode').value = 'EXTRA15';
        //         sessionStorage.setItem('HCapplied', 1);
        //         document.querySelector('#add-coupon').click();
        //     }

        //     if(
        //         (!document.querySelector('.coupon-error') || document.querySelector('.coupon-error').textContent.indexOf('EXTRA15') === -1) 
        //         || (document.querySelector('.applied-coupon-code') && document.querySelector('.applied-coupon-code').textContent !== 'EXTRA15')) {
        //             if(!document.querySelector('.coupon-error') || document.querySelector('.coupon-error').textContent.indexOf('EXTRA15') === -1 && (document.querySelector('.applied-coupon-code') && document.querySelector('.applied-coupon-code').textContent !== 'EXTRA15')) {
        //                 sessionStorage.setItem('HCapplied', 1);
        //                 document.querySelector('#dwfrm_cart_couponCode').value = 'EXTRA15';
        //                 document.querySelector('#add-coupon').click();
        //             }
        //     }
        // }

    } else if(result.velvetiserExists){
        // upsell
        document.documentElement.classList.add(`${ID}-velvetiserInBag`);
        new VelvetiserUpsell();
    }
}
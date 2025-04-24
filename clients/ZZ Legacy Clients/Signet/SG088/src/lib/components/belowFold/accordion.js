import shared from "../../shared";

export default () => {
    const { ID } = shared;
    
    // join the two delivery tables together
    const deliveryInfo = document.querySelector('.product-accordion-item__content .product-delivery .product-delivery__options');
    const nextDayTable =  document.querySelectorAll('.product-accordion-item__content .product-delivery .product-delivery__options')[1];
    if(deliveryInfo && nextDayTable) {
        deliveryInfo.insertAdjacentElement('afterend', nextDayTable);
    }
}
import { isMobile } from './utils';


const clickHandler = (target, fireEvent, shared) => {
  //console.log(target, "taregt")
  const { ID } = shared;
  
  const clickedElm = (selector) => target.closest(selector);
  if (clickedElm('[data-test-id="add-to-delivery-btn"]')) {
    fireEvent('User interacts with Delivery CTA', shared);
    //console.log("User interacts with Delivery CTA")

  }else if (clickedElm('[data-test-id="add-to-collection-btn"]') && window.location.pathname !== "/cart") {
    fireEvent('User interacts with Collection CTA', shared);
    //console.log("User interacts with Collection CTA")

  }else if (clickedElm('[data-test-id="qty-selector"]')) {
    fireEvent('User interacts with quantity selector on PLP', shared);
    //console.log("User interacts with quantity selector on PLP")

  }else if (clickedElm('[data-test-id="add-to-collection-btn"]') && window.location.pathname === "/cart") {
    fireEvent('User interacts with move to collection CTA at bag  ', shared);
    //console.log("User interacts with move to collection CTA at bag")

  }else if (clickedElm(`[data-test-id="delete-button"]`) && window.location.pathname === "/cart"){
    fireEvent('User interacts with Remove CTA at bag ', shared);
    //console.log("User interacts with Remove CTA at bag")
    
  }else if (clickedElm('[data-test-id="slot"]') && window.location.pathname === '/checkout') {
    const dateSelected = target
      .closest('[data-test-id="slot"]')
      .querySelector(`[data-test-id=${isMobile() ? 'delivery-date' : 'item-date'}]`).innerText;
    sessionStorage.setItem(`${ID}__date-selected-at-checkout`, dateSelected);
    sessionStorage.removeItem(`${ID}__selected-delivery-date`);
    fireEvent('User chooses a date at checkout', shared);
    //console.log("User chooses a date at checkout")

  } else if (
    clickedElm('[data-test-id="right-icon"]') ||
    clickedElm('[data-test-id="left-icon"]')
  ) {
    fireEvent('User interact with arrows at checkout', shared);
    //console.log("User interact with arrows at checkout");

  } 
  // else if (clickedElm('[data-test-id="related-products-widget"]')) {
  //   fireEvent('User interact with similar products carousel', shared);
  // }
};

export default clickHandler;

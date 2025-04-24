
const clickHandler = (target, fireEvent, shared) => {
  //console.log(target, "taregt")
  const { ID, VARIATION } = shared;
  
  const clickedElm = (selector) => target.closest(selector);
  if (clickedElm(`[data-test-id="add-to-collection-btn"]`)) {
    const targetElem = target.closest(`[data-test-id="add-to-collection-btn"]`);
    const targetParentElem = targetElem.closest("div");
    const stockLevel = targetParentElem.querySelector(`[data-test-id="collection-availability-message"]`).hasAttribute('low_stock') ? targetParentElem.querySelector(`[data-test-id="collection-availability-message"]`).textContent.split(" ")[1] : targetParentElem.querySelector(`[data-test-id="collection-availability-message"]`).textContent.split(" ")[0];
    
    fireEvent(`User interacts with Collection CTA.`);
    fireEvent(`Stock level is ${stockLevel}.`);
    // console.log(`User interacts with Collection CTA.`);
    // console.log(`Stock level is ${stockLevel}.`);

  }else if(clickedElm(`[data-test-id="add-to-delivery-btn"]`)){
    fireEvent(`User interacts with Delivery CTA.`);
    //console.log(`User interacts with Delivery CTA.`);
  }
};

export default clickHandler;

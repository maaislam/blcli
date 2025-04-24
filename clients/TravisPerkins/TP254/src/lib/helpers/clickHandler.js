
const clickHandler = (target, fireEvent, shared) => {

  //console.log(target, "taregt")
  const { ID, VARIATION } = shared;
  if(VARIATION != "control") return;
  
  const clickedElm = (selector) => target.closest(selector);
  if (clickedElm(`[data-test-id="use-my-current-location-button"]`)) {
    fireEvent(`Customer uses “Use my current location”`);
    //console.log(`Customer uses “Use my current location”`);

  }else if(clickedElm(`[data-test-id="input-component"]`)){
    fireEvent(`Customer enters postcode`);
    //console.log(`Customer enters postcode`);
  }
};

export default clickHandler;

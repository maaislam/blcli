
const clickHandler = (target, fireEvent, shared) => {
  //console.log(target, "taregt")
  const { ID } = shared;
  
  const clickedElm = (selector) => target.closest(selector);
  if (clickedElm(`[data-test-id="add-to-collection-btn"]`)) {
    const targetElem = target.closest(`[data-test-id="add-to-collection-btn"]`);
    const targetParentElem = targetElem.closest("div");
    const stockLevel = targetParentElem.querySelector(`[data-test-id="collection-availability-message"]`).textContent.split(" ")[0];
    fireEvent(`User interacts with Collection CTA and Stock level is ${stockLevel}.`, shared);
    //console.log(`User interacts with Collection CTA and Stock level is ${stockLevel}.`)

  }
};

export default clickHandler;

/**
 * @param {HTMLElement} element
 * @param {Boolean} allElementHasToBeInView
 */
 export const elementIsInView_custom = (element, allElementHasToBeInView = false) => {
    const stageHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
    const elementBoundingBox = element.getBoundingClientRect();
  
    const elementsTopY = elementBoundingBox.top - 50 ;
    const elementsBottomY = elementBoundingBox.top - 50 + elementBoundingBox.height;
  
  
    if (allElementHasToBeInView) {
      return elementsTopY >= 0 && elementsBottomY < stageHeight;
    } else {
      return elementsBottomY >= 0 && elementsTopY <= stageHeight;
      
    }
  };
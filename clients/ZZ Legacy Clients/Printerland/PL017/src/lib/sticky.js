/**
 * Helper for a prop on getboundingclientrect
 */
export const getDimension = (elm, prop) => {
  const rect = elm.getBoundingClientRect()
  let result = false;
  if(rect && (prop in rect)) {
    result = rect[prop];
  }

  return result;
};

/**
 * Did reach the top of some element
 */
export const topReached = (topPoint) => {
  let result = false;
  if(window.scrollY > topPoint) {
    result = true;
  }

  return result;
};

/**
 * Is the bottom of some element within given bound?
 * Returns a value by how much it's within or outside given bound
 */
export const whenBottomWithinBounds = (elm, boundingElm) => {
  const elmHeight = getDimension(elm, 'height');
  const boundingElmBottom = getDimension(boundingElm, 'top') + getDimension(boundingElm, 'height');

  const isWithinBounds = elmHeight < boundingElmBottom;

  const result = isWithinBounds ? 0 : boundingElmBottom - elmHeight;

  return result;
};

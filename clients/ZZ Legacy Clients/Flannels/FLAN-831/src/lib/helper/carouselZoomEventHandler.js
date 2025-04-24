import { fireEvent } from "../../../../../../core-files/services";

export const carouselZoomEventHandler = (addedNodes, removedNodes) => {
  let isZoomedEventFired = false;
  // console.log(mutation);
  if (addedNodes.length > 0) {
    let isZoomed = Array.from(addedNodes).filter((node) =>
      node.matches(`
      div.easyzoom-flyout`)
    );
    if (isZoomed.length > 0 && !isZoomedEventFired) {
      // console.log(`User interacts with the image carousels: zoom-flyout`);
      fireEvent(`User interacts with the image carousels: zoom-flyout`);
      isZoomedEventFired = true;
      //   console.log("isZoomedEventFired", isZoomedEventFired);
    }
  } else if (removedNodes.length > 0) {
    // console.log([...removedNodes]);
    let isZoomeRemoved = Array.from(removedNodes).filter((node) =>
      node.matches(`
      div.easyzoom-flyout`)
    );
    // console.log([...isZoomeRemoved], isZoomedEventFired);
    if (isZoomeRemoved.length > 0 && isZoomedEventFired) {
      isZoomedEventFired = false;
    }
  }
};

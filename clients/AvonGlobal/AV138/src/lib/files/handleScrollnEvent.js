import { fireEvent } from '../../../../../../core-files/services';

// Function to check if element is in viewport
const isInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) ||
            (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

export const handleScrollnEvent = (target, eventName) => {
    // Event handler for scroll event
    const handleScroll = () => {

        let element = document.querySelector(target);
        if (document.querySelector(target) && isInViewport(element, true)) {
            // Element is in the viewport
            fireEvent(eventName);
            if (document.querySelector('.mobile_scrolling_wrapper')) {
                document.querySelector('.mobile_scrolling_wrapper').removeEventListener("scroll", handleScroll);
            }

        }
    }

    // Attach scroll event handler
    if (document.querySelector('.mobile_scrolling_wrapper')) {

        document.querySelector('.mobile_scrolling_wrapper').addEventListener("scroll", handleScroll);

    }
}
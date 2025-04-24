import shared from '../../../../../core-files/shared';
import pageScroll from './pageScroll';
import handleSide from './handleSide';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import scrollToSection from './scrollToSection';

const unlock = () => {
    // Unlock page scroll
    pageScroll.unlock();
    // Scroll user
    scrollToSection('.menuItems');
};

const handleSides = (boxes) => {

    // Disable jquery animations.
    window.jQuery.fx.off = true;

    // Get unchanged boxes
    const unchangedBoxes = Array.prototype.filter.call(boxes, (box) => {
        return !box.dataset.changed;
    });

    // Only run once (changed variable is changed to true once all logic is done)
    unchangedBoxes.forEach((box, index) => {

        // Get elements
        const selectButton = box.querySelector('.greenButton');

        // Check if is last item
        const isLast = index + 1 == boxes.length;

        // Lock page scroll
        pageScroll.lock();

        // Trigger click on select
        selectButton.click();
        handleSide(box);

        // Unlock on last item
        if (isLast) {
            setTimeout(() => {
                unlock();
            }, 200);
        }

        // Set changed to true to ensure logic only runs once
        box.dataset.changed = true;
        
    });
};

export default handleSides;
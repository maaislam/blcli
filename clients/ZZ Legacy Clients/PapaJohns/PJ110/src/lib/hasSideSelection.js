import elements from './elements';
import checkIsSide from './checkIsSide';

const hasSideSelection = () => {
    const hasSide = Array.prototype.some.call(elements.dealBoxes, (box) => {
        return checkIsSide(box);
    });
    return hasSide;
};

export default hasSideSelection;
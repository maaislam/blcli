import checkBoxIsSide from './checkBoxIsSide';

export default (boxes) => {
    const isSides = Array.prototype.some.call(boxes, (box) => {
        return checkBoxIsSide(box);
    });
    return isSides;
};
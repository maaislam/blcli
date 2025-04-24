import handleBox from './handleBox';

const handleBoxes = (boxes) => {
    // Handle normal boxes
    boxes.forEach((box) => {
        handleBox(box);
    });
};

export default handleBoxes;
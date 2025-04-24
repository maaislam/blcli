import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const getCurrentElements = () => {
    const choices = document.querySelectorAll('.container.data .radio label');
    const tooltips = document.querySelectorAll(`.${ID}-tooltip-container`);
    return {
        choices,
        tooltips
    };
};

export default getCurrentElements;
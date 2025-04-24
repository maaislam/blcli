import getSecondPart from './getSecondPart';

export default (dropdown) => {
    const option = dropdown.options[0];
    const text = option?.innerText;
    const price = getSecondPart(text, '£');
    return price;
}
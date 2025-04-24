import sharedElements from '../sharedElements';

/**
 * Checks if the product only has a week price on the page.
 *
 * @returns {Boolean}
 */
const hasOnlyWeekPrice = () => {
    let isWeekOnly = false;
    let priceElementTexts = [];
    sharedElements.prices.forEach((priceElement) => {
        priceElement.forEach(priceRow => {
            let duration = priceRow.querySelector('label')?.innerText.toLowerCase();
            duration = duration.replace(/\s/g, '');
            priceElementTexts.push(duration);
        });
    });
    isWeekOnly = priceElementTexts.every((text) => {
        return (text && text == 'week');
    });
    return isWeekOnly;
};

export default hasOnlyWeekPrice;
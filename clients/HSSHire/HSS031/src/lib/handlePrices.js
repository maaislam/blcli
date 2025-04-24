import shared from './shared';
import sharedElements from '../../../sharedElements';
const { ID, VARIATION } = shared;

const prices = [
    {
        text: '1stday',
        newText: '<strong>DAY RATE</strong> <br><small>(24hr period)</small>'
    },
    {
        text: 'weekend',
        newText: '<strong>WEEKEND</strong> <br><small>(Fri pm - Mon am)</small>'
    },
    {
        text: 'week',
        newText: '<strong>WEEK</strong> <br><small>(3-7 days)</small>'
    },
    {
        text: 'extraday',
        hide: true
    }
]

const handlePrices = () => {
    sharedElements.prices.forEach((priceElement) => {
        priceElement.forEach((priceRow, index) => {
            const labelElement = priceRow.querySelector('label');
            const isUsingPriceReductions = priceRow.closest('.price-row').classList.contains('price-row-was');
            let formattedLabel = labelElement.innerText.replace(/\s/g, '').toLowerCase();
            let currentItem = prices.find((priceItem) => {
                return formattedLabel == priceItem.text;
            });
            if (currentItem) {
                if (currentItem?.hide) {
                    priceRow.style.display = 'none';
                } else {
                    labelElement.innerHTML = `<span class="${ID}-text">${currentItem.newText}</span>`;
                }
            }
            if (isUsingPriceReductions) {
                const priceElements = {
                    reduced: priceRow.querySelector('p'),
                    new: priceRow.querySelector('h5'),
                };
                priceRow.insertBefore(priceElements.new, priceElements.reduced);
            }
        });
    });
};

export default handlePrices;
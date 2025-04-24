export const setFlexRateDifferece = () => {
    const allSelectedRates = document.querySelectorAll('.roomRates .card-pad button.selected');
    allSelectedRates.forEach((rate) => {
        const flexiPriceElem = rate
            .closest('.card-pad')
            .querySelector('button[data-ratename="Flexible rate"]');

        const flexiPrice = rate
            .closest('.card-pad')
            .querySelector('button[data-ratename="Flexible rate"]')
            .innerText.split('£')[1];
        const ratePrice = rate.innerText.split('£')[1];

        const rateDifference = flexiPrice - ratePrice;
        flexiPriceElem.innerText = `+£${rateDifference}`;
    });
}

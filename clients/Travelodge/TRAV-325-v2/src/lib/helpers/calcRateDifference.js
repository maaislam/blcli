const calcRateDifference = () => {
    //if called then no flexible rate selected
    // look for each currently selected rate, get the flexi rate for that roomType and calculate the difference

    const allSelectedRates = document.querySelectorAll('.roomRates .card-pad button.selected');
    let total = 0;

    allSelectedRates.forEach((rate) => {
        const flexiPrice = rate
            .closest('.card-pad')
            .querySelector('button[data-ratename="Flexible rate"]')
            .innerText.split('£')[1];
        const ratePrice = rate.innerText.split('£')[1];

        total += flexiPrice - ratePrice;
    });

    return total.toFixed(2);
};

export default calcRateDifference;

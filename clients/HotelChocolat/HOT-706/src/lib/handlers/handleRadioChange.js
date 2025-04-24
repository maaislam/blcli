//Function to handle radio button selection
const handleRadioChange = (id, event) => {
    const radio = event.target; // Get the clicked radio button
    const name = radio.name; // E.g., "address-0", "address-1"
    const domContainerType = radio.dataset.type; // E.g., "billing", "gift"

    //Get current session storage or initialize an empty object
    const sessionData = JSON.parse(sessionStorage.getItem('selectedAddresses')) || {};

    //Update the session data
    sessionData[name] = domContainerType; //set data to address-0: billing, address-0: gift

    // Update session data or take the default from DOM if missing
    const closestBillingContainer = radio.closest(`.${id}__billingContainer`);
    const billingContainerIndex = closestBillingContainer.dataset.index;
    const newDomContainerType = domContainerType === 'billing' ? 'billingAddress' : 'giftAddress';
    const typeWithIndex = `${newDomContainerType}-${billingContainerIndex}`;

    const closestTab = radio.closest('.checkout-tab');
    const controlSelectElem = closestTab.querySelector('.shiptoaddress-block .select-address');
    const controlOptionElems = controlSelectElem.querySelectorAll('option');
    if (!sessionData[typeWithIndex] || !sessionData[typeWithIndex].selectedValue) {
        const formattedAddressElem = radio
            .closest(`.${id}__address-option`)
            .querySelector(`.${id}__formattedAddress`);

        if (formattedAddressElem) {
            sessionData[typeWithIndex] = {
                type: domContainerType,
                address: formattedAddressElem.innerHTML,
                selectedValue: '',
            };

            const formattedAddressText = formattedAddressElem.innerHTML.replace(/<br>/g, ', ');
            //find text before last comma in formatted address string;
            const formattedAddModText = formattedAddressText.substring(0, formattedAddressText.lastIndexOf(','));
            controlOptionElems.forEach((option) => {
                const optionText = option.textContent.toLowerCase().trim();
                const optionModText = optionText.substring(0, optionText.lastIndexOf(','));

                if (optionModText === formattedAddModText.toLowerCase().trim()) {
                    sessionData[typeWithIndex].selectedValue = option.value;
                    controlSelectElem.value = option.value;
                    controlSelectElem.dispatchEvent(new Event('change'));
                }
            });
        }
    } else {
        controlSelectElem.value = sessionData[typeWithIndex].selectedValue;
        controlSelectElem.dispatchEvent(new Event('change'));
    }

    //Save the updated object to session storage
    sessionStorage.setItem('selectedAddresses', JSON.stringify(sessionData));
}

export default handleRadioChange;